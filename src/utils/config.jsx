export const dataWilayah = [
  {
    provinsi: "Jawa Barat",
    kabupaten: [
      {
        nama: "Bandung",
        kecamatan: [
          {
            nama: "Coblong",
            kelurahan: ["Dago", "Ciumbuleuit"],
          },
          {
            nama: "Cicendo",
            kelurahan: ["Arjuna", "Husen"],
          },
        ],
      },
      {
        nama: "Bogor",
        kecamatan: [
          {
            nama: "Cibinong",
            kelurahan: ["Pondok Rajeg", "Karadenan"],
          },
        ],
      },
    ],
  },
  {
    provinsi: "Jawa Tengah",
    kabupaten: [
      {
        nama: "Semarang",
        kecamatan: [
          {
            nama: "Candisari",
            kelurahan: ["Gajahmungkur", "Kedungmundu"],
          },
        ],
      },
    ],
  },
];

export const daftarPasien = [
  {
    id: 1,
    noRekamMedis: "123456789",
    date: "2022-01-01",
    nama: "Dwi",
    jenisKelamin: "Laki-laki",
    tglLahir: "2022-01-01",
    umur: 20,
    noTelp: "08123456789",
  },
  {
    id: 2,
    noRekamMedis: "123456789",
    date: "2022-01-10",
    nama: "Alisa",
    jenisKelamin: "Perempuan",
    tglLahir: "2001-02-05",
    umur: 23,
    noTelp: "08123456789",
  },
  {
    id: 3,
    noRekamMedis: "123456789",
    date: "2022-02-15",
    nama: "Iwan",
    jenisKelamin: "Laki-laki",
    tglLahir: "2022-05-03",
    umur: 20,
    noTelp: "08123456789",
  },
];

// config.js
export const menus = {
  pendaftaran: [
    {
      title: "Pendaftaran",
      subItems: [
        { title: "Pasien Baru", href: "/pendaftaran/pendaftaran-pasien-baru" },
        { title: "Pasien Bayi", href: "/pendaftaran/pendaftaran-pasien-bayi" },
        {
          title: "Pendaftaran Pasien Laboratorium",
          href: "/pendaftaran/pendaftaran-pasien-laboratorium",
        },
        {
          title: "Pendaftaran Pasien Radiologi",
          href: "/pendaftaran/pendaftaran-pasien-radiologi",
        },
        {
          title: "Pendaftaran Pasien Rehabilitasi",
          href: "/pendaftaran/pendaftaran-pasien-rehabilitasi",
        },
        {
          title: "Pendaftaran Pasien Medical Check Up",
          href: "/pendaftaran/pendaftaran-pasien-medical-check-up",
        },
        {
          title: "Pendaftaran Pasien Fasilitas",
          href: "/pendaftaran/pendaftaran-pasien-fasilitas",
        },
        {
          title: "Pendaftaran Pasien Ambulance",
          href: "/pendaftaran/pendaftaran-pasien-ambulance",
        },
        {
          title: "Pendaftaran Pasien Optik",
          href: "/pendaftaran/pendaftaran-pasien-optik",
        },
        {
          title: "Pendaftaran Pasien IGD",
          href: "/pendaftaran/pendaftaran-pasien-igd",
        },
        { title: "Keanggotaan", href: "/pendaftaran/keanggotaan" },
      ],
    },
    {
      title: "Perjanjian",
      subItems: [
        { title: "Data Pasien Perjanjian", href: "/perjanjian" },
        {
          title: "Pasien Perjanjian Reguler",
          href: "/perjanjian/perjanjian-reguler",
        },
        { title: "Pasien Perjanjian ODC", href: "/perjanjian/odc" },
        {
          title: "Pasien Perjanjian Rawat Jalan",
          href: "/perjanjian/rawat-jalan",
        },
        {
          title: "Pasien Perjanjian Rawat Inap",
          href: "/perjanjian/rawat-inap",
        },
        { title: "Pasien Perjanjian Radiologi", href: "/perjanjian/radiologi" },
        { title: "Pasien Perjanjian MCU", href: "/perjanjian/MCU" },
        { title: "Pasien Perjanjian Operasi", href: "/perjanjian/Operasi" },
        {
          title: "Pasien Perjanjian Laboratorium",
          href: "/perjanjian/laboratorium",
        },
      ],
    },
    {
      title: "Antrian",
      subItems: [
        { title: "Pengaturan Antrian", href: "/Antrian/pengaturan-antrian" },
        { title: "Display Antrian", href: "/Antrian/display-antrian" },
      ],
    },
  ],
  dokter: [
    {
      title: "Jadwal Dokter",
      subItems: [
        { title: "Lihat Jadwal", href: "/dokter/jadwal" },
        { title: "Tambah Jadwal", href: "/dokter/tambah-jadwal" },
      ],
    },
    {
      title: "Pemeriksaan Pasien ",
      subItems: [
        { title: "Pemeriksaan Pasien IGD", href: "/pemeriksaan/igd" },
        {
          title: "Pemeriksaan Pasien Rawat Jalan",
          href: "/pemeriksaan/rawat-jalan",
        },
        {
          title: "Pemeriksaan Pasien Rawat Inap",
          href: "/pemeriksaan/rawat-inap",
        },
        {
          title: "Pemeriksaan Pasien Radiologi",
          href: "/pemeriksaan/radiologi",
        },
      ],
    },
  ],
  masterData: [
    {
      title: "Keanggotaan",
      subItems: [
        { title: "Tipe Keanggotaan", href: "/master-data/tipe-keanggotaan" },
      ],
    },
    {
      title: "Data Pegawai",
      subItems: [
        {
          title: "Daftar Pegawai",
          href: "/MasterData/master-pegawai/daftar-pegawai",
        },
        {
          title: "Tambah Data Pegawai",
          href: "/MasterData/master-pegawai/add-pegawai",
        },
        { title: "Akses Group Pegawai", href: "/master-data/group-pegawai" },
        { title: "User Akses", href: "/master-data/akses-pegawai" },
        { title: "Akses User Login", href: "/master-data/log-aktivitas" },
      ],
    },
    {
      title: "Asuransi",
      subItems: [
        {
          title: "Daftar Asuransi",
          href: "/MasterData/master-asuransi/daftar-asuransi",
        },
        {
          title: "Asuransi Rawat Jalan",
          href: "/master-data/asuransi-rawat-jalan",
        },
        {
          title: "Asuransi Rawat Inap",
          href: "/master-data/asuransi-rawat-inap",
        },
      ],
    },
    {
      title: "Peralatan kesehatan",
      subItems: [
        {
          title: "Data Peralatan Medis",
          href: "/master-data/data-peralatan-medis",
        },
        {
          title: "Kategori Peralatan Medis",
          href: "/master-data/kategori-peralatan-medis",
        },
      ],
    },
    {
      title: " Manajemen Operasi ",
      subItems: [
        {
          title: "Daftar Manajemen Operasi",
          href: "/master-data/daftar-manajemen-operasi",
        },
        {
          title: "Daftar Tindakan Operasi",
          href: "/master-data/daftar-tindakan-operasi",
        },
        {
          title: "Daftar Ruangan Operasi",
          href: "/master-data/daftar-ruangan-operasi",
        },
        { title: "About ", href: "/master-data/about" },
      ],
    },
    {
      title: "Admisi",
      subItems: [
        { title: "Tarif Admisi", href: "/master-data/tarif-admisi" },
        { title: "Tarif Rawat Jalan", href: "/master-data/tarif-rawat-jalan" },
        { title: "Tarif Rawat Inap", href: "/master-data/tarif-rawat-inap" },
      ],
    },
    {
      title: "Poliklinik",
      subItems: [
        { title: "Daftar Poliklinik", href: "/master-data/daftar-poliklinik" },
        {
          title: "Daftar Tarif Poliklinik",
          href: "/master-data/daftar-tarif-poliklinik",
        },
      ],
    },
  ],
};
