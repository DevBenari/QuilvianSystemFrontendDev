import { configureStore } from "@reduxjs/toolkit"
import authLogin from "@/lib/state/slice/LoginSlice"
import pasien from "@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice"
import agama from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/agamaSlice"
const store = configureStore({
    reducer:{
        token:authLogin,
        pasien:pasien,
        agama:agama
    }
})

export default store