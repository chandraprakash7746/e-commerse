import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productDataMap: {},
    homePageMap: {},
    categoryMap: {},
    wishlistData: {},
    cartMap: {},
    // categoryMap{
    //     grocery : [{}{}],
    //     furniture : [......],
    // }
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProductDataById: (state, action) => {
            // const productData = action.payload; // idher hum sir ek product ke data ko store me 
            // save kr rahe he but hum chahte heki ek nhi sare products ka data save ho. to hum  for 
            // loop ki help se ise array me store kra lege now update "productData" to productDataArr
            //  state.productDataMap[productData.id] = productData;

            const productDataArray = action.payload
            for (let i = 0; i < productDataArray.length; i++) {
                const productData = productDataArray[i];
                state.productDataMap[productData.id] = productData;
            }

        },
        addProductsArrayByPage: (state, action) => {
            // payload sturcture --->  { pageNumber :1 , productArray : [{},{}]}
            const pageNumber = action.payload.pageNumber;
            const productArray = action.payload.productArray;
            state.homePageMap[pageNumber] = productArray;
        },
        addCategoryWiseItem: (state, action) => {
            // payload structure --> {category : Grocery, ProductArr :[{}{}]}
            const category = action.payload.category;
            const productArr = action.payload.productArr;
            state.categoryMap[category] = productArr;

        },
        addToWishlist: (state, action) => {
            const productData = action.payload
            state.wishlistData[productData.id] = productData;
        },
        removeFromWishlist: (state, action) => {
            const id = action.payload
            delete state.wishlistData[id];
        },
        addToCart: (state, action) => {
            const productData = action.payload;
            const id = productData.id;
            const isProductInCart = state.cartMap?.[id];

            if (isProductInCart) {
                // state.cartMap?.[id]?.quantity =+ 1;
                state.cartMap[id].quantity += 1;
            } else {
                state.cartMap[productData.id] = {
                    data: productData,
                    quantity: 1,
                };
            }
        },
        decreaseQuantityOfCart: (state, action) => {
            const id = action.payload;
            const isProductInCart = state.cartMap?.[id];
            if (isProductInCart) {
                if (isProductInCart.quantity == 1) {
                    delete state.cartMap[id];
                } else {
                    state.cartMap[id].quantity -= 1;
                }
            }

        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const isProductInCart = state.cartMap?.[id]; // check data present in cartMap or not

            if (isProductInCart) {
                delete state.cartMap[id];
            }
        }
    },
})

export const { addProductDataById, addProductsArrayByPage,
    addCategoryWiseItem, addToWishlist, removeFromWishlist, addToCart,
    decreaseQuantityOfCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;