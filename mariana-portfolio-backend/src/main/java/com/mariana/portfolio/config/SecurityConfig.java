package com.mariana.portfolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Deshabilitar CSRF para APIs REST (opcional, se puede habilitar)
            .csrf(csrf -> csrf.disable())
            
            // Configurar CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // Configurar autorización
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/contact").permitAll()
                .requestMatchers("/api/repos/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated()
            )
            
            // Configurar sesiones
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            // Configurar cabeceras de seguridad
            .headers(headers -> headers
                .addHeaderWriter((request, response) -> {
                    // Content Security Policy
                    response.setHeader("Content-Security-Policy", 
                        "default-src 'self'; " +
                        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
                        "style-src 'self' 'unsafe-inline'; " +
                        "img-src 'self' data: https:; " +
                        "font-src 'self' data:; " +
                        "connect-src 'self'; " +
                        "frame-ancestors 'none'; " +
                        "base-uri 'self'; " +
                        "form-action 'self'"
                    );
                    
                    // X-Frame-Options
                    response.setHeader("X-Frame-Options", "DENY");
                    
                    // X-XSS-Protection
                    response.setHeader("X-XSS-Protection", "1; mode=block");
                    
                    // X-Content-Type-Options
                    response.setHeader("X-Content-Type-Options", "nosniff");
                    
                    // Referrer Policy
                    response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
                    
                    // Permissions Policy
                    response.setHeader("Permissions-Policy", 
                        "geolocation=(), " +
                        "microphone=(), " +
                        "camera=(), " +
                        "payment=(), " +
                        "usb=(), " +
                        "magnetometer=(), " +
                        "gyroscope=(), " +
                        "speaker=(), " +
                        "vibrate=(), " +
                        "fullscreen=(), " +
                        "sync-xhr=()"
                    );
                })
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Orígenes permitidos
        configuration.setAllowedOriginPatterns(List.of(
            "http://localhost:*", 
            "https://*.vercel.app", 
            "https://*.netlify.app",
            "https://mariana-portfolio.vercel.app",
            "https://mariana-marin-portfolio.vercel.app"
        ));
        
        // Métodos permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Headers permitidos
        configuration.setAllowedHeaders(Arrays.asList(
            "Content-Type", 
            "Authorization", 
            "X-Requested-With", 
            "Accept", 
            "Origin",
            "X-Forwarded-For",
            "X-Real-IP"
        ));
        
        // Headers expuestos
        configuration.setExposedHeaders(Arrays.asList(
            "X-Rate-Limit-Remaining",
            "X-Rate-Limit-Reset"
        ));
        
        // Permitir credenciales
        configuration.setAllowCredentials(true);
        
        // Tiempo de cache preflight
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        
        return source;
    }
}
