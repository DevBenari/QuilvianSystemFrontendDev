import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch semua Jabatan
export const fetchJabatan = createAsyncThunk(
  "jabatan/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/Jabatan", {
        headers: getHeaders(),
      });
      return response.data.data; // Mengambil data dari response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data jabatan"
      );
    }
  }
);

// 🔹 Fetch Jabatan berdasarkan ID
export const fetchJabatanById = createAsyncThunk(
  "jabatan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Jabatan/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Mengambil data dari response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Gagal mengambil data jabatan berdasarkan ID"
      );
    }
  }
);

// 🔹 Tambah Jabatan
export const createJabatan = createAsyncThunk(
  "jabatan/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Jabatan", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menambahkan data jabatan"
      );
    }
  }
);

// 🔹 Update Jabatan
export const updateJabatan = createAsyncThunk(
  "jabatan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Jabatan/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data jabatan"
      );
    }
  }
);

// 🔹 Hapus Jabatan
export const deleteJabatan = createAsyncThunk(
  "jabatan/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Jabatan/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus data jabatan"
      );
    }
  }
);

// 🔹 Slice Jabatan
const jabatanSlice = createSlice({
  name: "jabatan",
  initialState: {
    data: [],
    selectedJabatan: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJabatan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJabatan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJabatan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchJabatanById.pending, (state) => {
        state.selectedJabatan = null;
      })
      .addCase(fetchJabatanById.fulfilled, (state, action) => {
        state.selectedJabatan = action.payload;
      })
      .addCase(createJabatan.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateJabatan.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.jabatanId === action.payload.jabatanId
        );
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }
      })
      .addCase(deleteJabatan.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.jabatanId !== action.payload
        );
      });
  },
});

export default jabatanSlice.reducer;
