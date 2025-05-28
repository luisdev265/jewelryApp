import pool from "../../../database/pool.js";
import { error } from "../../../utils/throwError.js";

const selectAllQuery = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories");

    if (rows.length === 0) {
      return error("No categories found.");
    }

    return rows;
  } catch (error) {
    console.error("Error selecting all products:", error);
    throw error;
  }
};

export default selectAllQuery;