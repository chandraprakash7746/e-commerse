import { useSelector, useDispatch } from "react-redux";
import { addProductDataById } from '../app/ProductSlice'
import { useState, useEffect } from "react";


const UseGetProductById = (id) => {
    const productDataMap = useSelector((state) => state.product.productDataMap)
    const dispatch = useDispatch();
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getData() { 
        try {
            console.log("Api call for product id ", id);
            let apiData = await fetch(`https://dummyjson.com/products/${id}`);
            console.log("Api call for id ", id);
            let jsonData = await apiData.json();
            setProductData(jsonData);

            // dispatch(addProductDataById(jsonData))  // saving the data in redux store
            dispatch(addProductDataById([jsonData]))

            setSelectedImage(jsonData.thumbnail);
        } catch (err) {
            // setError({msg: "Something went wrong!", err});
            console.log("Error...")
        } finally {
            setLoading(false);
        }
    }

     useEffect(() => {
        if (id) {
          const cacheData = productDataMap[id];
    
          if (cacheData) {
            setLoading(false);
            setProductData(cacheData)
            
          } else {
            getData();
          }
    
        } else {
          setError("Product Id not found");
          setLoading(false);
        }
      }, [id]);

    return {productData, loading, error}
}

export default UseGetProductById;
