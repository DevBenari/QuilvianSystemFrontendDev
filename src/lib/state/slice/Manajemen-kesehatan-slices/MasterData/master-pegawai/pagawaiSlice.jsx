import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// **FETCH Semua Pegawai**
export const fetchPegawai = createAsyncThunk(
  "pegawai/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/Pegawai", {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data pegawai";
      return rejectWithValue(errorMessage);
    }
  }
);

// **FETCH Pegawai by ID**
export const fetchPegawaiById = createAsyncThunk(
  "pegawai/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Pegawai/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data pegawai berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

// **CREATE Pegawai**
export const createPegawai = createAsyncThunk(
  "pegawai/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Pegawai", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data pegawai";
      return rejectWithValue(errorMessage);
    }
  }
);

// **UPDATE Pegawai**
export const updatePegawai = createAsyncThunk(
  "pegawai/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Pegawai/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data pegawai";
      return rejectWithValue(errorMessage);
    }
  }
);

// **DELETE Pegawai**
export const deletePegawai = createAsyncThunk(
  "pegawai/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Pegawai/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data pegawai";
      return rejectWithValue(errorMessage);
    }
  }
);

// **Redux Slice**
const pegawaiSlice = createSlice({
  name: "pegawai",
  initialState: {
    data: { data: [] },
    selectedPegawai: null, // Untuk Fetch by ID
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Semua Pegawai
      .addCase(fetchPegawai.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPegawai.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPegawai.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Pegawai by ID
      .addCase(fetchPegawaiById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPegawaiById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPegawai = action.payload;
      })
      .addCase(fetchPegawaiById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah Pegawai
      .addCase(createPegawai.fulfilled, (state, action) => {
        if (Array.isArray(state.data.data)) {
          state.data.data.push(action.payload);
        }
      })

      // Update Pegawai
      .addCase(updatePegawai.fulfilled, (state, action) => {
        const index = state.data.data.findIndex(
          (pegawai) => pegawai.pegawaiId === action.payload.pegawaiId
        );
        if (index !== -1) {
          state.data.data[index] = action.payload;
        }
      })

      // Hapus Pegawai
      .addCase(deletePegawai.fulfilled, (state, action) => {
        state.data.data = state.data.data.filter(
          (pegawai) => pegawai.pegawaiId !== action.payload
        );
      });
  },
});

export default pegawaiSlice.reducer;
