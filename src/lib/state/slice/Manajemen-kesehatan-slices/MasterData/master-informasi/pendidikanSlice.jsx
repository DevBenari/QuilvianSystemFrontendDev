import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchPendidikan = createAsyncThunk(
  "pendidikan/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Pendidikan`, {
        params: { page, perPage },
        headers: getHeaders(),
      });

      console.log("Response API:", response.data);
      return response.data; // Pastikan API mengembalikan struktur data yang benar
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

export const fetchPendidikanWithFilters = createAsyncThunk(
  "Pendidikan/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Pendidikan/paged`, {
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

export const fetchPendidikanById = createAsyncThunk(
  "pendidikan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Pendidikan/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Ambil data dari properti 'data'
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data pendidikan berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);
export const createPendidikan = createAsyncThunk(
  "pendidikan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Pendidikan", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data pendidikan";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updatePendidikan = createAsyncThunk(
  "pendidikan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Pendidikan/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data pendidikan";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deletePendidikan = createAsyncThunk(
  "pendidikan/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Pendidikan/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data pendidikan";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const pendidikanSlice = createSlice({
  name: "pendidikan",
  initialState: {
    data: [],
    selectedPendidikan: null, // Menyimpan data pendidikan berdasarkan ID
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  },
  extraReducers: (builder) => {
    builder
      // Fetch semua data pendidikan
      .addCase(fetchPendidikan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendidikan.fulfilled, (state, action) => {
        console.log("API Response Data:", action.payload);
        state.loading = false;
        state.data = action.payload.data || []; // Menyimpan daftar golongan darah
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.currentPage || 1;
      })
      .addCase(fetchPendidikan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil data";
      })

      // ✅ Fetch Pendidikan dengan search & filter (CustomSearchFilter)
      .addCase(fetchPendidikanWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendidikanWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchPendidikanWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch data pendidikan berdasarkan ID
      .addCase(fetchPendidikanById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendidikanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPendidikan = action.payload;
      })
      .addCase(fetchPendidikanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Tambah data pendidikan baru
      .addCase(createPendidikan.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload);
        }
      })

      // Update data pendidikan
      .addCase(updatePendidikan.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (pendidikan) =>
            pendidikan.pendidikanId === action.payload.pendidikanId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus data pendidikan
      .addCase(deletePendidikan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (pendidikan) => pendidikan.pendidikanId !== action.payload
        );
      });
  },
});

export default pendidikanSlice.reducer;
