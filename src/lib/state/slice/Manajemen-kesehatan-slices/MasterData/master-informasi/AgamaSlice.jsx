import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// **FETCH DATA AGAMA DENGAN FILTER & PAGINATION**
export const fetchAgama = createAsyncThunk(
  "agama/fetchPaged",
  async (
    { page, perPage, searchQuery, periode, sortDirection, startDate, endDate },
    { rejectWithValue }
  ) => {
    try {
      const response = await InstanceAxios.get("/Agama/paged", {
        headers: getHeaders(),
        params: {
          page,
          perPage,
          orderBy,
          sortDirection,
          periode,
          startDate,
          endDate,
        },
      });

      return response.data.data; // Pastikan API mengembalikan data dalam 'data'
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data agama"
      );
    }
  }
);

// **FETCH DETAIL AGAMA BERDASARKAN ID**
export const fetchAgamaById = createAsyncThunk(
  "agama/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/Agama/${id}`, {
        headers: getHeaders(),
      });
      return response.data.data; // Data Agama berdasarkan ID
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Gagal mengambil data agama berdasarkan ID"
      );
    }
  }
);

// **TAMBAH DATA AGAMA**
export const createAgama = createAsyncThunk(
  "agama/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post("/Agama", data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal create data agama"
      );
    }
  }
);

// **UPDATE DATA AGAMA**
export const updateAgama = createAsyncThunk(
  "agama/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Agama/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengupdate data agama"
      );
    }
  }
);

// **HAPUS DATA AGAMA**
export const deleteAgama = createAsyncThunk(
  "agama/delete",
  async (id, { rejectWithValue }) => {
    try {
      await InstanceAxios.delete(`/Agama/${id}`, { headers: getHeaders() });
      return id; // Kembalikan ID untuk menghapus dari state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal delete data agama"
      );
    }
  }
);

// **SLICE REDUX AGAMA**
const agamaSlice = createSlice({
  name: "agama",
  initialState: {
    data: { rows: [], totalPages: 1, totalRows: 0 }, // Format data sesuai API
    selectedAgama: null, // Untuk menyimpan data detail berdasarkan ID
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // **FETCH DATA AGAMA**
      .addCase(fetchAgama.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgama.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAgama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // **FETCH DATA AGAMA BY ID**
      .addCase(fetchAgamaById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgamaById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAgama = action.payload;
      })
      .addCase(fetchAgamaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // **CREATE DATA AGAMA**
      .addCase(createAgama.fulfilled, (state, action) => {
        state.data.rows.push(action.payload);
      })

      // **UPDATE DATA AGAMA**
      .addCase(updateAgama.fulfilled, (state, action) => {
        const index = state.data.rows.findIndex(
          (agama) => agama.agamaId === action.payload.agamaId
        );
        if (index !== -1) {
          state.data.rows[index] = action.payload;
        }
      })

      // **DELETE DATA AGAMA**
      .addCase(deleteAgama.fulfilled, (state, action) => {
        state.data.rows = state.data.rows.filter(
          (agama) => agama.agamaId !== action.payload
        );
      });
  },
});

export default agamaSlice.reducer;
