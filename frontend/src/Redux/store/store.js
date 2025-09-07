import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../Category/categorySlice";
import productReducer from "../Products/productSlice"; 
import cartReducer from "../Cart/cartSlice"; 


export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
