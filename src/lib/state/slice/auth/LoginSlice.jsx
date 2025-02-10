import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const LoginUser = createAsyncThunk("login", async(data, {rejectWithValue}) => {
    try{
        const request = await InstanceAxios.post(`/Auth/login`, data)
        const response = await request.data.token;
        console.log(response)

        Cookies.set("token", token, { expires: 1 });
        return {token, response};
    }catch(error){
        return rejectWithValue(error.response.data)
    }
})

const userSlice = createSlice({
    name:"loginUser",
    initialState:{
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(LoginUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.token = null;
            state.error = false;
        })
        .addCase(LoginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(LoginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = action.error.message;
        })
    }
})

export default userSlice.reducer;