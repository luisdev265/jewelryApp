// src/routes/productos.js
import express from 'express';
import upload from '../models/createProduct/manageFiles.js';
import createProductController from '../controllers/products/createProduct.js';
import getProductController from '../controllers/products/getProducts.js';
import updateProductController from '../controllers/products/updateProduct.js';
import getProductIdController from '../controllers/products/getProductId.js';
import deleteProductController from '../controllers/products/deleteProduct.js';

const router = express.Router();

// POST /api/productos -> Crea un producto y guarda sus imágenes
router.get('/', getProductController);
router.get('/:id', getProductIdController);
router.post('/', upload.array('imagenes', 5), createProductController);
router.patch('/:id', upload.array('imagenes', 5), updateProductController);
router.delete('/:id', upload.array('imagenes', 5), deleteProductController);

export default router;