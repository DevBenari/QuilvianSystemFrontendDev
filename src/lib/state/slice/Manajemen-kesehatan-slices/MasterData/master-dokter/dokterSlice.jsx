import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch semua dokter
export const fetchDokter = createAsyncThunk(
  "dokter/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Dokter`, {
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

// 🔹 Fetch dokter berdasarkan ID
export const fetchDokterById = createAsyncThunk(
  "dokter/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Dokter/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Mengambil hanya bagian data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Gagal mengambil data dokter berdasarkan ID"
      );
    }
  }
);

// 🔹 Tambah dokter
export const createDokter = createAsyncThunk(
  "dokter/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Dokter", data, {
        headers: getHeaders(),
      });
      return response.data; // Mengambil hanya bagian data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menambahkan data dokter"
      );
    }
  }
);

// 🔹 Update dokter
export const updateDokter = createAsyncThunk(
  "dokter/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Dokter/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data; // Mengambil hanya bagian data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data dokter"
      );
    }
  }
);

// 🔹 Hapus dokter
export const deleteDokter = createAsyncThunk(
  "dokter/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Dokter/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus data dokter"
      );
    }
  }
);

// 🔹 Slice Dokter
const dokterSlice = createSlice({
  name: "dokter",
  initialState: {
    data: [],
    selectedDokter: null,
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDokter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDokter.fulfilled, (state, action) => {
        console.log("API Response Data:", action.payload);
        state.loading = false;
        state.data = action.payload.data || []; // Menyimpan daftar golongan darah
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.currentPage || 1;
      })
      .addCase(fetchDokter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil data";
      })
      // 🔹 Fetch by ID
      .addCase(fetchDokterById.pending, (state) => {
        state.selectedDokter = null;
      })
      .addCase(fetchDokterById.fulfilled, (state, action) => {
        state.selectedDokter = action.payload;
      })
      .addCase(createDokter.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateDokter.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (dokter) => dokter.dokterId === action.payload.dokterId
        );
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }
      })
      .addCase(deleteDokter.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (dokter) => dokter.dokterId !== action.payload
        );
      });
  },
});

export default dokterSlice.reducer;
