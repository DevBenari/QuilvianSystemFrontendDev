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
    loading: false,
    error: null,
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

export default agamaSlice.reducer;
