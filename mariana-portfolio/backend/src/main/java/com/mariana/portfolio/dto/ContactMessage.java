package com.mariana.portfolio.dto;

import java.time.LocalDateTime;

public record ContactMessage(
    String name,
    String email,
    String message,
    LocalDateTime timestamp,
    String clientIp,
    String userAgent
) {
    public String getFormattedTimestamp() {
        return timestamp.toString().replace("T", " ").substring(0, 19);
    }
    
    public String getEmailSubject() {
        return String.format("Contacto desde portafolio - %s", name);
    }
    
    public String getEmailBody() {
        return String.format("""
            Nuevo mensaje de contacto desde tu portafolio:
            
            Nombre: %s
            Email: %s
            Fecha: %s
            IP: %s
            User Agent: %s
            
            Mensaje:
            %s
            
            ---
            Este mensaje fue enviado automáticamente desde tu portafolio web.
            """, 
            name, 
            email, 
            getFormattedTimestamp(), 
            clientIp, 
            userAgent, 
            message
        );
    }
}
