package com.mariana.portfolio.service;

import org.owasp.encoder.Encode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class InputSanitizationService {
    private static final Logger logger = LoggerFactory.getLogger(InputSanitizationService.class);
    
    // Patrones peligrosos para XSS
    private static final Pattern SCRIPT_PATTERN = Pattern.compile("<script[^>]*>.*?</script>", Pattern.CASE_INSENSITIVE);
    private static final Pattern JAVASCRIPT_PATTERN = Pattern.compile("javascript:", Pattern.CASE_INSENSITIVE);
    private static final Pattern ONLOAD_PATTERN = Pattern.compile("onload\\s*=", Pattern.CASE_INSENSITIVE);
    private static final Pattern ONCLICK_PATTERN = Pattern.compile("onclick\\s*=", Pattern.CASE_INSENSITIVE);
    private static final Pattern ONERROR_PATTERN = Pattern.compile("onerror\\s*=", Pattern.CASE_INSENSITIVE);
    private static final Pattern IFRAME_PATTERN = Pattern.compile("<iframe[^>]*>.*?</iframe>", Pattern.CASE_INSENSITIVE);
    private static final Pattern OBJECT_PATTERN = Pattern.compile("<object[^>]*>.*?</object>", Pattern.CASE_INSENSITIVE);
    private static final Pattern EMBED_PATTERN = Pattern.compile("<embed[^>]*>", Pattern.CASE_INSENSITIVE);
    private static final Pattern FORM_PATTERN = Pattern.compile("<form[^>]*>.*?</form>", Pattern.CASE_INSENSITIVE);
    private static final Pattern INPUT_PATTERN = Pattern.compile("<input[^>]*>", Pattern.CASE_INSENSITIVE);
    private static final Pattern TEXTAREA_PATTERN = Pattern.compile("<textarea[^>]*>.*?</textarea>", Pattern.CASE_INSENSITIVE);
    private static final Pattern SELECT_PATTERN = Pattern.compile("<select[^>]*>.*?</select>", Pattern.CASE_INSENSITIVE);
    private static final Pattern BUTTON_PATTERN = Pattern.compile("<button[^>]*>.*?</button>", Pattern.CASE_INSENSITIVE);
    
    /**
     * Sanitiza un input contra XSS y otros ataques
     * @param input Input a sanitizar
     * @return Input sanitizado
     */
    public String sanitizeInput(String input) {
        if (input == null) {
            return null;
        }
        
        String sanitized = input.trim();
        
        // Log del input original para auditoría
        logger.debug("Sanitizing input: {}", sanitized);
        
        // Validar entrada básica
        if (!isValidInput(sanitized)) {
            logger.warn("Invalid input format detected: {}", sanitized);
            throw new IllegalArgumentException("Invalid input format");
        }
        
        // Detectar patrones peligrosos
        if (containsDangerousPatterns(sanitized)) {
            logger.warn("Dangerous pattern detected in input: {}", sanitized);
            throw new IllegalArgumentException("Input contains potentially dangerous content");
        }
        
        // Sanitizar con OWASP Encoder
        sanitized = Encode.forHtml(sanitized);
        
        logger.debug("Input sanitized successfully");
        return sanitized;
    }
    
    /**
     * Valida que el input tenga un formato válido
     * @param input Input a validar
     * @return true si es válido, false si no
     */
    private boolean isValidInput(String input) {
        if (input == null) return false;
        
        // Verificar caracteres de control peligrosos
        for (char c : input.toCharArray()) {
            if (Character.isISOControl(c) && c != '\n' && c != '\r' && c != '\t') {
                return false;
            }
        }
        
        // Verificar longitud razonable
        if (input.length() > 10000) {
            return false;
        }
        
        // Verificar que no contenga solo espacios
        if (input.trim().isEmpty()) {
            return false;
        }
        
        return true;
    }
    
    /**
     * Verifica si el input contiene patrones peligrosos
     * @param input Input a verificar
     * @return true si contiene patrones peligrosos
     */
    private boolean containsDangerousPatterns(String input) {
        return SCRIPT_PATTERN.matcher(input).find() ||
               JAVASCRIPT_PATTERN.matcher(input).find() ||
               ONLOAD_PATTERN.matcher(input).find() ||
               ONCLICK_PATTERN.matcher(input).find() ||
               ONERROR_PATTERN.matcher(input).find() ||
               IFRAME_PATTERN.matcher(input).find() ||
               OBJECT_PATTERN.matcher(input).find() ||
               EMBED_PATTERN.matcher(input).find() ||
               FORM_PATTERN.matcher(input).find() ||
               INPUT_PATTERN.matcher(input).find() ||
               TEXTAREA_PATTERN.matcher(input).find() ||
               SELECT_PATTERN.matcher(input).find() ||
               BUTTON_PATTERN.matcher(input).find();
    }
    
    /**
     * Valida la longitud del input
     * @param input Input a validar
     * @param maxLength Longitud máxima permitida
     * @return true si la longitud es válida
     */
    public boolean isValidLength(String input, int maxLength) {
        if (input == null) {
            return true;
        }
        return input.length() <= maxLength;
    }
    
    /**
     * Valida que el input no esté vacío después de trim
     * @param input Input a validar
     * @return true si el input no está vacío
     */
    public boolean isNotEmpty(String input) {
        return input != null && !input.trim().isEmpty();
    }
    
    /**
     * Sanitiza y valida un input completo
     * @param input Input a procesar
     * @param maxLength Longitud máxima
     * @param fieldName Nombre del campo para logging
     * @return Input sanitizado y validado
     * @throws IllegalArgumentException si el input no es válido
     */
    public String sanitizeAndValidate(String input, int maxLength, String fieldName) {
        if (!isNotEmpty(input)) {
            throw new IllegalArgumentException(fieldName + " no puede estar vacío");
        }
        
        if (!isValidLength(input, maxLength)) {
            throw new IllegalArgumentException(fieldName + " excede la longitud máxima de " + maxLength + " caracteres");
        }
        
        return sanitizeInput(input);
    }
}
