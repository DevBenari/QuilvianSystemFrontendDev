import { configureStore } from "@reduxjs/toolkit";
import titleReducer from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";
import pekerjaanReducer from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice";
import golonganSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice";
import pendidikanSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pendidikanSlice";
import pasien from "@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice";
import NegaraSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice";
import indetitasSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";
import jabatanSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/jabatanSlice";
import agamaSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice";
import ProvinsiSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";
import KabupatenKotaSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KabupatenKotaSlice";
import KecamatanSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KecamatanSlice";
import KelurahanSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kelurahanSlice";
import DepartementSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-departemen/DepartemenSlice";
import KategoriPeralatanSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-peralatan/KategoriPeralatanSlice";
import PeralatanSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-peralatan/PeralatanSlice";
import DokterSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";
import PositionSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-position-slice/PositionSlice";
import UserActiveSlice from "@/lib/state/slice/auth/master-userActive/UserActive";
import authSlice from "@/lib/state/slice/auth/LoginSlice";
import PoliKlinikSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-slice/PoliKlinikSlice";
import anggotaSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/admisi/Anggota/anggotaSlice";
import AsuransiSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";
import CoveranAsuransiSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/CoveranAsuransiSlice";
import DokterPoli from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPoliSlice";
import DokterPoliSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPoliSlice";
import JadwalPraktekSlice from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/JadwalPraktekSlice";
import AsuransiPasien from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiPasienSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    UserActive: UserActiveSlice,
    titles: titleReducer,
    pasien: pasien,
    agama: agamaSlice,
    pekerjaan: pekerjaanReducer,
    golongan: golonganSlice,
    pendidikan: pendidikanSlice,
    negara: NegaraSlice,
    Dokter: DokterSlice,
    identitas: indetitasSlice,
    jabatan: jabatanSlice,
    anggota: anggotaSlice,
    Provinsi: ProvinsiSlice,
    Asuransi: AsuransiSlice,
    KabupatenKota: KabupatenKotaSlice,
    Kecamatan: KecamatanSlice,
    Kelurahan: KelurahanSlice,
    Departement: DepartementSlice,
    KategoriPeralatan: KategoriPeralatanSlice,
    Peralatan: PeralatanSlice,
    Position: PositionSlice,
    PoliKlinik: PoliKlinikSlice,
    CoveranAsuransi: CoveranAsuransiSlice,
    DokterPoli: DokterPoli,
    DokterPoliSlice: DokterPoliSlice,
    JadwalPraktek: JadwalPraktekSlice,
    pasienAsuransi: AsuransiPasien 
  },
});

export default store;
