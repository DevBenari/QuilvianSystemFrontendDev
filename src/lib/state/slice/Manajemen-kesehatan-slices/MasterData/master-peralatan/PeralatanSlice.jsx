import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch Peralatan dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data Peralatan dengan pagination
export const fetchPeralatan = createAsyncThunk(
  "Peralatan/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().Peralatan;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/Peralatan`, {
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

// 🔹 Fetch Peralatan dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchPeralatanWithFilters = createAsyncThunk(
  "Peralatan/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Peralatan/paged`, {
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

// 🔹 Fetch data Peralatan berdasarkan ID
export const fetchPeralatanById = createAsyncThunk(
  "Peralatan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Peralatan/${id}`, {
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

// 🔹 Tambah Peralatan Darah
export const createPeralatan = createAsyncThunk(
  "Peralatan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Peralatan`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Peralatan darah"
      );
    }
  }
);

// 🔹 Update Peralatan Darah berdasarkan ID
export const updatePeralatan = createAsyncThunk(
  "Peralatan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Peralatan/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui Peralatan darah"
      );
    }
  }
);

export const deletePeralatan = createAsyncThunk(
  "Peralatan/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/Peralatan/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus Peralatan"
      );
    }
  }
);

// 🔹 Redux Slice
const PeralatanSlice = createSlice({
  name: "Peralatan",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Peralatan hanya dengan pagination (CustomTableComponent)
      .addCase(fetchPeralatan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPeralatan.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) => existingItem.peralatanId === newItem.peralatanId
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
      .addCase(fetchPeralatan.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch Peralatan dengan search & filter (CustomSearchFilter)
      .addCase(fetchPeralatanWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPeralatanWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchPeralatanWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchPeralatanById.pending, (state) => {
        state.loading = true;
        state.selectedPeralatan = null;
      })
      .addCase(fetchPeralatanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPeralatan = action.payload;
      })
      .addCase(fetchPeralatanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Peralatan Darah
      .addCase(createPeralatan.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update Peralatan Darah
      .addCase(updatePeralatan.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Peralatan) => Peralatan.peralatanId === action.payload.peralatanId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus Peralatan Darah
      .addCase(deletePeralatan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Peralatan) => Peralatan.peralatanId !== action.payload
        );
      });
  },
});

export default PeralatanSlice.reducer;
