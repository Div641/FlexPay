import { getVariantsByProductSlug } from "../services/variant.service.js";

export const getProductVariants = async (req, res) => {
  try {
    const { slug } = req.params;

    const variants = await getVariantsByProductSlug(slug);

    res.status(200).json({
      success: true,
      count: variants.length,
      data: variants,
    });
  } catch (error) {
    console.error("Error fetching variants:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product variants",
    });
  }
};