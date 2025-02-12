import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";

// Async thunk untuk login user
export const LoginUser = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
    try {
        const response = await InstanceAxios.post(`/auth/login`, data);
        const token = response.data.token;

        // Simpan token di cookie (hanya di client-side)
        if (typeof window !== 'undefined') {
            Cookies.set("token", token, { expires: 1, path: "/" });  // Cookie berlaku untuk semua path
        }

        return { token };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Slice Redux untuk auth
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        error: null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            Cookies.remove("token");  // Hapus token dari cookie saat logout
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
