# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serveur de production
FROM nginx:stable-alpine
# Copie du build React vers Nginx
COPY --from=build /app/build /usr/share/nginx/html
# Note: Pour le HTTPS sur le front, il faudrait ajouter les certificats à Nginx ici
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]