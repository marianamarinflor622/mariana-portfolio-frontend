import DOMPurify from 'dompurify';

/**
 * Sanitiza un input contra XSS y otros ataques
 * @param {string} input - Input a sanitizar
 * @returns {string} - Input sanitizado
 */
export function sanitizeInput(input) {
  if (!input) return '';
  
  // Sanitizar con DOMPurify
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false
  });
  
  return sanitized;
}

/**
 * Valida la seguridad de un input
 * @param {string} input - Input a validar
 * @returns {string} - Mensaje de error si hay problema, string vacío si es seguro
 */
export function validateSecurity(input) {
  if (!input) return '';
  
  // Patrones de XSS comunes
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /<object[^>]*>.*?<\/object>/gi,
    /<embed[^>]*>/gi,
    /<form[^>]*>.*?<\/form>/gi,
    /<input[^>]*>/gi,
    /<textarea[^>]*>.*?<\/textarea>/gi,
    /<select[^>]*>.*?<\/select>/gi,
    /<button[^>]*>.*?<\/button>/gi,
    /<link[^>]*>/gi,
    /<meta[^>]*>/gi,
    /<style[^>]*>.*?<\/style>/gi,
    /<link[^>]*>/gi,
    /vbscript:/gi,
    /data:/gi,
    /expression\s*\(/gi,
    /url\s*\(/gi
  ];
  
  for (const pattern of xssPatterns) {
    if (pattern.test(input)) {
      return 'Contenido no permitido detectado';
    }
  }
  
  // Detectar caracteres de control peligrosos
  // eslint-disable-next-line no-control-regex
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(input)) {
    return 'Caracteres de control no permitidos';
  }
  
  // Detectar intentos de SQL injection básicos
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
    /(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi,
    /(\b(OR|AND)\s+'.*?'\s*=\s*'.*?')/gi,
    /(UNION\s+SELECT)/gi,
    /(DROP\s+TABLE)/gi,
    /(INSERT\s+INTO)/gi,
    /(DELETE\s+FROM)/gi
  ];
  
  for (const pattern of sqlPatterns) {
    if (pattern.test(input)) {
      return 'Patrones de inyección detectados';
    }
  }
  
  // Detectar intentos de path traversal
  if (/\.\.\//.test(input) || /\.\.\\/.test(input)) {
    return 'Patrones de path traversal detectados';
  }
  
  return '';
}

/**
 * Valida la longitud de un input
 * @param {string} input - Input a validar
 * @param {number} maxLength - Longitud máxima permitida
 * @returns {string} - Mensaje de error si excede, string vacío si es válido
 */
export function validateLength(input, maxLength) {
  if (!input) return '';
  
  if (input.length > maxLength) {
    return `No puede exceder ${maxLength} caracteres`;
  }
  
  return '';
}

/**
 * Valida que un input no esté vacío
 * @param {string} input - Input a validar
 * @param {string} fieldName - Nombre del campo para el mensaje
 * @returns {string} - Mensaje de error si está vacío, string vacío si es válido
 */
export function validateRequired(input, fieldName) {
  if (!input || input.trim().length === 0) {
    return `${fieldName} es obligatorio`;
  }
  
  return '';
}

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {string} - Mensaje de error si es inválido, string vacío si es válido
 */
export function validateEmail(email) {
  if (!email) return '';
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    return 'Introduce un email válido';
  }
  
  if (email.length > 254) {
    return 'El email no puede exceder 254 caracteres';
  }
  
  return '';
}

/**
 * Función principal de validación de seguridad
 * @param {string} fieldName - Nombre del campo
 * @param {string} value - Valor a validar
 * @param {Object} options - Opciones de validación
 * @returns {string} - Mensaje de error si hay problema, string vacío si es válido
 */
export function validateFieldSecurity(fieldName, value, options = {}) {
  const {
    required = true,
    maxLength = 1000,
    fieldDisplayName = fieldName
  } = options;
  
  // Validar campo requerido
  if (required) {
    const requiredError = validateRequired(value, fieldDisplayName);
    if (requiredError) return requiredError;
  }
  
  // Si el campo está vacío y no es requerido, es válido
  if (!value || value.trim().length === 0) {
    return '';
  }
  
  // Sanitizar input
  const sanitized = sanitizeInput(value);
  
  // Validar seguridad
  const securityError = validateSecurity(sanitized);
  if (securityError) return securityError;
  
  // Validar longitud
  const lengthError = validateLength(sanitized, maxLength);
  if (lengthError) return lengthError;
  
  // Validación específica por tipo de campo
  switch (fieldName) {
    case 'email':
      return validateEmail(sanitized);
    
    case 'name':
      if (sanitized.length < 2) {
        return 'El nombre debe tener al menos 2 caracteres';
      }
      break;
    
    case 'message':
      if (sanitized.length < 10) {
        return 'El mensaje debe tener al menos 10 caracteres';
      }
      break;
    
    case 'captcha':
      if (sanitized !== '5') {
        return 'Respuesta incorrecta. Intenta de nuevo';
      }
      break;
  }
  
  return '';
}
