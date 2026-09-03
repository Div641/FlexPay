import pool from "../config/db.js";

export const getEmiPlansByVariantId = async (variantId) => {
  const result = await pool.query(
    `
    SELECT
      id,
      variant_id,
      tenure_months,
      monthly_payment,
      interest_rate,
      cashback_amount,
      upfront_payment,
      emi_start_date,
      backing_type,
      is_available
    FROM emi_plans
    WHERE variant_id = $1
      AND is_available = TRUE
    ORDER BY tenure_months;
    `,
    [variantId]
  );

  return result.rows;
};