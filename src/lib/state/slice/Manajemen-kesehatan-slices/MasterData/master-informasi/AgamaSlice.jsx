import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch agama dengan pagination untuk CustomTableComponent
export const fetchAgamaPaged = createAsyncThunk(
  "agama/fetchPaged",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Agama/paged`, {
        params: { page, perPage },
        headers: getHeaders(),
      });

      console.log("Response API (Paged):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

// 🔹 Fetch agama dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchAgamaWithFilters = createAsyncThunk(
  "agama/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Agama/paged`, {
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

// 🔹 Fetch data agama berdasarkan ID
export const fetchAgamaById = createAsyncThunk(
  "agama/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Agama/${id}`, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

// 🔹 Tambah Agama Darah
export const createAgama = createAsyncThunk(
  "agama/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Agama`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Agama darah"
      );
    }
  }
);

// 🔹 Update Agama Darah berdasarkan ID
export const updateAgama = createAsyncThunk(
  "agama/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Agama`, newData, {
        headers: getHeaders(),
      });

      console.log("Response API (Add):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui Agama "
      );
    }
  }
);

export const deleteAgama = createAsyncThunk(
  "agama/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/Agama/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Gagal menghapus Agama");
    }
  }
);

// 🔹 Redux Slice
// 🔹 Redux Slice
const agamaSlice = createSlice({
  name: "agama",
  name: "agama",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch agama hanya dengan pagination (CustomTableComponent)
      .addCase(fetchAgamaPaged.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAgamaPaged.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data?.rows || []; // Ambil data dari `rows`
        state.totalItems = action.payload?.data?.totalRows || 0;
        state.totalPages = action.payload?.data?.totalPages || 1;
        state.currentPage = action.payload?.data?.currentPage || 1;
      })
      .addCase(fetchAgamaPaged.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil data";
      })

      // ✅ Fetch agama dengan search & filter (CustomSearchFilter)
      .addCase(fetchAgamaWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgamaWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchAgamaWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchAgamaById.pending, (state) => {
        state.loading = true;
        state.selectedAgama = null;
      })
      .addCase(fetchAgamaById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAgama = action.payload;
      })
      .addCase(fetchAgamaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Agama Darah
      .addCase(createAgama.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update Agama Darah
      .addCase(updateAgama.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (agama) => agama.agamaId === action.payload.agamaId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus agama Darah
      .addCase(deleteAgama.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (agama) => agama.agamaId !== action.payload
        );
      });
  },
});

export default agamaSlice.reducer;
