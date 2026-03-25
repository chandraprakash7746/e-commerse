import { useSelector } from "react-redux"


const UseIsProductInCrt = (id) => {
    const cartData = useSelector((state) => state.product.cartMap)

    return cartData[id] ? true : false;
}

export default UseIsProductInCrt