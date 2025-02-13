import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

export const fetchKabupatenByProvinsi = createAsyncThunk("kabupaten/fetchKabupatenByProvinsi", async (provinsiId, { rejectWithValue }) => {
    try {
        const response = await InstanceAxios.get(`/Wilayah/Kabupaten`, { headers: getHeaders() });
        return response.data.filter(item => item.provinsiId === provinsiId);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Gagal mengambil data kabupaten");
    }
});

const kabupatenSlice = createSlice({
    name: "kabupaten",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchKabupatenByProvinsi.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchKabupatenByProvinsi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(fetchKabupatenByProvinsi.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
});

export default kabupatenSlice.reducer;
