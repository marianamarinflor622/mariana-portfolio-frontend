# Mariana Portfolio - Frontend

Frontend del portfolio de Mariana Marín, desarrollado con React y Vite.

## 🚀 Tecnologías

- **React 19.1.1**
- **Vite 7.1.7**
- **React Router DOM 7.9.3**
- **CSS Modules**
- **DOMPurify** (Sanitización)
- **Vitest** (Testing)
- **Playwright** (E2E Testing)

## 📋 Características

- ✅ **SPA** (Single Page Application) con React Router
- ✅ **Responsive Design** con CSS Modules
- ✅ **Accesibilidad** WCAG 2.1 AA
- ✅ **Formulario de contacto** con validación
- ✅ **Lista de repositorios** con filtros
- ✅ **Validación de seguridad** en inputs
- ✅ **Honeypot y Captcha** anti-bots
- ✅ **Hot Reload** en desarrollo

## 🛠️ Instalación y Ejecución

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Configuración
1. Crear archivo `.env` en la raíz del proyecto:
```env
# Configuración para desarrollo local
VITE_API_BASE=http://localhost:8080/api
VITE_APP_NAME=Portfolio Mariana Marín
VITE_APP_VERSION=1.0.0
```

### Instalación
```bash
# Instalar dependencias
npm install
```

### Desarrollo
```bash
# Servidor de desarrollo
npm run dev

# Abrir en navegador
# http://localhost:5173
```

## 📱 Páginas

### Inicio (`/`)
- Lista de repositorios de GitHub
- Filtros por lenguaje y tipo
- Ordenamiento por fecha/alfabético

### Sobre mí (`/about`)
- Información personal
- Habilidades técnicas organizadas por categorías
- Imagen de perfil

### Contacto (`/contact`)
- Formulario de contacto con validación
- Enlaces a redes sociales
- Protección anti-bots (honeypot + captcha)

### Privacidad (`/privacy`)
- Política de privacidad
- Información sobre el uso de datos

## 🧪 Testing

### Tests Unitarios (Vitest)
```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run test:ui

# Tests con cobertura
npm run test:coverage
```

### Tests E2E (Playwright)
```bash
# Ejecutar tests E2E
npx playwright test

# Ver reporte
npx playwright show-report
```

## 📦 Build para Producción

```bash
# Build de producción
npm run build

# Preview del build
npm run preview
```

## 🎨 Estilos

El proyecto usa **CSS Modules** para estilos encapsulados:

- `App.css` - Estilos globales
- `index.css` - Reset y variables CSS
- `About.module.css` - Estilos del componente About
- `Skills.module.css` - Estilos del componente Skills
- `Preferences.module.css` - Estilos del componente Preferences
- `Privacy.module.css` - Estilos de la página de privacidad

## 🔒 Seguridad

- **DOMPurify**: Sanitización de inputs
- **Validación de seguridad**: Detección de XSS y SQL injection
- **Honeypot**: Campo oculto para detectar bots
- **Captcha simple**: Verificación matemática básica
- **Validación de longitud**: Límites en campos de texto

## 🌐 Configuración de API

El frontend se conecta al backend a través de:

```javascript
// Configuración en src/config/env.js
const config = {
  API_BASE: import.meta.env.VITE_API_BASE || 'http://localhost:8080/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Portfolio Mariana Marín',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0'
}
```

## 📝 Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `VITE_API_BASE` | URL base del backend | http://localhost:8080/api |
| `VITE_APP_NAME` | Nombre de la aplicación | Portfolio Mariana Marín |
| `VITE_APP_VERSION` | Versión de la aplicación | 1.0.0 |

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Netlify
```bash
# Build
npm run build

# Subir carpeta dist/ a Netlify
```

### GitHub Pages
```bash
# Build
npm run build

# Configurar GitHub Actions para deploy automático
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Logo.jsx
│   └── Preferences.jsx
├── pages/              # Páginas principales
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Privacy.jsx
│   ├── RepoDetail.jsx
│   ├── Repos.jsx
│   └── Skills.jsx
├── styles/             # Estilos CSS Modules
├── test/               # Tests unitarios
├── utils/              # Utilidades
│   └── security.js
├── config/             # Configuración
│   └── env.js
├── App.jsx             # Componente principal
└── main.jsx            # Punto de entrada
```

## 🧪 Cobertura de Tests

- **22 tests unitarios** con Vitest
- **1 test E2E** con Playwright
- **Cobertura**: Componentes, formularios, navegación
- **Mocks**: API calls, fetch requests

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👩‍💻 Autor

**Mariana Marín**
- GitHub: [@marianamarinflor622](https://github.com/marianamarinflor622)
- LinkedIn: [Mariana Marín](https://www.linkedin.com/in/mariana-marin-1b6268348/)
- Email: infomarianamarin@gmail.com