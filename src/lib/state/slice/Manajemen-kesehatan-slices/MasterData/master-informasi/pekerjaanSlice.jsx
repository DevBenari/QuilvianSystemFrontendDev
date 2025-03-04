import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchPekerjaan = createAsyncThunk(
  "Pekerjaan/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Pekerjaan`, {
        params: { page, perPage },
        headers: getHeaders(),
      });
      return response.data; // Pastikan API mengembalikan struktur data yang benar
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

export const fetchPekerjaanWithFilters = createAsyncThunk(
  "Pekerjaan/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Pekerjaan/paged`, {
        params: filters,
        headers: getHeaders(),
      });

      console.log("Response API (Filtered):", response.data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return rejectWithValue({
          message: "Tidak ada data yang tersedia",
          data: [],
        });
      }
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

export const fetchPekerjaanById = createAsyncThunk(
  "pekerjaan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Pekerjaan/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Pastikan API mengembalikan data dalam properti 'data'
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data pekerjaan berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createPekerjaan = createAsyncThunk(
  "pekerjaan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Pekerjaan`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data pekerjaan";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updatePekerjaan = createAsyncThunk(
  "pekerjaan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Pekerjaan/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data pekerjaan";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deletePekerjaan = createAsyncThunk(
  "pekerjaan/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Pekerjaan/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data pekerjaan";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const pekerjaanSlice = createSlice({
  name: "pekerjaan",
  initialState: {
    data: [],
    selectedPekerjaan: null,
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPekerjaan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPekerjaan.fulfilled, (state, action) => {
        console.log("API Response Data:", action.payload);
        state.loading = false;
        state.data = action.payload.data || []; // Menyimpan daftar golongan darah
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.currentPage || 1;
      })
      .addCase(fetchPekerjaan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil data";
      })

      .addCase(fetchPekerjaanWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPekerjaanWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchPekerjaanWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      .addCase(fetchPekerjaanById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPekerjaanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPekerjaan = action.payload;
      })
      .addCase(fetchPekerjaanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPekerjaan.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload);
        }
      })

      .addCase(updatePekerjaan.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.pekerjaanId === action.payload.pekerjaanId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      .addCase(deletePekerjaan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.pekerjaanId !== action.payload
        );
      });
  },
});

export default pekerjaanSlice.reducer;
