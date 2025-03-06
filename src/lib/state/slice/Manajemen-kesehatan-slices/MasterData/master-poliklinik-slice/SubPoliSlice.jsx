import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch SubPoli dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data SubPoli dengan pagination
export const fetchSubPoli = createAsyncThunk(
  "SubPoli/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().SubPoli;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/SubPoli`, {
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

// 🔹 Fetch SubPoli dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchSubPoliWithFilters = createAsyncThunk(
  "SubPoli/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/SubPoli/paged`, {
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

// 🔹 Fetch data SubPoli berdasarkan ID
export const fetchSubPoliById = createAsyncThunk(
  "SubPoli/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/SubPoli/${id}`, {
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

// 🔹 Tambah SubPoli
export const createSubPoli = createAsyncThunk(
  "SubPoli/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/SubPoli`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan SubPoli "
      );
    }
  }
);

// 🔹 Update SubPoli  berdasarkan ID
export const updateSubPoli = createAsyncThunk(
  "SubPoli/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/SubPoli/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui SubPoli "
      );
    }
  }
);

export const deleteSubPoli = createAsyncThunk(
  "SubPoli/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/SubPoli/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Gagal menghapus SubPoli");
    }
  }
);

// 🔹 Redux Slice
// 🔹 Redux Slice
const SubPoliSlice = createSlice({
  name: "SubPoli",
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
      // ✅ Fetch SubPoli hanya dengan pagination (CustomTableComponent)
      .addCase(fetchSubPoli.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubPoli.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) => existingItem.subPoliId === newItem.subPoliId
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
      .addCase(fetchSubPoli.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch SubPoli dengan search & filter (CustomSearchFilter)
      .addCase(fetchSubPoliWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubPoliWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchSubPoliWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchSubPoliById.pending, (state) => {
        state.loading = true;
        state.selectedSubPoli = null;
      })
      .addCase(fetchSubPoliById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSubPoli = action.payload;
      })
      .addCase(fetchSubPoliById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah SubPoli
      .addCase(createSubPoli.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update SubPoli
      .addCase(updateSubPoli.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (SubPoli) => SubPoli.subPoliId === action.payload.subPoliId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus SubPoli
      .addCase(deleteSubPoli.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (SubPoli) => SubPoli.subPoliId !== action.payload
        );
      });
  },
});

export default SubPoliSlice.reducer;
