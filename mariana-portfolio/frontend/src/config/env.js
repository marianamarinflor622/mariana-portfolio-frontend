// Configuración de variables de entorno para el frontend
const config = {
  API_BASE: import.meta.env.VITE_API_BASE || 'http://localhost:8081/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Portfolio Mariana Marín',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0'
}

export default config
