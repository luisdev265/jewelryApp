import { error } from "../../utils/throwError.js";
import updateAll from "../querys/productQueries/updateProduct.js";
import path from 'path'

const updateProductModel = async (productData, productId, files) => {
  try {
    const { name,
        price,
        description,
        stock,
        category,
        subcategory 
    } = productData;

    if (!name || !price || !description || !stock || !category || !subcategory || !productId)
      return error("All Fields Are Required");

    // 2) Inserta las rutas de las imágenes asociadas
    let imageValues = [];
    if (files && files.length) {
      imageValues = files.map((file) => {
        // Arma la ruta pública de la imagen
        const relativePath = path.join("/uploads", `${file.filename}`);
        return [productId, relativePath];
      });
    }

    const resposnes = await updateAll(productData, productId, imageValues );


    return resposnes;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export default updateProductModel;