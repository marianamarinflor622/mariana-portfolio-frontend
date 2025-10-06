#!/bin/bash
# Script para cargar variables de entorno desde .env

if [ -f ".env" ]; then
    echo "Cargando variables de entorno desde .env..."
    export $(cat .env | grep -v '^#' | xargs)
    echo "Variables cargadas correctamente"
else
    echo "Archivo .env no encontrado"
    echo "Crea el archivo .env con tus variables de entorno"
    exit 1
fi
