import { useSelector } from "react-redux";
import Navbar from "../Component/Navbar"

import ProductCard from "../Component/ProductCard";
const Wishlist = () => {

    const wishlistData = useSelector((state) => state.product.wishlistData);
    console.log("Wishlist data ", wishlistData);
    const arr = Object.values(wishlistData)
    console.log("Wishlist data in arr ", arr);

    const data = Object.values(arr);


    return(
        <div>
            <Navbar />
            {data.length > 0 ? (
                <div className={`grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-2 p-4 grow`}>
            { arr.map((pObj, index) => {
                return (
                    <ProductCard key={index} data={pObj} />
                )
            })}
        </div>
            ): (
                <h1>No Data is available on Wishlist</h1>
            )}
        </div>
    )
}

export default Wishlist;

