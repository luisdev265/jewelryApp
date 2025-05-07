import pool from "../../../database/pool.js";
import { error } from "../../../utils/throwError.js";

const getProductsQuery = async () => {
  try {
    const query = `SELECT 
            p.id AS product_id,
            p.name AS product_name,
            p.description AS product_description,
            p.price AS product_price,
            p.stock_quantity AS product_stock,
            c.id AS category_id,
            c.name AS category_name,
            s.id AS sub_category_id,
            s.name AS sub_category_name,
            CONCAT(
                '[',
                    GROUP_CONCAT(
                        CONCAT(
                            '{"image_id":', i.id,
                            ',"img_url":"', REPLACE(i.img_url, '"', '\"'),
                            '"}'
                        )
                    ),
                ']'
            ) AS images_json
        FROM product_images i
        LEFT JOIN products p
        ON i.product_id = p.id
        LEFT JOIN sub_categories s
        ON p.sub_category_id = s.id
        LEFT JOIN categories c 
        ON p.category_id = c.id
        GROUP BY
            p.id,
            p.name,
            p.description,
            p.price,
            p.stock_quantity,
            c.id,
            c.name,
            s.id,
            s.name;
    `;

    const [ rows ] = await pool.query(query);

    if (rows.length === 0) return error("Any Product Exist");

    return rows;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export default getProductsQuery;