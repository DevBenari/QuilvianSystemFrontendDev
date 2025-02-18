import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch semua data agama dengan pagination
export const fetchAgama = createAsyncThunk(
  "agama/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue, getState }) => {
    try {
      // Check if we already have the data for this page
      const currentState = getState().agama;
      if (currentState.loadedPages.includes(page)) {
        return null; // Skip fetching if we already have the data
      }

      const response = await InstanceAxios.get(`/Agama`, {
        params: { page, perPage },
        headers: getHeaders(),
      });

      return { 
        data: response.data.data,
        pagination: response.data.pagination,
        page
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

// 🔹 Fetch data agama berdasarkan ID
export const fetchAgamaById = createAsyncThunk(
  "agama/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Agama/${id}`, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

// 🔹 Tambah data agama
export const addAgama = createAsyncThunk(
  "agama/add",
  async (newData, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Agama`, newData, {
        headers: getHeaders(),
      });

      console.log("Response API (Add):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan data"
      );
    }
  }
);

// 🔹 Hapus data agama berdasarkan ID
export const deleteAgama = createAsyncThunk(
  "agama/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Agama/${id}`, {
        headers: getHeaders(),
      });

      console.log(`Agama dengan ID ${id} berhasil dihapus`);
      return id; // Mengembalikan ID yang dihapus agar bisa dihapus dari Redux store
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus data"
      );
    }
  }
);

// 🔹 Update data agama berdasarkan ID
export const updateAgama = createAsyncThunk(
  "agama/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Agama/${id}`, updatedData, {
        headers: getHeaders(),
      });

      console.log("Response API (Update):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui data"
      );
    }
  }
);

// 🔹 Redux Slice
const agamaSlice = createSlice({
  name: "agama",
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
      // **Fetch All**
      .addCase(fetchAgama.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgama.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data
        
        state.loading = false;
        
        // Add new data without duplicates
        const newData = action.payload.data.filter(
          newItem => !state.data.some(
            existingItem => existingItem.agamaId === newItem.agamaId
          )
        );
        
        state.data = [...state.data, ...newData];
        state.loadedPages.push(action.payload.page);
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.meta.arg.page;
      })
      .addCase(fetchAgama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  
      // **Fetch By ID**
      .addCase(fetchAgamaById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedAgama = null;
      })
      .addCase(fetchAgamaById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAgama = action.payload;
      })
      .addCase(fetchAgamaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // **Add**
      .addCase(addAgama.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAgama.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload); // Tambahkan ke Redux store
      })
      .addCase(addAgama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Gagal menambahkan data";
      })

      // **Delete**
      .addCase(deleteAgama.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAgama.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((item) => item.agamaId !== action.payload);
      })
      .addCase(deleteAgama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Gagal menghapus data";
      })

      // **Update**
      .addCase(updateAgama.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAgama.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (item) => item.agamaId === action.payload.agamaId
        );
        if (index !== -1) {
          state.data[index] = action.payload; // Perbarui data di Redux store
        }
      })
      .addCase(updateAgama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Gagal memperbarui data";
      });
  },
});

export default agamaSlice.reducer;
