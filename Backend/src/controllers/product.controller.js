import { getAllProducts ,getProductBySlug} from "../services/product.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// Controller to get a product by its slug
export const getProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await getProductBySlug(slug);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};