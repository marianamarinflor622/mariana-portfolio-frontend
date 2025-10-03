# 🚀 GUÍA DE DEPLOY 100% GRATUITO

## 📋 **RESUMEN**
- **Frontend**: Vercel (gratis, ilimitado)
- **Backend**: Railway (gratis con límites generosos)

---

## 🎯 **PASO 1: DEPLOY DEL BACKEND EN RAILWAY**

### 1.1 Crear cuenta en Railway
1. Ve a [railway.app](https://railway.app)
2. Regístrate con GitHub
3. Conecta tu repositorio

### 1.2 Configurar el proyecto
1. Crea un nuevo proyecto
2. Selecciona "Deploy from GitHub repo"
3. Elige tu repositorio: `Mariana-Marin-Web`
4. Selecciona la carpeta: `mariana-portfolio/backend`

### 1.3 Configurar variables de entorno
En Railway, ve a Variables y añade:

```bash
# GitHub API (opcional, para más rate limit)
GITHUB_TOKEN=tu_token_de_github
GITHUB_USERNAME=marianamarinflor622

# Email (opcional, para formulario de contacto)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_app_password
MAIL_RECIPIENT=tu_email@gmail.com

# Puerto (Railway lo asigna automáticamente)
SERVER_PORT=8080

# CORS (se actualizará después del deploy del frontend)
CORS_ORIGINS=https://tu-frontend-url.vercel.app
```

### 1.4 Deploy
1. Railway detectará automáticamente que es un proyecto Maven
2. Compilará y desplegará automáticamente
3. Te dará una URL como: `https://tu-proyecto.railway.app`

---

## 🎯 **PASO 2: DEPLOY DEL FRONTEND EN VERCEL**

### 2.1 Crear cuenta en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Regístrate con GitHub
3. Conecta tu repositorio

### 2.2 Configurar el proyecto
1. Crea un nuevo proyecto
2. Selecciona tu repositorio: `Mariana-Marin-Web`
3. Configura:
   - **Framework Preset**: Vite
   - **Root Directory**: `mariana-portfolio/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.3 Configurar variables de entorno
En Vercel, ve a Settings > Environment Variables y añade:

```bash
# URL del backend (reemplaza con tu URL de Railway)
VITE_API_BASE=https://tu-proyecto.railway.app/api

# Información de la app
VITE_APP_NAME=Portfolio Mariana Marín
VITE_APP_VERSION=1.0.0
```

### 2.4 Deploy
1. Haz clic en "Deploy"
2. Vercel compilará y desplegará automáticamente
3. Te dará una URL como: `https://tu-proyecto.vercel.app`

---

## 🔄 **PASO 3: CONECTAR FRONTEND Y BACKEND**

### 3.1 Actualizar CORS en Railway
1. Ve a tu proyecto en Railway
2. Añade la variable de entorno:
   ```bash
   CORS_ORIGINS=https://tu-proyecto.vercel.app
   ```
3. Reinicia el servicio

### 3.2 Actualizar URL del backend en Vercel
1. Ve a tu proyecto en Vercel
2. Actualiza la variable:
   ```bash
   VITE_API_BASE=https://tu-proyecto.railway.app/api
   ```
3. Haz un nuevo deploy

---

## ✅ **PASO 4: VERIFICAR EL DEPLOY**

### 4.1 Verificar Backend
- Health check: `https://tu-proyecto.railway.app/actuator/health`
- API repos: `https://tu-proyecto.railway.app/api/repos`

### 4.2 Verificar Frontend
- Página principal: `https://tu-proyecto.vercel.app`
- Navegación entre páginas
- Formulario de contacto
- Lista de repositorios

---

## 🎉 **RESULTADO FINAL**

Tendrás tu portfolio completamente desplegado y funcionando:
- **Frontend**: `https://tu-proyecto.vercel.app`
- **Backend**: `https://tu-proyecto.railway.app`

---

## 💰 **COSTOS**

- **Vercel**: 100% GRATIS (ilimitado)
- **Railway**: 100% GRATIS (500 horas/mes, suficiente para uso personal)

---

## 🔧 **COMANDOS ÚTILES**

### Para desarrollo local:
```bash
# Backend
cd mariana-portfolio/backend
mvn spring-boot:run

# Frontend
cd mariana-portfolio/frontend
npm run dev
```

### Para rebuild en producción:
- **Railway**: Se actualiza automáticamente con cada push
- **Vercel**: Se actualiza automáticamente con cada push

---

## 🆘 **SOLUCIÓN DE PROBLEMAS**

### Si el backend no arranca:
1. Verifica las variables de entorno en Railway
2. Revisa los logs en Railway
3. Asegúrate de que el puerto sea 8080

### Si el frontend no conecta con el backend:
1. Verifica la variable `VITE_API_BASE` en Vercel
2. Verifica la variable `CORS_ORIGINS` en Railway
3. Revisa la consola del navegador para errores CORS

### Si hay errores de CORS:
1. Añade tu dominio de Vercel a `CORS_ORIGINS` en Railway
2. Reinicia el servicio en Railway
3. Haz un nuevo deploy en Vercel

---

## 🚀 **¡LISTO!**

Tu portfolio estará completamente desplegado y funcionando en la nube, 100% gratis y con actualizaciones automáticas.
