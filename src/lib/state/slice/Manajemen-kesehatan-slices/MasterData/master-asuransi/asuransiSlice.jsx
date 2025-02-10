import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchAsuransi = createAsyncThunk(
  "asuransi/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/Asuransi", {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data asuransi";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchAsuransiById = createAsyncThunk(
  "asuransi/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Asuransi/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data asuransi berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createAsuransi = createAsyncThunk(
  "asuransi/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Asuransi", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data asuransi";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateAsuransi = createAsyncThunk(
  "asuransi/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Asuransi/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data asuransi";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteAsuransi = createAsyncThunk(
  "asuransi/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Asuransi/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data asuransi";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const asuransiSlice = createSlice({
  name: "asuransi",
  initialState: {
    data: [],
    selectedAsuransi: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsuransi.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsuransi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAsuransi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAsuransiById.fulfilled, (state, action) => {
        state.selectedAsuransi = action.payload;
      })
      .addCase(createAsuransi.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAsuransi.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.asuransiId === action.payload.asuransiId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAsuransi.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.asuransiId !== action.payload
        );
      });
  },
});

export default asuransiSlice.reducer;
