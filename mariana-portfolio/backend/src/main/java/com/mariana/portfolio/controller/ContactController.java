package com.mariana.portfolio.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mariana.portfolio.service.EmailService;
import com.mariana.portfolio.service.RateLimitingService;
import com.mariana.portfolio.service.InputSanitizationService;
import com.mariana.portfolio.dto.ContactMessage;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {
    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
    private final EmailService emailService;
    private final RateLimitingService rateLimitingService;
    private final InputSanitizationService sanitizationService;
    
    // Constantes de validación
    private static final int MAX_MESSAGE_LENGTH = 2000;
    private static final int MAX_NAME_LENGTH = 100;
    private static final int MAX_EMAIL_LENGTH = 254;

    public ContactController(EmailService emailService, 
                           RateLimitingService rateLimitingService,
                           InputSanitizationService sanitizationService) {
        this.emailService = emailService;
        this.rateLimitingService = rateLimitingService;
        this.sanitizationService = sanitizationService;
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> sendContactMessage(
            @Valid @RequestBody ContactRequest request,
            HttpServletRequest httpRequest
    ) {
        String clientIp = getClientIpAddress(httpRequest);
        
        try {
            // 1. Rate Limiting - Verificar límite de requests por IP
            if (!rateLimitingService.isAllowed(clientIp)) {
                logger.warn("Rate limit exceeded for IP: {} - Request blocked", clientIp);
                return ResponseEntity.status(429)
                    .header("X-Rate-Limit-Remaining", "0")
                    .header("X-Rate-Limit-Reset", String.valueOf(rateLimitingService.getTimeUntilRefill(clientIp)))
                    .body(Map.of("error", "Demasiadas solicitudes. Intenta de nuevo en unos minutos."));
            }
            
            // 2. Validaciones básicas de Bean Validation
            if (request.name() == null || request.name().trim().isEmpty()) {
                logger.warn("Empty name field from IP: {}", clientIp);
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "El nombre es obligatorio"));
            }
            
            if (request.email() == null || request.email().trim().isEmpty()) {
                logger.warn("Empty email field from IP: {}", clientIp);
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "El email es obligatorio"));
            }
            
            if (request.message() == null || request.message().trim().isEmpty()) {
                logger.warn("Empty message field from IP: {}", clientIp);
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "El mensaje es obligatorio"));
            }
            
            // 3. Sanitización y validación de inputs
            String sanitizedName;
            String sanitizedEmail;
            String sanitizedMessage;
            
            try {
                sanitizedName = sanitizationService.sanitizeAndValidate(
                    request.name(), MAX_NAME_LENGTH, "Nombre");
                sanitizedEmail = sanitizationService.sanitizeAndValidate(
                    request.email(), MAX_EMAIL_LENGTH, "Email");
                sanitizedMessage = sanitizationService.sanitizeAndValidate(
                    request.message(), MAX_MESSAGE_LENGTH, "Mensaje");
            } catch (IllegalArgumentException e) {
                logger.warn("Input validation failed for IP {}: {}", clientIp, e.getMessage());
                return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
            }
            
            // 4. Validación adicional de email con regex
            if (!isValidEmailFormat(sanitizedEmail)) {
                logger.warn("Invalid email format from IP {}: {}", clientIp, sanitizedEmail);
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Formato de email inválido"));
            }
            
            // 5. Crear objeto de contacto con metadatos
            ContactMessage contactMessage = new ContactMessage(
                sanitizedName,
                sanitizedEmail,
                sanitizedMessage,
                LocalDateTime.now(),
                clientIp,
                request.userAgent() != null ? request.userAgent() : "Unknown"
            );
            
            // 6. Enviar email
            boolean sent = emailService.sendContactEmail(contactMessage);
            
            if (sent) {
                logger.info("Contact message sent successfully from IP: {} - Name: {}, Email: {}", 
                    clientIp, sanitizedName, sanitizedEmail);
                
                // Headers de rate limiting
                long remainingTokens = rateLimitingService.getAvailableTokens(clientIp);
                long timeUntilRefill = rateLimitingService.getTimeUntilRefill(clientIp);
                
                return ResponseEntity.ok()
                    .header("X-Rate-Limit-Remaining", String.valueOf(remainingTokens))
                    .header("X-Rate-Limit-Reset", String.valueOf(timeUntilRefill))
                    .body(Map.of("message", "Mensaje enviado correctamente"));
            } else {
                logger.error("Failed to send contact message from IP: {}", clientIp);
                return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Error al enviar el mensaje"));
            }
            
        } catch (Exception e) {
            logger.error("Unexpected error processing contact form from IP {}: {}", clientIp, e.getMessage(), e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Error interno del servidor"));
        }
    }
    
    /**
     * Valida el formato de email con regex RFC 5322
     */
    private boolean isValidEmailFormat(String email) {
        String emailRegex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
        return email.matches(emailRegex);
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
    
    public record ContactRequest(
        @NotBlank(message = "El nombre es obligatorio")
        @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
        String name,
        
        @NotBlank(message = "El email es obligatorio")
        @Email(message = "Email inválido")
        @Size(max = 254, message = "El email no puede exceder 254 caracteres")
        String email,
        
        @NotBlank(message = "El mensaje es obligatorio")
        @Size(min = 10, max = 2000, message = "El mensaje debe tener entre 10 y 2000 caracteres")
        String message,
        
        String timestamp,
        String userAgent,
        String ip
    ) {}
}
