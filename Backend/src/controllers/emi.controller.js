import { getEmiPlansByVariantId } from "../services/emi.service.js";

export const getVariantEmiPlans = async (req, res) => {
  try {
    const { variantId } = req.params;

    const emiPlans = await getEmiPlansByVariantId(variantId);

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