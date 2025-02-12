import { configureStore } from "@reduxjs/toolkit";
import authLogin from "@/lib/state/slice/auth/LoginSlice";
import titleReducer from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";
import AgamaSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice";
import pekerjaanReducer from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice";
import identitasSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";
import golonganSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice";
import pendidikanSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pendidikanSlice";
import pasien from "@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice";
import negaraSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice";
import asuransiSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";
import pegawaiSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-pegawai/pagawaiSlice";
import dokterPraktek from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPraktek";

import dokterSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";
const store = configureStore({
  reducer: {
    token: authLogin,
    titles: titleReducer,
    pasien: pasien,
    agama: AgamaSlice,
    pekerjaan: pekerjaanReducer,
    identitas: identitasSlice,
    golongan: golonganSlice,
    pendidikan: pendidikanSlice,
    negara: negaraSlice,
    asuransi: asuransiSlice,
    pegawai: pegawaiSlice,
    dokter: dokterSlice,
    dokterPraktek: dokterPraktek,
  },
});

export default store;
