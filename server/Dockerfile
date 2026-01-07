FROM node:20-alpine

# Dossier de travail
WORKDIR /app

# Sécurité : Création d'un utilisateur non-privilégié
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Installation des dépendances (optimisation du cache Docker)
COPY package*.json ./
RUN npm install --only=production

# Copie du code source
COPY . .

# Droits sur le dossier pour l'utilisateur
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 5000

CMD ["node", "server.js"]