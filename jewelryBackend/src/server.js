import express from "express";
import dotenv from "dotenv";
import productosRouter from './admin/routes/product.js'
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from "url";
import { dirname } from "path";
import categories from './admin/routes/categories.js'
import subCategories from './admin/routes/subCategories.js'

// Para poder usar __dirname en módulos ES (como import/export)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors({
  
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir la carpeta "uploads" como pública
app.use('/images', express.static(path.join(__dirname, 'admin', 'models', 'createProduct', 'uploads')));

app.use(
    '/uploads',
    express.static(path.resolve('uploads'))
  );
  
  // Rutas
  app.use('/api/products', productosRouter);
  app.use('/api/categories', categories);
  app.use('/api/subCategories', subCategories);

app.get("/", (_req, res) => {
  res.send("¡Servidor funcionando con Express  🚀");
});

app.listen(PORT, "0.0.0.0",() => {
  console.log(`Servidor escuchando en http://192.168.1.64:${PORT}`);
});
