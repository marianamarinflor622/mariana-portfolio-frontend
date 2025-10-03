# Usar imagen base con Java 21 y Maven
FROM openjdk:21-jdk-slim

# Instalar Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Crear directorio de trabajo
WORKDIR /app

# Copiar todo el proyecto
COPY . .

# Cambiar al directorio del backend
WORKDIR /app/mariana-portfolio/backend

# Compilar la aplicación
RUN mvn clean package -DskipTests

# Exponer puerto
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "target/portfolio-0.0.1-SNAPSHOT.jar"]
