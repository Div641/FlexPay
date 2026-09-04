import { getEmiPlansByVariantId } from "../services/emi.service.js";

export const getVariantEmiPlans = async (req, res) => {
  try {
    const variantId = Number(req.params.variantId);

    // Validate variant ID before querying the database
    if (!Number.isInteger(variantId) || variantId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid variant ID",
      });
    }

    const emiPlans = await getEmiPlansByVariantId(variantId);

    // Variant does not exist
    if (emiPlans === null) {
      return res.status(404).json({
        success: false,
        message: "Variant not found",
      });
    }

    res.status(200).json({
      success: true,
      count: emiPlans.length,
      data: emiPlans,
    });
  } catch (error) {
    console.error("Error fetching EMI plans:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch EMI plans",
    });
  }
};