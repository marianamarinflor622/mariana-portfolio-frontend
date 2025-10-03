#!/bin/bash

# Script de build para Railway
echo "🚀 Iniciando build del backend..."

# Verificar que Maven esté disponible
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven no encontrado"
    exit 1
fi

# Verificar que Java esté disponible
if ! command -v java &> /dev/null; then
    echo "❌ Java no encontrado"
    exit 1
fi

echo "✅ Maven y Java encontrados"

# Limpiar y compilar
echo "🔨 Compilando proyecto..."
mvn clean package -DskipTests

if [ $? -eq 0 ]; then
    echo "✅ Build exitoso"
    echo "📦 JAR creado en: target/portfolio-0.0.1-SNAPSHOT.jar"
else
    echo "❌ Error en el build"
    exit 1
fi

echo "🎉 Build completado exitosamente"
