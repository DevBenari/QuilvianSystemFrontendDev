import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";

const API_URL = "http://192.168.15.213:589/api/Negara";

export const getNegara = createAsyncThunk(
  "negara",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { headers: getHeaders() });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
