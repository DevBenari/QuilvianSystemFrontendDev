import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch PoliKlinik dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data PoliKlinik dengan pagination
export const fetchPoliKlinik = createAsyncThunk(
  "PoliKlinik/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().PoliKlinik;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/PoliKlinik`, {
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

// 🔹 Fetch PoliKlinik dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchPoliKlinikWithFilters = createAsyncThunk(
  "PoliKlinik/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/PoliKlinik/paged`, {
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

// 🔹 Fetch data PoliKlinik berdasarkan ID
export const fetchPoliKlinikById = createAsyncThunk(
  "PoliKlinik/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/PoliKlinik/${id}`, {
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

// 🔹 Tambah PoliKlinik
export const createPoliKlinik = createAsyncThunk(
  "PoliKlinik/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/PoliKlinik`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan PoliKlinik "
      );
    }
  }
);

// 🔹 Update PoliKlinik  berdasarkan ID
export const updatePoliKlinik = createAsyncThunk(
  "PoliKlinik/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/PoliKlinik/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui PoliKlinik "
      );
    }
  }
);

export const deletePoliKlinik = createAsyncThunk(
  "PoliKlinik/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/PoliKlinik/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus PoliKlinik"
      );
    }
  }
);

// 🔹 Redux Slice
// 🔹 Redux Slice
const PoliKlinikSlice = createSlice({
  name: "PoliKlinik",
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
      // ✅ Fetch PoliKlinik hanya dengan pagination (CustomTableComponent)
      .addCase(fetchPoliKlinik.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPoliKlinik.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.poliKlinikId === newItem.poliKlinikId
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
      .addCase(fetchPoliKlinik.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch PoliKlinik dengan search & filter (CustomSearchFilter)
      .addCase(fetchPoliKlinikWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPoliKlinikWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchPoliKlinikWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchPoliKlinikById.pending, (state) => {
        state.loading = true;
        state.selectedPoliKlinik = null;
      })
      .addCase(fetchPoliKlinikById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPoliKlinik = action.payload;
      })
      .addCase(fetchPoliKlinikById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah PoliKlinik
      .addCase(createPoliKlinik.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update PoliKlinik
      .addCase(updatePoliKlinik.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (PoliKlinik) =>
            PoliKlinik.poliKlinikId === action.payload.poliKlinikId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus PoliKlinik
      .addCase(deletePoliKlinik.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (PoliKlinik) => PoliKlinik.poliKlinikId !== action.payload
        );
      });
  },
});

export default PoliKlinikSlice.reducer;
