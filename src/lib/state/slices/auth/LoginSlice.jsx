import Cookies from "js-cookie"; // Add this import
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const LoginUser = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const request = await InstanceAxios.post(`/Auth/login`, data);
      const token = request.data.token; // Use the token from the response
      console.log(token);

      Cookies.set("token", token, { expires: 1 }); // Correct the variable name here
      return { token }; // Return only the token
    } catch (error) {
      return rejectWithValue(error.response.data);
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
