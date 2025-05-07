import pool from "../../../database/pool.js";
import { error } from "../../../utils/throwError.js";

const deleteProductQuery = async (productId) => {
  try {
    const query = `
      DELETE FROM products
      WHERE id = ?`;
    const values = [productId];
    const [ result ]  = await pool.query(query, values);
    const product = result.affectedRows;

    if (product === 0) return error("Product Not Found");

    const message = "Product deleted successfully";

    return message;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export default deleteProductQuery;