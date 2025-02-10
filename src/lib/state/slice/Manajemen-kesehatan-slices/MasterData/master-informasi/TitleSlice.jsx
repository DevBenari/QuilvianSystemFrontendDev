import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchTitles = createAsyncThunk(
  "titles/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/Title", {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data title";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createTitle = createAsyncThunk(
  "titles/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Title", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data title";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateTitle = createAsyncThunk(
  "titles/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Title/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.data.message || "Gagal mengupdate data title";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteTitle = createAsyncThunk(
  "titles/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Title/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data title";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const titleSlice = createSlice({
  name: "titles",
  initialState: {
    data: { data: [] },
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTitles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTitles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTitles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTitle.fulfilled, (state, action) => {
        if (Array.isArray(state.data.data)) {
          state.data.data.push(action.payload);
        }
      })
      .addCase(updateTitle.fulfilled, (state, action) => {
        const index = state.data.data.findIndex(
          (title) => title.titleId === action.payload.titleId
        );
        if (index !== -1) {
          state.data.data[index] = action.payload;
        }
      })
      .addCase(deleteTitle.fulfilled, (state, action) => {
        state.data.data = state.data.data.filter(
          (title) => title.titleId !== action.payload
        );
      });
  },
});

export default titleSlice.reducer;
