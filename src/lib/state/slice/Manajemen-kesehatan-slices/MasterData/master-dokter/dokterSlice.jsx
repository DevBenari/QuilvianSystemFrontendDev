import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders, getHeadersFormData } from "@/lib/headers/headers";

import Cookies from "js-cookie";

// 🔹 Fetch Dokter dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data Dokter dengan pagination
export const fetchDokter = createAsyncThunk(
  "Dokter/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().Dokter;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/Dokter`, {
        params: { page, perPage },
        headers: getHeaders("multipart/form-data"),
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

// 🔹 Fetch Dokter dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchDokterWithFilters = createAsyncThunk(
  "Dokter/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Dokter/paged`, {
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

// 🔹 Fetch data Dokter berdasarkan ID
export const fetchDokterById = createAsyncThunk(
  "Dokter/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Dokter/${id}`, {
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

// 🔹 Tambah Dokter Darah
export const createDokter = createAsyncThunk(
  "Dokter/create",
  async (data, { rejectWithValue }) => {
    const token = Cookies.get("token");
    try {
      const response = await InstanceAxios.post(`/Dokter`, data, {
        headers: getHeadersFormData(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Dokter darah"
      );
    }
  }
);

// 🔹 Update Dokter Darah berdasarkan ID
export const updateDokter = createAsyncThunk(
  "Dokter/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Dokter/${id}`, data, {
        headers: getHeadersFormData(),
        body: data, // Body harus berupa FormData
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui Dokter darah"
      );
    }
  }
);

export const deleteDokter = createAsyncThunk(
  "Dokter/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/Dokter/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Gagal menghapus Dokter");
    }
  }
);

// 🔹 Redux Slice
const DokterSlice = createSlice({
  name: "Dokter",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedDokter: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Dokter hanya dengan pagination (CustomTableComponent)
      .addCase(fetchDokter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDokter.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) => existingItem.dokterId === newItem.dokterId
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
      .addCase(fetchDokter.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch Dokter dengan search & filter (CustomSearchFilter)
      .addCase(fetchDokterWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDokterWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchDokterWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchDokterById.pending, (state) => {
        state.loading = true;
        state.selectedDokter = null;
      })
      .addCase(fetchDokterById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDokter = action.payload;
      })
      .addCase(fetchDokterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Dokter Darah
      .addCase(createDokter.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update Dokter Darah
      .addCase(updateDokter.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Dokter) => Dokter.dokterId === action.payload.dokterId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus Dokter Darah
      .addCase(deleteDokter.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Dokter) => Dokter.dokterId !== action.payload
        );
      });
  },
});

export default DokterSlice.reducer;
