import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900"
        >
          FlexPay
        </Link>

        <Link
          to="/"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Products
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;