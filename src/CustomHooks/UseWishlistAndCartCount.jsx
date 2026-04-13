import React from 'react'
import { useSelector } from 'react-redux'

const UseWishlistAndCartCount = () => {
    const cartDataMap = useSelector((state) => state.product.cartMap);
    const wishlistMap = useSelector((state) => state.product.wishlistData);

    const cartDataCount = Object.keys(cartDataMap).length;
    const wishlistCount = Object.keys(wishlistMap).length;

  return {cartDataCount, wishlistCount} 
}

export default UseWishlistAndCartCount
