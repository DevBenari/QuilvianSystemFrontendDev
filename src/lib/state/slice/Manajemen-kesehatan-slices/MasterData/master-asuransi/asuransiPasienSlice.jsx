import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// Fetch semua asuransi pasien berdasarkan ID pasien
export const fetchAsuransiPasien = createAsyncThunk(
  "asuransiPasien/fetchData",
  async (pasienId, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/AsuransiPasien/${pasienId}`, {
        headers: getHeaders(),
      });
      
      return response.data.data;
    } catch (error) {
      console.error("Error fetching asuransi pasien:", error);
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data asuransi pasien"
      );
    }
  }
);

// Tambah asuransi pasien baru
export const createAsuransiPasien = createAsyncThunk(
  "asuransiPasien/create",
  async (data, { rejectWithValue }) => {
    try {
      // Menyiapkan data untuk API sesuai format yang dibutuhkan
      const formattedData = {
        createDateTime: new Date().toISOString(),
        createBy: data.userId || "system",
        updateDateTime: new Date().toISOString(),
        updateBy: data.userId || "system",
        isDelete: false,
        pasienId: data.pasienId,
        noPolis: data.noPolis || data.nomorPolis,
        asuransiId: data.asuransiId
      };

      // Kirim request ke API
      const response = await InstanceAxios.post(`/AsuransiPasien`, formattedData, {
        headers: getHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error("Error creating asuransi pasien:", error);
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan asuransi pasien"
      );
    }
  }
);

// Update asuransi pasien
export const updateAsuransiPasien = createAsyncThunk(
  "asuransiPasien/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // Format data untuk API
      const formattedData = {
        ...data,
        updateDateTime: new Date().toISOString(),
        updateBy: data.userId || "system",
      };

      const response = await InstanceAxios.put(`/AsuransiPasien/${id}`, formattedData, {
        headers: getHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error("Error updating asuransi pasien:", error);
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui asuransi pasien"
      );
    }
  }
);

// Hapus asuransi pasien
export const deleteAsuransiPasien = createAsyncThunk(
  "asuransiPasien/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/AsuransiPasien/${id}`, {
        headers: getHeaders(),
      });
      return { id, ...response.data };
    } catch (error) {
      console.error("Error deleting asuransi pasien:", error);
      return rejectWithValue(
        error.response?.data || "Gagal menghapus asuransi pasien"
      );
    }
  }
);

// Redux Slice untuk asuransi pasien
const asuransiPasienSlice = createSlice({
  name: "asuransiPasien",
  initialState: {
    data: [],
    loading: false,
    error: null,
    selectedAsuransiPasien: null,
  },
  reducers: {
    // Reset error state
    resetError: (state) => {
      state.error = null;
    },
    
    // Reset selected asuransi pasien
    resetSelectedAsuransiPasien: (state) => {
      state.selectedAsuransiPasien = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch asuransi pasien
      .addCase(fetchAsuransiPasien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAsuransiPasien.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
      })
      .addCase(fetchAsuransiPasien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil data asuransi pasien";
      })

      // Create asuransi pasien
      .addCase(createAsuransiPasien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAsuransiPasien.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload.data);
      })
      .addCase(createAsuransiPasien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal menambahkan asuransi pasien";
      })

      // Update asuransi pasien
      .addCase(updateAsuransiPasien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAsuransiPasien.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (asuransi) => asuransi.asuransiPasienId === action.payload.data.asuransiPasienId
        );
        if (index !== -1) {
          state.data[index] = action.payload.data;
        }
      })
      .addCase(updateAsuransiPasien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal memperbarui asuransi pasien";
      })

      // Delete asuransi pasien
      .addCase(deleteAsuransiPasien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAsuransiPasien.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (asuransi) => asuransi.asuransiPasienId !== action.payload.id
        );
      })
      .addCase(deleteAsuransiPasien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal menghapus asuransi pasien";
      });
  },
});

export const { resetError, resetSelectedAsuransiPasien } = asuransiPasienSlice.actions;
export default asuransiPasienSlice.reducer;