import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 Fetch semua data Golongan Darah dengan pagination
export const fetchGolongan = createAsyncThunk(
  "golongan/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/GolonganDarah`, {
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

export const fetchGolonganDarahWithFilters = createAsyncThunk(
  "golonganDarah/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/GolonganDarah/paged`, {
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

// 🔹 Fetch Golongan Darah berdasarkan ID
export const fetchGolonganById = createAsyncThunk(
  "golongan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/GolonganDarah/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Mengembalikan data golongan darah berdasarkan ID
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal mengambil data golongan darah"
      );
    }
  }
);

// 🔹 Tambah Golongan Darah
export const createGolongan = createAsyncThunk(
  "golongan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/GolonganDarah`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan golongan darah"
      );
    }
  }
);

// 🔹 Update Golongan Darah berdasarkan ID
export const updateGolongan = createAsyncThunk(
  "golongan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/GolonganDarah/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui golongan darah"
      );
    }
  }
);

// 🔹 Hapus Golongan Darah berdasarkan ID
export const deleteGolongan = createAsyncThunk(
  "golongan/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/GolonganDarah/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus golongan darah"
      );
    }
  }
);

// 🔹 Redux Slice
const golonganSlice = createSlice({
  name: "golongan",
  initialState: {
    data: [],
    selectedGolongan: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGolongan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGolongan.fulfilled, (state, action) => {
        console.log("API Response Data:", action.payload);
        state.loading = false;
        state.data = action.payload.data || []; // Menyimpan daftar golongan darah
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.currentPage || 1;
      })
      .addCase(fetchGolongan.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch agama dengan search & filter (CustomSearchFilter)
      .addCase(fetchGolonganDarahWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGolonganDarahWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchGolonganDarahWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchGolonganById.pending, (state) => {
        state.loading = true;
        state.selectedGolongan = null;
      })
      .addCase(fetchGolonganById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGolongan = action.payload;
      })
      .addCase(fetchGolonganById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Golongan Darah
      .addCase(createGolongan.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update Golongan Darah
      .addCase(updateGolongan.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (golongan) =>
            golongan.golonganDarahId === action.payload.golonganDarahId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus Golongan Darah
      .addCase(deleteGolongan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (golongan) => golongan.golonganDarahId !== action.payload
        );
      });
  },
});

export default golonganSlice.reducer;
