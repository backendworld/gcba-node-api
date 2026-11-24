import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRoutes from './src/routes/products.routes.js';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/products', productsRoutes);
app.use('/auth', authRoutes);

// Middleware para manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso no encontrado / Ruta no definida' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});