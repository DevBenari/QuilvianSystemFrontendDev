import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

export const GetPasienSlice = createAsyncThunk("pasien/getPasien", async(_,{isRejectedWithValue}) => {
    try{
        const request = await InstanceAxios.get("/PendaftaranPasienBaru", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImp0aSI6IjM0OTM3N2JjLTBhOTEtNDY3Ny05NGY2LWRkY2JjM2UzMDJhZCIsImV4cCI6MTczODkwMzk3NCwiaXNzIjoiTXlBcGlJc3N1ZXIiLCJhdWQiOiJNeUFwaUF1ZGllbmNlIn0.xDkRYBmMyiGz8aYppQvOpT2p0YD6-HA4aIv2KibWAUY"
            },
        })
        const response = await request.data;

        return response.data;
    }catch(error){
        return isRejectedWithValue(error.response.data)
    }
})

export const AddPasienSlice = createAsyncThunk(
    "pasien/addPasien",
    async (newPasien, { rejectWithValue }) => {
        try {
            // Buat FormData
            const formData = new FormData();

            // Masukkan data pasien ke FormData
            for (const key in newPasien) {
                formData.append(key, newPasien[key]);
            }

            // Kirim request dengan FormData
            const response = await InstanceAxios.post("/PendaftaranPasienBaru", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer <TOKEN>",
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error response dari server:", error.response?.data);
            return rejectWithValue(error.response?.data || "Gagal mengirim data pasien");
        }
    }
);


export const GetPasienSliceId = createAsyncThunk("pasien/getPasienById", async( {isRejectedWithValue}) => {
    try{
        const request = await InstanceAxios.get(`/PendaftaranPasienBaru/${id}`)
        const response = await request.data

        return response.data
    }catch(error){
        return isRejectedWithValue(error.response.data)
    }
})

export const UpdatePasienSlice = createAsyncThunk("pasien/updatePasienById", async(updatedPasien, {isRejectedWithValue}) => {
    try{
        const request = await InstanceAxios.put(`/PendaftaranPasienBaru/${updatedPasien.id}`, updatedPasien)
        const response = await request.data

        return response.data
    }catch(error){
        return isRejectedWithValue(error.response.data)
    }
})


 const pasienSlice = createSlice({
    name: "pasien",
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(GetPasienSlice.pending, (state) => {
            state.loading = true
        })
        .addCase(GetPasienSlice.fulfilled, (state, action) => {
            state.loading = false,
            state.data = action.payload
        })
        .addCase(GetPasienSlice.rejected, (state,action) => {
            state.loading = false,
            state.error = action.error.message
        })
        .addCase(AddPasienSlice.pending, (state) => {
            state.loading = true
        })
        .addCase(AddPasienSlice.fulfilled, (state, action) => {
            state.loading = false,
            state.data = action.payload
        })
        .addCase(AddPasienSlice.rejected, (state,action) => {
            state.loading = false,
            state.error = action.error.message
        })
        .addCase(GetPasienSliceId.pending, (state) => {
            state.loading = true,
            state.data = [],
            state.error = false
        })
        .addCase(GetPasienSliceId.fulfilled, (state, action) => {
            state.loading = false,
            state.data = action.payload,
            state.error = false
        })
        .addCase(GetPasienSliceId.rejected, (state) => {
            state.loading = false,
            state.error = action.error.message
        })
        

    }
 })

 export default pasienSlice.reducer;