function SidebarFilters({
  isSidebarOpen,
  setIsSidebarOpen,
  hasActiveFilters,
  clearFilters,
  selectedDownpayment,
  setSelectedDownpayment,
  selectedTenure,
  setSelectedTenure,
  selectedPriceRange,
  setSelectedPriceRange,
  minPriceInput,
  setMinPriceInput,
  maxPriceInput,
  setMaxPriceInput,
  selectedBrands,
  handleBrandToggle,
  availableBrands = ["Apple", "Google Pixel", "Samsung", "Motorola", "Nothing"],
}) {
  if (!isSidebarOpen) {
    return (
      /* Collapsed Sidebar Rail with Menu Icon */
      <aside className="hidden lg:flex flex-col items-center w-14 shrink-0 border-r border-gray-200/80 bg-white/80 backdrop-blur-xs py-3.5 transition-all duration-300">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition active:scale-95 shadow-2xs border border-gray-200/60"
          title="Expand filters sidebar"
          aria-label="Expand filters sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="mt-4 text-[10px] font-bold text-gray-400 [writing-mode:vertical-rl] tracking-wider uppercase">
          Filters
        </span>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 border-r border-gray-200/80 bg-white/70 backdrop-blur-xs px-5 py-4 overflow-y-auto custom-scrollbar transition-all duration-300">
      {/* Header with Menu button on the left of Filters */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center justify-center p-1.5 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-800 transition active:scale-95"
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition"
          >
            Reset all
          </button>
        )}
      </div>

      {/* Filter Section 1: Downpayment (Pay Now) */}
      <div className="py-3.5 border-b border-gray-100">
        <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wide text-gray-800 mb-2.5">
          Downpayment (Pay Now)
        </h3>
        <div className="space-y-2">
          {[
            { label: "₹499 or less", val: "499" },
            { label: "₹999 or less", val: "999" },
            { label: "₹1,999 or less", val: "1999" },
          ].map((opt) => {
            const isActive = selectedDownpayment === opt.val;
            return (
              <button
                key={opt.val}
                type="button"
                onClick={() => setSelectedDownpayment(isActive ? null : opt.val)}
                className="flex items-center gap-2.5 py-1 text-left w-full group cursor-pointer"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isActive
                      ? "border-[#0e704e] bg-[#0e704e]"
                      : "border-gray-300 bg-white group-hover:border-[#0e704e]"
                  }`}
                >
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <span
                  className={`text-xs sm:text-[13px] transition-colors ${
                    isActive
                      ? "font-semibold text-gray-950"
                      : "font-normal text-gray-700 group-hover:text-gray-950"
                  }`}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Section 2: EMI Tenure */}
      <div className="py-3.5 border-b border-gray-100">
        <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wide text-gray-800 mb-2.5">
          EMI Tenure
        </h3>
        <div className="space-y-2">
          {[
            { label: "2 months or more", val: "2" },
            { label: "4 months or more", val: "4" },
            { label: "6 months or more", val: "6" },
          ].map((opt) => {
            const isActive = selectedTenure === opt.val;
            return (
              <button
                key={opt.val}
                type="button"
                onClick={() => setSelectedTenure(isActive ? null : opt.val)}
                className="flex items-center gap-2.5 py-1 text-left w-full group cursor-pointer"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isActive
                      ? "border-[#0e704e] bg-[#0e704e]"
                      : "border-gray-300 bg-white group-hover:border-[#0e704e]"
                  }`}
                >
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <span
                  className={`text-xs sm:text-[13px] transition-colors ${
                    isActive
                      ? "font-semibold text-gray-950"
                      : "font-normal text-gray-700 group-hover:text-gray-950"
                  }`}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Section 3: Price */}
      <div className="py-3.5 border-b border-gray-100">
        <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wide text-gray-800 mb-2.5">
          Price
        </h3>
        <div className="space-y-2">
          {[
            { label: "Below ₹36,400 (1913)", val: "below36400" },
            { label: "₹36,401 to ₹72,600 (526)", val: "36401-72600" },
            { label: "₹72,601 to ₹1,08,800 (132)", val: "72601-108800" },
            { label: "Above ₹1,08,800 (38)", val: "above108800" },
          ].map((opt) => {
            const isActive = selectedPriceRange === opt.val;
            return (
              <button
                key={opt.val}
                type="button"
                onClick={() => setSelectedPriceRange(isActive ? null : opt.val)}
                className="flex items-center gap-2.5 py-1 text-left w-full group cursor-pointer"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isActive
                      ? "border-[#0e704e] bg-[#0e704e]"
                      : "border-gray-300 bg-white group-hover:border-[#0e704e]"
                  }`}
                >
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <span
                  className={`text-xs sm:text-[13px] transition-colors ${
                    isActive
                      ? "font-semibold text-gray-950"
                      : "font-normal text-gray-700 group-hover:text-gray-950"
                  }`}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Min / Max Input Row */}
        <div className="mt-3 flex items-center gap-1.5">
          <div className="relative flex-1">
            <input
              type="number"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              placeholder="Min"
              className="w-full rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs sm:text-[13px] text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div className="relative flex-1">
            <input
              type="number"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              placeholder="Max"
              className="w-full rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs sm:text-[13px] text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <button
            type="button"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#186445] text-white transition hover:bg-[#135238] active:scale-95 shadow-xs"
            title="Apply price filter"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Section 4: Brand */}
      <div className="pt-3.5">
        <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wide text-gray-800 mb-2.5">
          Brand
        </h3>
        <div className="space-y-2">
          {availableBrands.map((brand) => {
            const isActive = selectedBrands.includes(brand);
            return (
              <button
                key={brand}
                type="button"
                onClick={() => handleBrandToggle(brand)}
                className="flex items-center gap-2.5 py-1 text-left w-full group cursor-pointer"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-all ${
                    isActive
                      ? "border-[#0e704e] bg-[#0e704e]"
                      : "border-gray-300 bg-white group-hover:border-[#0e704e]"
                  }`}
                >
                  {isActive && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span
                  className={`text-xs sm:text-[13px] transition-colors ${
                    isActive
                      ? "font-semibold text-gray-950"
                      : "font-normal text-gray-700 group-hover:text-gray-950"
                  }`}
                >
                  {brand}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default SidebarFilters;
