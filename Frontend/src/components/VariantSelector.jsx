const COLOR_HEX_MAP = {
  Silver: "#e3e4e6",
  White: "#f5f5f7",
  Black: "#1d1d1f",
  SpaceBlack: "#252627",
  NaturalTitanium: "#9b958c",
  DesertTitanium: "#c59f80",
  Titanium: "#9a968f",
  Gold: "#fae7cf",
  Orange: "#d76538",
  Pink: "#fad2e1",
  Blue: "#273b52",
  Ultramarine: "#2e3869",
  Teal: "#38656d",
};

function VariantSelector({
  distinctColors = [],
  selectedColor,
  onColorSelect,
  availableStorageVariants = [],
  selectedVariant,
  onVariantSelect,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
      {/* Color Swatches */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold text-gray-900">Color</span>
        <div className="flex items-center gap-3">
          {distinctColors.map((col) => {
            const isSelected = selectedColor === col;
            const hex =
              COLOR_HEX_MAP[col] ||
              COLOR_HEX_MAP[col.replace(/\s+/g, "")] ||
              "#9e9e9e";

            return (
              <button
                key={col}
                type="button"
                onClick={() => onColorSelect(col)}
                title={col}
                className={`w-7 h-7 rounded-full border border-gray-300 transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-emerald-600 ring-offset-2 scale-105"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: hex }}
              />
            );
          })}
        </div>
      </div>

      {/* Variant Dropdown */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold text-gray-900">Variant</span>
        <div className="relative">
          <select
            value={selectedVariant?.id || ""}
            onChange={(e) => onVariantSelect(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs sm:text-[13px] font-medium text-gray-800 shadow-2xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer pr-9"
          >
            {availableStorageVariants.map((v) => (
              <option key={v.id} value={v.id}>
                Storage: {v.storage || "256 GB"}, RAM: {v.ram || "null"}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VariantSelector;
