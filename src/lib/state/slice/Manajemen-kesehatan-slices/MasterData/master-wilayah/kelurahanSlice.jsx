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
      const response = await InstanceAxios.get(`/Wilayah/PagedKelurahan`, {
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
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Kelurahan "
      );
    }
  }
);
// 🔹 Update Kelurahan Darah berdasarkan ID
export const updateKelurahan = createAsyncThunk(
  "Kelurahan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("📢 PUT Request ke API:", `/Wilayah/Kelurahan/${id}`, data);

      const response = await InstanceAxios.put(
        `/Wilayah/Kelurahan/${id}`,
        data,
        {
          headers: getHeaders(),
        }
      );

      console.log("✅ Response API Update Kelurahan:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Gagal Update API:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data Kelurahan"
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
    selectedKelurahan: null,
  },
  reducers: {
    resetWilayahState: (state) => {
      state.data = [];
      state.loadedPages = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalItems = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch KelurahafetchKelurahan hanya dengan pagination (CustomTableComponent)
      .addCase(fetchKelurahan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKelurahan.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;
          return;
        }
        state.loading = false;

        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) => existingItem.provinsiId === newItem.provinsiId
            )
        );

        if (action.meta.arg.isInfiniteScroll) {
          state.data = [...state.data, ...newData];
          if (!state.loadedPages.includes(action.payload.page)) {
            state.loadedPages.push(action.payload.page);
          }
        } else {
          state.data = action.payload.data;
        }

        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.meta.arg.page;
      })
      .addCase(fetchKelurahan.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload?.message || "Gagal mengambil data";
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
        state.loading = false;
        state.data.push(action.payload);
      })

      // Update Kelurahan Darah
      .addCase(updateKelurahan.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (kelurahan) => kelurahan.kelurahanId === action.payload.kelurahanId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus kelurahan Darah
      .addCase(deleteKelurahan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (kelurahan) => kelurahan.kelurahanId !== action.payload
        );
      });
  },
});

export default KelurahanSlice.reducer;
