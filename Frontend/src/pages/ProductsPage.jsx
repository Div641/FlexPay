import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import SidebarFilters from "../components/SidebarFilters";
import HeroFooter from "../components/HeroFooter";

function ProductsPage({ searchQuery = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter state
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [sortBy, setSortBy] = useState("price-low");

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  /*
   * Fetch products from backend
   */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts();

        setProducts(response?.data || []);
      } catch (err) {
        console.error("API error:", err);

        setError("Failed to fetch products from server.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  /*
   * Toggle brand filter
   */
  const handleBrandToggle = (brandName) => {
    setSelectedBrands((previousBrands) =>
      previousBrands.includes(brandName)
        ? previousBrands.filter(
            (brand) => brand !== brandName
          )
        : [...previousBrands, brandName]
    );
  };

  /*
   * Clear all filters
   */
  const clearFilters = () => {
    setSelectedPriceRange(null);
    setMinPriceInput("");
    setMaxPriceInput("");
    setSelectedBrands([]);
  };

  /*
   * Check whether any filter/search is active
   */
  const hasActiveFilters = Boolean(
    selectedPriceRange ||
      minPriceInput ||
      maxPriceInput ||
      selectedBrands.length > 0 ||
      searchQuery
  );

  /*
   * Filter and sort products
   */
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      list = list.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query)
      );
    }

    // Price range
    if (selectedPriceRange === "below36400") {
      list = list.filter(
        (product) =>
          Number(product.starting_price) < 36400
      );
    }

    if (selectedPriceRange === "36401-72600") {
      list = list.filter(
        (product) =>
          Number(product.starting_price) >= 36401 &&
          Number(product.starting_price) <= 72600
      );
    }

    if (selectedPriceRange === "72601-108800") {
      list = list.filter(
        (product) =>
          Number(product.starting_price) >= 72601 &&
          Number(product.starting_price) <= 108800
      );
    }

    if (selectedPriceRange === "above108800") {
      list = list.filter(
        (product) =>
          Number(product.starting_price) > 108800
      );
    }

    // Custom minimum price
    if (minPriceInput) {
      const minPrice = Number(minPriceInput);

      if (!Number.isNaN(minPrice)) {
        list = list.filter(
          (product) =>
            Number(product.starting_price) >= minPrice
        );
      }
    }

    // Custom maximum price
    if (maxPriceInput) {
      const maxPrice = Number(maxPriceInput);

      if (!Number.isNaN(maxPrice)) {
        list = list.filter(
          (product) =>
            Number(product.starting_price) <= maxPrice
        );
      }
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      list = list.filter((product) => {
        const brand = (
          product.brand || ""
        ).toLowerCase();

        return selectedBrands.some((selectedBrand) => {
          const filterBrand =
            selectedBrand.toLowerCase();

          if (filterBrand === "google pixel") {
            return (
              brand.includes("google") ||
              brand.includes("pixel")
            );
          }

          return brand.includes(filterBrand);
        });
      });
    }

    // Sort by price
    list.sort((first, second) => {
      const firstPrice = Number(
        first.starting_price || 0
      );

      const secondPrice = Number(
        second.starting_price || 0
      );

      if (sortBy === "price-high") {
        return secondPrice - firstPrice;
      }

      return firstPrice - secondPrice;
    });

    return list;
  }, [
    products,
    searchQuery,
    selectedPriceRange,
    minPriceInput,
    maxPriceInput,
    selectedBrands,
    sortBy,
  ]);

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="flex h-full w-full bg-[#f8faf9]">
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-72 rounded-2xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

  /*
   * API error state
   */
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8faf9]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Unable to load products
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-[#f8faf9] relative">

      {/* Sidebar */}
      <SidebarFilters
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        minPriceInput={minPriceInput}
        setMinPriceInput={setMinPriceInput}
        maxPriceInput={maxPriceInput}
        setMaxPriceInput={setMaxPriceInput}
        selectedBrands={selectedBrands}
        handleBrandToggle={handleBrandToggle}
      />

      {/* Main content */}
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar flex flex-col justify-between">

        <main className="px-4 sm:px-6 lg:px-8 py-5 flex-1">

          {/* Breadcrumb */}
          <div className="flex items-center justify-between mb-4">

            <nav className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-500">
              <Link
                to="/"
                className="hover:text-emerald-700 transition"
              >
                Home
              </Link>

              <span>›</span>

              <span className="font-semibold text-gray-800">
                Mobile Phones
              </span>
            </nav>

            {!isSidebarOpen && (
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                <svg
                  className="w-3.5 h-3.5 text-emerald-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <span>Show Filters</span>
              </button>
            )}

          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2">

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Mobile Phones
              </h1>

              <p className="text-xs sm:text-sm font-semibold text-gray-800 mt-1">
                {hasActiveFilters
                  ? `${filteredProducts.length} Products found`
                  : `${products.length} Products`}
              </p>
            </div>

            <div className="flex items-center gap-3">

              {/* Mobile filter button */}
              <button
                type="button"
                onClick={() =>
                  setIsMobileFilterOpen(
                    !isMobileFilterOpen
                  )
                }
                className="lg:hidden flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50"
              >
                <svg
                  className="w-3.5 h-3.5 text-emerald-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>

                <span>
                  Filters{" "}
                  {selectedBrands.length
                    ? `(${selectedBrands.length})`
                    : ""}
                </span>
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                className="appearance-none rounded-full border border-gray-300 bg-white px-4 py-1.5 text-xs sm:text-[13px] font-semibold text-gray-800 shadow-2xs focus:border-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="price-low">
                  Price : Low to High
                </option>

                <option value="price-high">
                  Price : High to Low
                </option>
              </select>

            </div>
          </div>

          {/* Mobile filters */}
          {isMobileFilterOpen && (
            <div className="lg:hidden mb-6 p-4 rounded-xl border border-gray-200 bg-white shadow-sm">

              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="font-bold text-sm text-gray-900">
                  Filter By
                </span>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-emerald-700 font-semibold"
                >
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">

                {/* Brands */}
                <div>
                  <span className="font-semibold block mb-1 text-gray-700">
                    Brand
                  </span>

                  {[
                    "Apple",
                    "Google Pixel",
                    "Samsung",
                    "Motorola",
                    "Nothing",
                  ].map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() =>
                        handleBrandToggle(brand)
                      }
                      className={`block w-full text-left px-2 py-1 rounded text-xs mb-1 ${
                        selectedBrands.includes(brand)
                          ? "bg-emerald-700 text-white font-semibold"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>

                {/* Price ranges */}
                <div>
                  <span className="font-semibold block mb-1 text-gray-700">
                    Price
                  </span>

                  {[
                    {
                      label: "Below ₹36,400",
                      value: "below36400",
                    },
                    {
                      label: "₹36,401 - ₹72,600",
                      value: "36401-72600",
                    },
                    {
                      label: "₹72,601 - ₹1,08,800",
                      value: "72601-108800",
                    },
                    {
                      label: "Above ₹1,08,800",
                      value: "above108800",
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setSelectedPriceRange(
                          selectedPriceRange ===
                            option.value
                            ? null
                            : option.value
                        )
                      }
                      className={`block w-full text-left px-2 py-1 rounded text-xs mb-1 ${
                        selectedPriceRange ===
                        option.value
                          ? "bg-emerald-700 text-white font-semibold"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* Empty result */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">

              <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 mb-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h3 className="text-base font-bold text-gray-900">
                No matching products found
              </h3>

              <p className="text-xs text-gray-500 mt-1 max-w-sm">
                Try relaxing your search terms or
                resetting the filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-full bg-emerald-700 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-800 transition"
              >
                Clear all filters
              </button>

            </div>
          ) : (

            /* Product grid */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6 pb-12">

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id || product.slug}
                  product={product}
                />
              ))}

            </div>
          )}

        </main>

        <HeroFooter />

      </div>
    </div>
  );
}

export default ProductsPage;