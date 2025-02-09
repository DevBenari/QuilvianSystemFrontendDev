export const dataTindakanOperasi = [
  {
    id: 1,
    namaTindakan: "APENDIKTOMI LAPAROSKOPI",
    teknikOperasi: "LAP",
    jenisOperasi: "BESAR (DEWASA)",
  },
  {
    id: 2,
    namaTindakan: "APENDIKTOMI LAPAROTOMI",
    teknikOperasi: "LAP",
    jenisOperasi: "BESAR (DEWASA)",
  },
  {
    id: 3,
    namaTindakan: "KLISIS 15 CM (RUJUK)",
    teknikOperasi: "COTHAK",
    jenisOperasi: "COTHAK",
  },
  {
    id: 4,
    namaTindakan: "KLISIS 10 CM (DEWASA)",
    teknikOperasi: "COTHAK",
    jenisOperasi: "COTHAK",
  },
  {
    id: 5,
    namaTindakan: "KLISIS NONSENSICAL SIMPLE",
    teknikOperasi: "BATA",
    jenisOperasi: "SEDANG",
  },
  {
    id: 6,
    namaTindakan: "ASESIS ATERIA ANGKAT TUMOR ABNORMAL",
    teknikOperasi: "MEGA DISSEKSI",
    jenisOperasi: "VONULLER",
  },
  {
    id: 7,
    namaTindakan: "ASESIS KISTA",
    teknikOperasi: "ONALOG",
    jenisOperasi: "ONALOG",
  },
  {
    id: 8,
    namaTindakan: "ASESIS DARAH",
    teknikOperasi: "HIDROLOG",
    jenisOperasi: "HIDROLOG",
  },
  {
    id: 9,
    namaTindakan: "ASESIS KISTA SIMPLE (KUTIBAN SEBAR)",
    teknikOperasi: "BESAR TULANG (OPTIMAL)",
    jenisOperasi: "BESAR TULANG (OPTIMAL)",
  },
  {
    id: 10,
    namaTindakan: "ASESIS DARAH KISTA MEDIUM (3D)",
    teknikOperasi: "BESAR TULANG (OPTIMAL)",
    jenisOperasi: "BESAR TULANG (OPTIMAL)",
  },
  {
    id: 11,
    namaTindakan: "MAPUNG TANGGAP DARAH DUNIA",
    teknikOperasi: "VONULLER",
    jenisOperasi: "VONULLER",
  },
  {
    id: 12,
    namaTindakan: "MAPUNG DARAH DAN EKOSISTEM HASIL VONULLER DUNIA MINIMAL",
    teknikOperasi: "VONULLER",
    jenisOperasi: "VONULLER",
  },
  {
    id: 13,
    namaTindakan: "MAPUNG DARAH HASIL KUTUB MINIMAL",
    teknikOperasi: "VONULLER",
    jenisOperasi: "VONULLER",
  },
  {
    id: 14,
    namaTindakan: "MAPUNG DARAH HASIL KUTUB BESAR",
    teknikOperasi: "VONULLER",
    jenisOperasi: "VONULLER",
  },
];

export const jenisOperasi = [
  { label: "Bedah", value: "bedah" },
  { label: "Bedah Digestive", value: "bedah_digestive" },
  { label: "Bedah Tulang (Ortophedi)", value: "bedah_tulang_ortophedi" },
  { label: "Gigi dan Bedah Mulut", value: "gigi_bedah_mulut" },
  { label: "Mata", value: "mata" },
  { label: "Obsgyn", value: "obsgyn" },
  { label: "Onkologi", value: "onkologi" },
  { label: "Plastik", value: "plastik" },
  { label: "Syaraf", value: "syaraf" },
  { label: "THT", value: "tht" },
  { label: "Urologi", value: "urologi" },
  { label: "Vaskuler", value: "vaskuler" },
  { label: "Operasi", value: "operasi" },
  { label: "Hepatologi", value: "hepatologi" },
  { label: "Bedah ODC", value: "bedah_odc" },
  { label: "Obsgyn ODC", value: "obsgyn_odc" },
  { label: "Endoskopi", value: "endoskopi" },
  { label: "Cathlab", value: "cathlab" },
  { label: "Thorax", value: "thorax" },
  { label: "Bedah Anak", value: "bedah_anak" },
];

export const kategoriOperasi = [
  { label: "OT I", value: "ot_i" },
  { label: "OT II", value: "ot_ii" },
  { label: "OT III", value: "ot_iii" },
  { label: "OT IV", value: "ot_iv" },
  { label: "OT V", value: "ot_v" },
  { label: "Darurat", value: "darurat" },
  { label: "Elektif", value: "elektif" },
  { label: "Minor", value: "minor" },
  { label: "Mayor", value: "mayor" },
  { label: "Khusus", value: "khusus" },
  { label: "Eksplorasi", value: "eksplorasi" },
];

export const ManajemenDepartemen = [
  {
    id: 1,
    namaDepartemen: "Departemen Kardiologi",
    penanggungJawab: "Dr. Andi Setiawan",
    jamOperasional: "08:00 - 17:00",
    ruangan: "Gedung A, Lantai 2",
    lineTelp: "021-1234567",
    tanggalPembuatan: "2025-01-01",
    deskripsi:
      "Departemen yang menangani masalah kesehatan jantung dan pembuluh darah.",
  },
  {
    id: 2,
    namaDepartemen: "Departemen Pediatri",
    penanggungJawab: "Dr. Maria Yunita",
    jamOperasional: "08:00 - 16:00",
    ruangan: "Gedung B, Lantai 3",
    lineTelp: "021-7654321",
    tanggalPembuatan: "2025-01-02",
    deskripsi: "Departemen yang berfokus pada kesehatan anak dan remaja.",
  },
  {
    id: 3,
    namaDepartemen: "Departemen Ginekologi",
    penanggungJawab: "Dr. Sarah Kurniawan",
    jamOperasional: "08:00 - 18:00",
    ruangan: "Gedung C, Lantai 1",
    lineTelp: "021-9876543",
    tanggalPembuatan: "2025-01-03",
    deskripsi: "Departemen yang menangani kesehatan wanita dan kehamilan.",
  },
  {
    id: 4,
    namaDepartemen: "Departemen Bedah Umum",
    penanggungJawab: "Dr. Arief Pratama",
    jamOperasional: "08:00 - 19:00",
    ruangan: "Gedung D, Lantai 4",
    lineTelp: "021-8765432",
    tanggalPembuatan: "2025-01-04",
    deskripsi: "Departemen yang menangani berbagai jenis operasi bedah umum.",
  },
  {
    id: 5,
    namaDepartemen: "Departemen Neurologi",
    penanggungJawab: "Dr. Bambang Saputra",
    jamOperasional: "09:00 - 17:00",
    ruangan: "Gedung E, Lantai 3",
    lineTelp: "021-6543210",
    tanggalPembuatan: "2025-01-05",
    deskripsi: "Departemen yang menangani kesehatan sistem saraf.",
  },
  {
    id: 6,
    namaDepartemen: "Departemen Onkologi",
    penanggungJawab: "Dr. Rina Adiwardana",
    jamOperasional: "08:00 - 16:30",
    ruangan: "Gedung F, Lantai 2",
    lineTelp: "021-4321098",
    tanggalPembuatan: "2025-01-06",
    deskripsi: "Departemen yang menangani diagnosis dan pengobatan kanker.",
  },
  {
    id: 7,
    namaDepartemen: "Departemen Ortopedi",
    penanggungJawab: "Dr. Fajar Nugroho",
    jamOperasional: "07:30 - 15:30",
    ruangan: "Gedung G, Lantai 1",
    lineTelp: "021-5432109",
    tanggalPembuatan: "2025-01-07",
    deskripsi: "Departemen yang menangani masalah kesehatan tulang dan sendi.",
  },
  {
    id: 8,
    namaDepartemen: "Departemen Psikiatri",
    penanggungJawab: "Dr. Dian Rahayu",
    jamOperasional: "08:00 - 17:00",
    ruangan: "Gedung H, Lantai 2",
    lineTelp: "021-3210987",
    tanggalPembuatan: "2025-01-08",
    deskripsi: "Departemen yang fokus pada kesehatan mental dan psikologi.",
  },
  {
    id: 9,
    namaDepartemen: "Departemen Dermatologi",
    penanggungJawab: "Dr. Yulianto Subekti",
    jamOperasional: "08:00 - 16:00",
    ruangan: "Gedung I, Lantai 3",
    lineTelp: "021-2109876",
    tanggalPembuatan: "2025-01-09",
    deskripsi: "Departemen yang menangani kesehatan kulit dan kelamin.",
  },
  {
    id: 10,
    namaDepartemen: "Departemen Urologi",
    penanggungJawab: "Dr. Ratna Widiastuti",
    jamOperasional: "09:00 - 17:30",
    ruangan: "Gedung J, Lantai 4",
    lineTelp: "021-1098765",
    tanggalPembuatan: "2025-01-10",
    deskripsi:
      "Departemen yang menangani kesehatan saluran kemih dan reproduksi pria.",
  },
  {
    id: 11,
    namaDepartemen: "Departemen Anestesiologi",
    penanggungJawab: "Dr. Sigit Hariyanto",
    jamOperasional: "07:00 - 15:00",
    ruangan: "Gedung K, Lantai 1",
    lineTelp: "021-9087654",
    tanggalPembuatan: "2025-01-11",
    deskripsi: "Departemen yang menangani anestesi dan manajemen nyeri.",
  },
  {
    id: 12,
    namaDepartemen: "Departemen Rehabilitasi Medis",
    penanggungJawab: "Dr. Lestari Wijaya",
    jamOperasional: "08:00 - 16:30",
    ruangan: "Gedung L, Lantai 2",
    lineTelp: "021-8098765",
    tanggalPembuatan: "2025-01-12",
    deskripsi:
      "Departemen yang menangani pemulihan pasca penyakit atau cedera.",
  },
  {
    id: 13,
    namaDepartemen: "Departemen Radiologi",
    penanggungJawab: "Dr. Indra Purnama",
    jamOperasional: "08:30 - 17:30",
    ruangan: "Gedung M, Lantai 3",
    lineTelp: "021-7098765",
    tanggalPembuatan: "2025-01-13",
    deskripsi:
      "Departemen yang menggunakan teknologi pencitraan untuk diagnosis.",
  },
];

export const administrasiMasterData = [
  {
    id: 1,
    namaAdministrasi: "Administrasi Pendaftaran",
    tipeRawat: "Rawat Jalan",
    tipeAdministrasi: "Pendaftaran",
    kelompokUsia: "Dewasa",
    departement: "Poli Anak",
  },
  {
    id: 2,
    namaAdministrasi: "Biaya Konsultasi",
    tipeRawat: "Rawat Inap",
    tipeAdministrasi: "Pembayaran",
    kelompokUsia: "Anak-anak",
    departement: "Farmasi",
  },
  {
    id: 3,
    namaAdministrasi: "Biaya Rawat Inap",
    tipeRawat: "Rawat Inap",
    tipeAdministrasi: "Pendaftaran",
    kelompokUsia: "Lansia",
    departement: "Radiologi",
  },
  {
    id: 4,
    namaAdministrasi: "Biaya Laboratorium",
    tipeRawat: "Rawat Inap",
    tipeAdministrasi: "Pendaftaran",
    kelompokUsia: "Lansia",
    departement: "Laboratorium",
  },
  {
    id: 5,
    namaAdministrasi: "Administrasi Operasi",
    tipeRawat: "Rawat Jalan",
    tipeAdministrasi: "Pengelolaan Data",
    kelompokUsia: "Anak-anak",
    departement: "Poli Penyakit Dalam",
  },
  {
    id: 6,
    namaAdministrasi: "Administrasi Gizi",
    tipeRawat: "Rawat Inap",
    tipeAdministrasi: "Pembayaran",
    kelompokUsia: "Anak-anak",
    departement: "Farmasi",
  },
  {
    id: 7,
    namaAdministrasi: "Biaya Radiologi",
    tipeRawat: "Rawat Jalan",
    tipeAdministrasi: "Pengelolaan Data",
    kelompokUsia: "Dewasa",
    departement: "Radiologi",
  },
  {
    id: 8,
    namaAdministrasi: "Biaya Farmasi",
    tipeRawat: "Rawat Jalan",
    tipeAdministrasi: "Pembayaran",
    kelompokUsia: "Lansia",
    departement: "Farmasi",
  },
  {
    id: 9,
    namaAdministrasi: "Administrasi Hemodialisa",
    tipeRawat: "Rawat Jalan",
    tipeAdministrasi: "Pengelolaan Data",
    kelompokUsia: "Dewasa",
    departement: "Laboratorium",
  },
  {
    id: 10,
    namaAdministrasi: "Administrasi MCU",
    tipeRawat: "Rawat Inap",
    tipeAdministrasi: "Pendaftaran",
    kelompokUsia: "Anak-anak",
    departement: "Rehabilitasi",
  },
  {
    id: 11,
    namaAdministrasi: "Administrasi Bank Darah",
    tipeRawat: "Rawat Jalan",
    tipeAdministrasi: "Pembayaran",
    kelompokUsia: "Lansia",
    departement: "Farmasi",
  },
  {
    id: 12,
    namaAdministrasi: "Biaya Rehabilitasi",
    tipeRawat: "Rawat Jalan",
    tipeAdministrasi: "Pengelolaan Data",
    kelompokUsia: "Anak-anak",
    departement: "Rehabilitasi",
  },
  {
    id: 13,
    namaAdministrasi: "Administrasi Rekam Medis",
    tipeRawat: "Rawat Inap",
    tipeAdministrasi: "Pendaftaran",
    kelompokUsia: "Dewasa",
    departement: "Radiologi",
  },
  {
    id: 14,
    namaAdministrasi: "Administrasi Kasir",
    tipeRawat: "Rawat Jalan",
    tipeAdministrasi: "Pembayaran",
    kelompokUsia: "Lansia",
    departement: "Kasir",
  },
  {
    id: 15,
    namaAdministrasi: "Biaya Ruang VK",
    tipeRawat: "Rawat Inap",
    tipeAdministrasi: "Pendaftaran",
    kelompokUsia: "Lansia",
    departement: "Poli Penyakit Dalam",
  },
];

export const tarifTindakan = [
  {
    id: 1,
    namaKelas: "Suite",
    dokter: 0,
    rs: 0,
    JP: 0,
    bpjs: 0,
    other: 0,
    total: 0,
    kso: 0,
  },
  {
    id: 2,
    namaKelas: "Luxury",
    dokter: 0,
    rs: 0,
    JP: 0,
    bpjs: 0,
    other: 0,
    total: 0,
    kso: 0,
  },
  {
    id: 3,
    namaKelas: "VIP Deluxe",
    dokter: 0,
    rs: 0,
    JP: 0,
    bpjs: 0,
    other: 0,
    total: 0,
    kso: 0,
  },
];
