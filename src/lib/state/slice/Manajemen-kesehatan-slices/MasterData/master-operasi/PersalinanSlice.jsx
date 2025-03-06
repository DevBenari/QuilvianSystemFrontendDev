import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch Persalinan dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data Persalinan dengan pagination
export const fetchPersalinan = createAsyncThunk(
  "Persalinan/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().Persalinan;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/Persalinan`, {
        params: { page, perPage },
        headers: getHeaders(),
      });

      return {
        data: response.data.data,
        pagination: response.data.pagination,
        page,
        meta: { arg: { page, isInfiniteScroll } },
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

// 🔹 Fetch Persalinan dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchPersalinanWithFilters = createAsyncThunk(
  "Persalinan/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Persalinan/paged`, {
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

// 🔹 Fetch data Persalinan berdasarkan ID
export const fetchPersalinanById = createAsyncThunk(
  "Persalinan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Persalinan/${id}`, {
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

// 🔹 Tambah Persalinan Darah
export const createPersalinan = createAsyncThunk(
  "Persalinan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Persalinan`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Persalinan "
      );
    }
  }
);

// 🔹 Update Persalinan Darah berdasarkan ID
export const updatePersalinan = createAsyncThunk(
  "Persalinan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Persalinan/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui Persalinan "
      );
    }
  }
);

export const deletePersalinan = createAsyncThunk(
  "Persalinan/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/Persalinan/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus Persalinan"
      );
    }
  }
);

// 🔹 Redux Slice
// 🔹 Redux Slice
const PersalinanSlice = createSlice({
  name: "Persalinan",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedPersalinan: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Persalinan hanya dengan pagination (CustomTableComponent)
      .addCase(fetchPersalinan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersalinan.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.persalinanId === newItem.persalinanId
            )
        );

        if (action.meta.arg.isInfiniteScroll) {
          // Infinite scroll - append data
          state.data = [...state.data, ...newData];
          state.loadedPages.push(action.payload.page);
        } else {
          // Regular pagination - replace data
          state.data = action.payload.data;
        }

        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.meta.arg.page;
      })
      .addCase(fetchPersalinan.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch Persalinan dengan search & filter (CustomSearchFilter)
      .addCase(fetchPersalinanWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersalinanWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchPersalinanWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchPersalinanById.pending, (state) => {
        state.loading = true;
        state.selectedPersalinan = null;
      })
      .addCase(fetchPersalinanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPersalinan = action.payload;
      })
      .addCase(fetchPersalinanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Persalinan Darah
      .addCase(createPersalinan.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update Persalinan Darah
      .addCase(updatePersalinan.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Persalinan) =>
            Persalinan.persalinanId === action.payload.persalinanId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus Persalinan Darah
      .addCase(deletePersalinan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Persalinan) => Persalinan.persalinanId !== action.payload
        );
      });
  },
});

export default PersalinanSlice.reducer;
