import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// CRUD Thunks
export const fetchAgama = createAsyncThunk("agama/fetch", async (_, { rejectWithValue }) => {
  try{
    const response = await InstanceAxios.get("/Agama", { headers: getHeaders() });
    return response.data;
  }catch(error){
    // Cek apakah ada response dari server atau error lain
    const errorMessage = error.response?.data?.message || "Gagal mengambil data agama";
    return rejectWithValue(errorMessage);
  }
});


export const fetchAgamaWithPaging = createAsyncThunk(
  "agama/fetchWithPaging",
  async ({ page = 1, perPage = 10, orderBy = "CreateDateTime", sortDirection = "asc", periode = "Today", search = "", startDate = "", endDate = "" }, { rejectWithValue }) => {
    const params = { page, perPage, orderBy, sortDirection, periode };

    if (search) params.search = search;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    try {
      const response = await InstanceAxios.get("/Agama/paged", { headers: getHeaders(), params });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal mengambil data agama");
    }
  }
);


export const createAgama = createAsyncThunk("agama/create", async (data, { rejectWithValue }) => {
  try{  
    const response = await InstanceAxios.post("/Agama", data, { headers: getHeaders() });
    return response.data;
  }catch(error){
   // Cek apakah ada response dari server atau error lain
   const errorMessage = error.response?.data?.message || "Gagal create data agama";
   return rejectWithValue(errorMessage);
  }

});

export const updateAgama = createAsyncThunk("agama/update",async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/Agama/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;  // Langsung return data dari response
    } catch (error) {
      // Cek apakah ada response dari server atau error lain
      const errorMessage = error.response?.data?.message || "Gagal mengupdate data agama";
      return rejectWithValue(errorMessage);
    }
  }
);


export const deleteAgama = createAsyncThunk("agama/delete", async (id) => {
    try{
      const response = await InstanceAxios.delete(`/Agama/${id}`, { headers: getHeaders() });
      return response.data;
    }
    catch(error){
      // Cek apakah ada response dari server atau error lain
      const errorMessage = error.response?.data?.message || "Gagal delete data agama";
      return rejectWithValue(errorMessage);
    }
});

// Slice
const agamaSlice = createSlice({
  name: "agama",
  initialState: {
    data: { data: [] },
    totalPages: 1,
    currentPage: 1,
    perPage: 10,
    orderBy: "CreateDateTime",
    sortDirection: "asc",
    periode: "Today",
    search: "",
    startDate: "",
    endDate: "",
    loading: false,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgama.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgama.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAgama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAgamaWithPaging.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgamaWithPaging.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchAgamaWithPaging.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil data";
      })
      .addCase(createAgama.fulfilled, (state, action) => {
        if (Array.isArray(state.data.data)) {
          state.data.data.push(action.payload); // Tambahkan payload ke array data
        }
      })
      .addCase(updateAgama.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (agama) => agama.agamaId === action.payload.agamaId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteAgama.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (agama) => agama.agamaId !== action.payload
        );
      });
  },
});

export const { setPage, setFilters } = agamaSlice.actions
export default agamaSlice.reducer;
