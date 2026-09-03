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
   * Fetch product and variants
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
    if (!selectedVariant) {
      setEmiPlans([]);
      setSelectedPlanId(null);
      return;
    }

    const loadEmiPlans = async () => {
      try {
        const response = await getEmiPlans(selectedVariant.id);

        const plans = response?.data || [];

        setEmiPlans(plans);

        const defaultPlan =
          plans.find(
            (plan) => Number(plan.tenure_months) === 6
          ) || plans[0];

        setSelectedPlanId(defaultPlan?.id || null);
      } catch (err) {
        console.error("Error loading EMI plans:", err);

        setEmiPlans([]);
        setSelectedPlanId(null);
      }
    };

    loadEmiPlans();
  }, [selectedVariant]);

  /*
   * Current price and MRP come directly from selected variant
   */
  const price = Number(selectedVariant?.price || 0);

  const mrp = Number(selectedVariant?.mrp || 0);

  const discountPercent =
    mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : 0;

  /*
   * Currently selected EMI plan
   */
  const currentPlan = useMemo(() => {
    return (
      emiPlans.find(
        (plan) => plan.id === selectedPlanId
      ) || emiPlans[0]
    );
  }, [emiPlans, selectedPlanId]);

  const upfrontPayment = Number(
    currentPlan?.upfront_payment || 0
  );

  const cashbackAmount = Number(
    currentPlan?.cashback_amount || 0
  );

  const emiStartDateFormatted = formatEmiDate(
    currentPlan?.emi_start_date
  );

  /*
   * Images come directly from the selected variant
   */
  const galleryImages =
    selectedVariant?.image_urls || [];

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
              rating={product.rating}
            />

            <VariantSelector
              distinctColors={distinctColors}
              selectedColor={selectedVariant?.color}
              onColorSelect={handleColorSelect}
              availableStorageVariants={
                availableStorageVariants
              }
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

                {selectedVariant && (
                  <span className="font-semibold text-gray-900">
                    {" "}
                    ({selectedVariant.color},{" "}
                    {selectedVariant.storage})
                  </span>
                )}
              </h1>

              {selectedVariant && (
                <p className="text-xs text-gray-500 mt-1">
                  Storage: {selectedVariant.storage},
                  {" "}
                  Color: {selectedVariant.color}
                </p>
              )}

              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                  <span>🔥</span>

                  <span>
                    {product.sold_count} sold
                  </span>
                </span>
              </div>

              <div className="mt-3.5 flex items-baseline gap-2.5 flex-wrap">

                <span className="text-2xl sm:text-3xl font-black text-gray-950">
                  ₹{formatCurrency(price)}
                </span>

                {mrp > price && (
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

              {/* FlexPay App banner */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl bg-[#f4f7f5] p-3.5 border border-emerald-100/60">

                <div className="flex items-center gap-2.5">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700 shadow-2xs border border-emerald-100">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-900 leading-tight">
                      Higher Credit Instantly
                    </h4>

                    <p className="text-[11px] text-gray-500 leading-tight">
                      Download FlexPay App
                    </p>
                  </div>

                </div>

                {/* App store buttons */}
                <div className="flex items-center gap-2 shrink-0">

                  <a
                    href="#app-store"
                    className="flex items-center gap-1.5 rounded-lg bg-black px-2.5 py-1.5 text-white hover:bg-gray-800 transition"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 3.81 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.88c.64-.78 1.08-1.86.96-2.88-1 .04-2.13.66-2.79 1.44-.59.68-1.1 1.77-.96 2.82 1.11.09 2.15-.6 2.79-1.38z" />
                    </svg>

                    <div className="text-[9px] font-semibold leading-tight text-left">
                      <span className="block text-[7px] uppercase text-gray-300">
                        Download on the
                      </span>

                      <span>
                        App Store
                      </span>
                    </div>
                  </a>

                  <a
                    href="#google-play"
                    className="flex items-center gap-1.5 rounded-lg bg-black px-2.5 py-1.5 text-white hover:bg-gray-800 transition"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3.609 1.814L13.792 12 3.61 22.186A2.29 2.29 0 0 1 3 20.59V3.41c0-.623.23-1.189.609-1.596zm11.605 11.607l2.25 2.25-11.83 6.721 9.58-8.971zm0-2.842L5.634 1.608l11.83 6.721-2.25 2.25zM16.636 12l2.646-1.503a1.996 1.996 0 0 1 0 3.006L16.636 12z" />
                    </svg>

                    <div className="text-[9px] font-semibold leading-tight text-left">
                      <span className="block text-[7px] uppercase text-gray-300">
                        GET IT ON
                      </span>

                      <span>
                        Google Play
                      </span>
                    </div>
                  </a>

                </div>
              </div>
            </div>

            {/* EMI plans */}
            <EmiPlanCard
              upfrontPayment={upfrontPayment}
              emiStartDateFormatted={
                emiStartDateFormatted
              }
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