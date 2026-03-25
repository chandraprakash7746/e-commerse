import { useDispatch, useSelector } from "react-redux";
import UseIsProductInCrt from "./UseIsProductInCart";
import { addToCart, removeFromCart } from "../app/ProductSlice";

const UseCartProduct = (productData) => {
    let id = productData?.id;

    const isCartProduct = UseIsProductInCrt(id);
    const dispatch = useDispatch();

    function handleCart(){
        if(isCartProduct){
            dispatch(removeFromCart(id));
        }else{
            dispatch(addToCart(productData));
        }
    }

    return {isCartProduct,handleCart }
}

export default UseCartProduct;