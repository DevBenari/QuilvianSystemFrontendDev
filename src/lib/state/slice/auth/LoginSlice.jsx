import Cookies from "js-cookie"; // Add this import
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const LoginUser = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      // Gunakan FormData untuk multipart/form-data
      const formData = new FormData();
      formData.append("Email", data.Email); // Sesuai dengan API (huruf besar)
      formData.append("Password", data.Password); // Sesuai dengan API (huruf besar)

      const request = await InstanceAxios.post(`/Auth/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Sesuai dengan Swagger API
        },
      });

      const token = request.data.token;
      Cookies.set("token", token, { expires: 1 });
      return { token };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const userSlice = createSlice({
  name: "loginUser",
  initialState: {
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
        state.token = action.payload.token; // Set token in the state
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
