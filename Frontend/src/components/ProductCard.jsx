import { Link } from "react-router-dom";

const formatCurrency = (value) => {
  return Number(value || 0).toLocaleString("en-IN");
};

function ProductCard({ product }) {
  if (!product) return null;

  const price = Number(product.starting_price || 0);

  return (
    <div className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_3px_16px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">

      <Link
        to={`/products/${product.slug}`}
        className="flex h-full flex-col"
      >
        <div className="flex items-start gap-4">

          {/* Product Image */}
          <div className="flex h-40 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2.5 sm:h-44 sm:w-44">
            {product.image_url || product.image_urls?.[0] ? (
              <img
                src={product.image_url || product.image_urls?.[0]}
                alt={product.name}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="text-xs text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex min-w-0 flex-1 flex-col justify-between">

            {/* Name & Description */}
            <div>
              <h3 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-emerald-700 sm:text-[15px]">
                {product.name}
              </h3>

              {product.description && (
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500">
                  {product.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="mt-4 border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-500">
                Starting from
              </p>

              <p className="mt-1 text-lg font-black text-gray-900 sm:text-xl">
                ₹{formatCurrency(price)}
              </p>
            </div>

          </div>
        </div>

        {/* View Product */}
        <div className="mt-4 border-t border-gray-100 pt-3">
          <span className="text-sm font-semibold text-emerald-700">
            View product →
          </span>
        </div>

      </Link>
    </div>
  );
}

export default ProductCard;