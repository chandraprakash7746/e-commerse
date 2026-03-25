import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { addCategoryWiseItem } from "../app/ProductSlice";
import { useDispatch, useSelector } from "react-redux";


const useProductCategory = () => {
  const catogeryMap = useSelector((state) => state.product.categoryMap)
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url: category } = useParams();

  async function getData() {
    try {
      console.log("Api cll for category ", category)
      let apiData = await fetch(
        `https://dummyjson.com/products/category/${category}`,
      );
      let jsonData = await apiData.json();
      console.log(jsonData.products)
      setProductData(jsonData.products);
      dispatch(addCategoryWiseItem({
        category : category,
        productArr : jsonData.products,
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const cacheData = catogeryMap[category];
    if(!cacheData){
      getData();
    }else{
      setProductData(cacheData);
      setLoading(false);
    }
  }, []);

  return { productData, loading, }
}

export default useProductCategory;


