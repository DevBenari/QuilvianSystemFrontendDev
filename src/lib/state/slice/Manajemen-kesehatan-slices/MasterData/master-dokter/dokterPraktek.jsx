import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch DokterPraktek dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data DokterPraktek dengan pagination
export const fetchDokterPraktek = createAsyncThunk(
  "DokterPraktek/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().DokterPraktek;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/DokterPraktek`, {
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

// 🔹 Fetch DokterPraktek dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchDokterPraktekWithFilters = createAsyncThunk(
  "DokterPraktek/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/DokterPraktek/paged`, {
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

// 🔹 Fetch data DokterPraktek berdasarkan ID
export const fetchDokterPraktekById = createAsyncThunk(
  "DokterPraktek/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/DokterPraktek/${id}`, {
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

// 🔹 Tambah DokterPraktek Darah
export const createDokterPraktek = createAsyncThunk(
  "DokterPraktek/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/DokterPraktek`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan DokterPraktek darah"
      );
    }
  }
);

// 🔹 Update DokterPraktek Darah berdasarkan ID
export const updateDokterPraktek = createAsyncThunk(
  "DokterPraktek/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/DokterPraktek/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui DokterPraktek darah"
      );
    }
  }
);

export const deleteDokterPraktek = createAsyncThunk(
  "DokterPraktek/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/DokterPraktek/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus DokterPraktek"
      );
    }
  }
);

// 🔹 Redux Slice
const DokterPraktekSlice = createSlice({
  name: "DokterPraktek",
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
      // ✅ Fetch DokterPraktek hanya dengan pagination (CustomTableComponent)
      .addCase(fetchDokterPraktek.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDokterPraktek.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.dokterPraktekId === newItem.dokterPraktekId
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
      .addCase(fetchDokterPraktek.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch DokterPraktek dengan search & filter (CustomSearchFilter)
      .addCase(fetchDokterPraktekWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDokterPraktekWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchDokterPraktekWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchDokterPraktekById.pending, (state) => {
        state.loading = true;
        state.selectedDokterPraktek = null;
      })
      .addCase(fetchDokterPraktekById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDokterPraktek = action.payload;
      })
      .addCase(fetchDokterPraktekById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah DokterPraktek Darah
      .addCase(createDokterPraktek.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update DokterPraktek Darah
      .addCase(updateDokterPraktek.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (DokterPraktek) =>
            DokterPraktek.dokterPraktekId === action.payload.dokterPraktekId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus DokterPraktek Darah
      .addCase(deleteDokterPraktek.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (DokterPraktek) => DokterPraktek.dokterPraktekId !== action.payload
        );
      });
  },
});

export default DokterPraktekSlice.reducer;
