import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";

const API_URL = "http://192.168.15.213:589/api/Title";

// CRUD Thunks
export const fetchTitles = createAsyncThunk("titles/fetch", async () => {
  const response = await axios.get(API_URL, { headers: getHeaders() });
  return response.data;
});

export const createTitle = createAsyncThunk("titles/create", async (data) => {
  const response = await axios.post(API_URL, data, { headers: getHeaders() });
  return response.data;
});

export const updateTitle = createAsyncThunk(
  "titles/update",
  async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: getHeaders(),
    });
    return response.data;
  }
);

export const deleteTitle = createAsyncThunk("titles/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
  return id;
});

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
          state.data.data.push(action.payload); // Tambahkan payload ke array data
        }
      })
      .addCase(updateTitle.fulfilled, (state, action) => {
        if (Array.isArray(state.data.data)) {
          const index = state.data.data.findIndex(
            (title) => title.titleId === action.payload.titleId
          );
          if (index !== -1) {
            state.data.data[index] = action.payload;
          }
        }
      })

      .addCase(deleteTitle.fulfilled, (state, action) => {
        state.data = state.data.filter((title) => title.id !== action.payload);
      });
  },
});

export default titleSlice.reducer;
