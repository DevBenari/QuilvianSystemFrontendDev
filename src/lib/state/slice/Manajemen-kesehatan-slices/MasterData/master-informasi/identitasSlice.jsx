import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHeaders } from "@/lib/headers/headers";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";

// CRUD Thunks
export const fetchIdentitas = createAsyncThunk("identitas/fetch", async (_,{ rejectWithValue }) => {
  try{
    const response = await InstanceAxios.get(`/Identitas`, { headers: getHeaders() });
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "Gagal mengambil data identitas";
    return rejectWithValue(errorMessage);
  }
});

export const createIdentitas = createAsyncThunk(
  "identitas/create",
  async (data) => {
    try{
      const response = await InstanceAxios.post(`/Identitas`, data, { headers: getHeaders() });
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal create data identitas";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateIdentitas = createAsyncThunk(
  "identitas/update",
  async ({ id, data }) => {
    try{
      const response = await InstanceAxios.put(`/Identitas/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal update data identitas";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteIdentitas = createAsyncThunk("identitas/delete", async (id, { rejectWithValue }) => {
  try{
    const response = await InstanceAxios.delete(`/Identitas/${id}`, { headers: getHeaders() });
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
      .addCase(updateIdentitas.fulfilled, (state, action) => {
        if (Array.isArray(state.data.data)) {
          const index = state.data.data.findIndex(
            (item) => item.IdentitasId === action.payload.IdentitasId
          );
          if (index !== -1) {
            state.data.data[index] = action.payload;
          }
        }
      })

      .addCase(deleteIdentitas.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default identitasSlice.reducer;