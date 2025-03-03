import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Get daftar pasien
export const fetchPasienSlice = createAsyncThunk("pasien/fetchPasien", async ({page = 1, perPage = 10}, { rejectWithValue }) => {
  try{
    const response = await InstanceAxios.get("/PendaftaranPasienBaru",{
      params: {page, perPage},
      headers: getHeaders(),
    })

    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat mengambil data";
    return rejectWithValue(errorMessage);
  }
})

export const fetchPasienWithFilters = createAsyncThunk("pasien/fetchWithFilters", async (filters, {rejectWithValue}) => {
  try{
    const response  = await InstanceAxios.get(`/PendaftaranPasienBaru/paged`, {
      params: filters,
      headers: getHeaders(),
    });
    return response.data;
  }catch(error){
    if (error.response?.status === 404) {
      return rejectWithValue({
        message: "Tidak ada data yang tersedia",
        data: [],
      });
    }
    return rejectWithValue(
      error.response?.data || "Terjadi kesalahan saat mengambil data")
  }
} )

// Tambah pasien baru
// Tambah pasien baru
export const AddPasienSlice = createAsyncThunk(
  "pasien/addPasien",
  async (formData, { rejectWithValue }) => {
    try {
      // Check if formData is an actual FormData object or a plain JS object
      let dataToSend;
      let headers = getHeaders();

      if (formData instanceof FormData) {
        // If it's already FormData, use it directly
        // Remove Content-Type header so browser can set the boundary
        headers = {
          ...headers,
          'Content-Type': undefined
        };
        dataToSend = formData;
      } else {
        // If it's a regular object with a foto property that's a File
        dataToSend = { ...formData };
        
        // Convert file to base64 if it exists
        if (formData.foto instanceof File) {
          const base64String = await fileToBase64(formData.foto);
          dataToSend.foto = base64String;
          dataToSend.fotoFileName = formData.foto.name;
        }
      }
      
      const response = await InstanceAxios.post("/PendaftaranPasienBaru", dataToSend, {
        headers: headers
      });
      
      console.log("Response API (Add):", response.data);
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

// Helper function to convert file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]); // Get only the base64 part
    reader.onerror = error => reject(error);
  });
}

const pasienSlice = createSlice({
  name: "pasien",
  initialState: {
    data: [],
    loadedPages: [],
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 1,
    currentPage:1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPasienSlice.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error saat memuat ulang data
      })
      .addCase(fetchPasienSlice.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data
        
        state.loading = false;
        
        // Add new data without duplicates
        const newData = action.payload.data.filter(
          newItem => !state.data.some(
            existingItem => existingItem.agamaId === newItem.agamaId
          )
        );
        
        if (action.meta.arg.isInfiniteScroll) {
          // Infinite scroll - append data
          state.data = [...state.data, ...newData];
          state.loadedPages.push(action.payload.page);
        } else {
          // Regular pagination - replace data
          state.data = action.payload.data;
        }
        
        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.meta.arg.page;
      })
      .addCase(fetchPasienSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Terjadi kesalahan"; // Simpan error message dari backend
      })
      .addCase(fetchPasienWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPasienWithFilters.fulfilled, (state,action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchPasienWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })
      .addCase(AddPasienSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddPasienSlice.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload);
        }
      })
      .addCase(AddPasienSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Simpan error message dari backend
      });
  },
});

export default pasienSlice.reducer;
