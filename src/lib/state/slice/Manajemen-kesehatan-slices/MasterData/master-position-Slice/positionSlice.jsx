import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch Position dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data Position dengan pagination
export const fetchPosition = createAsyncThunk(
  "Position/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().Position;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/Position`, {
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

// 🔹 Fetch Position dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchPositionWithFilters = createAsyncThunk(
  "Position/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Position/paged`, {
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

// 🔹 Fetch data Position berdasarkan ID
export const fetchPositionById = createAsyncThunk(
  "Position/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Position/${id}`, {
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

// 🔹 Tambah Position
export const createPosition = createAsyncThunk(
  "Position/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Position`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan Position "
      );
    }
  }
);

// 🔹 Update Position  berdasarkan ID
export const updatePosition = createAsyncThunk(
  "Position/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Position/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui Position "
      );
    }
  }
);

export const deletePosition = createAsyncThunk(
  "Position/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/Position/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus Position"
      );
    }
  }
);

// 🔹 Redux Slice
// 🔹 Redux Slice
const PositionSlice = createSlice({
  name: "Position",
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
      // ✅ Fetch Position hanya dengan pagination (CustomTableComponent)
      .addCase(fetchPosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) => existingItem.positionId === newItem.positionId
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
      .addCase(fetchPosition.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch Position dengan search & filter (CustomSearchFilter)
      .addCase(fetchPositionWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPositionWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchPositionWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchPositionById.pending, (state) => {
        state.loading = true;
        state.selectedPosition = null;
      })
      .addCase(fetchPositionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPosition = action.payload;
      })
      .addCase(fetchPositionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Position
      .addCase(createPosition.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update Position
      .addCase(updatePosition.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Position) => Position.positionId === action.payload.positionId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus Position
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Position) => Position.positionId !== action.payload
        );
      });
  },
});

export default PositionSlice.reducer;
