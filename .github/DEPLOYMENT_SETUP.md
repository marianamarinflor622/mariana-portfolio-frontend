# Configuración de Deployment con GitHub Actions

## 🚀 Configuración de Railway

### 1. Obtener Railway Token
1. Ve a [Railway](https://railway.app)
2. Ve a tu perfil → Settings → Tokens
3. Crea un nuevo token
4. Copia el token

### 2. Obtener Service ID
1. En Railway, ve a tu proyecto
2. Ve a Settings → General
3. Copia el "Service ID"

### 3. Configurar Secrets en GitHub
1. Ve a tu repositorio en GitHub
2. Ve a Settings → Secrets and variables → Actions
3. Agrega estos secrets:
   - `RAILWAY_TOKEN`: Tu token de Railway
   - `RAILWAY_SERVICE_ID`: El ID de tu servicio

## 🔧 Configuración de Variables de Entorno en Railway

En Railway, ve a tu servicio → Variables y agrega:

```
PORT=8080
SPRING_PROFILES_ACTIVE=production
CORS_ORIGINS=http://localhost:5173,https://*.vercel.app
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=infomarianamarin@gmail.com
MAIL_PASSWORD=gixg mnvm milq cgee
MAIL_RECIPIENT=infomarianamarin@gmail.com
GITHUB_USERNAME=marianamarinflor622
GITHUB_TOKEN=
```

## ✅ Ventajas de usar GitHub Actions

1. **Build controlado**: Usamos Java 21 y Maven exactamente como necesitamos
2. **Cache de dependencias**: Maven dependencies se cachean para builds más rápidos
3. **Deploy automático**: Cada push a main hace deploy automático
4. **Logs detallados**: Puedes ver exactamente qué está pasando en cada paso
5. **Rollback fácil**: Si algo falla, puedes revertir el commit

## 🎯 Próximos pasos

1. Configura los secrets en GitHub
2. Haz push de este workflow
3. El deploy se ejecutará automáticamente
4. Verifica que funcione en Railway
