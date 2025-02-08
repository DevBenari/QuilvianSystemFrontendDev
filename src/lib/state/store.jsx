import { configureStore } from "@reduxjs/toolkit";
import authLogin from "@/lib/state/slice/auth/LoginSlice";
import titleReducer from "@/lib/state/slices/masterData/master-informasi/TitleSlice";
import AgamaSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/agamaSlice" // Import AgamaSlice reducer
import pekerjaanReducer from "@/lib/state/slices/masterData/master-informasi/pekerjaanSlice"; // Import pekerjaanSlice reducer
import identitasSlice from "@/lib/state/slices/masterData/master-informasi/identitasSlice";
import golonganSlice from "@/lib/state/slices/masterData/master-informasi/golonganSlice";
import pendidikanSlice from "@/lib/state/slices/masterData/master-informasi/pendidikanSlice";
import pasien from "@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice";

const store = configureStore({
  reducer: {
    token: authLogin,
    titles: titleReducer,
    pasien: pasien,
    agama: AgamaSlice,
    pekerjaan: pekerjaanReducer, // Tambahkan reducer pekerjaan di sini
    identitas: identitasSlice, // Tambahkan reducer pekerjaan di sini
    golongan: golonganSlice,
    pendidikan: pendidikanSlice,
  },
});

export default store;
