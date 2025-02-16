import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetNegaraSlice = createAsyncThunk("negara/getNegara", async(_, {rejectWithValue}) => {
  try{
    const response = await InstanceAxios.get(`/Negara`, { headers: getHeaders() });
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "Gagal mengambil data negara";
    return rejectWithValue(errorMessage);
  }
})

export const GetNegaraById = createAsyncThunk("negara/getNegaraById", async(id, {rejectWithValue}) => {
  try{
    const response = await InstanceAxios.get(`/Negara/${id}`, { headers: getHeaders() });
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "Gagal mengambil data negara";
    return rejectWithValue(errorMessage);
  }
})

export const CreateNegara = createAsyncThunk("negara/createNegara", async(data,{rejectWithValue}) => {
  try{
    const response = await InstanceAxios.post(`/Negara`,data, {headers: getHeaders()})
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "gagal menambahkan data negara"
    return rejectWithValue(errorMessage)
  }
})

export const UpdateNegara = createAsyncThunk("negara/updateNegara", async({id,data},{rejectWithValue}) => {
  try{
    const response = await InstanceAxios.put(`/Negara/${id}`,data, {headers: getHeaders()})
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "gagal mengupdate data negara"
    return rejectWithValue(errorMessage)
  }
})

export const DeleteNegara = createAsyncThunk("negara/deleteNegara", async(id,{rejectWithValue}) => {
  try{
    const response = await InstanceAxios.delete(`/Negara/${id}`, {headers: getHeaders()})
    return response.data;
  }catch(error){
    const errorMessage = error.response?.data?.message || "gagal menghapus data negara"
    return rejectWithValue(errorMessage)
  }
})


const negaraSlice = createSlice({
  name:"negara",
  initialState:{
    data: {data: []},
    loading: false,
    error:null
  },
  extraReducers: (builder) => {
    builder
    .addCase(GetNegaraSlice.pending, (state) => {
      state.loading = true;
    })
    .addCase(GetNegaraSlice.fulfilled, (state,action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(GetNegaraSlice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(CreateNegara.pending, (state) => {
      state.loading = true;
    })
    .addCase(CreateNegara.fulfilled, (state,action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(CreateNegara.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(UpdateNegara.pending, (state) => {
      state.loading = true;
    })
    .addCase(UpdateNegara.fulfilled, (state,action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(UpdateNegara.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(DeleteNegara.pending, (state) => {
      state.loading = true;
    })
    .addCase(DeleteNegara.fulfilled, (state,action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(DeleteNegara.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  }
})

export default negaraSlice.reducer;