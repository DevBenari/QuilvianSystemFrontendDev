import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchPekerjaan = createAsyncThunk(
  "pekerjaan/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/Pekerjaan", {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data pekerjaan";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchPekerjaanById = createAsyncThunk(
  "pekerjaan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Pekerjaan/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Pastikan API mengembalikan data dalam properti 'data'
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data pekerjaan berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createPekerjaan = createAsyncThunk(
  "pekerjaan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Pekerjaan", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data pekerjaan";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updatePekerjaan = createAsyncThunk(
  "pekerjaan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Pekerjaan/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data pekerjaan";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deletePekerjaan = createAsyncThunk(
  "pekerjaan/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Pekerjaan/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data pekerjaan";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const pekerjaanSlice = createSlice({
  name: "pekerjaan",
  initialState: {
    data: { data: [] },
    selectedPekerjaan: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPekerjaan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPekerjaan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPekerjaan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPekerjaanById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPekerjaanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPekerjaan = action.payload;
      })
      .addCase(fetchPekerjaanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPekerjaan.fulfilled, (state, action) => {
        if (Array.isArray(state.data.data)) {
          state.data.data.push(action.payload);
        }
      })

      .addCase(updatePekerjaan.fulfilled, (state, action) => {
        const index = state.data.data.findIndex(
          (item) => item.pekerjaanId === action.payload.pekerjaanId
        );
        if (index !== -1) {
          state.data.data[index] = action.payload;
        }
      })

      .addCase(deletePekerjaan.fulfilled, (state, action) => {
        state.data.data = state.data.data.filter(
          (item) => item.pekerjaanId !== action.payload
        );
      });
  },
});

export default pekerjaanSlice.reducer;
