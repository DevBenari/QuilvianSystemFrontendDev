import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchKodePos = createAsyncThunk(
  "KodePos/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`Wilayah/KodePos`, {
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

export const fetchKodePosWithFilters = createAsyncThunk(
  "KodePos/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`Wilayah/PagedKodePos`, {
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

export const fetchKodePosById = createAsyncThunk(
  "KodePos/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`Wilayah/KodePosById/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data KodePos berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createKodePos = createAsyncThunk(
  "KodePos/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("Wilayah/KodePos", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data Kode Pos";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateKodePos = createAsyncThunk(
  "KodePos/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`Wilayah/KodePos/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data Kode Pos";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteKodePos = createAsyncThunk(
  "KodePos/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`Wilayah/KodePos/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data Kode Pos";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const KodePosSlice = createSlice({
  name: "KodePos",
  initialState: {
    data: [],
    selectedKodePos: null,
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKodePos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKodePos.fulfilled, (state, action) => {
        console.log("API Response Data:", action.payload);
        state.loading = false;
        state.data = action.payload.data || []; // Menyimpan daftar golongan darah
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.currentPage || 1;
      })
      .addCase(fetchKodePos.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch KodePos dengan search & filter (CustomSearchFilter)
      .addCase(fetchKodePosWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKodePosWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchKodePosWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      .addCase(fetchKodePosById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchKodePosById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedKodePos = action.payload;
      })
      .addCase(fetchKodePosById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createKodePos.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload);
        }
      })
      .addCase(updateKodePos.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (KodePos) => KodePos.kodePosId === action.payload.kodePosId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteKodePos.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (KodePos) => KodePos.kodePosId !== action.payload
        );
      });
  },
});

export default KodePosSlice.reducer;
