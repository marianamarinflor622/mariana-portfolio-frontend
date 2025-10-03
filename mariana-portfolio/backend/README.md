# ⚙️ **Backend - Portfolio Mariana Marín**

> **API REST con Spring Boot** para el portfolio personal con integración GitHub y servicio de email.

## 📋 **Descripción**

Backend desarrollado con Spring Boot 3.x y Java 21 que proporciona una API REST para el portfolio. Incluye integración con GitHub API, servicio de email y arquitectura por capas.

## 🛠️ **Tecnologías**

- **Java 21** - Lenguaje de programación
- **Spring Boot 3.x** - Framework principal
- **Spring Web** - API REST
- **Spring Mail** - Servicio de email
- **Spring Security** - Seguridad básica
- **Maven** - Gestión de dependencias
- **SLF4J + Logback** - Logging estructurado
- **Jakarta Validation** - Validación de datos

## 🏗️ **Arquitectura del Proyecto**

```
backend/
├── src/main/java/com/mariana/portfolio/
│   ├── PortfolioApplication.java    # Clase principal Spring Boot
│   ├── config/                     # Configuración
│   │   └── WebConfig.java          # Configuración web y CORS
│   ├── controller/                 # Controladores REST
│   │   ├── ContactController.java  # API de contacto
│   │   └── GitHubController.java   # API de repositorios
│   ├── dto/                        # Data Transfer Objects
│   │   └── ContactMessage.java     # DTO para mensajes de contacto
│   └── service/                    # Servicios de negocio
│       ├── EmailService.java       # Servicio de email
│       └── GitHubClient.java       # Cliente GitHub API
├── src/main/resources/
│   ├── application.yml             # Configuración principal
│   └── logback-spring.xml          # Configuración de logging
├── .env                            # Variables de entorno
├── .gitignore                      # Archivos ignorados por Git
├── application-local.yml           # Configuración local
├── load-env.sh                     # Script para cargar variables
├── pom.xml                         # Dependencias Maven
└── README.md                       # Este archivo
```

## 🚀 **Instalación y Ejecución**

### **Prerrequisitos:**
- Java 21+
- Maven 3.6+
- Cuenta de Gmail con App Password

### **1. Instalar dependencias:**
```bash
mvn clean install
```

### **2. Configurar variables de entorno:**
```bash
# Crear archivo .env
cp .env.example .env

# Editar .env con tus credenciales
SERVER_PORT=8081
SPRING_PROFILES_ACTIVE=local
CORS_ORIGINS=http://localhost:5173
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=tu-app-password
MAIL_RECIPIENT=destinatario@email.com
GITHUB_USERNAME=tu-usuario
GITHUB_TOKEN=tu-token
```

### **3. Cargar variables de entorno:**
```bash
source load-env.sh
```

### **4. Ejecutar la aplicación:**
```bash
mvn spring-boot:run
```

### **5. Ejecutar con perfil específico:**
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 🔧 **Configuración**

### **Variables de Entorno Requeridas:**

```env
# Servidor
SERVER_PORT=8081
SPRING_PROFILES_ACTIVE=local

# CORS
CORS_ORIGINS=http://localhost:5173

# Email (Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=tu-app-password
MAIL_RECIPIENT=destinatario@email.com

# GitHub API
GITHUB_USERNAME=tu-usuario
GITHUB_TOKEN=tu-token
```

### **Configuración de Gmail:**
1. Habilitar 2FA en tu cuenta Gmail
2. Generar App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Usar el App Password en `MAIL_PASSWORD`

## 🌐 **API Endpoints**

### **Repositorios GitHub:**
```http
GET /api/repos
GET /api/repos?sort=updated&direction=desc
GET /api/repos?language=JavaScript&type=all
GET /api/repos/{name}
```

**Respuesta ejemplo:**
```json
[
  {
    "name": "portfolio",
    "fullName": "marianamarinflor622/portfolio",
    "description": "Mi portfolio personal",
    "htmlUrl": "https://github.com/marianamarinflor622/portfolio",
    "language": "JavaScript",
    "topics": ["react", "portfolio"],
    "fork": false,
    "archived": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-10-03T12:00:00Z",
    "pushedAt": "2024-10-03T12:00:00Z",
    "stargazersCount": 5,
    "watchersCount": 3,
    "forksCount": 2,
    "size": 1024
  }
]
```

### **Formulario de Contacto:**
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "message": "Hola, me interesa tu trabajo...",
  "timestamp": "2024-10-03T12:00:00Z",
  "userAgent": "Mozilla/5.0...",
  "ip": "192.168.1.1"
}
```

**Respuesta:**
```json
{
  "message": "Mensaje enviado correctamente"
}
```

## 🏛️ **Arquitectura por Capas**

### **Controller Layer:**
- **ContactController**: Maneja el formulario de contacto
- **GitHubController**: Maneja la integración con GitHub API

### **Service Layer:**
- **EmailService**: Envío de emails con Spring Mail
- **GitHubClient**: Cliente para GitHub API con RestClient

### **DTO Layer:**
- **ContactMessage**: DTO para mensajes de contacto

### **Config Layer:**
- **WebConfig**: Configuración CORS y web

## 🔒 **Seguridad**

### **Medidas de Seguridad Implementadas:**
- **Rate Limiting**: 5 requests por minuto por IP usando Bucket4j
- **Sanitización XSS**: Protección contra scripts maliciosos
- **Validación robusta**: Bean Validation + validación personalizada
- **Cabeceras de seguridad**: CSP, X-Frame-Options, HSTS, X-XSS-Protection
- **Protección anti-spam**: Honeypot + captcha simple
- **Logging de seguridad**: Monitoreo de intentos maliciosos

### **CORS Configurado:**
- Orígenes permitidos: `http://localhost:5173`, `https://*.vercel.app`, `https://*.netlify.app`
- Métodos: GET, POST, PUT, DELETE, OPTIONS
- Headers: Content-Type, Authorization, X-Forwarded-For, X-Real-IP
- Headers expuestos: X-Rate-Limit-Remaining, X-Rate-Limit-Reset

### **Validación de Datos:**
- **Jakarta Validation** para validar requests
- **Email validation** con regex RFC 5322 completo
- **Sanitización de inputs** contra XSS
- **Límites de longitud**:
  - Nombre: 2-100 caracteres
  - Email: máximo 254 caracteres
  - Mensaje: 10-2000 caracteres

### **Protección Anti-Spam:**
- **Honeypot field** en formulario de contacto
- **Simple captcha** (2 + 3 = ?)
- **Rate limiting** con Bucket4j
- **IP logging** para auditoría
- **Detección de patrones maliciosos**

### **Cabeceras de Seguridad:**
- **Content-Security-Policy**: Bloquea scripts externos
- **X-Frame-Options**: DENY (previene clickjacking)
- **X-XSS-Protection**: 1; mode=block
- **X-Content-Type-Options**: nosniff
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Permissions-Policy**: Restricciones de APIs del navegador

## 📊 **Logging**

### **Configuración Logback:**
- **Console logging** con formato legible
- **JSON logging** disponible (comentado)
- **Log levels** configurables por paquete

### **Logs importantes:**
```log
INFO  - Received contact message from IP 192.168.1.1: Name=Juan, Email=juan@ejemplo.com
INFO  - Contact message sent successfully from IP 192.168.1.1
ERROR - Error fetching user repos for user marianamarinflor622: Connection timeout
```

## 🧪 **Testing**

### **Ejecutar tests:**
```bash
mvn test                    # Ejecutar todos los tests
mvn test -Dtest=ClassName   # Ejecutar test específico
mvn verify                  # Verificar con tests
```

### **Saltar tests:**
```bash
mvn spring-boot:run -DskipTests
```

## 📈 **Métricas y Monitoreo**

### **Health Check:**
```http
GET /actuator/health
```

### **Métricas disponibles:**
- Tiempo de respuesta de endpoints
- Número de requests por endpoint
- Errores de conexión a GitHub API
- Emails enviados exitosamente

## 🚀 **Deployment**

### **Build para producción:**
```bash
mvn clean package
```

### **JAR ejecutable:**
```bash
java -jar target/portfolio-0.0.1-SNAPSHOT.jar
```

### **Variables de entorno en producción:**
```bash
export SERVER_PORT=8080
export SPRING_PROFILES_ACTIVE=production
export CORS_ORIGINS=https://tu-dominio.com
export MAIL_USERNAME=tu-email@gmail.com
export MAIL_PASSWORD=tu-app-password
export GITHUB_USERNAME=tu-usuario
export GITHUB_TOKEN=tu-token
```

## 🔧 **Scripts Útiles**

### **Cargar variables de entorno:**
```bash
source load-env.sh
```

### **Ejecutar con perfil específico:**
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### **Verificar configuración:**
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--debug"
```

## 📚 **Dependencias Principales**

```xml
<dependencies>
  <!-- Spring Boot Starters -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
  </dependency>
  
  <!-- JavaMail -->
  <dependency>
    <groupId>com.sun.mail</groupId>
    <artifactId>javax.mail</artifactId>
  </dependency>
</dependencies>
```

## 🐛 **Troubleshooting**

### **Error de conexión a Gmail:**
```
Authentication failed
```
**Solución**: Verificar App Password y 2FA habilitado

### **Error CORS:**
```
Access to fetch at 'http://localhost:8081/api/repos' from origin 'http://localhost:5173' has been blocked by CORS policy
```
**Solución**: Verificar configuración CORS en `WebConfig.java`

### **Error GitHub API:**
```
Error fetching user repos: 401 Unauthorized
```
**Solución**: Verificar `GITHUB_TOKEN` válido

## 🤝 **Contribución**

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` en la raíz del proyecto.

---

**Desarrollado con ❤️ por Mariana Marín** 🚀✨
