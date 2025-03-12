import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// 🔹 Fetch DokterPoli dengan pagination untuk CustomTableComponent
// ✅ Fetch semua data DokterPoli dengan pagination
// 🔹 Fetch DokterPoli dengan pagination dan filter berdasarkan Poli/Asuransi
export const fetchDokterPoli = createAsyncThunk(
  "DokterPoli/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false, poliId, asuransiId },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().DokterPoli;
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }

      let url = "/DokterPoli";
      let params = { page, perPage };
      if (poliId) params.poliId = poliId;
      if (asuransiId) params.asuransiId = asuransiId;

      const response = await InstanceAxios.get(url, {
        params,
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
// 🔹 Fetch DokterPoli dengan filter untuk CustomSearchFilter (BISA DIGUNAKAN SECARA DINAMIS)
export const fetchDokterPoliWithFilters = createAsyncThunk(
  "DokterPoli/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/DokterPoli/paged`, {
        params: filters,
        headers: getHeaders(),
      });

      console.log("Response API (Filtered):", response.data);
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

// 🔹 Fetch data DokterPoli berdasarkan ID
export const fetchDokterPoliById = createAsyncThunk(
  "DokterPoli/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/DokterPoli/${id}`, {
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

// 🔹 Tambah DokterPoli Darah
export const createDokterPoli = createAsyncThunk(
  "DokterPoli/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/DokterPoli`, data, {
        headers: getHeaders(),
      });

      console.log("Response API (Fetch By ID):", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menambahkan DokterPoli "
      );
    }
  }
);

// 🔹 Update DokterPoli Darah berdasarkan ID
export const updateDokterPoli = createAsyncThunk(
  "DokterPoli/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.put(`/DokterPoli/${id}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal memperbarui DokterPoli "
      );
    }
  }
);

export const deleteDokterPoli = createAsyncThunk(
  "DokterPoli/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.delete(`/DokterPoli/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Gagal menghapus DokterPoli"
      );
    }
  }
);

// 🔹 Redux Slice
const DokterPoliSlice = createSlice({
  name: "DokterPoli",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    selectedDokterPoli: [],
    doctorsByPoli: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Doctors

      .addCase(fetchDokterPoli.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDokterPoli.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.loading = false;

        // Menyaring data baru agar tidak duplikasi
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.dokterPoliId === newItem.dokterPoliId
            )
        );

        if (action.meta.arg.isInfiniteScroll) {
          state.data = [...state.data, ...newData];
          state.loadedPages.push(action.payload.page);
        } else {
          state.data = action.payload.data;
        }

        state.totalItems = action.payload.pagination?.totalRows || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
        state.currentPage = action.meta.arg.page;

        // Struktur data dokter berdasarkan Poli
        const doctorsByPoli = {};
        action.payload.data.forEach((doctor) => {
          if (!doctor.poliId) return;
          if (!doctorsByPoli[doctor.poliId]) {
            doctorsByPoli[doctor.poliId] = [];
          }
          doctorsByPoli[doctor.poliId].push({
            id: doctor.dokterId,
            name: doctor.namaDokter,
            acceptedInsurances: doctor.asuransiId ? [doctor.asuransiId] : [],
          });
        });

        Object.keys(doctorsByPoli).forEach((poliId) => {
          const existingDoctors = state.doctorsByPoli[poliId] || [];
          const newDoctors = doctorsByPoli[poliId];
          const doctorMap = {};
          existingDoctors.forEach((doctor) => {
            doctorMap[doctor.id] = doctor;
          });
          newDoctors.forEach((doctor) => {
            if (doctorMap[doctor.id]) {
              doctorMap[doctor.id].acceptedInsurances = [
                ...new Set([
                  ...doctorMap[doctor.id].acceptedInsurances,
                  ...doctor.acceptedInsurances,
                ]),
              ];
            } else {
              doctorMap[doctor.id] = doctor;
            }
          });
          state.doctorsByPoli[poliId] = Object.values(doctorMap);
        });
      })
      .addCase(fetchDokterPoli.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // ✅ Fetch DokterPoli dengan search & filter (CustomSearchFilter)
      .addCase(fetchDokterPoliWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDokterPoliWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchDokterPoliWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data";
      })

      // Fetch By ID
      .addCase(fetchDokterPoliById.pending, (state) => {
        state.loading = true;
        state.selectedDokterPoli = null;
      })
      .addCase(fetchDokterPoliById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDokterPoli = action.payload;
      })
      .addCase(fetchDokterPoliById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tambah DokterPoli Darah
      .addCase(createDokterPoli.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update DokterPoli Darah
      .addCase(updateDokterPoli.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (DokterPoli) =>
            DokterPoli.dokterPoliId === action.payload.dokterPoliId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus DokterPoli Darah
      .addCase(deleteDokterPoli.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (DokterPoli) => DokterPoli.dokterPoliId !== action.payload
        );
      });
  },
});

export default DokterPoliSlice.reducer;
