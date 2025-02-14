import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { getHeaders } from "@/lib/headers/headers";

export const GetIndentitasSlice = createAsyncThunk("identitas/getIdentitas", async(_, {rejectWithValue}) => {
    try{
        const response = await InstanceAxios.get(`/Identitas`, { headers: getHeaders() });
        // console.log(response.data.data)
        return response.data.data;
    }catch(error){
        const errorMessage = error.response?.data?.message || "Gagal mengambil data identitas";
        return rejectWithValue(errorMessage);
    }
})

const IdentitasSlice = createSlice({
    name: "identitas",
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetIndentitasSlice.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(GetIndentitasSlice.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(GetIndentitasSlice.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export default IdentitasSlice.reducer