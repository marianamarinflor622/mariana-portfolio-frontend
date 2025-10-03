# 🚀 **Portfolio de Mariana Marín**

> **Full-Stack Developer Portfolio** - Una aplicación web moderna que muestra proyectos, habilidades técnicas y permite contacto directo.

## 📋 **Descripción del Proyecto**

Este es un portfolio personal desarrollado con tecnologías modernas que incluye:

- **Frontend**: Aplicación React con Vite, CSS Modules y diseño responsive
- **Backend**: API REST con Spring Boot y Java 21
- **Funcionalidades**: Visualización de repositorios GitHub, formulario de contacto, política de privacidad
- **Testing**: Tests unitarios (Vitest) y E2E (Playwright)
- **Accesibilidad**: Panel de preferencias de accesibilidad completo

## 🏗️ **Estructura del Proyecto**

```
mariana-portfolio/
├── frontend/                 # Aplicación React
├── backend/                  # API Spring Boot
├── tests/                    # Tests E2E con Playwright
├── docs/                     # Documentación del proyecto
├── LICENSE                   # Licencia MIT
└── README.md                 # Este archivo
```

## 🛠️ **Tecnologías Utilizadas**

### **Frontend:**
- **React 18** - Biblioteca de UI
- **Vite** - Herramienta de build
- **React Router** - Enrutamiento
- **CSS Modules** - Estilos encapsulados
- **Vitest** - Testing unitario
- **Playwright** - Testing E2E

### **Backend:**
- **Java 21** - Lenguaje de programación
- **Spring Boot 3.x** - Framework
- **Spring Mail** - Envío de emails
- **Maven** - Gestión de dependencias
- **SLF4J + Logback** - Logging estructurado

### **DevOps & Testing:**
- **Playwright** - Testing E2E
- **Vitest** - Testing unitario frontend
- **ESLint** - Linting de código
- **Git** - Control de versiones

## 🚀 **Instalación y Ejecución**

### **Prerrequisitos:**
- Node.js 18+ 
- Java 21+
- Maven 3.6+

### **1. Clonar el repositorio:**
```bash
git clone <repository-url>
cd mariana-portfolio
```

### **2. Configurar variables de entorno:**
```bash
# Backend
cp backend/.env.example backend/.env
# Editar backend/.env con tus credenciales

# Frontend  
cp frontend/.env.example frontend/.env
# Editar frontend/.env con la URL del backend
```

### **3. Instalar dependencias:**
```bash
# Instalar dependencias del proyecto
npm install

# Instalar dependencias del frontend
cd frontend && npm install

# Instalar dependencias del backend (Maven)
cd backend && mvn clean install
```

### **4. Ejecutar la aplicación:**

**Backend (Puerto 8081):**
```bash
cd backend
source load-env.sh
mvn spring-boot:run
```

**Frontend (Puerto 5173):**
```bash
cd frontend
npm run dev
```

**Tests E2E:**
```bash
npm run test:e2e
```

## 📁 **Estructura Detallada**

### **Frontend (`/frontend`):**
```
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas de la aplicación
├── styles/             # Estilos CSS y CSS Modules
├── config/             # Configuración de la app
├── test/               # Tests unitarios
├── App.jsx             # Componente principal
└── main.jsx            # Punto de entrada
```

### **Backend (`/backend`):**
```
src/main/java/com/mariana/portfolio/
├── controller/         # Controladores REST
├── dto/               # Data Transfer Objects
├── service/           # Servicios de negocio
├── config/            # Configuración Spring
└── PortfolioApplication.java
```

## 🧪 **Testing**

### **Tests Unitarios Frontend:**
```bash
cd frontend
npm run test           # Ejecutar tests
npm run test:ui        # Interfaz visual
npm run test:coverage  # Con cobertura
```

### **Tests E2E:**
```bash
npm run test:e2e       # Ejecutar tests E2E
npm run test:e2e:ui    # Interfaz visual
```

## 🔧 **Configuración**

### **Variables de Entorno Backend:**
```env
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

### **Variables de Entorno Frontend:**
```env
VITE_API_BASE=http://localhost:8081/api
VITE_APP_NAME=Portfolio Mariana Marín
VITE_APP_VERSION=1.0.0
```

## 🔒 **Seguridad**

### **Medidas Implementadas:**
- **Rate Limiting**: 5 requests por minuto por IP
- **Sanitización XSS**: Protección contra scripts maliciosos
- **Validación robusta**: Frontend y backend con límites de longitud
- **Cabeceras de seguridad**: CSP, X-Frame-Options, HSTS
- **Protección anti-spam**: Honeypot + captcha simple
- **Logging de seguridad**: Monitoreo de intentos maliciosos

### **Configuración de Gmail:**
1. Habilitar 2FA en tu cuenta Gmail
2. Generar App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Usar el App Password en `MAIL_PASSWORD`

**Ver documentación completa de seguridad en `docs/SECURITY_IMPLEMENTATION.md`**

## 🎨 **Características Destacadas**

### **Accesibilidad:**
- Panel de preferencias completo
- Soporte para lectores de pantalla
- Navegación por teclado
- Modos de alto contraste
- Ajustes de tipografía

### **Responsive Design:**
- Diseño adaptativo
- Grid system flexible
- Componentes móvil-first

### **Performance:**
- CSS Modules para estilos optimizados
- Lazy loading de componentes
- Build optimizado con Vite

## 📚 **Documentación**

La documentación completa del proyecto se encuentra en la carpeta `docs/`:

- `STRUCTURE_IMPLEMENTATION.md` - Implementación de estructura
- `STRUCTURE_OPTIMIZATION.md` - Optimización realizada
- `CSS_MODULES_COMPLETE.md` - Implementación CSS Modules
- `CLEANUP_SUMMARY.md` - Resumen de limpieza

## 🤝 **Contribución**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👩‍💻 **Autor**

**Mariana Marín** - Full-Stack Developer
- Email: infomarianamarin@gmail.com
- GitHub: [@marianamarinflor622](https://github.com/marianamarinflor622)

## 🙏 **Agradecimientos**

- React Team por la excelente biblioteca
- Spring Team por el framework robusto
- Vite Team por la herramienta de build rápida
- Playwright Team por las herramientas de testing

---

**¡Gracias por visitar mi portfolio!** 🚀✨
