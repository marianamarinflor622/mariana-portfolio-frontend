package com.mariana.portfolio.service;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import io.github.bucket4j.Bandwidth;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitingService {
    private static final Logger logger = LoggerFactory.getLogger(RateLimitingService.class);
    
    // Cache para almacenar buckets por IP
    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();
    
    // Configuración: 5 requests por minuto
    private static final int REQUESTS_PER_MINUTE = 5;
    private static final Duration REFILL_DURATION = Duration.ofMinutes(1);
    
    /**
     * Verifica si la IP puede hacer una request
     * @param ipAddress IP del cliente
     * @return true si puede hacer la request, false si está limitado
     */
    public boolean isAllowed(String ipAddress) {
        Bucket bucket = cache.computeIfAbsent(ipAddress, this::createNewBucket);
        
        boolean allowed = bucket.tryConsume(1);
        
        if (!allowed) {
            logger.warn("Rate limit exceeded for IP: {}", ipAddress);
        }
        
        return allowed;
    }
    
    /**
     * Obtiene el número de tokens disponibles para una IP
     * @param ipAddress IP del cliente
     * @return número de tokens disponibles
     */
    public long getAvailableTokens(String ipAddress) {
        Bucket bucket = cache.get(ipAddress);
        if (bucket == null) {
            return REQUESTS_PER_MINUTE;
        }
        return bucket.getAvailableTokens();
    }
    
    /**
     * Obtiene el tiempo hasta el próximo refill para una IP
     * @param ipAddress IP del cliente
     * @return tiempo en segundos hasta el próximo refill
     */
    public long getTimeUntilRefill(String ipAddress) {
        Bucket bucket = cache.get(ipAddress);
        if (bucket == null) {
            return 0;
        }
        // Simplificado: retornar 60 segundos si no hay tokens disponibles
        if (bucket.getAvailableTokens() == 0) {
            return 60;
        }
        return 0;
    }
    
    /**
     * Crea un nuevo bucket para una IP
     * @param ipAddress IP del cliente
     * @return nuevo bucket configurado
     */
    private Bucket createNewBucket(String ipAddress) {
        logger.debug("Creating new rate limit bucket for IP: {}", ipAddress);
        
        Bandwidth limit = Bandwidth.classic(REQUESTS_PER_MINUTE, Refill.intervally(REQUESTS_PER_MINUTE, REFILL_DURATION));
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
    
    /**
     * Limpia buckets antiguos (opcional, para evitar memory leaks)
     */
    public void cleanup() {
        // En un entorno de producción, implementar limpieza periódica
        // Por ahora, el cache crecerá indefinidamente
        logger.debug("Rate limiting cache size: {}", cache.size());
    }
}
