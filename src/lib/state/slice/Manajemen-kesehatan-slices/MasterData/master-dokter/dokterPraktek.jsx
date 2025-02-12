import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";

const API_URL = "http://160.20.104.177:4141/api/DokterPraktek";

// Async actions
export const fetchDokterPraktek = createAsyncThunk(
  "dokterPraktek/fetchAll",
  async () => {
    const response = await axios.get(API_URL, { headers: getHeaders() });
    return response.data.data;
  }
);

export const fetchDokterById = createAsyncThunk(
  "dokterPraktek/fetchById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  }
);

export const createDokterPraktek = createAsyncThunk(
  "dokterPraktek/create",
  async (dokterData) => {
    const response = await axios.post(API_URL, dokterData, {
      headers: getHeaders(),
    });
    return response.data;
  }
);

export const updateDokterPraktek = createAsyncThunk(
  "dokterPraktek/update",
  async ({ id, dokterData }) => {
    const response = await axios.put(`${API_URL}/${id}`, dokterData, {
      headers: getHeaders(),
    });
    return response.data;
  }
);

export const deleteDokterPraktek = createAsyncThunk(
  "dokterPraktek/delete",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
    return id;
  }
);

const dokterPraktekSlice = createSlice({
  name: "dokterPraktek",
  initialState: { data: [], selectedDokter: null, loading: false, error: null },
  reducers: {},
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
        state.error = action.error.message;
      })
      .addCase(fetchDokterById.fulfilled, (state, action) => {
        state.selectedDokter = action.payload;
      })
      .addCase(createDokterPraktek.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateDokterPraktek.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (dokter) => dokter.dokterPraktekId === action.payload.dokterPraktekId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteDokterPraktek.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (dokter) => dokter.dokterPraktekId !== action.payload
        );
      });
  },
});

export default dokterPraktekSlice.reducer;
