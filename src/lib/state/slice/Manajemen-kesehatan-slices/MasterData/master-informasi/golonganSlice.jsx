import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// CRUD Thunks
export const fetchGolongan = createAsyncThunk(
  "golongan/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/GolonganDarah`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal Mengambil Data Golongan Darah";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchGolonganById = createAsyncThunk(
  "golongan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/GolonganDarah/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Pastikan API mengembalikan data dalam properti 'data'
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data golongan darah berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createGolongan = createAsyncThunk(
  "golongan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/GolonganDarah`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal create data golongan darah";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateGolongan = createAsyncThunk(
  "golongan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/GolonganDarah/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data golongan darah";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteGolongan = createAsyncThunk(
  "golongan/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/GolonganDarah/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal delete data golongan darah";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const golonganSlice = createSlice({
  name: "golongan",
  initialState: {
    data: { data: [] },
    selectedGolongan: null,
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
        state.error = action.payload;
      })
      .addCase(fetchGolonganById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGolonganById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGolongan = action.payload;
      })
      .addCase(fetchGolonganById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGolongan.fulfilled, (state, action) => {
        state.data.data.push(action.payload);
      })
      .addCase(updateGolongan.fulfilled, (state, action) => {
        const index = state.data.data.findIndex(
          (golongan) =>
            golongan.golonganDarahId === action.payload.golonganDarahId
        );
        if (index !== -1) {
          state.data.data[index] = action.payload;
        }
      })
      .addCase(deleteGolongan.fulfilled, (state, action) => {
        state.data.data = state.data.data.filter(
          (golongan) => golongan.golonganDarahId !== action.payload
        );
      });
  },
});

export default golonganSlice.reducer;
