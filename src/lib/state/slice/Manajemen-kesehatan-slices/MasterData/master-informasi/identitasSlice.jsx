import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch semua identitas
export const fetchIdentitas = createAsyncThunk(
  "identitas/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get("/Identitas", {
        headers: getHeaders(),
      });
      return response.data.data; // Ambil data dari response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data identitas"
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
      return response.data.data; // Ambil data dari response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Gagal mengambil data identitas berdasarkan ID"
      );
    }
  }
);

// 🔹 Tambah identitas
// CRUD Thunks
export const fetchIdentitas = createAsyncThunk("identitas/fetch", async (_,{ rejectWithValue }) => {
  try{
    const response = await InstanceAxios.get(`/Identitas`, { headers: getHeaders() });
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "Gagal mengambil data identitas";
    return rejectWithValue(errorMessage);
  }
});

export const createIdentitas = createAsyncThunk(
  "identitas/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Identitas", data, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menambahkan data identitas"
      );
  async (data) => {
    try{
      const response = await InstanceAxios.post(`/Identitas`, data, { headers: getHeaders() });
      return response.data;
    }catch(error){
      const errorMessage = error.response?.data?.message || "Gagal create data identitas";
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update identitas
export const updateIdentitas = createAsyncThunk(
export const updateIdentitas = createAsyncThunk(
  "identitas/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Identitas/${id}`, data, {
  async ({ id, data }) => {
    try{
      const response = await InstanceAxios.put(`/Identitas/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memperbarui data identitas"
      );
    }
  }
);

// 🔹 Hapus identitas
export const deleteIdentitas = createAsyncThunk(
  "identitas/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Identitas/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus data identitas"
      );
    }
  }
);
export const deleteIdentitas = createAsyncThunk("identitas/delete", async (id, { rejectWithValue }) => {
  try{
    const response = await InstanceAxios.delete(`/Identitas/${id}`, { headers: getHeaders() });
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "Gagal delete data identitas";
    return rejectWithValue(errorMessage);
  }
});

// 🔹 Slice Identitas
const identitasSlice = createSlice({
  name: "identitas",
  initialState: {
    data: [], // Data harus berupa array, bukan { data: [] }
    selectedIdentitas: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdentitas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIdentitas.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Pastikan mengambil data sebagai array langsung
      })
      .addCase(fetchIdentitas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchIdentitasById.pending, (state) => {
        state.selectedIdentitas = null;
      })
      .addCase(fetchIdentitasById.fulfilled, (state, action) => {
        state.selectedIdentitas = action.payload;
      })
      .addCase(createIdentitas.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateIdentitas.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.identitasId === action.payload.identitasId
        );

        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }

        if (
          state.selectedIdentitas?.identitasId === action.payload.identitasId
        ) {
          state.selectedIdentitas = {
            ...state.selectedIdentitas,
            ...action.payload,
          };
      .addCase(updateIdentitas.fulfilled, (state, action) => {
        if (Array.isArray(state.data.data)) {
          const index = state.data.data.findIndex(
            (item) => item.IdentitasId === action.payload.IdentitasId
          );
          if (index !== -1) {
            state.data.data[index] = action.payload;
          }
        }
      })
      .addCase(deleteIdentitas.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.identitasId !== action.payload
        );

      .addCase(deleteIdentitas.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default identitasSlice.reducer;
