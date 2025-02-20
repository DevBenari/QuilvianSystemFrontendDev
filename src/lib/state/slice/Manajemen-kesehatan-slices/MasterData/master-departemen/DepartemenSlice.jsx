import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch Departement dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data Departement dengan pagination
export const fetchDepartement = createAsyncThunk(
  "Departement/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().Departement;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/Departement`, {
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

// 🔹 Fetch Departement dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchDepartementWithFilters = createAsyncThunk(
  "Departement/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Departement/paged`, {
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

// 🔹 Fetch data Departement berdasarkan ID
export const fetchDepartementById = createAsyncThunk(
  "Departement/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Departement/${id}`, {
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

// 🔹 Tambah Departement Darah
export const createDepartement = createAsyncThunk(
  "Departement/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Departement`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Departement darah"
      );
    }
  }
);

// 🔹 Update Departement Darah berdasarkan ID
export const updateDepartement = createAsyncThunk(
  "Departement/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Departement/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui Departement darah"
      );
    }
  }
);

export const deleteDepartement = createAsyncThunk(
  "Departement/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/Departement/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus Departement"
      );
    }
  }
);

// 🔹 Redux Slice
// 🔹 Redux Slice
const DepartementSlice = createSlice({
  name: "Departement",
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
      // ✅ Fetch Departement hanya dengan pagination (CustomTableComponent)
      .addCase(fetchDepartement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartement.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.departementId === newItem.departementId
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
      .addCase(fetchDepartement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Terjadi kesalahan";
      })

      // ✅ Fetch Departement dengan search & filter (CustomSearchFilter)
      .addCase(fetchDepartementWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartementWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchDepartementWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchDepartementById.pending, (state) => {
        state.loading = true;
        state.selectedDepartement = null;
      })
      .addCase(fetchDepartementById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDepartement = action.payload;
      })
      .addCase(fetchDepartementById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Departement Darah
      .addCase(createDepartement.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update Departement Darah
      .addCase(updateDepartement.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Departement) =>
            Departement.departementId === action.payload.departementId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus Departement Darah
      .addCase(deleteDepartement.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Departement) => Departement.departementId !== action.payload
        );
      });
  },
});

export default DepartementSlice.reducer;
