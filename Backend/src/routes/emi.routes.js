import express from "express";
import { getVariantEmiPlans } from "../controllers/emi.controller.js";

const router = express.Router();

router.get("/variants/:variantId/emi-plans", getVariantEmiPlans);

export default router;