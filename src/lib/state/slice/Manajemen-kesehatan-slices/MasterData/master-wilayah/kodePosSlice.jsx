import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";
import { createProvinsi } from "./provinsiSlice";

// CRUD Thunks
export const fetchKodePos = createAsyncThunk(
  "KodePos/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().KodePos;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/Wilayah/KodePos`, {
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

export const fetchKodePosWithFilters = createAsyncThunk(
  "KodePos/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`Wilayah/PagedKodePos`, {
        params: filters,
        headers: getHeaders(),
      });

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

export const fetchKodePosById = createAsyncThunk(
  "KodePos/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`Wilayah/KodePosById/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data KodePos berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createKodePos = createAsyncThunk(
  "KodePos/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Wilayah/KodePos`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan KodePos "
      );
    }
  }
);

export const updateKodePos = createAsyncThunk(
  "KodePos/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`Wilayah/KodePos/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data Kode Pos";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteKodePos = createAsyncThunk(
  "KodePos/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`Wilayah/KodePos/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data Kode Pos";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const KodePosSlice = createSlice({
  name: "KodePos",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedKodePos: null,
  },

  reducers: {
    resetWilayahState: (state) => {
      state.data = [];
      state.loadedPages = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalItems = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKodePos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKodePos.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;
          return;
        }
        state.loading = false;

        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) => existingItem.provinsiId === newItem.provinsiId
            )
        );

        if (action.meta.arg.isInfiniteScroll) {
          state.data = [...state.data, ...newData];
          if (!state.loadedPages.includes(action.payload.page)) {
            state.loadedPages.push(action.payload.page);
          }
        } else {
          state.data = action.payload.data;
        }

        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.meta.arg.page;
      })
      .addCase(fetchKodePos.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload?.message || "Gagal mengambil data";
      })
      // ✅ Fetch KodePos dengan search & filter (CustomSearchFilter)
      .addCase(fetchKodePosWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKodePosWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchKodePosWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      .addCase(fetchKodePosById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchKodePosById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedKodePos = action.payload;
      })
      .addCase(fetchKodePosById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProvinsi.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })

      .addCase(updateKodePos.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (KodePos) => KodePos.kodePosId === action.payload.kodePosId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteKodePos.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (KodePos) => KodePos.kodePosId !== action.payload
        );
      });
  },
});

export default KodePosSlice.reducer;
