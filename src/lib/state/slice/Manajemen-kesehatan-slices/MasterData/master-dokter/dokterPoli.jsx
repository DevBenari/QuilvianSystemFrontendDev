// store/slices/doctorSlice.js
import { InstanceAxios } from '@/lib/axiosInstance/InstanceAxios';
import { getHeaders } from '@/lib/headers/headers';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Async thunk to fetch doctors by poli and/or insurance
export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async ({ poliId, asuransiId }, { rejectWithValue }) => {
    try {
      let url = '/api/dokter-poli?';
      if (poliId) url += `poliId=${poliId}`;
      if (asuransiId) url += `&asuransiId=${asuransiId}`;
      
      const response = await InstanceAxios.get(url, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctorsByPoli: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        
        // Structure doctors by poli
        const doctorsByPoli = {};
        action.payload.data.forEach(doctor => {
          if (!doctor.poliId) return;
          
          if (!doctorsByPoli[doctor.poliId]) {
            doctorsByPoli[doctor.poliId] = [];
          }
          
          doctorsByPoli[doctor.poliId].push({
            id: doctor.dokterId,
            name: doctor.namaDokter,
            acceptedInsurances: doctor.asuransiId ? [doctor.asuransiId] : []
          });
        });
        
        // Merge with existing data and deduplicate
        Object.keys(doctorsByPoli).forEach(poliId => {
          const existingDoctors = state.doctorsByPoli[poliId] || [];
          const newDoctors = doctorsByPoli[poliId];
          
          // Create a map of doctors by ID
          const doctorMap = {};
          
          // Add existing doctors to the map
          existingDoctors.forEach(doctor => {
            doctorMap[doctor.id] = doctor;
          });
          
          // Add or update with new doctors
          newDoctors.forEach(doctor => {
            if (doctorMap[doctor.id]) {
              // Merge accepted insurances if doctor already exists
              doctorMap[doctor.id].acceptedInsurances = [
                ...new Set([
                  ...doctorMap[doctor.id].acceptedInsurances,
                  ...doctor.acceptedInsurances
                ])
              ];
            } else {
              doctorMap[doctor.id] = doctor;
            }
          });
          
          // Convert map back to array
          state.doctorsByPoli[poliId] = Object.values(doctorMap);
        });
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch doctors';
      });
  }
});

export default doctorSlice.reducer;