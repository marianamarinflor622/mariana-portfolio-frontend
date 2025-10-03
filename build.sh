#!/bin/bash

echo "🚀 Iniciando build del portfolio..."

# Verificar que estamos en el directorio correcto
if [ ! -d "mariana-portfolio/backend" ]; then
    echo "❌ Directorio mariana-portfolio/backend no encontrado"
    exit 1
fi

# Cambiar al directorio del backend
cd mariana-portfolio/backend

# Verificar que pom.xml existe
if [ ! -f "pom.xml" ]; then
    echo "❌ pom.xml no encontrado en mariana-portfolio/backend"
    exit 1
fi

echo "✅ Directorio correcto encontrado"

# Verificar Java
if ! command -v java &> /dev/null; then
    echo "❌ Java no encontrado"
    exit 1
fi

# Verificar Maven
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven no encontrado"
    exit 1
fi

echo "✅ Java y Maven encontrados"

# Compilar
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
