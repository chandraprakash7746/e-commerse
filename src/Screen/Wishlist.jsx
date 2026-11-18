import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";
import ProductCard from "../Component/ProductCard";

const Wishlist = () => {
  const wishlistData = useSelector((state) => state.product.wishlistData || {});
  const arr = Object.values(wishlistData);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />

      <div className="w-[80%] m-auto pb-12">
        {/* Page Heading */}
        <div className="py-6 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            My Wishlist
          </h1>
          {arr.length > 0 && (
            <span className="text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              {arr.length} {arr.length === 1 ? "Item" : "Items"}
            </span>
          )}
        </div>

        {/* Wishlist Items Grid OR Empty State */}
        {arr.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-5 pt-6">
            {arr.map((pObj) => (
              <ProductCard key={pObj.id} data={pObj} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 mt-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-gray-900">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mt-2 mb-6 text-center max-w-md">
              Save items you love here so you can easily find and buy them later.
            </p>
            <Link
              to="/"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;