import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// Fetch DokterAsuransi dengan pagination dan filter
export const fetchDokterAsuransi = createAsyncThunk(
  "DokterAsuransi/fetchData",
  async (
    { page = 1, perPage = 10, isInfiniteScroll = false, asuransiId },
    { rejectWithValue, getState }
  ) => {
    try {
      const currentState = getState().DokterAsuransi;
      // Cek apakah data sudah di-fetch untuk mencegah redundansi
      if (currentState.loadedPages.includes(page)) {
        console.log("Data already loaded for page:", page);
        return null;
      }

      let url = "/DokterAsuransi";
      let params = { page, perPage };
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
        error.response?.data || "Terjadi kesalahan saat mengambil data dokter asuransi"
      );
    }
  }
);

// Fetch DokterAsuransi dengan filter untuk search/filtering
export const fetchDokterAsuransiWithFilters = createAsyncThunk(
  "DokterAsuransi/fetchWithFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/DokterAsuransi/paged`, {
        params: filters,
        headers: getHeaders(),
      });

      console.log("Response API DokterAsuransi (Filtered):", response.data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return rejectWithValue({
          message: "Tidak ada data dokter asuransi yang tersedia",
          data: [],
        });
      }
      return rejectWithValue(
        error.response?.data || "Terjadi kesalahan saat mengambil data dokter asuransi"
      );
    }
  }
);

// Redux Slice
const DokterAsuransiSlice = createSlice({
  name: "DokterAsuransi",
  initialState: {
    data: [],
    loadedPages: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    doctorsByAsuransi: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Doctors by Asuransi
      .addCase(fetchDokterAsuransi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDokterAsuransi.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.loading = false;

        // Menyaring data baru agar tidak duplikasi
        const newData = action.payload.data.filter(
          (newItem) =>
            !state.data.some(
              (existingItem) =>
                existingItem.dokterAsuransiId === newItem.dokterAsuransiId
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

        // Struktur data dokter berdasarkan Asuransi
        const doctorsByAsuransi = {};
        action.payload.data.forEach((doctor) => {
          if (!doctor.asuransiId) return;
          if (!doctorsByAsuransi[doctor.asuransiId]) {
            doctorsByAsuransi[doctor.asuransiId] = [];
          }
          doctorsByAsuransi[doctor.asuransiId].push({
            id: doctor.dokterId,
            name: doctor.namaDokter,
            dokterAsuransiId: doctor.dokterAsuransiId,
            availableInPolis: doctor.poliId ? [doctor.poliId] : [],
          });
        });

        // Merge data baru dengan data yang sudah ada
        Object.keys(doctorsByAsuransi).forEach((asuransiId) => {
          const existingDoctors = state.doctorsByAsuransi[asuransiId] || [];
          const newDoctors = doctorsByAsuransi[asuransiId];
          const doctorMap = {};
          existingDoctors.forEach((doctor) => {
            doctorMap[doctor.id] = doctor;
          });
          newDoctors.forEach((doctor) => {
            if (doctorMap[doctor.id]) {
              doctorMap[doctor.id].availableInPolis = [
                ...new Set([
                  ...doctorMap[doctor.id].availableInPolis,
                  ...doctor.availableInPolis,
                ]),
              ];
            } else {
              doctorMap[doctor.id] = doctor;
            }
          });
          state.doctorsByAsuransi[asuransiId] = Object.values(doctorMap);
        });
      })
      .addCase(fetchDokterAsuransi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Gagal mengambil data dokter asuransi";
      })

      // Fetch DokterAsuransi dengan filter
      .addCase(fetchDokterAsuransiWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDokterAsuransiWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data?.rows || [];
        state.totalItems = action.payload.data?.totalRows || 0;
        state.totalPages = action.payload.data?.totalPages || 1;
        state.currentPage = action.payload.data?.currentPage || 1;
      })
      .addCase(fetchDokterAsuransiWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.data = []; // Set data menjadi kosong saat error 404
        state.error = action.payload?.message || "Gagal mengambil data dokter asuransi";
      });
  },
});

export default DokterAsuransiSlice.reducer;