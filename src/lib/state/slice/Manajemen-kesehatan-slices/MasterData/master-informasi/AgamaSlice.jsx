// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
// import { getHeaders } from "@/lib/headers/headers";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// // CRUD Thunks
// export const fetchAgama = createAsyncThunk("agama/fetch", async (_, { rejectWithValue }) => {
//   try{
//     const response = await InstanceAxios.get("/Agama", { headers: getHeaders() });
//     return response.data;
//   }catch(error){
//     // Cek apakah ada response dari server atau error lain
//     const errorMessage = error.response?.data?.message || "Gagal mengambil data agama";
//     return rejectWithValue(errorMessage);
//   }
// });

// export const createAgama = createAsyncThunk("agama/create", async (data, { rejectWithValue }) => {
//   try{  
//     const response = await InstanceAxios.post("/Agama", data, { headers: getHeaders() });
//     return response.data;
//   }catch(error){
//    // Cek apakah ada response dari server atau error lain
//    const errorMessage = error.response?.data?.message || "Gagal create data agama";
//    return rejectWithValue(errorMessage);
//   }

// });

// export const updateAgama = createAsyncThunk("agama/update",async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await InstanceAxios.put(`/Agama/${id}`, data, {
//         headers: getHeaders(),
//       });
//       return response.data;  // Langsung return data dari response
//     } catch (error) {
//       // Cek apakah ada response dari server atau error lain
//       const errorMessage = error.response?.data?.message || "Gagal mengupdate data agama";
//       return rejectWithValue(errorMessage);
//     }
//   }
// );


// export const deleteAgama = createAsyncThunk("agama/delete", async (id,{ rejectWithValue }) => {
//     try{
//       const response = await InstanceAxios.delete(`/Agama/${id}`, { headers: getHeaders() });
//       return response.data;
//     }
//     catch(error){
//       // Cek apakah ada response dari server atau error lain
//       const errorMessage = error.response?.data?.message || "Gagal delete data agama";
//       return rejectWithValue(errorMessage);
//     }
// });

// // Slice
// const agamaSlice = createSlice({
//   name: "agama",
//   initialState: {
//     data: { data: [] },
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAgama.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAgama.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchAgama.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(createAgama.fulfilled, (state, action) => {
//         if (Array.isArray(state.data.data)) {
//           state.data.data.push(action.payload); // Tambahkan payload ke array data
//         }
//       })
//       .addCase(updateAgama.fulfilled, (state, action) => {
//         const index = state.data.findIndex(
//           (agama) => agama.agamaId === action.payload.agamaId
//         );
//         if (index !== -1) {
//           state.data[index] = action.payload;
//         }
//       })
//       .addCase(deleteAgama.fulfilled, (state, action) => {
//         state.data = state.data.filter(
//           (agama) => agama.agamaId !== action.payload
//         );
//       });
//   },
// });

// export default agamaSlice.reducer;


// agamaSlice.js
import { InstanceAxios } from '@/lib/axiosInstance/InstanceAxios';
import { getHeaders } from '@/lib/headers/headers';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAgama = createAsyncThunk(
  'agama/fetchData',
  async ({ 
    page, 
    perPage, 
    orderBy, 
    sortDirection,
    periodType,  // 'today', 'lastWeek', 'lastMonth', 'custom'
    startDate,   // for custom period
    endDate      // for custom period
  }, { rejectWithValue }) => {
    try {
      // Prepare date parameters based on period type
      let dateParams = {};
      
      switch (periodType) {
        case 'today':
          dateParams = {
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0]
          };
          break;
        case 'lastWeek':
          const lastWeek = new Date();
          lastWeek.setDate(lastWeek.getDate() - 7);
          dateParams = {
            startDate: lastWeek.toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0]
          };
          break;
        case 'lastMonth':
          const lastMonth = new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          dateParams = {
            startDate: lastMonth.toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0]
          };
          break;
        case 'custom':
          dateParams = {
            startDate,
            endDate
          };
          break;
        default:
          throw new Error('Invalid period type');
      }

      const response = await InstanceAxios.get(
        `/Agama/paged?page=1&perPage=10&orderBy=CreateDateTime&sortDirection=asc&periode=ThisMonth`,
        {
          params: {
            page,  
            perPage,
            orderBy,
            sortDirection,
            ...dateParams
          },
          headers: getHeaders(),
        }
      );
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
  async ({ page = 1, perPage = 10, orderBy = "CreateDateTime", sortDirection = "asc", periode = "ThisMonth", search = "", startDate = "", endDate = "" }, { rejectWithValue }) => {
    const params = { page, perPage, orderBy, sortDirection, periode };

    if (search) params.search = search;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    try {
      const response = await InstanceAxios.get("/Agama/paged", { headers: getHeaders(), params });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
  name: 'agama',
  initialState: {
    data: [],
    totalItems: 0,
    currentPage: 1,
    perPage: 10,
    orderBy: "CreateDateTime",
    sortDirection: "asc",
    periode: "ThisMonth",
    search: "",
    startDate: "",
    endDate: "",
    loading: false,
    error: null,
    periodType: 'ThisMonth', // default period
    startDate: null,
    endDate: null
  },
  reducers: {
    setPeriod: (state, action) => {
      state.periodType = action.payload.periodType;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    }
  },
  extraReducers: (builder) => {
    builder
      // **FETCH DATA AGAMA**
      .addCase(fetchAgama.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.error = null;
      })
      .addCase(fetchAgama.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.items;
        state.totalItems = action.payload.totalItems;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchAgama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Terjadi kesalahan saat mengambil data';
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

export const { setPeriod } = agamaSlice.actions;
export default agamaSlice.reducer;