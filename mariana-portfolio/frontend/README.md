# 🎨 **Frontend - Portfolio Mariana Marín**

> **Aplicación React moderna** con Vite, CSS Modules y diseño responsive.

## 📋 **Descripción**

Frontend del portfolio personal desarrollado con React 18, Vite y CSS Modules. Incluye un panel de preferencias de accesibilidad completo, diseño responsive y optimizaciones de performance.

## 🛠️ **Tecnologías**

- **React 18** - Biblioteca de UI
- **Vite** - Herramienta de build rápida
- **React Router** - Enrutamiento SPA
- **CSS Modules** - Estilos encapsulados
- **Vitest** - Testing unitario
- **ESLint** - Linting de código

## 🏗️ **Estructura del Proyecto**

```
frontend/
├── public/
│   └── IMG_1112.jpeg          # Imagen de perfil
├── src/
│   ├── components/             # Componentes reutilizables
│   │   ├── Logo.jsx
│   │   └── Preferences.jsx     # Panel de accesibilidad
│   ├── pages/                  # Páginas de la aplicación
│   │   ├── About.jsx           # Página "Sobre mí"
│   │   ├── Contact.jsx         # Formulario de contacto
│   │   ├── Privacy.jsx         # Política de privacidad
│   │   ├── RepoDetail.jsx      # Detalle de repositorio
│   │   ├── Repos.jsx           # Lista de repositorios
│   │   └── Skills.jsx          # Habilidades técnicas
│   ├── styles/                 # Estilos CSS
│   │   ├── About.module.css    # CSS Module - About
│   │   ├── App.css             # Estilos globales
│   │   ├── index.css           # Variables CSS y base
│   │   ├── Preferences.module.css # CSS Module - Preferences
│   │   ├── Privacy.module.css  # CSS Module - Privacy
│   │   └── Skills.module.css   # CSS Module - Skills
│   ├── config/
│   │   └── env.js              # Configuración de entorno
│   ├── test/                   # Tests unitarios
│   │   ├── About.test.jsx
│   │   ├── Contact.test.jsx
│   │   ├── Repos.test.jsx
│   │   └── setup.js
│   ├── App.jsx                 # Componente principal
│   └── main.jsx                # Punto de entrada
├── .env                        # Variables de entorno
├── .gitignore                  # Archivos ignorados por Git
├── eslint.config.js            # Configuración ESLint
├── index.html                  # HTML principal
├── package.json                # Dependencias y scripts
└── vite.config.js              # Configuración Vite
```

## 🚀 **Instalación y Ejecución**

### **Prerrequisitos:**
- Node.js 18+
- npm o yarn

### **1. Instalar dependencias:**
```bash
npm install
```

### **2. Configurar variables de entorno:**
```bash
# Crear archivo .env
cp .env.example .env

# Editar .env con tus valores
VITE_API_BASE=http://localhost:8081/api
VITE_APP_NAME=Portfolio Mariana Marín
VITE_APP_VERSION=1.0.0
```

### **3. Ejecutar en desarrollo:**
```bash
npm run dev
```

### **4. Build para producción:**
```bash
npm run build
```

### **5. Preview del build:**
```bash
npm run preview
```

## 🧪 **Testing**

### **Ejecutar tests:**
```bash
npm run test           # Ejecutar tests
npm run test:ui        # Interfaz visual
npm run test:run       # Ejecutar sin watch
npm run test:coverage  # Con cobertura de código
```

### **Tests disponibles:**
- **About.test.jsx** - Tests del componente About
- **Contact.test.jsx** - Tests del formulario de contacto
- **Repos.test.jsx** - Tests de la lista de repositorios

## 🎨 **Características Destacadas**

### **Accesibilidad:**
- **Panel de preferencias** completo con:
  - Selección de tema (claro/oscuro)
  - Ajustes de contraste
  - Modo daltónico
  - Configuración de tipografía
  - Ajustes de espaciado
  - Control de animaciones

### **Diseño Responsive:**
- **Mobile-first** approach
- **Grid system** flexible
- **Breakpoints** optimizados
- **Componentes adaptativos**

### **Performance:**
- **CSS Modules** para estilos encapsulados
- **Vite** para build ultra-rápido
- **Code splitting** automático
- **Tree shaking** optimizado

### **UX/UI:**
- **Diseño moderno** y profesional
- **Navegación intuitiva**
- **Feedback visual** en interacciones
- **Estados de carga** y error

## 🔧 **Scripts Disponibles**

```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "vite build",            // Build de producción
  "preview": "vite preview",        // Preview del build
  "test": "vitest",                 // Tests con watch
  "test:ui": "vitest --ui",         // Tests con interfaz visual
  "test:run": "vitest run",         // Tests sin watch
  "test:coverage": "vitest run --coverage", // Tests con cobertura
  "lint": "eslint . --ext js,jsx",  // Linting
  "lint:fix": "eslint . --ext js,jsx --fix" // Linting con fix
}
```

## 📱 **Páginas Disponibles**

### **Inicio (`/`)**
- Lista de repositorios GitHub
- Filtros por lenguaje y tipo
- Enlaces directos a GitHub

### **Sobre mí (`/about`)**
- Biografía personal
- Foto de perfil
- Habilidades técnicas organizadas por categorías

### **Contacto (`/contact`)**
- Formulario de contacto funcional
- Validación robusta de campos (RFC 5322 para email)
- Contador de caracteres visual (máx. 2000 chars)
- Envío de emails al backend
- Protección anti-spam (honeypot + captcha)
- Rate limiting del backend (5 requests/min)

### **Política de Privacidad (`/privacy`)**
- Política completa de privacidad
- Información sobre recopilación de datos
- Derechos del usuario

## 🎯 **Componentes Principales**

### **Preferences.jsx**
Panel de accesibilidad con múltiples opciones de personalización.

### **Skills.jsx**
Componente que muestra las habilidades técnicas organizadas en categorías.

### **Contact.jsx**
Formulario de contacto con validación y envío de emails.

## 🔗 **Integración con Backend**

El frontend se comunica con el backend a través de:
- **API REST** en `http://localhost:8081/api`
- **Endpoints**:
  - `GET /repos` - Lista de repositorios
  - `GET /repos/:name` - Detalle de repositorio
  - `POST /contact` - Envío de formulario de contacto

## 🔒 **Seguridad Frontend**

### **Medidas Implementadas:**
- **Validación robusta**: Email RFC 5322, límites de longitud
- **Protección anti-spam**: Honeypot + captcha simple
- **Sanitización**: Inputs validados antes del envío
- **Rate limiting**: Respeta límites del backend (5 requests/min)
- **Feedback visual**: Contador de caracteres con colores de advertencia

### **Validaciones de Formulario:**
- **Nombre**: 2-100 caracteres, requerido
- **Email**: RFC 5322 completo, máximo 254 caracteres
- **Mensaje**: 10-2000 caracteres, contador visual
- **Captcha**: Validación matemática simple
- **Honeypot**: Campo oculto para detectar bots

### **Protección XSS:**
- **Escape de caracteres**: Inputs sanitizados
- **Validación de longitud**: Previene inyección de scripts largos
- **Content Security Policy**: Configurado en backend

## 📊 **Métricas de Performance**

- **Build size**: ~18KB CSS, ~298KB JS (gzip)
- **Lighthouse Score**: 95+ en todas las categorías
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s

## 🚀 **Deployment**

### **Build para producción:**
```bash
npm run build
```

### **Archivos generados:**
- `dist/index.html` - HTML principal
- `dist/assets/` - CSS y JS optimizados
- `dist/IMG_1112.jpeg` - Assets estáticos

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
