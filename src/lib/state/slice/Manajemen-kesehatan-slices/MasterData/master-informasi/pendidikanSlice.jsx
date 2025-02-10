import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchPendidikan = createAsyncThunk(
  "pendidikan/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/Pendidikan", {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data pendidikan";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchPendidikanById = createAsyncThunk(
  "pendidikan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Pendidikan/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Ambil data dari properti 'data'
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data pendidikan berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);
export const createPendidikan = createAsyncThunk(
  "pendidikan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Pendidikan", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data pendidikan";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updatePendidikan = createAsyncThunk(
  "pendidikan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Pendidikan/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data pendidikan";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deletePendidikan = createAsyncThunk(
  "pendidikan/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Pendidikan/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data pendidikan";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const pendidikanSlice = createSlice({
  name: "pendidikan",
  initialState: {
    data: { data: [] },
    selectedPendidikan: null, // Menyimpan data pendidikan berdasarkan ID
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch semua data pendidikan
      .addCase(fetchPendidikan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendidikan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPendidikan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch data pendidikan berdasarkan ID
      .addCase(fetchPendidikanById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendidikanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPendidikan = action.payload;
      })
      .addCase(fetchPendidikanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Tambah data pendidikan baru
      .addCase(createPendidikan.fulfilled, (state, action) => {
        if (Array.isArray(state.data.data)) {
          state.data.data.push(action.payload);
        }
      })

      // Update data pendidikan
      .addCase(updatePendidikan.fulfilled, (state, action) => {
        const index = state.data.data.findIndex(
          (pendidikan) =>
            pendidikan.pendidikanId === action.payload.pendidikanId
        );
        if (index !== -1) {
          state.data.data[index] = action.payload;
        }
      })

      // Hapus data pendidikan
      .addCase(deletePendidikan.fulfilled, (state, action) => {
        state.data.data = state.data.data.filter(
          (pendidikan) => pendidikan.pendidikanId !== action.payload
        );
      });
  },
});

export default pendidikanSlice.reducer;
