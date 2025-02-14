import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";

const API_URL = "http://192.168.15.213:589/api/Pekerjaan";

// ========== Async Thunks ==========

// Fetch semua pekerjaan
export const fetchPekerjaan = createAsyncThunk(
  "pekerjaan/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { headers: getHeaders() });
      return response.data; // Kembalikan array data pekerjaan
    } catch (err) {
      return rejectWithValue("Gagal mengambil data pekerjaan");
    }
  }
);

// Fetch pekerjaan berdasarkan ID
export const fetchPekerjaanById = createAsyncThunk(
  "pekerjaan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue("Gagal mengambil data pekerjaan berdasarkan ID");
    }
  }
);

// Tambah pekerjaan baru
export const createPekerjaan = createAsyncThunk(
  "pekerjaan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue("Gagal menambahkan data pekerjaan");
    }
  }
);

// Update pekerjaan berdasarkan ID
export const updatePekerjaan = createAsyncThunk(
  "pekerjaan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue("Gagal mengupdate data pekerjaan");
    }
  }
);

// Hapus pekerjaan berdasarkan ID
export const deletePekerjaan = createAsyncThunk(
  "pekerjaan/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
      return id; // Kembalikan ID pekerjaan yang dihapus
    } catch (err) {
      return rejectWithValue("Gagal menghapus data pekerjaan");
    }
  }
);

// ========== Redux Slice ==========

const pekerjaanSlice = createSlice({
  name: "pekerjaan",
  initialState: {
    data: [], // Menyimpan daftar pekerjaan
    selectedPekerjaan: null, // Menyimpan pekerjaan berdasarkan ID
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch semua pekerjaan
      .addCase(fetchPekerjaan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPekerjaan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
      })
      .addCase(fetchPekerjaan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch pekerjaan berdasarkan ID
      .addCase(fetchPekerjaanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPekerjaanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPekerjaan = action.payload;
      })
      .addCase(fetchPekerjaanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah pekerjaan baru
      .addCase(createPekerjaan.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update pekerjaan
      .addCase(updatePekerjaan.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.pekerjaanId === action.payload.pekerjaanId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus pekerjaan
      .addCase(deletePekerjaan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.pekerjaanId !== action.payload
        );
      });
  },
});

export default pekerjaanSlice.reducer;
