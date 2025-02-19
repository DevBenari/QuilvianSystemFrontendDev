import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHeaders } from "@/lib/headers/headers";

export const GetProvinsiSlice = createAsyncThunk("provinsi/getProvinsi", async(_, {rejectWithValue}) => {
    try{
        const response = await InstanceAxios.get(`/Wilayah/Provinsi`, { headers: getHeaders() });
        return response.data;
    }catch(error){
        const errorMessage = error.response?.data?.message || "Gagal mengambil data provinsi";
        return rejectWithValue(errorMessage);
    }
})

const ProvinsiSlice = createSlice({
    name: "provinsi",
    initialState: {
        data: { data: [] },
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetProvinsiSlice.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(GetProvinsiSlice.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(GetProvinsiSlice.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }   
})

export default ProvinsiSlice.reducer