import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch Kecamatan dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data Kecamatan dengan pagination
export const fetchKecamatan = createAsyncThunk(
  "Kecamatan/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().Kecamatan;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/Wilayah/Kecamatan`, {
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

// 🔹 Fetch Kecamatan dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchKecamatanWithFilters = createAsyncThunk(
  "Kecamatan/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Wilayah/PagedKecamatan`, {
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

// 🔹 Fetch data Kecamatan berdasarkan ID
export const fetchKecamatanById = createAsyncThunk(
  "Kecamatan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Wilayah/KecamatanById/${id}`, {
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

// 🔹 Tambah Kecamatan Darah
export const createKecamatan = createAsyncThunk(
  "Kecamatan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Wilayah/Kecamatan`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Kecamatan "
      );
    }
  }
);

// 🔹 Update Kecamatan Darah berdasarkan ID
export const updateKecamatan = createAsyncThunk(
  "Kecamatan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("📢 PUT Request ke API:", `/Wilayah/Kecamatan/${id}`, data);

      const response = await InstanceAxios.put(
        `/Wilayah/Kecamatan/${id}`,
        data,
        {
          headers: getHeaders(),
        }
      );

      console.log("✅ Response API Update Kecamatan:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Gagal Update API:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data Kecamatan"
      );
    }
  }
);

export const deleteKecamatan = createAsyncThunk(
  "Kecamatan/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/Wilayah/Kecamatan/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus Kecamatan"
      );
    }
  }
);

// 🔹 Redux Slice
const KecamatanSlice = createSlice({
  name: "Kecamatan",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
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
      // ✅ Fetch Kecamatan hanya dengan pagination (CustomTableComponent)
      .addCase(fetchKecamatan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKecamatan.fulfilled, (state, action) => {
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
      .addCase(fetchKecamatan.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch Kecamatan dengan search & filter (CustomSearchFilter)
      .addCase(fetchKecamatanWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKecamatanWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchKecamatanWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchKecamatanById.pending, (state) => {
        state.loading = true;
        state.selectedKecamatan = null;
      })
      .addCase(fetchKecamatanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedKecamatan = action.payload;
      })
      .addCase(fetchKecamatanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Kecamatan Darah
      .addCase(createKecamatan.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })

      // Update Kecamatan Darah
      .addCase(updateKecamatan.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Kecamatan) => Kecamatan.kecamatanId === action.payload.kecamatanId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus Kecamatan Darah
      .addCase(deleteKecamatan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Kecamatan) => Kecamatan.kecamatanId !== action.payload
        );
      });
  },
});

export default KecamatanSlice.reducer;
