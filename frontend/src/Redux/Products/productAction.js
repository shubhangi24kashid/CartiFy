import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await fetch("http://localhost:5000/api/products")

    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  }
);
