import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch KategoriPeralatan dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data KategoriPeralatan dengan pagination
export const fetchKategoriPeralatan = createAsyncThunk(
  "KategoriPeralatan/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().KategoriPeralatan;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/KategoriPeralatan`, {
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

// 🔹 Fetch KategoriPeralatan dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchKategoriPeralatanWithFilters = createAsyncThunk(
  "KategoriPeralatan/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/KategoriPeralatan/paged`, {
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

// 🔹 Fetch data KategoriPeralatan berdasarkan ID
export const fetchKategoriPeralatanById = createAsyncThunk(
  "KategoriPeralatan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/KategoriPeralatan/${id}`, {
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

// 🔹 Tambah KategoriPeralatan Darah
export const createKategoriPeralatan = createAsyncThunk(
  "KategoriPeralatan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/KategoriPeralatan`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan KategoriPeralatan darah"
      );
    }
  }
);

// 🔹 Update KategoriPeralatan Darah berdasarkan ID
export const updateKategoriPeralatan = createAsyncThunk(
  "KategoriPeralatan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(
        `/KategoriPeralatan/${id}`,
        data,
        {
          headers: getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui KategoriPeralatan darah"
      );
    }
  }
);

export const deleteKategoriPeralatan = createAsyncThunk(
  "KategoriPeralatan/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/KategoriPeralatan/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus KategoriPeralatan"
      );
    }
  }
);

// 🔹 Redux Slice
const KategoriPeralatanSlice = createSlice({
  name: "KategoriPeralatan",
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
      // ✅ Fetch KategoriPeralatan hanya dengan pagination (CustomTableComponent)
      .addCase(fetchKategoriPeralatan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKategoriPeralatan.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.kategoriPeralatanId === newItem.kategoriPeralatanId
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
      .addCase(fetchKategoriPeralatan.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch KategoriPeralatan dengan search & filter (CustomSearchFilter)
      .addCase(fetchKategoriPeralatanWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKategoriPeralatanWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchKategoriPeralatanWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchKategoriPeralatanById.pending, (state) => {
        state.loading = true;
        state.selectedKategoriPeralatan = null;
      })
      .addCase(fetchKategoriPeralatanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedKategoriPeralatan = action.payload;
      })
      .addCase(fetchKategoriPeralatanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah KategoriPeralatan Darah
      .addCase(createKategoriPeralatan.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update KategoriPeralatan Darah
      .addCase(updateKategoriPeralatan.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (KategoriPeralatan) =>
            KategoriPeralatan.kategoriPeralatanId ===
            action.payload.kategoriPeralatanId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus KategoriPeralatan Darah
      .addCase(deleteKategoriPeralatan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (KategoriPeralatan) =>
            KategoriPeralatan.kategoriPeralatanId !== action.payload
        );
      });
  },
});

export default KategoriPeralatanSlice.reducer;
