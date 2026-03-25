import React, { useContext } from "react";
import Rating from "../Icons/Rating";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Store/ThemeProvider";
import Wishlist from "../Icons/Wishlist";
import UseIsProductInWishlist from "../CustomHooks/UseIsProductInWishlist";
import UseWishlistProduct from "../CustomHooks/UseWishlistProduct";


const ProductCard = ({ data }) => {
    // console.log("Props => ", data)
    const { theme } = useContext(ThemeContext);

    const { thumbnail, title, brand, category, price, discountPercentage, rating, id } = data;

    // const isProductInWishlist = UseIsProductInWishlist(id);
    const { handleWishlist, isProductInWishlist } = UseWishlistProduct(data)

    return (<Link to={`/products/${id} `} className={`${theme == "light" ? 'bg-[#FFFFF0]' : 'bg-slate-300'}  pt-1 pb-3 rounded-2xl shadow-2xl`}>
        <div className="relative">
            
            <div onClick={(e) => {
                e.preventDefault()
                handleWishlist()
            }}
                className="absolute top-2 right-2 cursor-pointer">

                <Wishlist fill={isProductInWishlist ? "red" : "#E5E4E2"} width={25} />
            </div>
            <img className={`${theme == "light" ? 'bg-[#FAF9F6]' : 'bg-slate-200'} w-[95%] h-60 m-auto cursor-pointer`} src={thumbnail} alt="" />
        </div>
        <div className=" p-0.5 w-[95%] m-auto">
            <div className="p-0.5 text-base font-semibold text-zinc-500">{brand}</div>
            <div className="p-0.5 font-semibold text-neutral-900">{title}</div>
            <div className=" p-0.5 text-slate-500 font-semibold">{category}</div>
            <div className=" flex gap-3">
                <div className="p-0.5 text-sky-500 font-bold">{price}$</div>
                <div className="p-0.5 text-green-700 font-semibold">{discountPercentage}%OFF</div>
            </div>
            <div className=" flex justify-between">
                <div className="flex p-0.5 font-semibold gap-0.5 bg-[#FAF9F6]  w-20"><Rating color="yellow" width="20px" />{rating}</div>
                <div className="cursor-pointer p-0.5 hover:bg-blue-700 bg-blue-500 text-amber-100 font-semibold rounded-md border-pink-600 w-30 text-center">Add to Cart</div>
            </div>
        </div>

    </Link>)
}

export default ProductCard;