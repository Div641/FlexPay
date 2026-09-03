import express from "express";
import { getProductVariants } from "../controllers/variant.controller.js";

const router = express.Router();

router.get("/products/:slug/variants", getProductVariants);

export default router;