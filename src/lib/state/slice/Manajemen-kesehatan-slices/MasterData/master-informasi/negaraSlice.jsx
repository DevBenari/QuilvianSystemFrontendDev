import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchNegara = createAsyncThunk(
  "negara/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Negara`, {
        params: { page, perPage },
        headers: getHeaders(),
      });

      console.log("Response API:", response.data);
      return response.data; // Pastikan API mengembalikan struktur data yang benar
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

export const fetchNegaraById = createAsyncThunk(
  "negara/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Negara/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Gagal mengambil data negara berdasarkan ID";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createNegara = createAsyncThunk(
  "negara/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Negara", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menambahkan data negara";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateNegara = createAsyncThunk(
  "negara/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Negara/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengupdate data negara";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteNegara = createAsyncThunk(
  "negara/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Negara/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus data negara";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const negaraSlice = createSlice({
  name: "negara",
  initialState: {
    data: [],
    selectedNegara: null,
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNegara.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNegara.fulfilled, (state, action) => {
        console.log("API Response Data:", action.payload);
        state.loading = false;
        state.data = action.payload.data || []; // Menyimpan daftar golongan darah
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.currentPage || 1;
      })
      .addCase(fetchNegara.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil data";
      })

      .addCase(fetchNegaraById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNegaraById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNegara = action.payload;
      })
      .addCase(fetchNegaraById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createNegara.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      .addCase(updateNegara.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (negara) => negara.negaraId === action.payload.negaraId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      .addCase(deleteNegara.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.negaraId !== action.payload
        );
      });
  },
});

export default negaraSlice.reducer;
