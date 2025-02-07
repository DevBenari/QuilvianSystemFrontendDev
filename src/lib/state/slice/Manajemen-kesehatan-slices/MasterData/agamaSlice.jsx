import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

export const GetAgamaSlice = createAsyncThunk("pasien/getPasien", async(_, {isRejectedWithValue}) => {
    try{
        const request = await InstanceAxios.get("/Agama", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImp0aSI6ImE1NTY4M2JmLWQzMTYtNDk0Zi1iZTE1LWYwNDEwOGRkNzMzMyIsImV4cCI6MTczODkyMTcxMiwiaXNzIjoiTXlBcGlJc3N1ZXIiLCJhdWQiOiJNeUFwaUF1ZGllbmNlIn0.xxRQv6jeTw8GgyR0i0kOGyRqWBz_5iavTPpzAPkd7oE"
            },
        })
        const response = await request.data;

        return response.data;
    }catch(error){
        return isRejectedWithValue(error.response.data)
    }
})



const AgamaSlice = createSlice({
    name:"agama",
    initialState:{
        data:[],
        loading: false,
        error: null
    },
    reducer:{},
    extraReducers: (builder) => {
        builder
        .addCase(GetAgamaSlice.pending, (state) => {
            state.loading = true
        })
        .addCase(GetAgamaSlice.fulfilled, (state,action) => {
            state.loading = false,
            state.data = action.payload
        })
        .addCase(GetAgamaSlice.rejected, (state, action) => {
            state.loading = false,
            state.data = [],
            state.error = action.error.message
        })
    }
})


export default AgamaSlice.reducer;