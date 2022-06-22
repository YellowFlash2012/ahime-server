import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState = {
    products: [],
    loading: false,
    product:{reviews:[]},
    error:""
}

export const getAllProducts = createAsyncThunk("allProducts/getAllProducts", async (_, thunkAPI) => {
    try {
        const { data } = axios.get("/api/products");

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue("There was an error fetching the products")
    }
})

const productsSlice = createSlice({ name: "allProducts", initialState, reducers: {}, extraReducers: {} })



export default productsSlice.reducer