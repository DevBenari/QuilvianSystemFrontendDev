import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchSuku = createAsyncThunk(
  "Suku/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Suku`, {
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

export const fetchSukuWithFilters = createAsyncThunk(
  "Suku/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Suku/paged`, {
        params: filters,
        headers: getHeaders(),
      });

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

export const fetchSukuById = createAsyncThunk(
  "Suku/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Suku/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data Suku berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createSuku = createAsyncThunk(
  "Suku/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Suku", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data Suku";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateSuku = createAsyncThunk(
  "Suku/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Suku/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data Suku";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteSuku = createAsyncThunk(
  "Suku/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Suku/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data Suku";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const SukuSlice = createSlice({
  name: "Suku",
  initialState: {
    data: [],
    selectedSuku: null,
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuku.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuku.fulfilled, (state, action) => {
        console.log("API Response Data:", action.payload);
        state.loading = false;
        state.data = action.payload.data || []; // Menyimpan daftar golongan darah
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.currentPage || 1;
      })
      .addCase(fetchSuku.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch Suku dengan search & filter (CustomSearchFilter)
      .addCase(fetchSukuWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSukuWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchSukuWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      .addCase(fetchSukuById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSukuById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSuku = action.payload;
      })
      .addCase(fetchSukuById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createSuku.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload);
        }
      })
      .addCase(updateSuku.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Suku) => Suku.SukuId === action.payload.SukuId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteSuku.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Suku) => Suku.SukuId !== action.payload
        );
      });
  },
});

export default SukuSlice.reducer;
