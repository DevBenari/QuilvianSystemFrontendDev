import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";

const API_URL = "http://192.168.15.213:589/api/Agama";

// CRUD Thunks
export const fetchAgama = createAsyncThunk("agama/fetch", async () => {
  const response = await axios.get(API_URL, { headers: getHeaders() });
  return response.data;
});

export const createAgama = createAsyncThunk("agama/create", async (data) => {
  const response = await axios.post(API_URL, data, { headers: getHeaders() });
  return response.data;
});

export const updateAgama = createAsyncThunk(
  "agama/update",
  async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: getHeaders(),
    });
    return response.data;
  }
);

export const deleteAgama = createAsyncThunk("agama/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
  return id;
});

// Slice
const agamaSlice = createSlice({
  name: "agama",
  initialState: {
    data: { data: [] },
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
      .addCase(createAgama.fulfilled, (state, action) => {
        if (Array.isArray(state.data.data)) {
          state.data.data.push(action.payload); // Tambahkan payload ke array data
        }
      })
      .addCase(updateAgama.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (agama) => agama.agamaId === action.payload.agamaId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAgama.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (agama) => agama.agamaId !== action.payload
        );
      });
  },
});

export default agamaSlice.reducer;
