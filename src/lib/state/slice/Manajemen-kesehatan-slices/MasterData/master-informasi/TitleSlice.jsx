import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchTitle = createAsyncThunk(
  "title/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Title`, {
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

export const fetchTitleWithFilters = createAsyncThunk(
  "Title/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Title/paged`, {
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

export const fetchTitleById = createAsyncThunk(
  "titles/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Title/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data title berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createTitle = createAsyncThunk(
  "titles/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Title", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data title";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateTitle = createAsyncThunk(
  "titles/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Title/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data title";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteTitle = createAsyncThunk(
  "titles/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Title/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data title";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const titleSlice = createSlice({
  name: "titles",
  initialState: {
    data: [],
    selectedTitle: null,
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTitle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTitle.fulfilled, (state, action) => {
        console.log("API Response Data:", action.payload);
        state.loading = false;
        state.data = action.payload.data || []; // Menyimpan daftar golongan darah
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.currentPage || 1;
      })
      .addCase(fetchTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil data";
      })

      // ✅ Fetch Title dengan search & filter (CustomSearchFilter)
      .addCase(fetchTitleWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTitleWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchTitleWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      .addCase(fetchTitleById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTitleById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTitle = action.payload;
      })
      .addCase(fetchTitleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTitle.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload);
        }
      })
      .addCase(updateTitle.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (title) => title.titleId === action.payload.titleId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteTitle.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (title) => title.titleId !== action.payload
        );
      });
  },
});

export default titleSlice.reducer;
