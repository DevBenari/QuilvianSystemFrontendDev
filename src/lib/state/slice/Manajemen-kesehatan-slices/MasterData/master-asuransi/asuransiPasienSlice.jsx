import { InstanceAxios } from '@/lib/axiosInstance/InstanceAxios';
import { getHeaders } from '@/lib/headers/headers';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchAsuransiPasien = createAsyncThunk(
    'asuransiPasien/fetchAsuransiPasien',
    async (_, { rejectWithValue }) => {
        try {
            const response = await InstanceAxios.get('/asuransi-pasien', {
              headers: getHeaders(),
            });
            return response.data;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)
// Thunk untuk fetch data asuransi pasien berdasarkan pasienId
export const fetchAsuransiPasienByPasienId = createAsyncThunk(
  'asuransiPasien/fetchAsuransiPasienByPasienId',
  async (pasienId, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.get(`/asuransi-pasien?pasienId=${pasienId}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Terjadi kesalahan saat mengambil data asuransi pasien');
    }
  }
);

// Thunk untuk membuat data asuransi pasien baru
export const createAsuransiPasien = createAsyncThunk(
  'asuransiPasien/createAsuransiPasien',
  async (asuransiPasienData, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post('/asuransi-pasien', asuransiPasienData, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Terjadi kesalahan saat menyimpan data asuransi pasien');
    }
  }
);

const asuransiPasienSlice = createSlice({
  name: 'asuransiPasien',
  initialState: {
    data: [],
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
    createSuccess: false
  },
  reducers: {
    resetCreateStatus: (state) => {
      state.createLoading = false;
      state.createError = null;
      state.createSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch asuransi pasien cases
      .addCase(fetchAsuransiPasien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAsuransiPasien.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
      })
      .addCase(fetchAsuransiPasien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Gagal mengambil data asuransi pasien';
      })
      .addCase(fetchAsuransiPasienByPasienId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAsuransiPasienByPasienId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
      })
      .addCase(fetchAsuransiPasienByPasienId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Gagal mengambil data asuransi pasien';
      })
      
      // Create asuransi pasien cases
      .addCase(createAsuransiPasien.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(createAsuransiPasien.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
        // Jika berhasil simpan, tambahkan data baru ke array data
        if (action.payload?.data) {
          state.data.push(action.payload.data);
        }
      })
      .addCase(createAsuransiPasien.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload || 'Gagal menyimpan data asuransi pasien';
        state.createSuccess = false;
      });
  }
});

export const { resetCreateStatus } = asuransiPasienSlice.actions;
export default asuransiPasienSlice.reducer;