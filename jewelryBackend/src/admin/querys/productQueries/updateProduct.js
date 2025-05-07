import pool from "../../../database/pool.js";
import { error } from "../../../utils/throwError.js";

const updateProduct = async (productData, productId) => {
  try {
    const { name, price, description, stock, category, subcategory } =
      productData;

    const campos = [];
    const values = [];

    if (name) {
      campos.push("name = ?");
      values.push(name);
    }

    if (price) {
      campos.push("price = ?");
      values.push(price);
    }

    if (description) {
      campos.push("description = ?");
      values.push(description);
    }

    if (stock) {
      campos.push("stock_quantity = ?");
      values.push(stock);
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

const deleteUrlPorduct = async (productId) => {
  try {
    const query = `DELETE FROM product_images WHERE product_id = ?`;
    const values = [productId];

    const [result] = await pool.query(query, values);

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

const updateAll = async (productData, product_id, imageValues) => {
  const conn = await pool.getConnection();
  try {

    await conn.beginTransaction();

    const product = await updateProduct(productData, product_id);

    const deleteUrlsResponse = await deleteUrlPorduct(product_id);

    const insertNewUrlsResponse = await insertUrlsProduct(imageValues);

    await conn.commit();

    return { product, insertNewUrlsResponse, deleteUrlsResponse };
  } catch (err) {
    await conn.rollback();
    console.error(err.message);
    throw err;
  } finally {
    conn.release();
  }
}

export default updateAll;