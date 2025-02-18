import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch semua Jabatan
export const fetchJabatan = createAsyncThunk(
  "jabatan/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Jabatan`, {
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

// 🔹 Fetch Jabatan berdasarkan ID
export const fetchJabatanById = createAsyncThunk(
  "jabatan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Jabatan/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Mengambil data dari response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Gagal mengambil data jabatan berdasarkan ID"
      );
    }
  }
);

// 🔹 Tambah Jabatan
export const createJabatan = createAsyncThunk(
  "jabatan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Jabatan", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menambahkan data jabatan"
      );
    }
  }
);

// 🔹 Update Jabatan
export const updateJabatan = createAsyncThunk(
  "jabatan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Jabatan/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data jabatan"
      );
    }
  }
);

// 🔹 Hapus Jabatan
export const deleteJabatan = createAsyncThunk(
  "jabatan/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Jabatan/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus data jabatan"
      );
    }
  }
);

// 🔹 Slice Jabatan
const jabatanSlice = createSlice({
  name: "jabatan",
  initialState: {
    data: [],
    selectedJabatan: null,
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJabatan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJabatan.fulfilled, (state, action) => {
        console.log("API Response Data:", action.payload);
        state.loading = false;
        state.data = action.payload.data || []; // Menyimpan daftar golongan darah
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.currentPage || 1;
      })
      .addCase(fetchJabatan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil data";
      })
      .addCase(fetchJabatanById.pending, (state) => {
        state.selectedJabatan = null;
      })
      .addCase(fetchJabatanById.fulfilled, (state, action) => {
        state.selectedJabatan = action.payload;
      })
      .addCase(createJabatan.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateJabatan.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.jabatanId === action.payload.jabatanId
        );
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }
      })
      .addCase(deleteJabatan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.jabatanId !== action.payload
        );
      });
  },
});

export default jabatanSlice.reducer;
