import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch KabupatenKota dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data KabupatenKota dengan pagination
export const fetchKabupatenKota = createAsyncThunk(
  "KabupatenKota/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().KabupatenKota;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/Wilayah/KabupatenKota`, {
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

// 🔹 Fetch KabupatenKota dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchKabupatenKotaWithFilters = createAsyncThunk(
  "KabupatenKota/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Wilayah/PagedKabupatenKota`, {
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

// 🔹 Fetch data KabupatenKota berdasarkan ID
export const fetchKabupatenKotaById = createAsyncThunk(
  "KabupatenKota/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(
        `/Wilayah/KabupatenKotaById/${id}`,
        {
          headers: getHeaders(),
        }
      );

      console.log("Response API (Fetch By ID):", response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

// 🔹 Tambah KabupatenKota Darah
export const createKabupatenKota = createAsyncThunk(
  "KabupatenKota/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(
        `/Wilayah/KabupatenKota`,
        data,
        {
          headers: getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan KabupatenKota "
      );
    }
  }
);

// 🔹 Update KabupatenKota Darah berdasarkan ID
export const updateKabupatenKota = createAsyncThunk(
  "KabupatenKota/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(
        `/Wilayah/KabupatenKota/${id}`,
        data,
        {
          headers: getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui KabupatenKota "
      );
    }
  }
);

export const deleteKabupatenKota = createAsyncThunk(
  "KabupatenKota/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(
        `/Wilayah/KabupatenKota/${id}`,
        {
          headers: getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus KabupatenKota"
      );
    }
  }
);

// 🔹 Redux Slice
const KabupatenKotaSlice = createSlice({
  name: "KabupatenKota",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
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
      // ✅ Fetch KabupatenKota hanya dengan pagination (CustomTableComponent)
      .addCase(fetchKabupatenKota.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKabupatenKota.fulfilled, (state, action) => {
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
      .addCase(fetchKabupatenKota.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload?.message || "Gagal mengambil data";
      })
      // ✅ Fetch KabupatenKota dengan search & filter (CustomSearchFilter)
      .addCase(fetchKabupatenKotaWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKabupatenKotaWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchKabupatenKotaWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchKabupatenKotaById.pending, (state) => {
        state.loading = true;
        state.selectedKabupatenKota = null;
      })
      .addCase(fetchKabupatenKotaById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedKabupatenKota = action.payload;
      })
      .addCase(fetchKabupatenKotaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah KabupatenKota Darah
      .addCase(createKabupatenKota.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })

      // Update KabupatenKota Darah
      .addCase(updateKabupatenKota.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (KabupatenKota) =>
            KabupatenKota.kabupatenKotaId === action.payload.kabupatenKotaId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus KabupatenKota Darah
      .addCase(deleteKabupatenKota.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (KabupatenKota) => KabupatenKota.kabupatenKotaId !== action.payload
        );
      });
  },
});

export default KabupatenKotaSlice.reducer;
