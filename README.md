---

# 🛡️ SafeNote - Application de Gestion de Notes Dockerisée

**SafeNote** est une application web Fullstack (MERN) conçue selon le principe du **"Security by Design"**. Cette version a été entièrement **conteneurisée avec Docker** pour garantir un déploiement isolé, reproductible et sécurisé.

## 🚀 Fonctionnalités & Sécurité Docker

* **Architecture Multi-services** : Séparation stricte entre le Frontend (Nginx) et le Backend (Node.js).
* **Isolation Réseau** : Les services communiquent via un réseau virtuel privé nommé `app-net`.
* **Sécurité des Conteneurs** :
* Le processus Node.js s'exécute via un utilisateur **non-root** (`appuser`) pour limiter les privilèges système.
* Utilisation d'images de base **Alpine Linux** pour minimiser la surface d'attaque.


* **Protection Applicative** : Intégration de Helmet, Rate Limiting et sanitisation des entrées pour contrer les failles OWASP (XSS, Injection NoSQL).

## 🛠️ Stack Technique

* **Frontend** : React.js (servi par Nginx).
* **Backend** : Node.js, Express.js.
* **Base de Données** : MongoDB Atlas (Cloud).
* **Conteneurisation** : Docker & Docker Compose.

---

## ⚙️ Installation et Déploiement

### 1. Prérequis

* **Docker Engine** (v24.0+) ou **Docker Desktop**.
* **Docker Compose** (v2.0+).

### 2. Configuration

Le fichier `.env` doit être placé dans le dossier `server/` pour être lu par le conteneur backend :

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
NODE_ENV=

```

*Note : Le serveur écoute sur le port 5000 par défaut.*

### 3. Lancement des Services

À la racine du projet, exécutez la commande suivante :

```bash
docker compose up --build -d

```

### 4. Accès à l'Application

* **Frontend UI** : [http://localhost:3000](http://localhost:3000)
* **Backend API** : [http://localhost:5000](http://localhost:5000)

---

## 🏗️ Schéma de l'Architecture Docker

Voici la représentation visuelle des conteneurs, des réseaux et des flux de données de l'application :

```text
                      STRUCTURE DE L'ARCHITECTURE DOCKER
                      ==================================

       [ UTILISATEUR / NAVIGATEUR ]
                    |
                    | (Accès via http://localhost:3000)
                    v
      +----------------------------+          +----------------------------+
      |      CONTENEUR CLIENT      |          |      CONTENEUR SERVER      |
      |----------------------------|          |----------------------------|
      | Image: nginx:stable-alpine |          | Image: node:20-alpine      |
      | Port: 80 (mappé 3000)      |          | Port: 5000 (mappé 5000)    |
      | Rôle: Frontend React       |          | Rôle: API Express (Node)   |
      +--------------+-------------+          +--------------+-------------+
                     |                                       |
                     |          RÉSEAU DOCKER (app-net)      |
                     +---------------------------------------+
                                       |
                                       | (Requêtes API vers http://server:5000)
                                       v
                             +----------------------------+
                             |     BASE DE DONNÉES        |
                             |----------------------------|
                             | MongoDB Atlas (Cloud)      |
                             | Protocole: mongodb+srv     |
                             +----------------------------+

```

## 🛡️ Choix Techniques Principaux

1. **Multi-stage Build** : Le frontend est compilé puis transféré dans une image Nginx légère, optimisant la sécurité et le poids.
2. **Gestion des Secrets** : Les identifiants MongoDB et clés JWT sont injectés via `env_file`, évitant ainsi de stocker des données sensibles dans les images.
3. **Communication** : L'instance Axios du client est configurée pour pointer dynamiquement vers l'API exposée sur le port 5000.

## 👥 Auteurs

Projet réalisé par **KAKPO Imhotep**.

---