import { error } from "../../utils/throwError.js";
import updateAll from "../querys/productQueries/updateProduct.js";
import path from "path";

const updateProductModel = async (productData, productId, files, images) => {
  try {
    const {
      productName,
      productPrice,
      productDescription,
      productStock,
      category,
      subcategory,
    } = productData;

    if (!productId) {
      return error("Product ID is required.");
    }

    if (
      !productName &&
      !productPrice &&
      !productDescription &&
      !productStock &&
      !category &&
      !subcategory &&
      images !== "true"
    ) {
      return error("No fields provided to update.");
    }

    if (images !== "true" && !productData) {
      return error("Images Are Required");
    }

    // Take Number string with symbol $ and convert to float
    if (productPrice) {     
      const newPrice = productPrice.split(" ");
      const priceNumber = parseFloat(newPrice[1]);
      productData.productPrice = priceNumber;
      console.log(priceNumber);
    }

    //category and subcategory parse to number
    productData.category = parseInt(category);
    productData.subcategory = parseInt(subcategory);

    // 2) Inserta las rutas de las imágenes asociadas
    let imageValues = [];

    if (images === "true") {
      if (files && files.length) {
        imageValues = files.map((file) => {
          console.log(file.filename);
          // Arma la ruta pública de la imagen
          const relativePath = path.join(file.filename);
          return [productId, relativePath];
        });
      }
    }

    const resposnes = await updateAll(
      productData,
      productId,
      imageValues,
      images
    );
    console.log(resposnes);

    return resposnes;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export default updateProductModel;
