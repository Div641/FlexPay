const API_BASE_URL = "http://localhost:5000/api";

export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const getProduct = async (slug) => {
  const response = await fetch(
    `${API_BASE_URL}/products/${slug}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};

export const getProductVariants = async (slug) => {
  const response = await fetch(
    `${API_BASE_URL}/products/${slug}/variants`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product variants");
  }

  return response.json();
};

export const getEmiPlans = async (variantId) => {
  const response = await fetch(
    `${API_BASE_URL}/variants/${variantId}/emi-plans`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch EMI plans");
  }

  return response.json();
};