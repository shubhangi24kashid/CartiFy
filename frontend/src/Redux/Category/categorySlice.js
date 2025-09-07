import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./actions";

const initialState = {
  categories: [],
  status: "idle",   // idle | loading | success | failed
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
extraReducers: (builder) => {
  builder
    .addCase(getCategories.pending, (state) => {
      state.status = "Loading...";
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.status = "Success";
      state.categories = action.payload;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.status = "Failed!";
      state.error = action.error.message;
    });
}

});

export default categorySlice.reducer;
