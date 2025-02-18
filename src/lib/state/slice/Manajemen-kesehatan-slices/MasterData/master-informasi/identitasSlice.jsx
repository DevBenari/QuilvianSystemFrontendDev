import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHeaders } from "@/lib/headers/headers";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";

// 🔹 Fetch semua data identitas dengan pagination
export const fetchIdentitas = createAsyncThunk(
  "identitas/fetchData",
  async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Identitas`, {
        params: { page, perPage },
        headers: getHeaders(),
      });

      console.log("Response API Identitas:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          "Terjadi kesalahan saat mengambil data identitas"
      );
    }
  }
);

// 🔹 Fetch identitas berdasarkan ID
export const fetchIdentitasById = createAsyncThunk(
  "identitas/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Identitas/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Gagal mengambil data identitas berdasarkan ID");
    }
  }
);

// 🔹 Tambah data identitas
export const createIdentitas = createAsyncThunk(
  "identitas/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Identitas`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Gagal menambahkan data identitas");
    }
  }
);

// 🔹 Update identitas berdasarkan ID
export const updateIdentitas = createAsyncThunk(
  "identitas/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Identitas/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Gagal memperbarui data identitas");
    }
  }
);

// 🔹 Hapus identitas berdasarkan ID
export const deleteIdentitas = createAsyncThunk(
  "identitas/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Identitas/${id}`, {
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      return rejectWithValue("Gagal menghapus data identitas");
    }
  }
);

// 🔹 Redux Slice untuk menyimpan data identitas
const identitasSlice = createSlice({
  name: "identitas",
  initialState: {
    data: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedIdentitas: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ** Fetch All **
      .addCase(fetchIdentitas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIdentitas.fulfilled, (state, action) => {
        console.log("Processed Data:", action.payload);
        state.loading = false;
        state.data = action.payload.data || [];
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.payload.pagination?.currentPage || 1;
      })
      .addCase(fetchIdentitas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil data identitas";
      })

      // ** Fetch By ID **
      .addCase(fetchIdentitasById.fulfilled, (state, action) => {
        state.selectedIdentitas = action.payload;
      })

      // ** Create **
      .addCase(createIdentitas.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // ** Update **
      .addCase(updateIdentitas.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.identitasId === action.payload.identitasId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // ** Delete **
      .addCase(deleteIdentitas.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.identitasId !== action.payload
        );
      });
  },
});

export default identitasSlice.reducer;
