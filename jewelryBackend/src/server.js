import express from "express";
import dotenv from "dotenv";
import productosRouter from './admin/routes/product.js'
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    '/uploads',
    express.static(path.resolve('uploads'))
  );
  
  // Rutas
  app.use('/api/productos', productosRouter);

app.get("/", (_req, res) => {
  res.send("¡Servidor funcionando con Express  🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
