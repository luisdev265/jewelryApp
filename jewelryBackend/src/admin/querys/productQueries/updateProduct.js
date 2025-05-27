import pool from "../../../database/pool.js";
import { error } from "../../../utils/throwError.js";

const updateProduct = async (productData, productId) => {
  try {
    const {
      productName,
      productPrice,
      productDescription,
      productStock,
      category,
      subcategory,
    } = productData;

    const campos = [];
    const values = [];

    if (productName) {
      campos.push("name = ?");
      values.push(productName);
    }

    if (productPrice) {
      campos.push("price = ?");
      values.push(productPrice);
    }

    if (productDescription) {
      campos.push("description = ?");
      values.push(productDescription);
    }

    if (productStock) {
      campos.push("stock_quantity = ?");
      values.push(productStock);
    }

    if (category) {
      campos.push("category_id = ?");
      values.push(category);
    }

    if (subcategory) {
      campos.push("sub_category_id = ?");
      values.push(subcategory);
    }

    values.push(productId);
    const query = `UPDATE products SET ${campos.join(", ")} WHERE id = ?`;

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) return error("Product Not Found");

    return { productData };
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const deleteUrlPorduct = async (image, productId) => {
  try {
    console.log(image);
    console.log(productId);
    const query = `DELETE FROM product_images WHERE img_url LIKE ? && product_id =?`;
    const values = [`%${image}%`, productId];

    const [result] = await pool.query(query, values);
    console.log(result);

    if (result.affectedRows === 0) return error("Product Not Found");

    const response = { message: "Urls Deleted Succssesfully" };

    return response;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const insertUrlsProduct = async (imageValues) => {
  try {
    if (imageValues.length === 0) {
      return { message: "No hay imágenes para insertar." };
    }

    const query = `INSERT INTO product_images (product_id, img_url) VALUES ?`;
    const [result] = await pool.query(query, [imageValues]);

    if (result.affectedRows === 0) {
      throw new Error("No se insertaron imágenes.");
    }

    return { message: "URLs insertadas correctamente." };
  } catch (err) {
    console.error("Error al insertar imágenes:", err.message);
    throw err;
  }
};

const updateAll = async (productData, product_id, imageValues, images) => {
  const conn = await pool.getConnection();
  let response = {};

  try {
    await conn.beginTransaction();

    if (productData && Object.keys(productData).length > 0) {
      const product = await updateProduct(productData, product_id);
      response.product = product;
    }

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    console.error("Transacción fallida:", err.message);
    response.transactionError = err.message;
  } finally {
    conn.release();
  }

  // 👇 Esto corre aunque falle el update
  if (images === "true") {
    try {
      if (imageValues.length > 1) {
        imageValues.forEach(async (image) => {
          const imgSplit = image[1].split(".");
          const deleteUrlsResponse = await deleteUrlPorduct(imgSplit[0], product_id);
          response.deleteUrlsResponse = deleteUrlsResponse;
        });
      }

      if (imageValues.length === 1) {
        const deleteUrlsResponse = await deleteUrlPorduct(imageValues[0][1], product_id);
        response.deleteUrlsResponse = deleteUrlsResponse;
      }

      if (imageValues.length === 0) {
        throw error("No hay imágenes para insertar.");
      }

      const insertNewUrlsResponse = await insertUrlsProduct(imageValues);

      response.insertNewUrlsResponse = insertNewUrlsResponse;
    } catch (imgErr) {
      console.error("Error insertando imágenes:", imgErr.message);
      response.imageInsertError = imgErr.message;
    }
  }

  return response;
};

export default updateAll;
