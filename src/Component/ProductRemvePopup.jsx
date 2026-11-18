import React from "react";
import Close from "../Icons/Close";
import UseWishlistProduct from "../CustomHooks/UseWishlistProduct";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../app/ProductSlice";

const ProductRemvePopup = ({ showModal = false, setShowModal, productData }) => {
  const { handleWishlist, isProductInWishlist } = UseWishlistProduct(productData);
  const dispatch = useDispatch();

  if (!showModal || !productData) {
    return null;
  }

  const handleRemove = () => {
    dispatch(removeFromCart(productData.id));
    setShowModal(false);
  };

  const handleMoveToWishlist = () => {
    dispatch(removeFromCart(productData.id));
    handleWishlist();
    setShowModal(false);
  };

  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
    >
      {/* Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6 relative animate-fadeIn"
      >
        {/* Header & Close Button */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Remove Item</h3>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Close />
          </button>
        </div>

        {/* Product Info & Confirmation Message */}
        <div className="py-5 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-lg p-1.5 border border-gray-100 shrink-0 flex items-center justify-center">
            <img
              src={productData.thumbnail}
              alt={productData.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 line-clamp-1">
              {productData.title}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Are you sure you want to remove this product from your bag?
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3 border-t border-gray-100">
          {!isProductInWishlist && (
            <button
              type="button"
              onClick={handleMoveToWishlist}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
            >
              Move to Wishlist
            </button>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductRemvePopup;