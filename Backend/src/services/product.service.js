import pool from "../config/db.js";

export const getAllProducts = async () => {
  const result = await pool.query(`
    SELECT
      id,
      name,
      slug,
      description,
      brand,
      rating,
      sold_count,
      seller_name,
      shipping_info
    FROM products
    ORDER BY id;
  `);

  return result.rows;
};


export const getProductBySlug = async (slug) => {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      slug,
      description,
      brand,
      rating,
      sold_count,
      seller_name,
      shipping_info
    FROM products
    WHERE slug = $1;
    `,
    [slug]
  );

  return result.rows[0];
};