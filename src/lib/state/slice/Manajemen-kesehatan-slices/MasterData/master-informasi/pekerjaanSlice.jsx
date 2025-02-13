import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHeaders } from "@/lib/headers/headers";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";

// ========== Async Thunks ==========

// Fetch semua pekerjaan
export const fetchPekerjaan = createAsyncThunk(
  "pekerjaan/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Pekerjaan`, { headers: getHeaders() });
      return response.data;

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal mengambil data pekerjaan";
       return rejectWithValue(errorMessage);
    }
  }
);

// Fetch pekerjaan berdasarkan ID
export const fetchPekerjaanById = createAsyncThunk(
  "pekerjaan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response= await InstanceAxios.get(`/Pekerjaan/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal mengambil data pekerjaan berdasarkan ID";
       return rejectWithValue(errorMessage);
    }
  }
);

// Tambah pekerjaan baru
export const createPekerjaan = createAsyncThunk(
  "pekerjaan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Pekerjaan`, data, { 
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal menambahkan data pekerjaan berdasarkan ID";
       return rejectWithValue(errorMessage);
    }
  }
);

// Update pekerjaan berdasarkan ID
export const updatePekerjaan = createAsyncThunk(
  "pekerjaan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Pekerjaan/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal menambahkan data pekerjaan berdasarkan ID";
       return rejectWithValue(errorMessage);
    }
  }
);

// Hapus pekerjaan berdasarkan ID
export const deletePekerjaan = createAsyncThunk(
  "pekerjaan/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/Pekerjaan/${id}`, { headers: getHeaders() });
      return response.data; // Kembalikan ID pekerjaan yang dihapus
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal menghapus data pekerjaan berdasarkan ID";
       return rejectWithValue(errorMessage);
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
