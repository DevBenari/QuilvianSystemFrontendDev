import { configureStore } from "@reduxjs/toolkit";
import authLogin from "@/lib/state/slice/auth/LoginSlice";
import titleReducer from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";
import AgamaSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice";
import pekerjaanReducer from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice"; 
import identitasSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";
import golonganSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice";
import pendidikanSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pendidikanSlice";
import pasien from "@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice";
import NegaraSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice"
import provinsiSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/provinsiSlice";
import kabupaten from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/kabupatenSlice";
import kecamatan from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/kecamatanSlice";
import kelurahan from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/kelurahanSlice";
import identitas from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";

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
    negara: NegaraSlice,
    provinsi: provinsiSlice,
    kabupaten: kabupaten,
    kecamatan: kecamatan,
    kelurahan: kelurahan,
    identitas: identitas,
  },
});

export default store;
