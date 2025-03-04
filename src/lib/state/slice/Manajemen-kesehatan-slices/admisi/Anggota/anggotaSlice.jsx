import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch semua Anggota
export const fetchAnggota = createAsyncThunk(
  "anggota/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Keanggotaan`, {
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

// 🔹 Fetch Anggota berdasarkan ID
export const fetchAnggotaById = createAsyncThunk(
  "anggota/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Keanggotaan/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Ambil data dari response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Gagal mengambil data Keanggotaan berdasarkan ID"
      );
    }
  }
);

export const fetchAnggotaWithFilters = createAsyncThunk(
  "Anggota/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Keanggotaan/paged`, {
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

// 🔹 Tambah Anggota
export const createAnggota = createAsyncThunk(
  "anggota/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Keanggotaan", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menambahkan data Keanggotaan"
      );
    }
  }
);

// 🔹 Update Anggota
export const updateAnggota = createAsyncThunk(
  "anggota/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Keanggotaan/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data Keanggotaan"
      );
    }
  }
);

// 🔹 Hapus Anggota
export const deleteAnggota = createAsyncThunk(
  "anggota/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Keanggotaan/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus data Keanggotaan"
      );
    }
  }
);

// 🔹 Slice Anggota
const anggotaSlice = createSlice({
  name: "anggota",
  initialState: {
    data: [], // Data harus berupa array, bukan { data: [] }
    selectedAnggota: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnggota.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnggota.fulfilled, (state, action) => {
        console.log("API Response Data:", action.payload);
        state.loading = false;
        state.data = action.payload.data || []; // Menyimpan daftar golongan darah
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.currentPage || 1;
      })
      .addCase(fetchAnggota.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil data";
      })

      // ✅ Fetch Anggota dengan search & filter (CustomSearchFilter)
      .addCase(fetchAnggotaWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnggotaWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchAnggotaWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      .addCase(fetchAnggotaById.pending, (state) => {
        state.selectedAnggota = null;
      })
      .addCase(fetchAnggotaById.fulfilled, (state, action) => {
        state.selectedAnggota = action.payload;
      })
      .addCase(createAnggota.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAnggota.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.keanggotaanId === action.payload.keanggotaanId
        );

        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }

        if (
          state.selectedAnggota?.keanggotaanId === action.payload.keanggotaanId
        ) {
          state.selectedAnggota = {
            ...state.selectedAnggota,
            ...action.payload,
          };
        }
      })
      .addCase(deleteAnggota.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.keanggotaanId !== action.payload
        );
      });
  },
});

export default anggotaSlice.reducer;
