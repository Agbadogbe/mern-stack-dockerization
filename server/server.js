import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Routes
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/notes.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

// --- SÉCURITÉ (Adaptée au HTTP) ---
app.use(helmet());

// --- CORS (Mise à jour pour HTTP sur le port 3000) ---
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

// --- RATE LIMITING ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Trop de requêtes, veuillez réessayer plus tard.'
});
app.use(limiter);

app.use(express.json());

// Connexion MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connecté (Atlas)'))
  .catch(err => console.log('❌ Erreur MongoDB:', err));

// Route de base
app.get('/', (req, res) => {
  res.send('🛡️ API SafeNote est en ligne (Mode HTTP) !');
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

// Utilisation de app.listen au lieu de https.createServer
app.listen(PORT, () => {
  console.log(`🚀 Serveur HTTP lancé sur le port ${PORT}`);
});