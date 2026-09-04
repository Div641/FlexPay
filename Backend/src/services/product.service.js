import pool from "../config/db.js";

export const getAllProducts = async () => {
  const result = await pool.query(`
    SELECT
  p.id,
  p.name,
  p.slug,
  p.description,
  p.brand,
  p.rating,
  p.sold_count,
  p.seller_name,
  p.shipping_info,
  MIN(v.price) AS starting_price,
  MIN(v.image_urls->>0) AS image_url
FROM products p
LEFT JOIN product_variants v
  ON p.id = v.product_id
  AND v.is_available = TRUE
GROUP BY
  p.id,
  p.name,
  p.slug,
  p.description,
  p.brand,
  p.rating,
  p.sold_count,
  p.seller_name,
  p.shipping_info
ORDER BY p.id;
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