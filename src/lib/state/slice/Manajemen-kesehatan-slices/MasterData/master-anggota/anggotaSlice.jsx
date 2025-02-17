import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch semua Anggota
export const fetchAnggota = createAsyncThunk(
  "Anggota/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/Keanggotaan", {
        headers: getHeaders(),
      });
      return response.data.data; // Ambil data dari response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data Keanggotaan"
      );
    }
  }
);

// 🔹 Fetch Anggota berdasarkan ID
export const fetchAnggotaById = createAsyncThunk(
  "anggota/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Keanggotaan/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Ambil data dari response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Gagal mengambil data Keanggotaan berdasarkan ID"
      );
    }
  }
);

// 🔹 Tambah Anggota
export const createAnggota = createAsyncThunk(
  "anggota/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Keanggotaan", data, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menambahkan data Keanggotaan"
      );
    }
  }
);

// 🔹 Update Anggota
export const updateAnggota = createAsyncThunk(
  "anggota/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Keanggotaan/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data Keanggotaan"
      );
    }
  }
);

// 🔹 Hapus Anggota
export const deleteAnggota = createAsyncThunk(
  "anggota/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Keanggotaan/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus data Keanggotaan"
      );
    }
  }
);

// 🔹 Slice Anggota
const anggotaSlice = createSlice({
  name: "anggota",
  initialState: {
    data: [], // Data harus berupa array, bukan { data: [] }
    selectedAnggota: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnggota.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnggota.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Pastikan mengambil data sebagai array langsung
      })
      .addCase(fetchAnggota.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAnggotaById.pending, (state) => {
        state.selectedAnggota = null;
      })
      .addCase(fetchAnggotaById.fulfilled, (state, action) => {
        state.selectedAnggota = action.payload;
      })
      .addCase(createAnggota.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAnggota.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.keanggotaanId === action.payload.keanggotaanId
        );

        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }

        if (
          state.selectedAnggota?.keanggotaanId === action.payload.keanggotaanId
        ) {
          state.selectedAnggota = {
            ...state.selectedAnggota,
            ...action.payload,
          };
        }
      })
      .addCase(deleteAnggota.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.keanggotaanId !== action.payload
        );
      });
  },
});

export default anggotaSlice.reducer;
