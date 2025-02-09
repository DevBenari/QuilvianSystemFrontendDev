import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";


const API_URL = "http://192.168.15.213:589/api/Negara";


export const fetchNegara = createAsyncThunk("Negara/fetch", async () => {
  const response = await axios.get(API_URL, { headers: getHeaders() });
  return response.data;
});

  
  // Fetch negara berdasarkan ID
  export const fetchNegaraById = createAsyncThunk(
    "negara/fetchById",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: getHeaders(),
        });
        return response.data;
      } catch (err) {
        return rejectWithValue("Gagal mengambil data negara berdasarkan ID");
      }
    }
  );
  
  // Tambah negara baru
  export const createNegara = createAsyncThunk(
    "negara/create",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios.post(API_URL, data, {
          headers: getHeaders(),
        });
        return response.data;
      } catch (err) {
        return rejectWithValue("Gagal menambahkan data negara");
      }
    }
  );
  
  // Update negara berdasarkan ID
  export const updateNegara = createAsyncThunk(
    "negara/update",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${API_URL}/${id}`, data, {
          headers: getHeaders(),
        });
        return response.data;
      } catch (err) {
        return rejectWithValue("Gagal mengupdate data negara");
      }
    }
  );
  
  // Hapus negara berdasarkan ID
  export const deleteNegara = createAsyncThunk(
    "negara/delete",
    async (id, { rejectWithValue }) => {
      try {
        await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
        return id; // Kembalikan ID negara yang dihapus
      } catch (err) {
        return rejectWithValue("Gagal menghapus data negara");
      }
    }
  );
  
  // ========== Redux Slice ==========
  
  const negaraSlice = createSlice({
    name: "negara",
    initialState: {
      data: [], // Menyimpan daftar negara
      selectednegara: null, // Menyimpan negara berdasarkan ID
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Fetch semua negara
        .addCase(fetchNegara.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchNegara.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload || [];
        })
        .addCase(fetchNegara.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Fetch negara berdasarkan ID
        .addCase(fetchNegaraById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchNegaraById.fulfilled, (state, action) => {
          state.loading = false;
          state.selectednegara = action.payload;
        })
        .addCase(fetchNegaraById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Tambah negara baru
        .addCase(createNegara.fulfilled, (state, action) => {
          state.data.push(action.payload);
        })
  
        // Update negara
        .addCase(updateNegara.fulfilled, (state, action) => {
          const index = state.data.findIndex(
            (item) => item.negaraId === action.payload.negaraId
          );
          if (index !== -1) {
            state.data[index] = action.payload;
          }
        })
  
        // Hapus negara
        .addCase(deleteNegara.fulfilled, (state, action) => {
          state.data = state.data.filter(
            (item) => item.negaraId !== action.payload
          );
        });
    },
  });
  
  export default negaraSlice.reducer;