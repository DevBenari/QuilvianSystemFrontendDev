import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchNegara = createAsyncThunk(
  "negara/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/Negara", {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data negara";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchNegaraById = createAsyncThunk(
  "negara/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Negara/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data negara berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createNegara = createAsyncThunk(
  "negara/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Negara", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data negara";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateNegara = createAsyncThunk(
  "negara/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Negara/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data negara";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteNegara = createAsyncThunk(
  "negara/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Negara/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data negara";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const negaraSlice = createSlice({
  name: "negara",
  initialState: {
    data: { data: [] },
    selectedNegara: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNegara.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNegara.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNegara.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchNegaraById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNegaraById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNegara = action.payload;
      })
      .addCase(fetchNegaraById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createNegara.fulfilled, (state, action) => {
        state.data.data.push(action.payload);
      })

      .addCase(updateNegara.fulfilled, (state, action) => {
        const index = state.data.data.findIndex(
          (negara) => negara.negaraId === action.payload.negaraId
        );
        if (index !== -1) {
          state.data.data[index] = action.payload;
        }
      })

      .addCase(deleteNegara.fulfilled, (state, action) => {
        state.data.data = state.data.data.filter(
          (item) => item.negaraId !== action.payload
        );
      });
  },
});

export default negaraSlice.reducer;
