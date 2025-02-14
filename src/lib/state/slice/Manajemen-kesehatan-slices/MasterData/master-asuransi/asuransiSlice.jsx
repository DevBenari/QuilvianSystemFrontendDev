import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchAsuransi = createAsyncThunk(
  "Asuransi/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/Asuransi", {
        headers: getHeaders(),
      });
      return response.data.data; // Ambil data dari response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data Asuransi"
      );
    }
  }
);

// 🔹 Fetch Asuransi berdasarkan ID
export const fetchAsuransiById = createAsyncThunk(
  "Asuransi/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Asuransi/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Ambil data dari response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Gagal mengambil data Asuransi berdasarkan ID"
      );
    }
  }
);

// 🔹 Tambah Asuransi
export const createAsuransi = createAsyncThunk(
  "Asuransi/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Asuransi", data, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menambahkan data Asuransi"
      );
    }
  }
);

// 🔹 Update Asuransi
export const updateAsuransi = createAsyncThunk(
  "Asuransi/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Asuransi/${id}`, data, {
        headers: getHeaders(),
      });
      // Pastikan responsnya adalah array, ambil objek pertama
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        return (
          response.data.data.find((item) => item.asuransiId === id) || null
        );
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data Asuransi"
      );
    }
  }
);

// 🔹 Hapus Asuransi
export const deleteAsuransi = createAsyncThunk(
  "Asuransi/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Asuransi/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus data Asuransi"
      );
    }
  }
);

// 🔹 Slice Asuransi

// Slice
const asuransiSlice = createSlice({
  name: "asuransi",
  initialState: {
    data: [],
    selectedAsuransi: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsuransi.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsuransi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Pastikan mengambil data sebagai array langsung
      })
      .addCase(fetchAsuransi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAsuransiById.pending, (state) => {
        state.selectedAsuransi = null;
      })
      .addCase(fetchAsuransiById.fulfilled, (state, action) => {
        state.selectedAsuransi = action.payload; // Simpan hanya satu objek
      })
      .addCase(createAsuransi.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAsuransi.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.AsuransiId === action.payload.AsuransiId
        );

        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }

        if (state.selectedAsuransi?.AsuransiId === action.payload.AsuransiId) {
          state.selectedAsuransi = {
            ...state.selectedAsuransi,
            ...action.payload,
          };
        }
      })
      .addCase(deleteAsuransi.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.AsuransiId !== action.payload
        );
      });
  },
});

export default asuransiSlice.reducer;
