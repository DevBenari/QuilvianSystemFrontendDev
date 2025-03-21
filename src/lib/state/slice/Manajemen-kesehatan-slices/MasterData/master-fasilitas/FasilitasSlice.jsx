import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch Fasilitas dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data Fasilitas dengan pagination
export const fetchFasilitas = createAsyncThunk(
  "Fasilitas/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().Fasilitas;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/FasilitasPasien`, {
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

// 🔹 Fetch Fasilitas dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchFasilitasWithFilters = createAsyncThunk(
  "Fasilitas/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/FasilitasPasien/paged`, {
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

// 🔹 Fetch data Fasilitas berdasarkan ID
export const fetchFasilitasById = createAsyncThunk(
  "Fasilitas/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/FasilitasPasien/${id}`, {
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

// 🔹 Tambah Fasilitas Darah
export const createFasilitas = createAsyncThunk(
  "Fasilitas/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/FasilitasPasien`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Fasilitas "
      );
    }
  }
);

// 🔹 Update Fasilitas Darah berdasarkan ID
export const updateFasilitas = createAsyncThunk(
  "Fasilitas/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/FasilitasPasien/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui Fasilitas "
      );
    }
  }
);

export const deleteFasilitas = createAsyncThunk(
  "Fasilitas/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/FasilitasPasien/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus Fasilitas"
      );
    }
  }
);

// 🔹 Redux Slice
const FasilitasSlice = createSlice({
  name: "Fasilitas",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedFasilitas: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Fasilitas hanya dengan pagination (CustomTableComponent)
      .addCase(fetchFasilitas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFasilitas.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.fasilitasPasienId === newItem.fasilitasPasienId
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
      .addCase(fetchFasilitas.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch Fasilitas dengan search & filter (CustomSearchFilter)
      .addCase(fetchFasilitasWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFasilitasWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchFasilitasWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchFasilitasById.pending, (state) => {
        state.loading = true;
        state.selectedFasilitas = null;
      })
      .addCase(fetchFasilitasById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFasilitas = action.payload;
      })
      .addCase(fetchFasilitasById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Fasilitas Darah
      .addCase(createFasilitas.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update Fasilitas Darah
      .addCase(updateFasilitas.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Fasilitas) =>
            Fasilitas.fasilitasPasienId === action.payload.fasilitasPasienId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus Fasilitas Darah
      .addCase(deleteFasilitas.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Fasilitas) => Fasilitas.fasilitasPasienId !== action.payload
        );
      });
  },
});

export default FasilitasSlice.reducer;
