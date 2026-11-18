import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Component/Navbar";
import { addToCart, decreaseQuantityOfCart } from "../app/ProductSlice";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import ProductRemvePopup from "../Component/ProductRemvePopup";

const Cart = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.product.cartMap);
    const cartDataArr = Object.values(cartData || {});

    const subtotal = useMemo(() => {
        return cartDataArr.reduce((acc, item) => {
            return acc + item.data.price * item.quantity;
        }, 0);
    }, [cartDataArr]);

    return (
        <div className="w-full min-h-screen bg-gray-100 relative pb-12">
            <Navbar />

            {/* Remove Confirmation Modal */}
            {selectedProduct && (
                <ProductRemvePopup
                    showModal={Boolean(selectedProduct)}
                    setShowModal={() => setSelectedProduct(null)}
                    productData={selectedProduct}
                />
            )}

            <div className="w-[90%] lg:w-[80%] m-auto">
                {/* Page Header */}
                <div className="py-6 flex items-center justify-between border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Your Shopping Bag
                    </h1>
                    {cartDataArr.length > 0 && (
                        <span className="text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                            {cartDataArr.length} {cartDataArr.length === 1 ? "Item" : "Items"}
                        </span>
                    )}
                </div>

                {cartDataArr.length > 0 ? (
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 pt-6">
                        {/* Left Column: Cart Items List */}
                        <div className="w-full lg:w-[65%] flex flex-col gap-4">
                            {cartDataArr.map((item) => {
                                const data = item.data;
                                return (
                                    <div
                                        key={data.id}
                                        className="flex flex-col sm:flex-row items-center gap-5 bg-white p-5 rounded-xl shadow-sm border border-gray-200 transition-shadow hover:shadow-md"
                                    >
                                        {/* Product Image */}
                                        <Link
                                            to={`/products/${data.id}`}
                                            className="w-28 h-28 bg-gray-50 rounded-lg p-2 flex items-center justify-center shrink-0 border border-gray-100"
                                        >
                                            <img
                                                src={data.thumbnail}
                                                alt={data.title}
                                                className="h-full w-full object-contain"
                                            />
                                        </Link>

                                        {/* Product Details & Controls */}
                                        <div className="w-full flex flex-col justify-between gap-4">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <Link
                                                        to={`/products/${data.id}`}
                                                        className="font-bold text-lg text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1"
                                                    >
                                                        {data.title}
                                                    </Link>
                                                    <p className="text-sm font-medium text-gray-400 mt-0.5">
                                                        {data.brand || "Generic"}
                                                    </p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="font-bold text-lg text-gray-900">
                                                        ${(data.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    {item.quantity > 1 && (
                                                        <p className="text-xs text-gray-400">
                                                            ${data.price} each
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Quantity & Remove Row */}
                                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                                <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
                                                    <button
                                                        type="button"
                                                        onClick={() => dispatch(decreaseQuantityOfCart(data.id))}
                                                        className="w-8 h-8 flex items-center justify-center rounded-md font-bold text-gray-700 hover:bg-white hover:shadow-sm transition cursor-pointer"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-10 text-center font-semibold text-gray-900 text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => dispatch(addToCart(data))}
                                                        className="w-8 h-8 flex items-center justify-center rounded-md font-bold text-gray-700 hover:bg-white hover:shadow-sm transition cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedProduct(data)}
                                                    className="text-sm font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="w-full lg:w-[33%] bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-200">
                                Order Summary
                            </h2>

                            <div className="py-4 flex flex-col gap-3 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-900">
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-green-600">Free</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (estimated)</span>
                                    <span className="font-semibold text-gray-900">$0.00</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-6">
                                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                                <span className="text-2xl font-bold text-indigo-600">
                                    ${subtotal.toFixed(2)}
                                </span>
                            </div>

                            <button
                                type="button"
                                className="w-full bg-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:bg-indigo-700 active:scale-[0.99] transition-all shadow-sm cursor-pointer"
                            >
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 mt-6 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-12 h-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-medium text-gray-900">Your cart is empty</h2>
                        <p className="text-gray-500 mt-2 mb-6 text-center">
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <Link
                            to={"/"}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;