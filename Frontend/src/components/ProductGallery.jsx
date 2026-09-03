function ProductGallery({
  galleryImages = [],
  selectedImageIndex = 0,
  setSelectedImageIndex,
  productName = "Product",
}) {
  if (!galleryImages.length) {
    return (
      <div className="flex min-h-[380px] items-center justify-center rounded-2xl border border-gray-100 bg-white text-sm text-gray-400 shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:min-h-[460px]">
        No images available
      </div>
    );
  }

  const activeImage =
    galleryImages[selectedImageIndex] || galleryImages[0];

  return (
    <div className="flex flex-col gap-4 sm:flex-row">

      {/* Thumbnails */}
      <div className="order-2 flex shrink-0 gap-2.5 overflow-x-auto sm:order-1 sm:flex-col sm:overflow-visible">
        {galleryImages.slice(0, 5).map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImageIndex(index)}
            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border bg-white p-1 transition-all sm:h-16 sm:w-16 ${
              selectedImageIndex === index
                ? "border-emerald-500 ring-2 ring-emerald-500/20"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`${productName} view ${index + 1}`}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 flex min-h-[380px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:order-2 sm:min-h-[460px]">
        <img
          src={activeImage}
          alt={productName}
          className="max-h-[340px] w-auto object-contain transition-transform duration-300 hover:scale-105 sm:max-h-[400px]"
        />
      </div>

    </div>
  );
}

export default ProductGallery;