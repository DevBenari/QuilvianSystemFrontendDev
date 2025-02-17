import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 Fetch semua data agama dengan pagination
export const fetchAgama = createAsyncThunk(
  "agama/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Agama/paged`, {
        params: { page, perPage },
        headers: getHeaders(),
      });

      console.log("Response API:", response.data);
      return response.data;
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
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

// 🔹 Tambah data agama
export const createAgama = createAsyncThunk(
  "Agama/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Agama", data, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menambahkan data Dokter Praktek"
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
      return rejectWithValue(error.response?.data || "Gagal menghapus data");
    }
  }
);

// 🔹 Update data agama berdasarkan ID
export const updateAgama = createAsyncThunk(
  "agama/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Agama/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data Dokter Praktek"
      );
    }
  }
);
// 🔹 Redux Slice
const agamaSlice = createSlice({
  name: "agama",
  initialState: {
    data: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedAgama: null, // Untuk menyimpan data dari fetch by ID
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
        console.log("Processed Data:", action.payload);
        state.loading = false;
        state.data = action.payload.data?.rows;
        state.totalItems = action.payload.data?.totalRows;
        state.totalPages = action.payload.data?.totalPages;
        state.currentPage = action.payload.data?.currentPage;
      })
      .addCase(fetchAgama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Gagal mengambil data";
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
      .addCase(createAgama.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // **Delete**
      .addCase(deleteAgama.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAgama.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (item) => item.agamaId !== action.payload
        );
      })
      .addCase(deleteAgama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Gagal menghapus data";
      })

      // **Update**
      .addCase(updateAgama.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.AgamaId === action.payload.AgamaId
        );
      });
  },
});

export default agamaSlice.reducer;
