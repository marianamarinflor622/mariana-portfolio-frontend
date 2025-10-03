# Mariana Marín - Portfolio

Portafolio web profesional y accesible desarrollado con React.js y Spring Boot, diseñado para mostrar repositorios de GitHub de manera organizada.

## 🚀 Características

- **Frontend**: React.js con componentes funcionales y hooks
- **Backend**: Java Spring Boot con API REST
- **Integración**: GitHub API para obtener repositorios automáticamente
- **Diseño**: Estrictamente blanco y negro, totalmente accesible (WCAG 2.1 AA)
- **Responsive**: Diseño adaptable para todos los dispositivos

## ✨ Funcionalidades

- Página principal con información personal
- Sección de repositorios ordenados por relevancia/fecha
- Filtros por tecnología y tipo de proyecto
- Vista detallada de cada repositorio con descripción, tecnologías y enlaces
- Sección de contacto con formulario accesible
- Navegación accesible con teclado y lectores de pantalla

## 🎨 Paleta de Colores

El proyecto utiliza una paleta de colores elegante inspirada en tonos rosas y morados:

- **50**: `#F9F6F8` - Fondo muy claro
- **100**: `#F4EFF2` - Fondo claro
- **200**: `#EBDFE6` - Acento en fondos oscuros
- **300**: `#DCC5D2` - Tono medio claro
- **400**: `#C6A0B5` - Tono medio
- **500**: `#B1839C` - Tono medio oscuro
- **600**: `#A17188` - Tono principal
- **700**: `#835369` - Acento principal
- **800**: `#6D4757` - Tono oscuro
- **900**: `#5D3E4C` - Tono muy oscuro
- **950**: `#36212A` - Tono más oscuro

## 🛠️ Tecnologías

### Frontend
- React 18
- React Router DOM
- Vite
- CSS3 con variables personalizadas
- Accesibilidad WCAG 2.1 AA

### Backend
- Java 21
- Spring Boot 3.3.4
- Spring Web
- Spring Actuator
- Jackson para JSON

## 📋 Prerrequisitos

- Node.js 18+ y npm
- Java 21+
- Maven 3.6+

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/marianamarinflor622/mariana-portfolio.git
cd mariana-portfolio
```

### 2. Configurar el Backend

```bash
cd backend
```

#### Configurar GitHub API (Opcional)
Para obtener repositorios privados o aumentar el límite de rate limit:

```bash
export GITHUB_TOKEN=tu_token_de_github
export GITHUB_USERNAME=marianamarinflor622
```

#### Ejecutar el Backend
```bash
mvn spring-boot:run
```

El backend estará disponible en `http://localhost:8081`

### 3. Configurar el Frontend

```bash
cd frontend
npm install
```

#### Ejecutar el Frontend
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 🔧 Configuración de GitHub API

### Obtener Token de GitHub

1. Ve a GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Genera un nuevo token con los siguientes permisos:
   - `public_repo` (para repositorios públicos)
   - `repo` (para repositorios privados, si es necesario)

### Configurar Variables de Entorno

```bash
# Backend
export GITHUB_TOKEN=ghp_tu_token_aqui
export GITHUB_USERNAME=marianamarinflor622

# Frontend (opcional)
export VITE_API_BASE=http://localhost:8081/api
```

## 📁 Estructura del Proyecto

```
mariana-portfolio/
├── backend/                 # API Spring Boot
│   ├── src/main/java/
│   │   └── com/mariana/portfolio/
│   │       ├── PortfolioApplication.java
│   │       ├── config/WebConfig.java
│   │       └── github/
│   │           ├── GitHubClient.java
│   │           └── GitHubController.java
│   └── src/main/resources/
│       └── application.yml
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🌐 API Endpoints

### Repositorios
- `GET /api/repos` - Obtener todos los repositorios
  - Query params: `language`, `type`, `sort`, `direction`
- `GET /api/repos/{name}` - Obtener repositorio específico

### Ejemplos de Uso
```bash
# Obtener todos los repositorios
curl http://localhost:8081/api/repos

# Filtrar por lenguaje JavaScript
curl "http://localhost:8081/api/repos?language=JavaScript"

# Ordenar por fecha de creación
curl "http://localhost:8081/api/repos?sort=created&direction=desc"
```

## ♿ Accesibilidad

El proyecto cumple con los estándares WCAG 2.1 AA:

- **Contraste**: Mínimo 4.5:1 entre texto y fondo
- **Navegación**: Completamente navegable con teclado
- **ARIA**: Etiquetas ARIA apropiadas en todos los elementos
- **Imágenes**: Texto alternativo para todas las imágenes
- **Estructura**: HTML5 semántico con landmarks apropiados
- **Formularios**: Labels asociados y mensajes de error accesibles

## 🚀 Despliegue

### Backend (Heroku/Railway/DigitalOcean)
```bash
# Crear JAR ejecutable
cd backend
mvn clean package -DskipTests

# El JAR estará en target/portfolio-0.0.1-SNAPSHOT.jar
java -jar target/portfolio-0.0.1-SNAPSHOT.jar
```

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build

# Los archivos estáticos estarán en dist/
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**Mariana Marín**
- GitHub: [@marianamarinflor622](https://github.com/marianamarinflor622)
- LinkedIn: [Mariana Marín](https://www.linkedin.com/in/mariana-marin-1b6268348/)
- Email: marianamarinflor622@gmail.com

---

