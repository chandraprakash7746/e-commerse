import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { addCategoryWiseItem } from "../app/ProductSlice";
import { useDispatch, useSelector } from "react-redux";


const useProductCategory = (categoryFromProps=null) => {
  console.log("Category from props =>",categoryFromProps);
  const catogeryMap = useSelector((state) => state.product.categoryMap)
  console.log("Category MAp =>", catogeryMap)
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { url: categoryFromURL } = useParams();
  console.log("Category from URL =>",categoryFromURL);

  const category = categoryFromProps || categoryFromURL;
  console.log("Category=>",category)

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
    // This line is update while when we show related 
    // items in pdp and add dependency on useEffect with category
    if (!category) return;
    const cacheData = catogeryMap[category];
    if(!cacheData){
      getData();
    }else{
      setProductData(cacheData);
      setLoading(false);
    }
  }, [category]);

  return { productData, loading, }
}

export default useProductCategory;


