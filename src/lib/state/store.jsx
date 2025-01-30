import { configureStore } from "@reduxjs/toolkit"
import authLogin from "@/lib/state/slice/LoginSlice"
const store = configureStore({
    reducer:{
        token:authLogin,
    }
})

export default store