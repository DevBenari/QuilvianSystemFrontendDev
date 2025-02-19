import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

export const fetchKelurahanByKecamatan = createAsyncThunk("kelurahan/fetchKelurahanByKecamatan", async (kecamatanId, { rejectWithValue }) => {
    try {
        const response = await InstanceAxios.get(`/Wilayah/Kelurahan`, { headers: getHeaders() });
        return response.data.data.filter(item => item.kecamatanId === kecamatanId);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Gagal mengambil data kelurahan");
    }
});

const kelurahanSlice = createSlice({
    name: "kelurahan",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchKelurahanByKecamatan.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchKelurahanByKecamatan.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(fetchKelurahanByKecamatan.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
});

export default kelurahanSlice.reducer;
