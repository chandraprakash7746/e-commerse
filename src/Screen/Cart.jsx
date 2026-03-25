import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Component/Navbar";
import { addToCart, removeFromCart, decreaseQuantityOfCart } from "../app/ProductSlice";
import { Link } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.product.cartMap)
    console.log("Cart dta ", cartData);
    const cartDataArr = Object.values(cartData);
    console.log("cartDataArr", cartDataArr)

    const data = Object.values(cartDataArr)

    const subtotal = cartDataArr.reduce((acc, item) => {
        return (acc + (item.data.price * item.quantity));
    }, 0);

    return (
        <div className="w-full h-full bg-gray-100">
            <Navbar />
            <div className=" w-[80%] m-auto">
                <div>
                    <h1>Your Shopping Bag</h1>
                </div>
                {data.length > 0 ? (
                    <div className="flex flex-col  lg:flex-row  justify-between">
                        <div className="w-[65%] shadow-2xl rounded-2xl">
                            {cartDataArr.map((item) => {
                                const data = item.data; // product data
                                return (
                                    <div className="p-3 w-full ">
                                        <div className="flex gap-3">
                                            <div className=" w-25 h-25">
                                                <img src={data.thumbnail} alt="" />
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-between w-full">
                                                    <div>
                                                        <p className="font-bold text-xl">{data.title}</p>
                                                        <p className="font-semibold text-neutral-400">{data.brand}</p>
                                                    </div>
                                                    <div className="font-semibold">${data.price}</div>
                                                </div>
                                                <div className="border w-[50%] flex mt-2.5">
                                                    <div className=" w-[40%] flex border border-sky-100 rounded-lg m-2 p-1  bg-slate-200">
                                                        <p onClick={()=> dispatch(decreaseQuantityOfCart(data.id))}
                                                         className=" font-bold   flex-1 cursor-pointer">-</p>
                                                        <p className=" font-bold   flex-1 ">{item.quantity}</p>
                                                        <p onClick={() => dispatch(addToCart(data))}
                                                         className=" font-bold  flex-1 cursor-pointer">+</p>
                                                    </div>
                                                    <div className=" w-[50%] m-auto pl-2.5 text-red-500">
                                                        <button onClick={()=> dispatch(removeFromCart(data.id))}
                                                         className=" w-full cursor-pointer font-semibold">Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                    </div>
                                )
                            })}
                        </div>

                        <div className="border border-fuchsia-800 w-[30%]">
                            <div><h1>Order Summary</h1></div>

                            <div><span>Subtotal</span><span>{subtotal}</span></div>

                            <div><span>Shipping</span><span>Free</span></div>

                            <div><span>Tax &#40; estimated &#41;</span><span>$0.00</span></div>

                            <div className="flex"><h1>Total Amount</h1><h1>{subtotal}</h1></div>

                            <div><button>Proceed To Checkout</button></div>
                        </div>
                    </div>
                ) : (
                     <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-medium text-gray-900">Your cart is empty</h2>
                            <p className="text-gray-500 mt-2 mb-6 text-center">Looks like you haven't added anything to your cart yet.</p>
                            <Link to={"/"} className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                                Start Shopping
                            </Link>
                        </div>
                )}
            </div>
        </div>
    )
}

export default Cart;