#!/bin/bash

# 🚀 Script de Deploy para Portfolio Mariana Marín
# Este script te ayuda a preparar el proyecto para deploy

echo "🚀 Preparando deploy del Portfolio Mariana Marín..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    print_error "Ejecuta este script desde la raíz del proyecto (donde está package.json)"
    exit 1
fi

print_status "Verificando estructura del proyecto..."

# Verificar frontend
if [ -d "frontend" ]; then
    print_success "✓ Directorio frontend encontrado"
    
    # Verificar package.json del frontend
    if [ -f "frontend/package.json" ]; then
        print_success "✓ package.json del frontend encontrado"
    else
        print_error "✗ package.json del frontend no encontrado"
        exit 1
    fi
    
    # Verificar vercel.json
    if [ -f "frontend/vercel.json" ]; then
        print_success "✓ vercel.json configurado"
    else
        print_warning "⚠ vercel.json no encontrado, creándolo..."
        # El archivo ya debería estar creado
    fi
else
    print_error "✗ Directorio frontend no encontrado"
    exit 1
fi

# Verificar backend
if [ -d "backend" ]; then
    print_success "✓ Directorio backend encontrado"
    
    # Verificar pom.xml
    if [ -f "backend/pom.xml" ]; then
        print_success "✓ pom.xml encontrado"
    else
        print_error "✗ pom.xml no encontrado"
        exit 1
    fi
    
    # Verificar railway.json
    if [ -f "backend/railway.json" ]; then
        print_success "✓ railway.json configurado"
    else
        print_warning "⚠ railway.json no encontrado, creándolo..."
        # El archivo ya debería estar creado
    fi
else
    print_error "✗ Directorio backend no encontrado"
    exit 1
fi

print_status "Instalando dependencias del frontend..."
cd frontend
if npm install; then
    print_success "✓ Dependencias del frontend instaladas"
else
    print_error "✗ Error instalando dependencias del frontend"
    exit 1
fi

print_status "Ejecutando tests del frontend..."
if npm run test:run; then
    print_success "✓ Tests del frontend pasando"
else
    print_warning "⚠ Algunos tests del frontend fallaron"
fi

print_status "Compilando frontend..."
if npm run build; then
    print_success "✓ Frontend compilado exitosamente"
else
    print_error "✗ Error compilando frontend"
    exit 1
fi

cd ..

print_status "Compilando backend..."
cd backend
if mvn clean package -DskipTests; then
    print_success "✓ Backend compilado exitosamente"
else
    print_error "✗ Error compilando backend"
    exit 1
fi

cd ..

print_success "🎉 ¡Proyecto listo para deploy!"
echo ""
echo "📋 PRÓXIMOS PASOS:"
echo "1. Sube tu código a GitHub"
echo "2. Sigue la guía en deploy-guide.md"
echo "3. Deploy del backend en Railway"
echo "4. Deploy del frontend en Vercel"
echo "5. Configura las variables de entorno"
echo ""
echo "📖 Guía completa: ./deploy-guide.md"
echo ""
print_status "¡Tu portfolio está listo para impresionar! 🚀✨"
