import pool from "../../../database/pool.js";
import { error } from "../../../utils/throwError.js";
import path from "path";

const validateProduct = async (name) => {
  try {
    const query = "SELECT * FROM products WHERE name = ?";
    const values = [name];
    const [rows] = await pool.query(query, values);

    return rows.length > 0;
  } catch (err) {
    console.error(err);
  }
};

const createProduct = async (productData, files) => {
  const conn = await pool.getConnection();
  try {
    const { name, price, description, stock, category, subcategory } =
      productData;

    if (
      !name ||
      !price ||
      !description ||
      !stock ||
      !category ||
      !subcategory
    ) {
      return error("Missing Required Fields");
    }

    const productExist = await validateProduct(name);

    if (productExist) {
      return error("Product Already Exist");
    }

    await conn.beginTransaction();

    // 1) Inserta el producto y obtiene el insertId
    const [result] = await conn.query(
      "INSERT INTO products (name, price, description, stock_quantity, category_id, sub_category_id) VALUES (?, ?, ?, ?, ?, ?)",
      [name, price, description, stock, category, subcategory]
    );
    const productId = result.insertId;

    // 2) Inserta las rutas de las imágenes asociadas
    let imageValues = []
    if (files && files.length) {
      imageValues = files.map((file) => {
        // Arma la ruta pública de la imagen
        const relativePath = path.join("/uploads", `${file.filename}`);
        return [productId, relativePath];
      });

      await conn.query(
        `INSERT INTO product_images (product_id, img_url) VALUES ?`,
        [imageValues]
      );
    }

    await conn.commit();
    return {
      message: "Product Created Successfully",
      productId,
      productData,
      imageValues
    };
  } catch (err) {
    await conn.rollback();
    console.error("Failed Creating New Product", err);
    return error(err);
  } finally {
    conn.release();
  }
};

export default createProduct;
