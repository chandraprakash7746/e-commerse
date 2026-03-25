import React, { useContext } from "react";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductCardScaleton from "./ProductCardScaleton";
import { ThemeContext } from "../Store/ThemeProvider";
// import { addProductDataById } from "../app/ProductSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { addProductsArrayByPage } from "../app/ProductSlice";
import UseGetHomeData from "../CustomHooks/UseGetHomeData";


const ProductGrid = () => {
    // const homePageMap = useSelector((store) => store.product.homePageMap)
    // console.log("HomePageMap ",homePageMap)

    // const [showData, setShowData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { theme } = useContext(ThemeContext);
    const {showData, loading, error} = UseGetHomeData(currentPage)
    // const dispatch = useDispatch()


    // async function getData() {
    //     let limit = 15;
    //     let skip = (currentPage - 1) * limit;
    //     try {
    //         console.log(" Api called for home page ", currentPage);
    //         const data = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    //         const jsonData = await data.json();
          
    //         setShowData(jsonData.products);

    //         dispatch(
    //             addProductsArrayByPage({
    //                 pageNumber: currentPage,
    //                 productArray: jsonData.products,
    //             }),
    //         );

    //         // Now here we add this data on RTK store
    //         dispatch(addProductDataById(jsonData.products))

    //     } catch (err) {
    //         console.log("Something went wrong ...", err);
    //         setError(true);
    //     } finally {
    //         setLoading(false)
    //     }

    // }

    // useEffect(() => {
    //     getData();
    // }, [currentPage])

    // useEffect(() => {
    //     const cacheProductData = homePageMap[currentPage];
    //     if (!cacheProductData) {
    //         getData();
    //     } else {
    //         setShowData(cacheProductData);
    //         setLoading(false);
    //     }
    // }, [currentPage]);

    if (loading) {
        return (<ProductCardScaleton />)
    }
    if (error) {
        console.log(error);
        return (<h1>...error</h1>)
    }

    let changePage = "join-item btn btn-square bg-blue-400"
    let unchangePage = "join-item btn btn-square bg-white"

    // const light = "flex flex-col min-h-screen bg-[#EDEADE]";
    // const dark ="flex flex-col min-h-screen bg-[#EDEADE]";

    return (<div className={`flex flex-col min-h-screen ${theme == "light" ? 'bg-white' : 'bg-slate-600'}`}>


        <div className={`grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-2 p-4 grow`}>
            {showData.map((pObj, index) => {
                return (
                    <ProductCard key={index} data={pObj} />
                )
            })}
        </div>


        <div className="flex w-full justify-center pb-6 pt-2">
            <div className="join">
                <input onClick={() => { setCurrentPage(1) }}
                    className={currentPage == 1 ? changePage : unchangePage}
                    type="radio"
                    name="options"
                    aria-label="1"
                />
                <input onClick={() => { setCurrentPage(2) }} className={currentPage == 2 ? changePage : unchangePage} type="radio" name="options" aria-label="2" />
                <input onClick={() => { setCurrentPage(3) }} className={currentPage == 3 ? changePage : unchangePage} type="radio" name="options" aria-label="3" />
                <input onClick={() => { setCurrentPage(4) }} className={currentPage == 4 ? changePage : unchangePage} type="radio" name="options" aria-label="4" />
            </div>
        </div>
    </div>
    )
}

export default ProductGrid;
