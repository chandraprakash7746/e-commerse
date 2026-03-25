import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { useParams } from "react-router-dom";
import PdpSkeleton from "../Component/PdpSkeleton";
import ProductReviews from "../Component/ProductReviews";

import UseGetProductById from "../CustomHooks/UseGetProductByid";
import UseWishlistProduct from "../CustomHooks/UseWishlistProduct";
import UseCartProduct from "../CustomHooks/UseCartProduct";
import { Link } from "react-router-dom";


// import { useSelector, useDispatch } from "react-redux";
// import { addProductDataById } from '../app/ProductSlice'

const Pdp = () => {

  // const productDataMap = useSelector((state) => state.product.productDataMap)
  // const dispatch = useDispatch();
  // console.log("allProductData", productDataMap)

  const { id } = useParams();
  const { productData, loading, error } = UseGetProductById(id);
  const { handleWishlist, isProductInWishlist } = UseWishlistProduct(productData);
  const { isCartProduct, handleCart } = UseCartProduct(productData);
  // const [productData, setProductData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // async function getData() {
  //   try {
  //     console.log("Api call for product id ", id);
  //     let apiData = await fetch(`https://dummyjson.com/products/${id}`);
  //     console.log("Api call for id ", id);
  //     let jsonData = await apiData.json();
  //     setProductData(jsonData);

  //     // dispatch(addProductDataById(jsonData))  // saving the data in redux store
  //     dispatch(addProductDataById([jsonData]))

  //     setSelectedImage(jsonData.thumbnail);
  //   } catch (err) {
  //     setError("Something went wrong!");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   if (id) {
  //     const cacheData = productDataMap[id];

  //     if (cacheData) {
  //       setLoading(false);
  //       setProductData(cacheData)
  //       setSelectedImage(cacheData.thumbnail);
  //     } else {
  //       getData();
  //     }

  //   } else {
  //     setError("Product Id not found");
  //     setLoading(false);
  //   }
  // }, [id]);

  useEffect(() => {
    if (!loading && productData.thumbnail) {
      setSelectedImage(productData.thumbnail);
    }
  }, [productData])

  const discountedPrice =
    productData &&
    (
      productData.price -
      (productData.price * productData.discountPercentage) / 100
    ).toFixed(2);



  return (
    <>
      <Navbar hideSearchBar={true} />

      {loading && <PdpSkeleton />}

      {error && (
        <div className="text-center py-20 text-red-500 text-xl font-semibold">
          {error}
        </div>
      )}

      {!loading && !error && productData && (
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Image Section */}
            <div>
              <div className="border rounded-xl p-4 bg-white shadow">
                <img
                  src={selectedImage}
                  alt={productData.title}
                  className="w-full h-96 object-contain"
                />
              </div>

              <div className="flex gap-4 mt-4">
                {productData.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    onClick={() => setSelectedImage(img)}
                    className={`h-20 w-20 object-cover rounded-md cursor-pointer border ${selectedImage === img ? "border-black" : "border-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-5">
              <h1 className="text-3xl font-bold">{productData.title}</h1>

              <p className="text-gray-500">
                Brand: <span className="font-medium">{productData.brand}</span>
              </p>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-green-600">
                  ${discountedPrice}
                </span>
                <span className="line-through text-gray-400">
                  ${productData.price}
                </span>
                <span className="text-red-500">
                  ({productData.discountPercentage}% OFF)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⭐</span>
                <span>{productData.rating}</span>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {productData.description}
              </p>

              <div className="space-y-2 text-sm text-gray-600">
                <p>📦 Stock: {productData.stock}</p>
                <p>🚚 {productData.shippingInformation}</p>
                <p>🔁 {productData.returnPolicy}</p>
                <p>🛡 {productData.warrantyInformation}</p>
              </div>

              <div className="flex gap-4 mt-6">
                {
                  isCartProduct ? (<Link to={'/cart'} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">Go to cart</Link>) :
                    (
                      <button onClick={handleCart}
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                        Add to Cart
                      </button>
                    )
                }


                <button
                  onClick={handleWishlist}
                  style={{
                    backgroundColor: isProductInWishlist ? "#D62828" : "white",
                    borderColor: isProductInWishlist ? "transparent" : "black",
                    color: isProductInWishlist ? "white" : "black",
                    width: "50%",
                  }}
                  className="border border-black px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                  {isProductInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <ProductReviews reviews={productData.reviews} />

        </div>
      )}
    </>
  );
};

export default Pdp;