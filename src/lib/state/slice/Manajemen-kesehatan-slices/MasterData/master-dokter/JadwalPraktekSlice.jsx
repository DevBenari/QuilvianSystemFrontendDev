import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch JadwalPraktek dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data JadwalPraktek dengan pagination
export const fetchJadwalPraktek = createAsyncThunk(
  "JadwalPraktek/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().JadwalPraktek;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/JadwalPraktek`, {
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

// 🔹 Fetch JadwalPraktek dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchJadwalPraktekWithFilters = createAsyncThunk(
  "JadwalPraktek/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/JadwalPraktek/paged`, {
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

// 🔹 Fetch data JadwalPraktek berdasarkan ID
export const fetchJadwalPraktekById = createAsyncThunk(
  "JadwalPraktek/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/JadwalPraktek/${id}`, {
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

// 🔹 Tambah JadwalPraktek Darah
export const createJadwalPraktek = createAsyncThunk(
  "JadwalPraktek/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/JadwalPraktek`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan JadwalPraktek darah"
      );
    }
  }
);

// 🔹 Update JadwalPraktek Darah berdasarkan ID
export const updateJadwalPraktek = createAsyncThunk(
  "JadwalPraktek/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/JadwalPraktek/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui JadwalPraktek darah"
      );
    }
  }
);

export const deleteJadwalPraktek = createAsyncThunk(
  "JadwalPraktek/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/JadwalPraktek/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus JadwalPraktek"
      );
    }
  }
);

// 🔹 Redux Slice
const JadwalPraktekSlice = createSlice({
  name: "JadwalPraktek",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedJadwalPraktek: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch JadwalPraktek hanya dengan pagination (CustomTableComponent)
      .addCase(fetchJadwalPraktek.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJadwalPraktek.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.jadwalPraktekId === newItem.jadwalPraktekId
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
      .addCase(fetchJadwalPraktek.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch JadwalPraktek dengan search & filter (CustomSearchFilter)
      .addCase(fetchJadwalPraktekWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJadwalPraktekWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchJadwalPraktekWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchJadwalPraktekById.pending, (state) => {
        state.loading = true;
        state.selectedJadwalPraktek = null;
      })
      .addCase(fetchJadwalPraktekById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJadwalPraktek = action.payload;
      })
      .addCase(fetchJadwalPraktekById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah JadwalPraktek Darah
      .addCase(createJadwalPraktek.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update JadwalPraktek Darah
      .addCase(updateJadwalPraktek.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (JadwalPraktek) =>
            JadwalPraktek.jadwalPraktekId === action.payload.jadwalPraktekId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus JadwalPraktek Darah
      .addCase(deleteJadwalPraktek.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (JadwalPraktek) => JadwalPraktek.jadwalPraktekId !== action.payload
        );
      });
  },
});

export default JadwalPraktekSlice.reducer;
