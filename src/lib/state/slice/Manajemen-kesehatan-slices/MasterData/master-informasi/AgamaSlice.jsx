import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchAgama = createAsyncThunk(
  "agama/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/Agama", {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data agama";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchAgamaById = createAsyncThunk(
  "agama/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Agama/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Pastikan API mengembalikan data di dalam 'data'
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data agama berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createAgama = createAsyncThunk(
  "agama/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Agama", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal create data agama";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateAgama = createAsyncThunk(
  "agama/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Agama/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data agama";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteAgama = createAsyncThunk(
  "agama/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Agama/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal delete data agama";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const agamaSlice = createSlice({
  name: "agama",
  initialState: {
    data: { data: [] },
    selectedAgama: null, // Menyimpan data agama berdasarkan ID
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgama.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgama.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAgama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch data agama berdasarkan ID
      .addCase(fetchAgamaById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgamaById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAgama = action.payload;
      })
      .addCase(fetchAgamaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Tambah data agama baru
      .addCase(createAgama.fulfilled, (state, action) => {
        if (Array.isArray(state.data.data)) {
          state.data.data.push(action.payload);
        }
      })

      // Update data agama
      .addCase(updateAgama.fulfilled, (state, action) => {
        const index = state.data.data.findIndex(
          (agama) => agama.agamaId === action.payload.agamaId
        );
        if (index !== -1) {
          state.data.data[index] = action.payload;
        }
      })

      // Hapus data agama
      .addCase(deleteAgama.fulfilled, (state, action) => {
        state.data.data = state.data.data.filter(
          (agama) => agama.agamaId !== action.payload
        );
      });
  },
});

export default agamaSlice.reducer;
