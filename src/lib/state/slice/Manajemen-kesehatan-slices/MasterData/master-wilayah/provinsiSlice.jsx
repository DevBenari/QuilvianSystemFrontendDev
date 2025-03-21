import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders, getHeadersFormData } from "@/lib/headers/headers";

// 🔹 Fetch Provinsi dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data Provinsi dengan pagination
export const fetchProvinsi = createAsyncThunk(
  "Provinsi/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().Provinsi;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/Wilayah/Provinsi`, {
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

// 🔹 Fetch Provinsi dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchProvinsiWithFilters = createAsyncThunk(
  "Provinsi/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Wilayah/Provinsi/paged`, {
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

// 🔹 Fetch data Provinsi berdasarkan ID
export const fetchProvinsiById = createAsyncThunk(
  "Provinsi/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Wilayah/ProvinsiById/${id}`, {
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

// 🔹 Tambah Provinsi
export const createProvinsi = createAsyncThunk(
  "Provinsi/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Wilayah/Provinsi`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Provinsi "
      );
    }
  }
);

// 🔹 Update Provinsi  berdasarkan ID
export const updateProvinsi = createAsyncThunk(
  "Provinsi/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(
        `/Wilayah/Provinsi/${id}`,
        data,
        {
          headers: getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui Provinsi "
      );
    }
  }
);

export const deleteProvinsi = createAsyncThunk(
  "Provinsi/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/Wilayah/Provinsi/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus Provinsi"
      );
    }
  }
);

// 🔹 Redux Slice
const ProvinsiSlice = createSlice({
  name: "Provinsi",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedProvinsi: null,
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
      // ✅ Fetch Provinsi hanya dengan pagination (CustomTableComponent)
      .addCase(fetchProvinsi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvinsi.fulfilled, (state, action) => {
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
      .addCase(fetchProvinsi.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload?.message || "Gagal mengambil data";
      })
      // ✅ Fetch Provinsi dengan search & filter (CustomSearchFilter)
      .addCase(fetchProvinsiWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvinsiWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchProvinsiWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchProvinsiById.pending, (state) => {
        state.loading = true;
        state.selectedProvinsi = null;
      })
      .addCase(fetchProvinsiById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProvinsi = action.payload;
      })
      .addCase(fetchProvinsiById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Provinsi
      .addCase(createProvinsi.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })

      // Update Provinsi
      .addCase(updateProvinsi.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Provinsi) => Provinsi.provinsiId === action.payload.provinsiId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus Provinsi
      .addCase(deleteProvinsi.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Provinsi) => Provinsi.provinsiId !== action.payload
        );
      });
  },
});

export const { resetWilayahState } = ProvinsiSlice.actions;

export default ProvinsiSlice.reducer;
