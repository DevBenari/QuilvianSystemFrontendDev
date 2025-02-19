import { configureStore } from "@reduxjs/toolkit";
import authLogin from "@/lib/state/slice/auth/LoginSlice";
import titleReducer from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";
import AgamaSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice";
import pekerjaanReducer from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice";
import identitasSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";
import golonganSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice";
import pendidikanSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pendidikanSlice";
import pasien from "@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice";
import NegaraSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice";
import provinsiSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/provinsiSlice";
import kabupaten from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/kabupatenSlice";
import kecamatan from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/kecamatanSlice";
import kelurahan from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/kelurahanSlice";
import indetitasSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";
import jabatanSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/jabatanSlice";
import agamaSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice";
import dokterPraktekData from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPraktek";
import dokterSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";
import anggotaSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-anggota/anggotaSlice";

const store = configureStore({
  reducer: {
    token: authLogin,
    titles: titleReducer,
    pasien: pasien,
    agama: agamaSlice,
    pekerjaan: pekerjaanReducer,
    golongan: golonganSlice,
    pendidikan: pendidikanSlice,
    negara: NegaraSlice,
    provinsi: provinsiSlice,
    kabupaten: kabupaten,
    kecamatan: kecamatan,
    kelurahan: kelurahan,
    dokterPraktek: dokterPraktekData,
    dokter: dokterSlice,
    identitas: indetitasSlice,
    jabatan: jabatanSlice,
    anggota: anggotaSlice,
  },
});

export default store;
