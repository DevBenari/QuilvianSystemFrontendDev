import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch DokterAsuransi dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data DokterAsuransi dengan pagination
export const fetchDokterAsuransi = createAsyncThunk(
  "DokterAsuransi/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().DokterAsuransi;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/DokterAsuransi`, {
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

// 🔹 Fetch DokterAsuransi dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchDokterAsuransiWithFilters = createAsyncThunk(
  "DokterAsuransi/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/DokterAsuransi/paged`, {
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

// 🔹 Fetch data DokterAsuransi berdasarkan ID
export const fetchDokterAsuransiById = createAsyncThunk(
  "DokterAsuransi/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/DokterAsuransi/${id}`, {
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

// 🔹 Tambah DokterAsuransi Darah
export const createDokterAsuransi = createAsyncThunk(
  "DokterAsuransi/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/DokterAsuransi`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan DokterAsuransi "
      );
    }
  }
);

// 🔹 Update DokterAsuransi Darah berdasarkan ID
export const updateDokterAsuransi = createAsyncThunk(
  "DokterAsuransi/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/DokterAsuransi/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui DokterAsuransi "
      );
    }
  }
);

export const deleteDokterAsuransi = createAsyncThunk(
  "DokterAsuransi/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/DokterAsuransi/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus DokterAsuransi"
      );
    }
  }
);

// 🔹 Redux Slice
// 🔹 Redux Slice
const DokterAsuransiSlice = createSlice({
  name: "DokterAsuransi",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedDokterAsuransi: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch DokterAsuransi hanya dengan pagination (CustomTableComponent)
      .addCase(fetchDokterAsuransi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDokterAsuransi.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.dokterAsuransiId === newItem.dokterAsuransiId
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
      .addCase(fetchDokterAsuransi.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch DokterAsuransi dengan search & filter (CustomSearchFilter)
      .addCase(fetchDokterAsuransiWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDokterAsuransiWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchDokterAsuransiWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchDokterAsuransiById.pending, (state) => {
        state.loading = true;
        state.selectedDokterAsuransi = null;
      })
      .addCase(fetchDokterAsuransiById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDokterAsuransi = action.payload;
      })
      .addCase(fetchDokterAsuransiById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah DokterAsuransi Darah
      .addCase(createDokterAsuransi.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update DokterAsuransi Darah
      .addCase(updateDokterAsuransi.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (DokterAsuransi) =>
            DokterAsuransi.dokterAsuransiId === action.payload.dokterAsuransiId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus DokterAsuransi Darah
      .addCase(deleteDokterAsuransi.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (DokterAsuransi) => DokterAsuransi.dokterAsuransiId !== action.payload
        );
      });
  },
});

export default DokterAsuransiSlice.reducer;
