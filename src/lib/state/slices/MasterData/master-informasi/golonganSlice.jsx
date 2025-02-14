import { getHeaders } from "@/lib/headers/headers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://192.168.15.213:589/api/GolonganDarah";

// CRUD

export const fetchGolongan = createAsyncThunk("golongan/fetch", async () => {
  const response = await axios.get(API_URL, { headers: getHeaders() });
  return response.data;
});

export const createGolongan = createAsyncThunk(
  "golongan/create",
  async (data) => {
    const response = await axios.post(API_URL, data, { headers: getHeaders() });
    return response.data;
  }
);

export const updateGolongan = createAsyncThunk(
  "golongan/update",
  async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: getHeaders(),
    });
    return response.data;
  }
);

export const deleteGolongan = createAsyncThunk(
  "golongan/delete",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
    return id;
  }
);

// slice

const golonganSlice = createSlice({
  name: "golongan",
  initialState: {
    data: { data: [] },
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGolongan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGolongan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGolongan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createGolongan.fulfilled, (state, action) => {
        state.data.data.push(action.payload);
      })
      .addCase(updateGolongan.fulfilled, (state, action) => {
        const index = state.data.data.findIndex(
          (golongan) => golongan.golonganId === action.payload.golonganId
        );
        if (index !== -1) {
          state.data.data[index] = action.payload;
        }
      })

      .addCase(deleteGolongan.fulfilled, (state, action) => {
        state.data.data = state.data.data.filter(
          (golongan) => golongan.golonganId !== action.payload
        );
      });
  },
});

export default golonganSlice.reducer;
