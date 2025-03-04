import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch UserActive dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data UserActive dengan pagination
export const fetchUserActive = createAsyncThunk(
  "UserActive/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().UserActive;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/UserActive`, {
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

// 🔹 Fetch UserActive dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchUserActiveWithFilters = createAsyncThunk(
  "UserActive/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/UserActive/paged`, {
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

// 🔹 Fetch data UserActive berdasarkan ID
export const fetchUserActiveById = createAsyncThunk(
  "UserActive/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/UserActive/${id}`, {
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

// 🔹 Tambah UserActive
export const createUserActive = createAsyncThunk(
  "UserActive/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/UserActive`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan User Active "
      );
    }
  }
);

// 🔹 Update UserActive  berdasarkan ID
export const updateUserActive = createAsyncThunk(
  "UserActive/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/UserActive/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui User Active "
      );
    }
  }
);

export const deleteUserActive = createAsyncThunk(
  "UserActive/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/UserActive/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus User Active"
      );
    }
  }
);

// 🔹 Redux Slice
// 🔹 Redux Slice
const UserActiveSlice = createSlice({
  name: "UserActive",
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
      // ✅ Fetch UserActive hanya dengan pagination (CustomTableComponent)
      .addCase(fetchUserActive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserActive.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.userActiveId === newItem.userActiveId
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
      .addCase(fetchUserActive.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch UserActive dengan search & filter (CustomSearchFilter)
      .addCase(fetchUserActiveWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserActiveWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchUserActiveWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchUserActiveById.pending, (state) => {
        state.loading = true;
        state.selectedUserActive = null;
      })
      .addCase(fetchUserActiveById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUserActive = action.payload;
      })
      .addCase(fetchUserActiveById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah UserActive
      .addCase(createUserActive.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update UserActive
      .addCase(updateUserActive.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (UserActive) =>
            UserActive.userActiveId === action.payload.userActiveId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus UserActive
      .addCase(deleteUserActive.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (UserActive) => UserActive.userActiveId !== action.payload
        );
      });
  },
});

export default UserActiveSlice.reducer;
