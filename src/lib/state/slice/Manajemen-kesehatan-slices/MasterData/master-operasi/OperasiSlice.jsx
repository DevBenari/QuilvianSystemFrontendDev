import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch Operasi dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data Operasi dengan pagination
export const fetchOperasi = createAsyncThunk(
  "Operasi/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().Operasi;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/Operasi`, {
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

// 🔹 Fetch Operasi dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchOperasiWithFilters = createAsyncThunk(
  "Operasi/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Operasi/paged`, {
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

// 🔹 Fetch data Operasi berdasarkan ID
export const fetchOperasiById = createAsyncThunk(
  "Operasi/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Operasi/${id}`, {
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

// 🔹 Tambah Operasi Darah
export const createOperasi = createAsyncThunk(
  "Operasi/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Operasi`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Operasi "
      );
    }
  }
);

// 🔹 Update Operasi Darah berdasarkan ID
export const updateOperasi = createAsyncThunk(
  "Operasi/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Operasi/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui Operasi "
      );
    }
  }
);

export const deleteOperasi = createAsyncThunk(
  "Operasi/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/Operasi/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Gagal menghapus Operasi");
    }
  }
);

// 🔹 Redux Slice
// 🔹 Redux Slice
const OperasiSlice = createSlice({
  name: "Operasi",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedOperasi: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Operasi hanya dengan pagination (CustomTableComponent)
      .addCase(fetchOperasi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOperasi.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) => existingItem.operasiId === newItem.operasiId
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
      .addCase(fetchOperasi.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch Operasi dengan search & filter (CustomSearchFilter)
      .addCase(fetchOperasiWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOperasiWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchOperasiWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchOperasiById.pending, (state) => {
        state.loading = true;
        state.selectedOperasi = null;
      })
      .addCase(fetchOperasiById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOperasi = action.payload;
      })
      .addCase(fetchOperasiById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Operasi Darah
      .addCase(createOperasi.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update Operasi Darah
      .addCase(updateOperasi.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Operasi) => Operasi.operasiId === action.payload.operasiId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus Operasi Darah
      .addCase(deleteOperasi.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Operasi) => Operasi.operasiId !== action.payload
        );
      });
  },
});

export default OperasiSlice.reducer;
