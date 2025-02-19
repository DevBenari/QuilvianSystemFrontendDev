import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch Provinsi
export const fetchProvinsi = createAsyncThunk(
  "Provinsi/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Wilayah/Provinsi`, {
        params: { page, perPage },
        headers: getHeaders(),
      });

      console.log("✅ Response API Provinsi:", response.data);
      return response.data; // Tidak perlu mengambil `.rows`, karena data sudah langsung di dalam `data`
    } catch (error) {
      console.error("❌ Error API Provinsi:", error);
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

export const fetchProvinsiWithFilters = createAsyncThunk(
  "Provinsi/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/PagedProvinsi`, {
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

export const fetchProvinsiById = createAsyncThunk(
  "Provinsi/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Wilayah/ProvinsiById/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data Provinsi berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createProvinsi = createAsyncThunk(
  "Provinsi/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Wilayah/Provinsi", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data Provinsi";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProvinsi = createAsyncThunk(
  "Provinsi/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("📢 PUT Request ke API:", `/Wilayah/Provinsi/${id}`, data);

      const response = await InstanceAxios.put(
        `/Wilayah/Provinsi/${id}`,
        data,
        {
          headers: getHeaders(),
        }
      );

      console.log("✅ Response API Update Provinsi:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Gagal Update API:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data Provinsi"
      );
    }
  }
);

export const deleteProvinsi = createAsyncThunk(
  "Provinsi/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Wilayah/Provinsi/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data Provinsi";
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Redux Slice untuk Provinsi
const ProvinsiSlice = createSlice({
  name: "Provinsi",
  initialState: {
    data: [], // Data diubah menjadi array kosong agar mudah dikelola
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    selectedProvinsi: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvinsi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvinsi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload?.data)
          ? action.payload.data
          : []; // ✅ Pastikan data adalah array
        state.totalItems = action.payload?.pagination?.totalRows || 0;
        state.totalPages = action.payload?.pagination?.totalPages || 1;
        state.currentPage = action.payload?.pagination?.currentPage || 1;
      })
      .addCase(fetchProvinsi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil data";
      })

      // ✅ Fetch dengan search & filter
      .addCase(fetchProvinsiWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvinsiWithFilters.fulfilled, (state, action) => {
        state.loading = false;

        console.log("🔍 Debugging Filtered Data:", action.payload);

        if (Array.isArray(action.payload.data)) {
          state.data = action.payload.data;
        } else if (Array.isArray(action.payload.data?.rows)) {
          state.data = action.payload.data.rows;
        } else {
          state.data = [];
        }

        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.currentPage || 1;
      })
      .addCase(fetchProvinsiWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      .addCase(fetchProvinsiById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProvinsiById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProvinsi = action.payload;
      })
      .addCase(fetchProvinsiById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createProvinsi.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      .addCase(updateProvinsi.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.provinsiId === action.payload.provinsiId
        );
      })

      .addCase(deleteProvinsi.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.ProvinsiId !== action.payload
        );
      });
  },
});

export default ProvinsiSlice.reducer;
