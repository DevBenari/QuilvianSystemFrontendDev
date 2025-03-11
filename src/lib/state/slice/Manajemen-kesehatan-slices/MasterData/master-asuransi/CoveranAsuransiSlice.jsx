import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch CoveranAsuransi dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data CoveranAsuransi dengan pagination
export const fetchCoveranAsuransi = createAsyncThunk(
  "CoveranAsuransi/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().CoveranAsuransi;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/CoveranAsuransi`, {
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

// 🔹 Fetch CoveranAsuransi dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchCoveranAsuransiWithFilters = createAsyncThunk(
  "CoveranAsuransi/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/CoveranAsuransi/paged`, {
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

// 🔹 Fetch data CoveranAsuransi berdasarkan ID
export const fetchCoveranAsuransiById = createAsyncThunk(
  "CoveranAsuransi/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/CoveranAsuransi/${id}`, {
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

// 🔹 Tambah CoveranAsuransi Darah
export const createCoveranAsuransi = createAsyncThunk(
  "CoveranAsuransi/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/CoveranAsuransi`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan CoveranAsuransi darah"
      );
    }
  }
);

// 🔹 Update CoveranAsuransi Darah berdasarkan ID
export const updateCoveranAsuransi = createAsyncThunk(
  "CoveranAsuransi/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(
        `/CoveranAsuransi/${id}`,
        data,
        {
          headers: getHeaders(),
        }
      );

      console.log("Response API (Add):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui CoveranAsuransi "
      );
    }
  }
);

export const deleteCoveranAsuransi = createAsyncThunk(
  "CoveranAsuransi/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/CoveranAsuransi/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus CoveranAsuransi"
      );
    }
  }
);

// 🔹 Redux Slice
const CoveranAsuransiSlice = createSlice({
  name: "CoveranAsuransi",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedCoveranAsuransi: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch CoveranAsuransi hanya dengan pagination (CustomTableComponent)
      .addCase(fetchCoveranAsuransi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoveranAsuransi.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.coveranAsuransiId === newItem.coveranAsuransiId
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
      .addCase(fetchCoveranAsuransi.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch CoveranAsuransi dengan search & filter (CustomSearchFilter)
      .addCase(fetchCoveranAsuransiWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoveranAsuransiWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchCoveranAsuransiWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchCoveranAsuransiById.pending, (state) => {
        state.loading = true;
        state.selectedCoveranAsuransi = null;
      })
      .addCase(fetchCoveranAsuransiById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCoveranAsuransi = action.payload;
      })
      .addCase(fetchCoveranAsuransiById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah CoveranAsuransi Darah
      .addCase(createCoveranAsuransi.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update CoveranAsuransi Darah
      .addCase(updateCoveranAsuransi.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (CoveranAsuransi) =>
            CoveranAsuransi.coveranAsuransiId ===
            action.payload.coveranAsuransiId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus CoveranAsuransi Darah
      .addCase(deleteCoveranAsuransi.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (CoveranAsuransi) =>
            CoveranAsuransi.coveranAsuransiId !== action.payload
        );
      });
  },
});

export default CoveranAsuransiSlice.reducer;
