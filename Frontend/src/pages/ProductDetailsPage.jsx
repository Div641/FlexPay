import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import {
  getProduct,
  getProductVariants,
  getEmiPlans,
} from "../services/api";

import ProductGallery from "../components/ProductGallery";
import VariantSelector from "../components/VariantSelector";
import EmiPlanCard from "../components/EmiPlanCard";

// Format numbers using Indian numbering system
const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "0";
  }

  return Math.round(Number(value)).toLocaleString("en-IN");
};

// Format EMI start date
const formatEmiDate = (dateString) => {
  if (!dateString) {
    return "";
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const day = date.getDate();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[date.getMonth()];

    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
          ? "nd"
          : day === 3 || day === 23
            ? "rd"
            : "th";

    return `${day}${suffix} ${month}`;
  } catch {
    return "";
  }
};

function ProductDetailsPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [emiPlans, setEmiPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * Fetch product and variants from API
   */
  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        setError("");

        const [productResponse, variantsResponse] = await Promise.all([
          getProduct(slug),
          getProductVariants(slug),
        ]);

        if (!productResponse?.data) {
          throw new Error("Product not found");
        }

        setProduct(productResponse.data);

        const productVariants = variantsResponse?.data || [];
        setVariants(productVariants);

        if (productVariants.length > 0) {
          setSelectedVariant(productVariants[0]);
        } else {
          setSelectedVariant(null);
        }
      } catch (err) {
        console.error("Error loading product details:", err);

        setProduct(null);
        setVariants([]);
        setSelectedVariant(null);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [slug]);

  /*
   * Fetch EMI plans whenever the selected variant changes
   */
  useEffect(() => {
    if (!selectedVariant?.id) {
      setEmiPlans([]);
      setSelectedPlanId(null);
      return;
    }

    const loadEmiPlans = async () => {
      try {
        const response = await getEmiPlans(selectedVariant.id);
        const plans = response?.data || [];

        setEmiPlans(plans);
        setSelectedPlanId(plans[0]?.id || null);
      } catch (err) {
        console.error("Error loading EMI plans:", err);

        setEmiPlans([]);
        setSelectedPlanId(null);
      }
    };

    loadEmiPlans();
  }, [selectedVariant]);

  /*
   * Prices come directly from selected variant
   */
  const rawPrice = selectedVariant?.price;
  const rawMrp = selectedVariant?.mrp;

  const hasPrice =
    rawPrice !== null && rawPrice !== undefined && !isNaN(rawPrice);
  const hasMrp =
    rawMrp !== null && rawMrp !== undefined && !isNaN(rawMrp);

  const price = hasPrice ? Number(rawPrice) : null;
  const mrp = hasMrp ? Number(rawMrp) : null;

  const discountPercent =
    hasPrice && hasMrp && mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : 0;

  /*
   * Currently selected EMI plan
   */
  const currentPlan = useMemo(() => {
    if (!emiPlans || emiPlans.length === 0) return null;
    return (
      emiPlans.find((plan) => plan.id === selectedPlanId) ||
      emiPlans[0] ||
      null
    );
  }, [emiPlans, selectedPlanId]);

  const upfrontPayment =
    currentPlan?.upfront_payment !== null &&
    currentPlan?.upfront_payment !== undefined &&
    !isNaN(currentPlan.upfront_payment)
      ? Number(currentPlan.upfront_payment)
      : null;

  const cashbackAmount =
    currentPlan?.cashback_amount !== null &&
    currentPlan?.cashback_amount !== undefined &&
    !isNaN(currentPlan.cashback_amount)
      ? Number(currentPlan.cashback_amount)
      : 0;

  const emiStartDateFormatted = currentPlan?.emi_start_date
    ? formatEmiDate(currentPlan.emi_start_date)
    : "";

  /*
   * Images come directly from the selected variant
   */
  const galleryImages = Array.isArray(selectedVariant?.image_urls)
    ? selectedVariant.image_urls
    : [];

  /*
   * Get unique colors from available variants
   */
  const distinctColors = useMemo(() => {
    const colors = [];

    variants.forEach((variant) => {
      if (
        variant.color &&
        !colors.includes(variant.color)
      ) {
        colors.push(variant.color);
      }
    });

    return colors;
  }, [variants]);

  /*
   * Variants available for the currently selected color
   */
  const availableStorageVariants = useMemo(() => {
    if (!selectedVariant?.color) {
      return variants;
    }

    return variants.filter(
      (variant) =>
        variant.color === selectedVariant.color
    );
  }, [variants, selectedVariant?.color]);

  /*
   * Select a color
   */
  const handleColorSelect = (color) => {
    const matchingVariant = variants.find(
      (variant) => variant.color === color
    );

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
      setSelectedImageIndex(0);
      setSelectedPlanId(null);
    }
  };

  /*
   * Select a specific variant
   */
  const handleVariantSelect = (variantId) => {
    const matchingVariant = variants.find(
      (variant) =>
        String(variant.id) === String(variantId)
    );

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
      setSelectedImageIndex(0);
      setSelectedPlanId(null);
    }
  };

  /*
   * Format variant details for heading and subtitle
   */
  const variantTitleDetails = [
    selectedVariant?.color,
    selectedVariant?.storage,
  ]
    .filter(Boolean)
    .join(", ");

  const variantSpecsText = [
    selectedVariant?.storage ? `Storage: ${selectedVariant.storage}` : null,
    selectedVariant?.ram ? `RAM: ${selectedVariant.ram}` : null,
    selectedVariant?.color ? `Color: ${selectedVariant.color}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="h-full w-full bg-[#f8faf9] flex items-center justify-center p-8">
        <div className="max-w-4xl w-full bg-white rounded-2xl p-8 border border-gray-100 shadow-sm animate-pulse space-y-6">
          <div className="h-4 bg-gray-200 rounded w-1/4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-100 rounded-2xl" />

            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-100 rounded w-1/3" />
              <div className="h-40 bg-gray-100 rounded-xl" />
              <div className="h-32 bg-gray-100 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Error state
   */
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Product not found
          </h1>

          <p className="mt-2 text-gray-500">
            We couldn't load this product.
          </p>

          <Link
            to="/"
            className="mt-5 inline-block rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#f8faf9] overflow-y-auto custom-scrollbar">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-500 mb-5 font-normal">
          <Link
            to="/"
            className="hover:text-emerald-700 transition"
          >
            Home
          </Link>

          <span>›</span>

          <Link
            to="/"
            className="hover:text-emerald-700 transition"
          >
            Mobiles
          </Link>

          <span>›</span>

          <span className="text-gray-600">
            {product.brand}
          </span>

          <span>›</span>

          <span className="font-semibold text-gray-900">
            {product.name}
          </span>
        </nav>

        {/* Main product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pb-16">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-5">

            <ProductGallery
              galleryImages={galleryImages}
              selectedImageIndex={selectedImageIndex}
              setSelectedImageIndex={setSelectedImageIndex}
              productName={product.name}
            />

            <VariantSelector
              distinctColors={distinctColors}
              selectedColor={selectedVariant?.color}
              onColorSelect={handleColorSelect}
              availableStorageVariants={availableStorageVariants}
              selectedVariant={selectedVariant}
              onVariantSelect={handleVariantSelect}
            />

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-5">

            {/* Product overview and pricing */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.04)]">

              <h1 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight leading-snug">
                {product.brand} {product.name}

                {variantTitleDetails && (
                  <span className="font-semibold text-gray-900">
                    {" "}
                    ({variantTitleDetails})
                  </span>
                )}
              </h1>

              {variantSpecsText && (
                <p className="text-xs text-gray-500 mt-1">
                  {variantSpecsText}
                </p>
              )}

              {Number(product.sold_count) > 0 && (
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                    <span>🔥</span>
                    <span>
                      {product.sold_count} sold
                    </span>
                  </span>
                </div>
              )}

              <div className="mt-3.5 flex items-baseline gap-2.5 flex-wrap">
                {hasPrice ? (
                  <span className="text-2xl sm:text-3xl font-black text-gray-950">
                    ₹{formatCurrency(price)}
                  </span>
                ) : (
                  <span className="text-lg font-semibold text-gray-500">
                    Price on request
                  </span>
                )}

                {hasMrp && mrp > price && (
                  <span className="text-base sm:text-lg text-gray-400 line-through font-normal">
                    ₹{formatCurrency(mrp)}
                  </span>
                )}

                {discountPercent > 0 && (
                  <span className="inline-flex items-center rounded-sm bg-[#eaf8ee] px-2 py-0.5 text-xs font-bold text-emerald-800 uppercase tracking-tight border border-emerald-200/60">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

            </div>

            {/* EMI plans */}
            <EmiPlanCard
              upfrontPayment={upfrontPayment}
              emiStartDateFormatted={emiStartDateFormatted}
              emiPlans={emiPlans}
              selectedPlanId={selectedPlanId}
              onSelectPlan={setSelectedPlanId}
              currentPlan={currentPlan}
              cashbackAmount={cashbackAmount}
            />

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;