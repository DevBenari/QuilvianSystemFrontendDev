import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";

const API_URL = "http://192.168.15.213:589/api/Pendidikan";

// CRUD Thunks
export const fetchPendidikan = createAsyncThunk(
  "pendidikan/fetch",
  async () => {
    const response = await axios.get(API_URL, { headers: getHeaders() });
    return response.data;
  }
);

// Fetch Pendidikan berdasarkan ID
export const fetchPendidikanById = createAsyncThunk(
  "pendidikan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue("Gagal mengambil data pendidikan berdasarkan ID");
    }
  }
);

export const createPendidikan = createAsyncThunk(
  "pendidikan/create",
  async (data) => {
    const response = await axios.post(API_URL, data, { headers: getHeaders() });
    return response.data;
  }
);

export const updatePendidikan = createAsyncThunk(
  "pendidikan/update",
  async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: getHeaders(),
    });
    return response.data;
  }
);

export const deletePendidikan = createAsyncThunk(
  "pendidikan/delete",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
    return id;
  }
);

// Slice
const pendidikanSlice = createSlice({
  name: "pendidikan",
  initialState: {
    data: { data: [] },
    selectedPendidikan: null,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      // pendidikan get all
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

      // pendidikan get by id

      .addCase(fetchPendidikanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendidikanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPendidikan = action.payload;
      })
      .addCase(fetchPendidikanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPendidikan.fulfilled, (state, action) => {
        if (Array.isArray(state.data.data)) {
          state.data.data.push(action.payload); // Tambahkan payload ke array data
        }
      })
      .addCase(updatePendidikan.fulfilled, (state, action) => {
        if (Array.isArray(state.data.data)) {
          const index = state.data.data.findIndex(
            (pendidikan) =>
              pendidikan.pendidikanId === action.payload.pendidikanId
          );
          if (index !== -1) {
            state.data.data[index] = action.payload;
          }
        }
      })

      .addCase(deletePendidikan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (pendidikan) => pendidikan.id !== action.payload
        );
      });
  },
});

export default pendidikanSlice.reducer;
