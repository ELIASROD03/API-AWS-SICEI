# Imagen base ligera
FROM node:18-alpine

# Carpeta dentro del contenedor
WORKDIR /app

# Copiar dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código
COPY . .

# Exponer puerto (tu app usa 8080)
EXPOSE 8080

# Ejecutar app
CMD ["npm", "start"]