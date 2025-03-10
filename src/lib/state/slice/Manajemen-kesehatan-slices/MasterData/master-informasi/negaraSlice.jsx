import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchNegara = createAsyncThunk(
  "negara/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().negara;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }

      const response = await InstanceAxios.get(`/Negara`, {
        params: { page, perPage },
        headers: getHeaders(),
      });

      return {
        data: response.data.data,
        pagination: response.data.pagination,
        page,
        meta: { arg: { page, isInfiniteScroll } },
      }; // Pastikan API mengembalikan struktur data yang benar
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

export const fetchNegaraWithFilters = createAsyncThunk(
  "Negara/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Negara/paged`, {
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

export const fetchNegaraById = createAsyncThunk(
  "negara/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Negara/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data negara berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createNegara = createAsyncThunk(
  "negara/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Negara", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data negara";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateNegara = createAsyncThunk(
  "negara/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Negara/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data negara";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteNegara = createAsyncThunk(
  "negara/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Negara/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data negara";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const negaraSlice = createSlice({
  name: "negara",
  initialState: {
    data: [],
    loadedPages: [],
    selectedNegara: null,
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNegara.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNegara.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) => existingItem.negaraId === newItem.negaraId
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
      .addCase(fetchNegara.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch Negara dengan search & filter (CustomSearchFilter)
      .addCase(fetchNegaraWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNegaraWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchNegaraWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      .addCase(fetchNegaraById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNegaraById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNegara = action.payload;
      })
      .addCase(fetchNegaraById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createNegara.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      .addCase(updateNegara.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (negara) => negara.negaraId === action.payload.negaraId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      .addCase(deleteNegara.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.negaraId !== action.payload
        );
      });
  },
});

export default negaraSlice.reducer;
