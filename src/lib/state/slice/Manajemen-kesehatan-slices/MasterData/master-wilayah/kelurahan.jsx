import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch Kelurahan dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data Kelurahan dengan pagination
export const fetchKelurahan = createAsyncThunk(
  "Kelurahan/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().Kelurahan;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/Wilayah/Kelurahan`, {
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

// 🔹 Fetch Kelurahan dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchKelurahanWithFilters = createAsyncThunk(
  "Kelurahan/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Wilayah/Kelurahan/paged`, {
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

// 🔹 Fetch data Kelurahan berdasarkan ID
export const fetchKelurahanById = createAsyncThunk(
  "Kelurahan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Wilayah/KelurahanById/${id}`, {
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

// 🔹 Tambah Kelurahan Darah
export const createKelurahan = createAsyncThunk(
  "Kelurahan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Wilayah/Kelurahan`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Kelurahan darah"
      );
    }
  }
);

// 🔹 Update Kelurahan Darah berdasarkan ID
export const updateKelurahan = createAsyncThunk(
  "Kelurahan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Wilayah/Kelurahan`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Add):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui Kelurahan "
      );
    }
  }
);

export const deleteKelurahan = createAsyncThunk(
  "Kelurahan/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/Wilayah/Kelurahan/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus Kelurahan"
      );
    }
  }
);

// 🔹 Redux Slice
const KelurahanSlice = createSlice({
  name: "Kelurahan",
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
      // ✅ Fetch Kelurahan hanya dengan pagination (CustomTableComponent)
      .addCase(fetchKelurahan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKelurahan.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) => existingItem.kelurahanId === newItem.kelurahanId
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
      .addCase(fetchKelurahan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Terjadi kesalahan";
      })

      // ✅ Fetch Kelurahan dengan search & filter (CustomSearchFilter)
      .addCase(fetchKelurahanWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKelurahanWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchKelurahanWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchKelurahanById.pending, (state) => {
        state.loading = true;
        state.selectedKelurahan = null;
      })
      .addCase(fetchKelurahanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedKelurahan = action.payload;
      })
      .addCase(fetchKelurahanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Kelurahan Darah
      .addCase(createKelurahan.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update Kelurahan Darah
      .addCase(updateKelurahan.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Kelurahan) => Kelurahan.kelurahanId === action.payload.kelurahanId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus Kelurahan Darah
      .addCase(deleteKelurahan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Kelurahan) => Kelurahan.kelurahanId !== action.payload
        );
      });
  },
});

export default KelurahanSlice.reducer;
