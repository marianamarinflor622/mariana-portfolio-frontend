package com.mariana.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.mariana.portfolio.dto.ContactMessage;

@Service
public class EmailService {
    private final JavaMailSender mailSender;
    private final String recipientEmail;

    public EmailService(
            JavaMailSender mailSender,
            @Value("${mail.recipient:marianamarinflor622@gmail.com}") String recipientEmail
    ) {
        this.mailSender = mailSender;
        this.recipientEmail = recipientEmail;
    }

    public boolean sendContactEmail(ContactMessage contactMessage) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(recipientEmail);
            message.setSubject(contactMessage.getEmailSubject());
            message.setText(contactMessage.getEmailBody());
            message.setFrom(recipientEmail); // Usar el mismo email como remitente

            mailSender.send(message);
            
            System.out.println("Email enviado correctamente a: " + recipientEmail);
            return true;

        } catch (Exception e) {
            System.err.println("Error enviando email: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}
