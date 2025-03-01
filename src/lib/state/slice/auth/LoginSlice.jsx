import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

// Fungsi untuk menyimpan token ke cookie
const setToken = (token) => {
  Cookies.set("token", token, { expires: 1, path: "/" });
};

// Fungsi untuk menghapus token dari cookie
const removeToken = () => {
  Cookies.remove("token");
};

// Async thunk untuk login
export const LoginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InstanceAxios.post(`/Auth/login`, data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response API login:", response.data);

      if (!response.data.token) {
        return rejectWithValue("Token tidak diterima dari server.");
      }

      const token = response.data.token;
      const expiration = response.data.expiration; // Bisa digunakan untuk refresh token

      // Simpan token ke cookies
      setToken(token);

      return { token, expiration };
    } catch (error) {
      console.error("Error saat login:", error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Async thunk untuk logout
export const LogoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Hapus token dari cookies
      removeToken();
      return true;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

// Redux slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAuth: (state) => {
      state.token = null;
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
        state.error = null;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.error = action.payload;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.token = null;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
