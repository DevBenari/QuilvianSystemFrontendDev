import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHeaders } from "@/lib/headers/headers";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";

// CRUD Thunks
export const fetchIdentitas = createAsyncThunk("identitas/fetch", async (_,{ rejectWithValue }) => {
  try{
    const response = await InstanceAxios.get(`/Title`, { headers: getHeaders() });
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "Gagal mengambil data identitas";
    return rejectWithValue(errorMessage);
  }
});

export const createIdentitas = createAsyncThunk(
  "identitas/create",
  async (data, { rejectWithValue }) => {
    try{
      const response = await InstanceAxios.post(`/Title`, data, { headers: getHeaders() });
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal create data identitas";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateTitle = createAsyncThunk(
  "identitas/update",
  async ({ id, data },{ rejectWithValue }) => {
    try{
      const response = await InstanceAxios.put(`/Title/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal update data identitas";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteTitle = createAsyncThunk("identitas/delete", async (id, { rejectWithValue }) => {
  try{
    const response = await InstanceAxios.delete(`/Title/${id}`, { headers: getHeaders() });
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "Gagal delete data identitas";
    return rejectWithValue(errorMessage);
  }
});

// Slice
const identitasSlice = createSlice({
  name: "identitas",
  initialState: {
    data: { data: [] },
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdentitas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIdentitas.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchIdentitas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createIdentitas.fulfilled, (state, action) => {
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

export default identitasSlice.reducer;
