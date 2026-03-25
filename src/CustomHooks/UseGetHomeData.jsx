import React from "react";
import { addProductDataById } from "../app/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { addProductsArrayByPage } from "../app/ProductSlice";
import { useState, useEffect } from "react";

const UseGetHomeData = (currentPage = 1) => { // currentPage is default parameter
    const homePageMap = useSelector((store) => store.product.homePageMap)
    console.log("HomePageMap ", homePageMap)

    const [showData, setShowData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const dispatch = useDispatch()


    async function getData() {
        let limit = 15;
        let skip = (currentPage - 1) * limit;
        try {
            console.log(" Api called for home page ", currentPage);
            const data = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
            const jsonData = await data.json();

            setShowData(jsonData.products);

            dispatch(
                addProductsArrayByPage({
                    pageNumber: currentPage,
                    productArray: jsonData.products,
                }),
            );

            // Now here we add this data on RTK store
            dispatch(addProductDataById(jsonData.products))

        } catch (err) {
            console.log("Something went wrong ...", err);
            setError(true);
        } finally {
            setLoading(false)
        }
    } 
    useEffect(() => {
        const cacheProductData = homePageMap[currentPage];
        if (!cacheProductData) {
            getData();
        } else {
            setShowData(cacheProductData);
            setLoading(false);
        }
    }, [currentPage]);
    
    return { showData, loading, error }

}





export default UseGetHomeData;