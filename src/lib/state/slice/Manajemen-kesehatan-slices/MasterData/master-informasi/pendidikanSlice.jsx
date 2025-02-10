import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHeaders } from "@/lib/headers/headers";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";

const API_URL = "http://192.168.15.213:589/api/Pendidikan";

// CRUD Thunks
export const fetchPendidikan = createAsyncThunk("pendidikan/fetch",async (_,{ rejectWithValue }) => {
    try{
      const response = await InstanceAxios.get(`/Pendidikan`, { headers: getHeaders() });
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal mengambil data pendidikan";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch Pendidikan berdasarkan ID
export const fetchPendidikanById = createAsyncThunk(
  "pendidikan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Pendidikan/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      const errorMessage = error.response?.data?.message || "Gagal mengambil data pendidikan berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createPendidikan = createAsyncThunk(
  "pendidikan/create",
  async (data,{ rejectWithValue }) => {
    try{
      const response = await InstanceAxios.post(`/Pendidikan`, data, { headers: getHeaders() });
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal create data pendidikan";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updatePendidikan = createAsyncThunk(
  "pendidikan/update",
  async ({ id, data },{ rejectWithValue }) => {
    try{
      const response = await InstanceAxios.put(`/Pendidikan/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal mengupdate data pendidikan";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deletePendidikan = createAsyncThunk(
  "pendidikan/delete",
  async (id, { rejectWithValue }) => {
    try{
      const response = await InstanceAxios.delete(`/Pendidikan  /${id}`, { headers: getHeaders() });
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal delete data pendidikan";
      return rejectWithValue(errorMessage);
    }
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
