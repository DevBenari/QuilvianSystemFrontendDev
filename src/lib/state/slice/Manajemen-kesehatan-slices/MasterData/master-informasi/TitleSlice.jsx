import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHeaders } from "@/lib/headers/headers";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";

// CRUD Thunks
export const fetchTitles = createAsyncThunk("titles/fetch", async () => {
  try{
    const response = await InstanceAxios.get(`/Title`, { headers: getHeaders() });
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "Gagal mengambil data title";
    return rejectWithValue(errorMessage);
  }
});

export const createTitle = createAsyncThunk("titles/create", async (data) => {
  try{
    const response = await InstanceAxios.post(`/Title`, data, { headers: getHeaders() });
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "Gagal create data title";
    return rejectWithValue(errorMessage);
  }
});

export const updateTitle = createAsyncThunk(
  "titles/update",
  async ({ id, data }) => {
    try{
      const response = await InstanceAxios.put(`/Title/${id}`, data, {headers: getHeaders()});
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal update data title";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteTitle = createAsyncThunk("titles/delete", async (id) => {
  try{
    const response = await InstanceAxios.delete(`/Title/${id}`, { headers: getHeaders() });
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "Gagal delete data title";
    return rejectWithValue(errorMessage)
  }
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
