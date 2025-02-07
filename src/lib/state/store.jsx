import { configureStore } from "@reduxjs/toolkit";
import authLogin from "@/lib/state/slices/auth/LoginSlice";
import titleReducer from "@/lib/state/slices/masterData/master-informasi/TitleSlice";
import agamaReducer from "@/lib/state/slices/masterData/master-informasi/AgamaSlice"; // Import AgamaSlice reducer
import pekerjaanReducer from "@/lib/state/slices/masterData/master-informasi/pekerjaanSlice"; // Import pekerjaanSlice reducer
import identitasSlice from "@/lib/state/slices/masterData/master-informasi/identitasSlice";
import golonganSlice from "@/lib/state/slices/masterData/master-informasi/golonganSlice";
import pendidikanSlice from "@/lib/state/slices/masterData/master-informasi/pendidikanSlice";

const store = configureStore({
  reducer: {
    token: authLogin,
    titles: titleReducer,
    agama: agamaReducer,
    pekerjaan: pekerjaanReducer, // Tambahkan reducer pekerjaan di sini
    identitas: identitasSlice, // Tambahkan reducer pekerjaan di sini
    golongan: golonganSlice,
    pendidikan: pendidikanSlice,
  },
});

export default store;
