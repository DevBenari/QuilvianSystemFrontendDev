import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch AsuransiPasien dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data AsuransiPasien dengan pagination
export const fetchAsuransiPasien = createAsyncThunk(
  "AsuransiPasien/fetchData",
  async ({ rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/AsuransiPasien`, {
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

// 🔹 Fetch AsuransiPasien dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchAsuransiPasienWithFilters = createAsyncThunk(
  "AsuransiPasien/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/AsuransiPasien/paged`, {
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

// 🔹 Fetch data AsuransiPasien berdasarkan ID
export const fetchAsuransiPasienById = createAsyncThunk(
  "AsuransiPasien/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/AsuransiPasien/${id}`, {
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

// 🔹 Tambah AsuransiPasien Darah
export const createAsuransiPasien = createAsyncThunk(
  "AsuransiPasien/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/AsuransiPasien`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan AsuransiPasien darah"
      );
    }
  }
);

// 🔹 Update AsuransiPasien Darah berdasarkan ID
export const updateAsuransiPasien = createAsyncThunk(
  "AsuransiPasien/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/AsuransiPasien`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Add):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui AsuransiPasien "
      );
    }
  }
);

export const deleteAsuransiPasien = createAsyncThunk(
  "AsuransiPasien/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/AsuransiPasien/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus AsuransiPasien"
      );
    }
  }
);

// 🔹 Redux Slice
const AsuransiPasienSlice = createSlice({
  name: "AsuransiPasien",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedAsuransiPasien: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch AsuransiPasien hanya dengan pagination (CustomTableComponent)
      .addCase(fetchAsuransiPasien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAsuransiPasien.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.asuransiPasienId === newItem.asuransiPasienId
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
      .addCase(fetchAsuransiPasien.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch AsuransiPasien dengan search & filter (CustomSearchFilter)
      .addCase(fetchAsuransiPasienWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAsuransiPasienWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchAsuransiPasienWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchAsuransiPasienById.pending, (state) => {
        state.loading = true;
        state.selectedAsuransiPasien = null;
      })
      .addCase(fetchAsuransiPasienById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAsuransiPasien = action.payload;
      })
      .addCase(fetchAsuransiPasienById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah AsuransiPasien Darah
      .addCase(createAsuransiPasien.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update AsuransiPasien Darah
      .addCase(updateAsuransiPasien.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (AsuransiPasien) =>
            AsuransiPasien.asuransiPasienId === action.payload.asuransiPasienId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus AsuransiPasien Darah
      .addCase(deleteAsuransiPasien.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (AsuransiPasien) => AsuransiPasien.asuransiPasienId !== action.payload
        );
      });
  },
});

export default AsuransiPasienSlice.reducer;
