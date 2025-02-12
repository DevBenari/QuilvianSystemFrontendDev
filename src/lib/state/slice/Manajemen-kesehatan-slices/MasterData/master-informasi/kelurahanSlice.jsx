import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetKelurahanSlice = createAsyncThunk("kelurahan/getKelurahan", async(_, {rejectWithValue}) => {
    try{
        const response = await InstanceAxios.get(`/Kelurahan`, { headers: getHeaders() });
        return response.data;
    }catch(error){
        const errorMessage = error.response?.data?.message || "Gagal mengambil data kelurahan";
        return rejectWithValue(errorMessage);
    }
})

const kelurahanSlice = createSlice({
    name:"kelurahan",
    initialState:{
        data: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetKelurahanSlice.pending, (state) => {
            state.loading = true;
        })
        .addCase(GetKelurahanSlice.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(GetKelurahanSlice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default kelurahanSlice.reducer