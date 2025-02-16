import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getKecamatanSlice = createAsyncThunk("kecamatan/getKecamatan", async(_, {rejectWithValue}) => {
    try{    
        const response = await InstanceAxios.get(`/Wilayah/Kecamatan`, { headers: getHeaders() });
        console.log(response.data.data)
        return response.data;
    }catch(error){
        const errorMessage = error.response?.data?.message || "Gagal mengambil data kecamatan";
        return rejectWithValue(errorMessage);
    }
});

const kecamatanSlice = createSlice({
    name: "kecamatan",
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
          .addCase(getKecamatanSlice.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(getKecamatanSlice.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
          })
          .addCase(getKecamatanSlice.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          });
      },
})

export default kecamatanSlice.reducer;