# Mariana Portfolio - Backend API

Backend API para el portfolio de Mariana Marín, desarrollado con Spring Boot.

## 🚀 Tecnologías

- **Java 21**
- **Spring Boot 3.3.4**
- **Spring Security**
- **Spring Web**
- **Maven**
- **GitHub API Integration**
- **Email Service (Gmail)**

## 📋 Características

- ✅ **API REST** para repositorios de GitHub
- ✅ **Formulario de contacto** con envío de emails
- ✅ **Rate Limiting** (5 requests/minuto)
- ✅ **Input Sanitization** con OWASP Encoder
- ✅ **CORS** configurado para frontend
- ✅ **Headers de seguridad** (CSP, X-Frame-Options, etc.)
- ✅ **Logging estructurado** con Logstash
- ✅ **Health checks** con Spring Actuator

## 🛠️ Instalación y Ejecución

### Prerrequisitos
- Java 21
- Maven 3.6+

### Configuración
1. Crear archivo `.env` en la raíz del proyecto:
```env
# Configuración para desarrollo local
PORT=8080
SPRING_PROFILES_ACTIVE=local
CORS_ORIGINS=http://localhost:5173

# Configuración de Email (Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=tu-app-password
MAIL_RECIPIENT=tu-email@gmail.com

# Configuración de GitHub
GITHUB_USERNAME=tu-usuario-github
GITHUB_TOKEN=tu-token-github
```

### Ejecutar
```bash
# Compilar
mvn clean install

# Ejecutar
mvn spring-boot:run
```

## 📡 Endpoints

### Repositorios
- `GET /api/repos` - Lista todos los repositorios
- `GET /api/repos?language=JavaScript` - Filtrar por lenguaje
- `GET /api/repos?type=source` - Filtrar por tipo
- `GET /api/repos?sort=updated&direction=desc` - Ordenar

### Contacto
- `POST /api/contact` - Enviar mensaje de contacto

### Health Check
- `GET /actuator/health` - Estado de la aplicación

## 🔒 Seguridad

- **Rate Limiting**: 5 requests por minuto por IP
- **Input Sanitization**: Protección contra XSS
- **CORS**: Configurado para dominios específicos
- **Security Headers**: CSP, X-Frame-Options, etc.
- **Honeypot**: Protección contra bots en formularios

## 🧪 Testing

```bash
# Ejecutar tests
mvn test

# Compilar sin tests
mvn clean install -DskipTests
```

## 📦 Build para Producción

```bash
# Crear JAR ejecutable
mvn clean package -DskipTests

# Ejecutar JAR
java -jar target/portfolio-0.0.1-SNAPSHOT.jar
```

## 🌐 Despliegue

El backend está configurado para funcionar en:
- **Puerto**: 8080 (configurable con variable `PORT`)
- **CORS**: Configurado para frontend en puerto 5173
- **Health Check**: Disponible en `/actuator/health`

## 📝 Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | 8080 |
| `SPRING_PROFILES_ACTIVE` | Perfil activo | local |
| `CORS_ORIGINS` | Orígenes permitidos | http://localhost:5173 |
| `GITHUB_USERNAME` | Usuario de GitHub | - |
| `GITHUB_TOKEN` | Token de GitHub | - |
| `MAIL_HOST` | Servidor SMTP | smtp.gmail.com |
| `MAIL_PORT` | Puerto SMTP | 587 |
| `MAIL_USERNAME` | Usuario email | - |
| `MAIL_PASSWORD` | Contraseña email | - |
| `MAIL_RECIPIENT` | Email destinatario | - |

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👩‍💻 Autor

**Mariana Marín**
- GitHub: [@marianamarinflor622](https://github.com/marianamarinflor622)
- LinkedIn: [Mariana Marín](https://www.linkedin.com/in/mariana-marin-1b6268348/)
- Email: infomarianamarin@gmail.com