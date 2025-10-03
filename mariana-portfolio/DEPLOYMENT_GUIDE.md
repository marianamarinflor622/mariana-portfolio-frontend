# 🚀 **GUÍA DE DEPLOYMENT - PORTFOLIO MARIANA MARÍN**

## ✅ **ESTADO: LISTO PARA DEPLOYMENT**

**Fecha**: 3 de octubre de 2025  
**Versión**: 1.0.0  
**Estado**: 🟢 **COMPLETAMENTE FUNCIONAL**

---

## 📋 **CHECKLIST PRE-DEPLOYMENT**

### **✅ Backend Verificado:**
- [x] Compilación sin errores
- [x] Health check funcionando
- [x] API endpoints operativos
- [x] Rate limiting activo
- [x] Seguridad implementada
- [x] Logging configurado

### **✅ Frontend Verificado:**
- [x] Build de producción exitoso
- [x] Tests pasando (22/22)
- [x] Linting sin errores
- [x] CSS Modules funcionando
- [x] Responsive design
- [x] Accesibilidad implementada

### **✅ Conectividad Verificada:**
- [x] CORS configurado
- [x] API calls funcionando
- [x] Error handling implementado
- [x] Rate limiting respetado

---

## 🌐 **OPCIONES DE DEPLOYMENT**

### **🎨 FRONTEND (Recomendado: Vercel)**

#### **Opción 1: Vercel (Recomendado)**
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Desde el directorio frontend
cd frontend
vercel

# 3. Configurar variables de entorno
# VITE_API_BASE=https://tu-backend-url.com/api
```

#### **Opción 2: Netlify**
```bash
# 1. Build del frontend
cd frontend
npm run build

# 2. Subir carpeta dist/ a Netlify
# 3. Configurar redirects para SPA
```

#### **Opción 3: GitHub Pages**
```bash
# 1. Configurar en vite.config.js
# 2. Build y push a gh-pages branch
```

### **🔧 BACKEND (Recomendado: Railway/Heroku)**

#### **Opción 1: Railway (Recomendado)**
```bash
# 1. Conectar repositorio GitHub
# 2. Configurar variables de entorno
# 3. Deploy automático
```

#### **Opción 2: Heroku**
```bash
# 1. Crear app en Heroku
# 2. Conectar repositorio
# 3. Configurar variables de entorno
# 4. Deploy
```

#### **Opción 3: DigitalOcean App Platform**
```bash
# 1. Crear app desde GitHub
# 2. Configurar build settings
# 3. Configurar variables de entorno
```

---

## 🔐 **VARIABLES DE ENTORNO REQUERIDAS**

### **Backend (.env)**
```env
# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=infomarianamarin@gmail.com
MAIL_PASSWORD=tu_app_password_aqui
MAIL_RECIPIENT=infomarianamarin@gmail.com

# GitHub API (opcional)
GITHUB_USERNAME=marianamarinflor622
GITHUB_TOKEN=tu_token_aqui

# Server Configuration
SERVER_PORT=8080
```

### **Frontend (.env)**
```env
# API Configuration
VITE_API_BASE=https://tu-backend-url.com/api
```

---

## 📝 **INSTRUCCIONES PASO A PASO**

### **🚀 DEPLOYMENT COMPLETO**

#### **Paso 1: Preparar Backend**
```bash
# 1. Crear archivo .env en backend/
# 2. Configurar variables de email
# 3. Generar App Password de Gmail
# 4. Subir a GitHub
```

#### **Paso 2: Deploy Backend**
```bash
# 1. Conectar a Railway/Heroku
# 2. Configurar variables de entorno
# 3. Deploy automático
# 4. Verificar health check
```

#### **Paso 3: Preparar Frontend**
```bash
# 1. Actualizar VITE_API_BASE con URL del backend
# 2. Build de producción
# 3. Verificar funcionamiento
```

#### **Paso 4: Deploy Frontend**
```bash
# 1. Conectar a Vercel/Netlify
# 2. Configurar variables de entorno
# 3. Deploy automático
# 4. Verificar funcionamiento
```

#### **Paso 5: Configurar Dominio**
```bash
# 1. Comprar dominio (opcional)
# 2. Configurar DNS
# 3. Configurar SSL
# 4. Actualizar CORS en backend
```

---

## 🔧 **CONFIGURACIÓN POST-DEPLOYMENT**

### **Backend - Actualizar CORS**
```java
// En SecurityConfig.java
configuration.setAllowedOriginPatterns(List.of(
    "https://tu-dominio.com",
    "https://*.vercel.app",
    "https://*.netlify.app"
));
```

### **Frontend - Actualizar API URL**
```javascript
// En config/env.js
export default {
  API_BASE: 'https://tu-backend-url.com/api'
}
```

---

## 🛡️ **CONFIGURACIÓN DE SEGURIDAD**

### **Gmail App Password**
1. Ir a [Google Account Settings](https://myaccount.google.com/)
2. Seguridad → Verificación en 2 pasos
3. Contraseñas de aplicaciones
4. Generar para "Mail"
5. Usar en `MAIL_PASSWORD`

### **Variables Sensibles**
- ✅ Nunca commitear `.env` files
- ✅ Usar variables de entorno del hosting
- ✅ Rotar passwords regularmente
- ✅ Monitorear logs de acceso

---

## 📊 **MONITOREO POST-DEPLOYMENT**

### **Métricas a Monitorear**
- **Uptime**: Disponibilidad del servicio
- **Response Time**: Tiempo de respuesta API
- **Error Rate**: Tasa de errores
- **Rate Limiting**: Intentos bloqueados
- **Email Delivery**: Envío de emails

### **Logs Importantes**
- **Backend**: Rate limiting, errores de validación
- **Frontend**: Errores de API, errores de build
- **Email**: Fallos de envío, autenticación

---

## 🚨 **TROUBLESHOOTING COMÚN**

### **Problema: CORS Error**
```bash
# Solución: Actualizar CORS en backend
# Agregar dominio del frontend a allowedOrigins
```

### **Problema: Email no se envía**
```bash
# Solución: Verificar App Password de Gmail
# Verificar variables de entorno
# Revisar logs del backend
```

### **Problema: Frontend no carga**
```bash
# Solución: Verificar build
# Verificar variables de entorno
# Verificar conectividad con backend
```

---

## ✅ **CHECKLIST POST-DEPLOYMENT**

### **Funcionalidad**
- [ ] Frontend carga correctamente
- [ ] Backend responde health check
- [ ] API endpoints funcionan
- [ ] Formulario de contacto envía emails
- [ ] Rate limiting funciona
- [ ] CORS configurado correctamente

### **Seguridad**
- [ ] Variables de entorno configuradas
- [ ] SSL/HTTPS habilitado
- [ ] Headers de seguridad activos
- [ ] Rate limiting funcionando
- [ ] Logs de seguridad activos

### **Performance**
- [ ] Tiempo de carga < 3 segundos
- [ ] API response < 500ms
- [ ] Build optimizado
- [ ] CDN configurado (si aplica)

---

## 🎯 **URLs DE PRODUCCIÓN**

### **Frontend**
- **URL**: `https://tu-dominio.com`
- **Admin**: Panel de Vercel/Netlify

### **Backend**
- **URL**: `https://tu-backend-url.com`
- **Health**: `https://tu-backend-url.com/actuator/health`
- **API**: `https://tu-backend-url.com/api`

---

## 🎉 **¡DEPLOYMENT COMPLETO!**

**El portfolio de Mariana está listo para impresionar al mundo! 🚀✨**

### **Características Destacadas:**
- ✅ **Responsive Design** - Funciona en todos los dispositivos
- ✅ **Accesibilidad** - Panel de preferencias completo
- ✅ **Seguridad Robusta** - Rate limiting, sanitización, headers
- ✅ **Performance Optimizada** - Build minificado, carga rápida
- ✅ **Email Funcional** - Formulario de contacto operativo
- ✅ **Código Limpio** - Sin errores, bien documentado

**¡A desplegar! 🚀**
