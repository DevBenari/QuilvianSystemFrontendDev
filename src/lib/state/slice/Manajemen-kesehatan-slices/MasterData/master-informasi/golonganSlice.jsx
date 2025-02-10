import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// CRUD

export const fetchGolongan = createAsyncThunk("golongan/fetch", async (_,{ rejectWithValue }) => {
  try{
    const response = await InstanceAxios.get(`/GolonganDarah`, { headers: getHeaders() });
    return response.data;
  }catch(error){
     // Cek apakah ada response dari server atau error lain
     const errorMessage = error.response?.data?.message || "Gagal Mengambil Data Golongan Darah";
     return rejectWithValue(errorMessage);
  }
});

export const createGolongan = createAsyncThunk(
  "golongan/create",
  async (data,{ rejectWithValue }) => {
    try{
      const response = await InstanceAxios.post(`/GolonganDarah`, data, { headers: getHeaders() });
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal create data golongan darah";
     return rejectWithValue(errorMessage);
    }
  }
);

export const updateGolongan = createAsyncThunk("golongan/update", async ({ id, data },{ rejectWithValue }) => {
    try{
      const response = await InstanceAxios.put(`/GolonganDarah/${id}`, data, {headers: getHeaders()});
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal mengupdate data agama";
     return rejectWithValue(errorMessage);
    }
  }
);

export const deleteGolongan = createAsyncThunk(
  "golongan/delete",
  async (id,{ rejectWithValue }) => {
    try{
      const response = await InstanceAxios.delete(`/GolonganDarah/${id}`, { headers: getHeaders() });
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal delete data agama";
      return rejectWithValue(errorMessage);
    }
  }
);

// slice

const golonganSlice = createSlice({
  name: "golongan",
  initialState: {
    data: { data: [] },
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGolongan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGolongan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGolongan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createGolongan.fulfilled, (state, action) => {
        state.data.data.push(action.payload);
      })
      .addCase(updateGolongan.fulfilled, (state, action) => {
        const index = state.data.data.findIndex(
          (golongan) => golongan.golonganId === action.payload.golonganId
        );
        if (index !== -1) {
          state.data.data[index] = action.payload;
        }
      })

      .addCase(deleteGolongan.fulfilled, (state, action) => {
        state.data.data = state.data.data.filter(
          (golongan) => golongan.golonganId !== action.payload
        );
      });
  },
});

export default golonganSlice.reducer;
