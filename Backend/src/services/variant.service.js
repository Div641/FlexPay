import pool from "../config/db.js";

export const getVariantsByProductSlug = async (slug) => {
  const result = await pool.query(
    `
    SELECT
      v.id,
      v.product_id,
      v.ram,
      v.storage,
      v.color,
      v.finish,
      v.mrp,
      v.price,
      v.image_urls,
      v.is_available
    FROM product_variants v
    JOIN products p
      ON p.id = v.product_id
    WHERE p.slug = $1
      AND v.is_available = TRUE
    ORDER BY v.id;
    `,
    [slug]
  );

  return result.rows;
};