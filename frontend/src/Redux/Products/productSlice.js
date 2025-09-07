import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productAction";

const initialState = {
    allProducts: [],  // store original data
    products: [],
    status: "idle",
    error: ""
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        filterProducts: (state, action) => {
            const filteredData = state.allProducts.filter((elem) => {
                return elem.category_id === action.payload.selectedCategory.id;
            });
            state.products = filteredData;
        },
        filterByPrice: (state, action) => {
            const filteredData = state.allProducts.filter((elem) => {
                return elem.price >= action.payload.minPriceLimit &&
                       elem.price <= action.payload.maxPriceLimit;
            });
            state.products = filteredData;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = "Loading...";
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = "Success.";
                state.allProducts = action.payload;   // save original products
                state.products = action.payload;      // also show initially
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = "Rejected!";
                state.error = action.error.message;
            });
    }
});

export const { filterProducts, filterByPrice } = productSlice.actions;
export default productSlice.reducer;
