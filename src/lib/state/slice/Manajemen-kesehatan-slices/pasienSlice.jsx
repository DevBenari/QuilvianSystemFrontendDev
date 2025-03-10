import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Get daftar pasien
export const fetchPasienSlice = createAsyncThunk(
  "pasien/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().pasien;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }
      const response = await InstanceAxios.get(`/PendaftaranPasienBaru`, {
        params: { page, perPage },
        headers: getHeaders(),
      });

      return {
        data: response.data.data,
        pagination: response.data.pagination,
        page,
        meta: { arg: { page, isInfiniteScroll } },
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

export const fetchPasienWithFilters = createAsyncThunk(
  "pasien/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/PendaftaranPasienBaru/paged`, {
        params: filters,
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return rejectWithValue({
          message: "Tidak ada data yang tersedia",
          data: [],
        });
      }
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

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
          "Content-Type": undefined,
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

      const response = await InstanceAxios.post(
        "/PendaftaranPasienBaru",
        dataToSend,
        {
          headers: headers,
        }
      );

      console.log("Response API (Add):", response.data);
      return response.data;
    } catch (error) {
      console.error("Error response dari server:", error.response?.data);
      if (error.response?.status === 400) {
        return rejectWithValue(
          "Permintaan tidak valid! Silakan periksa kembali data Anda."
        );
      }
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengirim data pasien."
      );
    }
  }
);

export const fetchPendaftaranPasienBaruById = createAsyncThunk(
  "PendaftaranPasienBaru/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/PendaftaranPasienBaru/${id}`, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data"
      );
    }
  }
);

export const updatePendaftaranPasienBaru = createAsyncThunk(
  "PendaftaranPasienBaru/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(
        `/PendaftaranPasienBaru/${id}`,
        data,
        {
          headers: getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui Pasien "
      );
    }
  }
);

export const deletePendaftaranPasienBaru = createAsyncThunk(
  "PendaftaranPasienBaru/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(
        `/PendaftaranPasienBaru/${id}`,
        {
          headers: getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Gagal menghapus Pasien");
    }
  }
);

// Helper function to convert file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]); // Get only the base64 part
    reader.onerror = (error) => reject(error);
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
    currentPage: 1,
    selectedPasienBaru: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetch Pasien
      .addCase(fetchPasienSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPasienSlice.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if we already had the data

        state.loading = false;

        // Add new data without duplicates
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.pendaftaranPasienBaruId ===
                newItem.pendaftaranPasienBaruId
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
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // end  fetch pasien

      .addCase(fetchPasienWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPasienWithFilters.fulfilled, (state, action) => {
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
      })
      // Fetch By ID
      .addCase(fetchPendaftaranPasienBaruById.pending, (state) => {
        state.loading = true;
        state.selectedDepartement = null;
      })
      .addCase(fetchPendaftaranPasienBaruById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDepartement = action.payload;
      })
      .addCase(fetchPendaftaranPasienBaruById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Departement Darah
      .addCase(updatePendaftaranPasienBaru.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (PendaftaranPasienBaru) =>
            PendaftaranPasienBaru.pendaftaranPasienBaruId ===
            action.payload.pendaftaranPasienBaruId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus PendaftaranPasienBaru Darah
      .addCase(deletePendaftaranPasienBaru.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (PendaftaranPasienBaru) =>
            PendaftaranPasienBaru.pendaftaranPasienBaruId !== action.payload
        );
      });
  },
});

export default pasienSlice.reducer;
