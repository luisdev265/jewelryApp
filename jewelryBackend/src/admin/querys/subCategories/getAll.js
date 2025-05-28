import pool from "../../../database/pool.js";
import { error } from "../../../utils/throwError.js";

const getAllQuery = async () => {
  try {
    const query = "SELECT * FROM sub_categories";
    const [rows] = await pool.query(query);

    if (rows.length === 0) {
      return error("No subCategories found.");
    }

    return rows;
  } catch (error) {
    console.error("Error retrieving categories:", error.message);
    throw error;
  }
};

export default getAllQuery;