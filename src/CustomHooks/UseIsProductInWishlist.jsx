import { useSelector } from "react-redux";


const UseIsProductInWishlist = (id) => {

    const wishlistData = useSelector((state) => state.product.wishlistData)
    
    return wishlistData[id] ? true : false; 
}
 

export default UseIsProductInWishlist;