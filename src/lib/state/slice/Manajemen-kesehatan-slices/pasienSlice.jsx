import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Get daftar pasien
export const GetPasienSlice = createAsyncThunk(
  "pasien/getPasien",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/PendaftaranPasienBaru", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ",
        },
      });

      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return rejectWithValue("Data pasien tidak ditemukan!");
      }
      return rejectWithValue(error.response?.data?.message || "Gagal mengambil data pasien.");
    }
  }
);

// Tambah pasien baru
export const AddPasienSlice = createAsyncThunk(
  "pasien/addPasien",
  async (newPasien, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in newPasien) {
        formData.append(key, newPasien[key]);
      }

      const response = await InstanceAxios.post("/PendaftaranPasienBaru", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer <TOKEN>",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error response dari server:", error.response?.data);
      if (error.response?.status === 400) {
        return rejectWithValue("Permintaan tidak valid! Silakan periksa kembali data Anda.");
      }
      return rejectWithValue(error.response?.data?.message || "Gagal mengirim data pasien.");
    }
  }
);

const pasienSlice = createSlice({
  name: "pasien",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPasienSlice.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error saat memuat ulang data
      })
      .addCase(GetPasienSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetPasienSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Simpan error message dari backend
      })
      .addCase(AddPasienSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddPasienSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(AddPasienSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Simpan error message dari backend
      });
  },
});

export default pasienSlice.reducer;
