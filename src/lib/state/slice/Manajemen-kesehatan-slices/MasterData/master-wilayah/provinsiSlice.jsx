import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch Provinsi
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
        params: {page, perPage },
        headers: getHeaders(),
      });

      return {
        data: response.data.data,
        pagination: response.data.pagination,
        page,
        meta: { arg: { page, isInfiniteScroll } },
      };
    } catch (error) {
      console.error("❌ Error API Provinsi:", error);
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

export const fetchProvinsiWithFilters = createAsyncThunk(
  "Provinsi/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/PagedProvinsi`, {
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

export const fetchProvinsiById = createAsyncThunk(
  "Provinsi/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Wilayah/ProvinsiById/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data Provinsi berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createProvinsi = createAsyncThunk(
  "Provinsi/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Wilayah/Provinsi", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data Provinsi";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProvinsi = createAsyncThunk(
  "Provinsi/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("📢 PUT Request ke API:", `/Wilayah/Provinsi/${id}`, data);

      const response = await InstanceAxios.put(
        `/Wilayah/Provinsi/${id}`,
        data,
        {
          headers: getHeaders(),
        }
      );

      console.log("✅ Response API Update Provinsi:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Gagal Update API:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data Provinsi"
      );
    }
  }
);

export const deleteProvinsi = createAsyncThunk(
  "Provinsi/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Wilayah/Provinsi/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data Provinsi";
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Redux Slice untuk Provinsi
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
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Provinsi hanya dengan pagination (CustomTableComponent)
      .addCase(fetchProvinsi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvinsi.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) => existingItem.provinsiId === newItem.provinsiId
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
      .addCase(fetchProvinsi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Terjadi kesalahan";
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

      .addCase(fetchProvinsiById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProvinsiById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProvinsi = action.payload;
      })
      .addCase(fetchProvinsiById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createProvinsi.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      .addCase(updateProvinsi.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.provinsiId === action.payload.provinsiId
        );
      })

      .addCase(deleteProvinsi.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.ProvinsiId !== action.payload
        );
      });
  },
});

export default ProvinsiSlice.reducer;
