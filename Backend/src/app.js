import express from "express";
import productRoutes from "./routes/product.routes.js"; 
import variantRoutes from "./routes/variant.routes.js";
import emiRoutes from "./routes/emi.routes.js";

const app = express();

app.use(express.json());

//routes
app.use("/api/products", productRoutes);
app.use("/api", variantRoutes);
app.use("/api", emiRoutes);

//health check run
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FlexPay API is running",
  });
});


export default app;