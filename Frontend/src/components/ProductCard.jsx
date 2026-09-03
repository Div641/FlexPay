import { Link } from "react-router-dom";

function ProductCard({ product }) {
    
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="p-6">
        <div className="mb-4 flex h-52 items-center justify-center rounded-xl bg-gray-100">
          <span className="text-gray-400">
            Product Image
          </span>
        </div>

        <p className="text-sm text-gray-500">
          {product.brand}
        </p>

        <h2 className="mt-1 text-lg font-semibold text-gray-900">
          {product.name}
        </h2>

        <div className="mt-2 flex items-center gap-2">
          <span>⭐</span>
          <span className="text-sm text-gray-600">
            {product.rating}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {product.sold_count} sold
        </p>

        <Link
          to={`/products/${product.slug}`}
          className="mt-5 block rounded-xl bg-black px-4 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;