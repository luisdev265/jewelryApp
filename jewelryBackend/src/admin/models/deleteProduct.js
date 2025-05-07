import deleteProductQuery from "../querys/productQueries/deleteProduct.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const deleteProductModel = async (productId, type, imgs) => {
  try {
    if (type === "delete") {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      console.log(__dirname);
      const imagenes = typeof imgs === "string" ? imgs.split(",") : [];

      imagenes.forEach((img) => {
        const imgPath = path.join(__dirname, "createProduct", "uploads", img);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
          console.log(`Eliminada: ${img}`);
        } else {
          console.warn(`No existe: ${imgPath}`);
        }
      });
    }

    const product = await deleteProductQuery(productId);

    return product;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export default deleteProductModel;
