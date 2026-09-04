function VariantSelector({
  distinctColors = [],
  selectedColor,
  onColorSelect,
  availableStorageVariants = [],
  selectedVariant,
  onVariantSelect,
}) {
  const hasColors = distinctColors.length > 0;
  const hasVariants = availableStorageVariants.length > 0;

  if (!hasColors && !hasVariants) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">

      {/* Color */}
      {hasColors && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-gray-900">
            Color{selectedColor ? `: ${selectedColor}` : ""}
          </span>

          <div className="flex flex-wrap gap-2">
            {distinctColors.map((color) => {
              const isSelected = selectedColor === color;

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => onColorSelect(color)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                    isSelected
                      ? "border-emerald-700 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Variant */}
      {hasVariants && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-gray-900">
            Variant
          </span>

          <select
            value={selectedVariant?.id || ""}
            onChange={(event) => onVariantSelect(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-[13px]"
          >
            {availableStorageVariants.map((variant) => {
              const specs = [
                variant.storage && `Storage: ${variant.storage}`,
                variant.ram && `RAM: ${variant.ram}`,
                variant.finish && `Finish: ${variant.finish}`,
              ]
                .filter(Boolean)
                .join(", ");

              return (
                <option key={variant.id} value={variant.id}>
                  {specs || `Variant #${variant.id}`}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
}

export default VariantSelector;