import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
// import { useParams } from "react-router-dom";
import { ThemeContext } from "../Store/ThemeProvider";
import ProductCardScaleton from "../Component/ProductCardScaleton";
import ProductCard from "../Component/ProductCard";
import useProductCategory from "../CustomHooks/UseProductCategory";

const ProductCategory = () => {
  const { productData, loading } = useProductCategory()
  const { theme } = useContext(ThemeContext);
  // const [productData, setProductData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const { url: category } = useParams(); // used alias (for a diffrent name of Url as category )

  // async function getData() {
  //   try {
  //     let apiData = await fetch(
  //       `https://dummyjson.com/products/category/${category}`,
  //     );
  //     let jsonData = await apiData.json();
  //     setProductData(jsonData.products);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  if (loading) {
    return <ProductCardScaleton />;
  }

  const light = "flex justify-center items-center w-screen flex- z-10 flex-col";
  const dark =
    "flex bg-gray-500 justify-center items-center w-screen flex- z-10 flex-col";

  return (
    <div>
      <Navbar />
      <div className={theme == "light" ? light : dark}>
        <div className="flex justify-evenly w-screen min-h-screen flex-wrap gap-5 mt-7 z-10">
          {productData.map((pObj) => (
            <ProductCard key={pObj.id} data={pObj} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;