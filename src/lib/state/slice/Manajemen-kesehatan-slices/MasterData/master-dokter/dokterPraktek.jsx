import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// Fetch All DokterPraktek
export const fetchDokterPraktek = createAsyncThunk(
  "dokterPraktek/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/DokterPraktek", {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data Dokter Praktek"
      );
    }
  }
);

// Fetch DokterPraktek By ID
export const fetchDokterPraktekById = createAsyncThunk(
  "dokterPraktek/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/DokterPraktek/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data Dokter Praktek"
      );
    }
  }
);

// Create DokterPraktek
export const createDokterPraktek = createAsyncThunk(
  "dokterPraktek/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/DokterPraktek", data, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menambahkan data Dokter Praktek"
      );
    }
  }
);

// Update DokterPraktek
export const updateDokterPraktek = createAsyncThunk(
  "dokterPraktek/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/DokterPraktek/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data Dokter Praktek"
      );
    }
  }
);

// Delete DokterPraktek
export const deleteDokterPraktek = createAsyncThunk(
  "dokterPraktek/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/DokterPraktek/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus data Dokter Praktek"
      );
    }
  }
);

const dokterPraktekSlice = createSlice({
  name: "dokterPraktek",
  initialState: {
    data: [],
    selectedDokterPraktek: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDokterPraktek.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDokterPraktek.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDokterPraktek.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDokterPraktekById.pending, (state) => {
        state.selectedDokterPraktek = null;
      })
      .addCase(fetchDokterPraktekById.fulfilled, (state, action) => {
        state.selectedDokterPraktek = action.payload;
      })
      .addCase(createDokterPraktek.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateDokterPraktek.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.dokterPraktekId === action.payload.dokterPraktekId
        );

        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }

        if (
          state.selectedDokterPraktek?.dokterPraktekId ===
          action.payload.dokterPraktekId
        ) {
          state.selectedDokterPraktek = {
            ...state.selectedDokterPraktek,
            ...action.payload,
          };
        }
      })
      .addCase(deleteDokterPraktek.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.dokterPraktekId !== action.payload
        );
      });
  },
});

export default dokterPraktekSlice.reducer;
