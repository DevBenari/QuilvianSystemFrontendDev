import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch Asuransi dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data Asuransi dengan pagination
export const fetchAsuransi = createAsyncThunk(
  "Asuransi/fetchData",
  async ({ rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Asuransi`, {
        headers: getHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

// 🔹 Fetch Asuransi dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchAsuransiWithFilters = createAsyncThunk(
  "Asuransi/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Asuransi/paged`, {
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

// 🔹 Fetch data Asuransi berdasarkan ID
export const fetchAsuransiById = createAsyncThunk(
  "Asuransi/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Asuransi/${id}`, {
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

// 🔹 Tambah Asuransi Darah
export const createAsuransi = createAsyncThunk(
  "Asuransi/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Asuransi`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Asuransi darah"
      );
    }
  }
);

// 🔹 Update Asuransi Darah berdasarkan ID
export const updateAsuransi = createAsyncThunk(
  "Asuransi/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Asuransi`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Add):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui Asuransi "
      );
    }
  }
);

export const deleteAsuransi = createAsyncThunk(
  "Asuransi/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/Asuransi/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus Asuransi"
      );
    }
  }
);

// 🔹 Redux Slice
const AsuransiSlice = createSlice({
  name: "Asuransi",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedAsuransi: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Asuransi hanya dengan pagination (CustomTableComponent)
      .addCase(fetchAsuransi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAsuransi.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) => existingItem.asuransiId === newItem.asuransiId
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
      .addCase(fetchAsuransi.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch Asuransi dengan search & filter (CustomSearchFilter)
      .addCase(fetchAsuransiWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAsuransiWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchAsuransiWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchAsuransiById.pending, (state) => {
        state.loading = true;
        state.selectedAsuransi = null;
      })
      .addCase(fetchAsuransiById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAsuransi = action.payload;
      })
      .addCase(fetchAsuransiById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Asuransi Darah
      .addCase(createAsuransi.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update Asuransi Darah
      .addCase(updateAsuransi.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Asuransi) => Asuransi.asuransiId === action.payload.asuransiId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus Asuransi Darah
      .addCase(deleteAsuransi.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Asuransi) => Asuransi.asuransiId !== action.payload
        );
      });
  },
});

export default AsuransiSlice.reducer;
