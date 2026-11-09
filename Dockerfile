# Imagen base ligera de Node.js
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar primero los archivos de dependencias (aprovecha la caché de capas)
COPY package*.json ./

# Instalar solo las dependencias de producción
RUN npm install --omit=dev

# Copiar el resto del código de la aplicación
COPY . .

# Puerto en el que escucha la API
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
