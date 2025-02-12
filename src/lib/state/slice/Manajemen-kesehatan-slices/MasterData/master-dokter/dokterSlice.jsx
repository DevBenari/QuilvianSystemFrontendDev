import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch semua dokter
export const fetchDokter = createAsyncThunk(
  "dokter/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/Dokter", {
        headers: getHeaders(),
      });
      return response.data.data; // Mengambil hanya bagian data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data dokter"
      );
    }
  }
);

// 🔹 Fetch dokter berdasarkan ID
export const fetchDokterById = createAsyncThunk(
  "dokter/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Dokter/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Mengambil hanya bagian data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Gagal mengambil data dokter berdasarkan ID"
      );
    }
  }
);

// 🔹 Tambah dokter
export const createDokter = createAsyncThunk(
  "dokter/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Dokter", data, {
        headers: getHeaders(),
      });
      return response.data.data; // Mengambil hanya bagian data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menambahkan data dokter"
      );
    }
  }
);

// 🔹 Update dokter
export const updateDokter = createAsyncThunk(
  "dokter/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Dokter/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data.data; // Mengambil hanya bagian data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data dokter"
      );
    }
  }
);

// 🔹 Hapus dokter
export const deleteDokter = createAsyncThunk(
  "dokter/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Dokter/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus data dokter"
      );
    }
  }
);

// 🔹 Slice Dokter
const dokterSlice = createSlice({
  name: "dokter",
  initialState: {
    data: [],
    selectedDokter: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDokter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDokter.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDokter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Fetch by ID
      .addCase(fetchDokterById.pending, (state) => {
        state.selectedDokter = null;
      })
      .addCase(fetchDokterById.fulfilled, (state, action) => {
        state.selectedDokter = action.payload;
      })
      .addCase(createDokter.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateDokter.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (dokter) => dokter.dokterId === action.payload.dokterId
        );
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }

        if (state.selectedDokter?.dokterId === action.payload.dokterId) {
          state.selectedDokter = { ...state.selectedDokter, ...action.payload };
        }
      })
      .addCase(deleteDokter.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (dokter) => dokter.dokterId !== action.payload
        );
      });
  },
});

export default dokterSlice.reducer;
