import { createAsyncThunk } from "@reduxjs/toolkit";


export const getCategories = createAsyncThunk(
    'getCategories',
    ()=>{
        const categories = fetch("http://localhost:5000/api/categories")
        .then((res)=>res.json());
        return categories;
    }
)