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
    namaPasien: "Dwi",
    jenisKelamin: "Laki-laki",
    tglLahir: "2022-01-01",
    umur: 20,
    noTelp: "08123456789",
  },
  {
    id: 2,
    noRekamMedis: "123456789",
    date: "2022-01-10",
    namaPasien: "Alisa",
    jenisKelamin: "Perempuan",
    tglLahir: "2001-02-05",
    umur: 23,
    noTelp: "08123456789",
  },
  {
    id: 3,
    noRekamMedis: "123456789",
    date: "2022-02-15",
    namaPasien: "Iwan",
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
        {
          title: "Pasien Bayi",
          href: "/pendaftaran/pendaftaran-pasien-bayi/table-pasien-bayi",
        },
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
          href: "/pendaftaran/pendaftaran-pasien-rehabilitasi/table-rehabilitasi-medik",
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
        { title: "Keanggotaan", href: "/pendaftaran/anggota/table-anggota" },
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
      ],
    },
    {
      title: "Antrian",
      subItems: [
        {
          title: "Display Antrian",
          href: "/pendaftaran/Antrian/display-antrian",
        },
        {
          title: "Pengaturan Antrian",
          href: "/pendaftaran/Antrian/pengaturan-antrian",
        },
      ],
    },
    {
      title: "Pemesanan Bed",
      subItems: [
        { title: "Pemesanan Bed", href: "/pendaftaran/pemesanan-bed" },
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
      title: "User Aktif",
      subItems: [
        {
          title: "User Aktif",
          href: "/MasterData/master-userActive/table-userActive",
        },
      ],
    },

    // {
    //   title: "Data Pegawai",
    //   subItems: [
    //     {
    //       title: "Daftar Pegawai",
    //       href: "/MasterData/master-pegawai/daftar-pegawai",
    //     },
    //     {
    //       title: "Tambah Data Pegawai",
    //       href: "/MasterData/master-pegawai/add-pegawai",
    //     },
    //     { title: "Akses Group Pegawai", href: "/master-data/group-pegawai" },
    //     { title: "User Akses", href: "/master-data/akses-pegawai" },
    //     { title: "Akses User Login", href: "/master-data/log-aktivitas" },
    //   ],
    // },
    {
      title: "Asuransi",
      subItems: [
        {
          title: "Daftar Asuransi",
          href: "/MasterData/master-asuransi/asuransi/daftar-asuransi",
        },
        {
          title: "Coveran Asuransi",
          href: "/MasterData/master-asuransi/coveran-asuransi/daftar-CoveranAsuransi",
        },
      ],
    },
    {
      title: "Master Position",
      subItems: [
        {
          title: "Daftar Position",
          href: "/MasterData/master-position/table-position",
        },
      ],
    },
    {
      title: "Peralatan kesehatan",
      subItems: [
        {
          title: "Data kategori Peralatan ",
          href: "/MasterData/master-kategori-peralatan/kategori-peralatan/table-kategori-peralatan",
        },
        {
          title: "Data  Peralatan ",
          href: "/MasterData/master-kategori-peralatan/peralatan/table-peralatan",
        },
      ],
    },
    {
      title: " Manajemen Operasi ",
      subItems: [
        {
          title: "Operasi",
          href: "/MasterData/master-operasi/operasi/table-operasi",
        },
        {
          title: "Persalinan",
          href: "/MasterData/master-operasi/persalinan/table-persalinan",
        },
        {
          title: "Daftar Manajemen Operasi",
          href: "/MasterData/master-operasi/daftar-manajemen-operasi",
        },
        {
          title: "Daftar Tindakan Operasi",
          href: "/MasterData/master-operasi/daftar-tindakan-operasi/table-tindakan-operasi",
        },
        {
          title: "Daftar Ruangan Operasi",
          href: "/MasterData/master-operasi/ruangan-operasi",
        },
        { title: "About ", href: "/MasterData/master-operasi/about-operasi" },
      ],
    },
    {
      title: "Admisi",
      subItems: [
        {
          title: "Tarif Rawat Jalan",
          href: "/MasterData/master-administrasi/administrasi/tables-administrasi",
        },
        {
          title: "Tarif Rawat Inap",
          href: "/MasterData/master-administrasi/administrasi-rawat-inap",
        },
      ],
    },
    {
      title: "Departement",
      subItems: [
        {
          title: "Manajemen departement",
          href: "/MasterData/master-departement/table-departement",
        },
      ],
    },
    {
      title: "Master Poliklinik",
      subItems: [
        {
          title: "Data Poliklinik",
          href: "/MasterData/master-PoliKlinik/poliklinik/table-PoliKlinik",
        },
        {
          title: "Data Sub Poli",
          href: "/MasterData/master-PoliKlinik/subPoli/table-subPoli",
        },
      ],
    },
    {
      title: "Master Informasi",
      subItems: [
        {
          title: "Data Title",
          href: "/MasterData/master-informasi/title/table-title",
        },
        {
          title: "Data Pendidikan",
          href: "/MasterData/master-informasi/master-pendidikan/table-pendidikan",
        },
        {
          title: "Data Agama",
          href: "/MasterData/master-informasi/agama/table-agama",
        },
        {
          title: "Data Golongan",
          href: "/MasterData/master-informasi/golongan-darah/table-golongan",
        },
        {
          title: "Data Pekerjaan",
          href: "/MasterData/master-informasi/master-pekerjaan/table-pekerjaan",
        },
        {
          title: "Data Negara",
          href: "/MasterData/master-informasi/negara/table-negara",
        },
        {
          title: "Data Identitas",
          href: "/MasterData/master-informasi/identitas/table-identitas",
        },
        {
          title: "Data jabatan",
          href: "/MasterData/master-informasi/jabatan/table-jabatan",
        },
      ],
    },
    {
      title: "Dokter",
      subItems: [
        {
          title: "Data Dokter",
          href: "/MasterData/master-dokter/dokter/table-dokter",
        },

        {
          title: "Dokter Poli",
          href: "/MasterData/master-dokter/dokter-poli/table-DokterPoli",
        },
        {
          title: "Jadwal Praktek Dokter",
          href: "/MasterData/master-dokter/jadwal-praktek/table-jadwal-praktek",
        },
      ],
    },
    {
      title: "Master Wilayah",
      subItems: [
        {
          title: "Data Provinsi",
          href: "/MasterData/master-wilayah/provinsi/table-provinsi",
        },
        {
          title: "Data Kabupaten/Kota",
          href: "/MasterData/master-wilayah/kabupaten-kota/table-kabupaten-kota",
        },
        {
          title: "Data kecamatan",
          href: "/MasterData/master-wilayah/kecamatan/table-kecamatan",
        },
        {
          title: "Data Kelurahan",
          href: "/MasterData/master-wilayah/kelurahan/table-kelurahan",
        },
      ],
    },
  ],
  IGD: [
    {
      title: "Administrasi",
      subItems: [
        {
          title: "Pendaftaran Pasien IGD",
          href: "/IGD/administrasi/pendaftaran-pasien-igd",
        },
        {
          title: "Status Pasien IGD",
          href: "/IGD/administrasi/status-pasien-igd",
        },
        {
          title: "Daftar Pasien",
          href: "/IGD/administrasi/table-pasien-igd",
        },
      ],
    },
    {
      title: "Triase",
      subItems: [
        {
          title: "Daftar Antrian Triase",
          href: "/IGD/Antrean-Triase/table-poli",
        },
        {
          title: "Penilaian Triase",
          href: "/IGD/Antrean-Triase/penilaian",
        },
      ],
    },
    {
      title: "Penanganan Pasien",
      subItems: [
        {
          title: "Pemeriksaan Awal",
          href: "/IGD/pemeriksaan-awal",
        },
        {
          title: "Tindakan Medis",
          href: "/IGD/tindakan-medis",
        },
        {
          title: "Monitoring Pasien",
          href: "/IGD/monitoring-pasien",
        },
      ],
    },
    {
      title: "Diagnostik & Terapi",
      subItems: [
        {
          title: "Permintaan Laboratorium",
          href: "/IGD/permintaan-lab",
        },
        {
          title: "Permintaan Radiologi",
          href: "/IGD/permintaan-radiologi",
        },
        {
          title: "Farmasi IGD",
          href: "/IGD/farmasi-igd",
        },
      ],
    },
    {
      title: "Manajemen Ruangan",
      subItems: [
        {
          title: "Status Ruangan",
          href: "/IGD/status-ruangan",
        },
        {
          title: "Permintaan Transfer",
          href: "/IGD/permintaan-transfer",
        },
      ],
    },
    {
      title: "Disposisi Pasien",
      subItems: [
        {
          title: "Rawat Inap",
          href: "/IGD/rawat-inap",
        },
        {
          title: "Pemulangan Pasien",
          href: "/IGD/pemulangan-pasien",
        },
        {
          title: "Rujukan Pasien",
          href: "/IGD/rujukan-pasien",
        },
      ],
    },
    {
      title: "Laporan & Analitik",
      subItems: [
        {
          title: "Dashboard IGD",
          href: "/IGD/dashboard",
        },
        {
          title: "Laporan Harian",
          href: "/IGD/laporan-harian",
        },
        {
          title: "Statistik & Kinerja",
          href: "/IGD/statistik-kinerja",
        },
      ],
    },
  ],

  instalasiRawatJalan: [
    {
      title: "Daftar Poli",
      subItems: [
        {
          title: "Daftar Poli",
          href: "/instalasi-rawat-jalan/antrean-data-poli/table-poli",
        },
      ],
    },
  ],
  instalasiRawatInap: [
    {
      title: "Daftar Rawat Inap",
      subItems: [
        {
          title: "Daftar Rawat Inap",
          href: "/instalasi-rawat-inap/antrean-data-poli/table-poli",
        },
      ],
    },
  ],
  instalasiOperasi: [
    {
      title: "Daftar Operasi",
      subItems: [
        {
          title: "Daftar Operasi",
          href: "/instalasi-rawat-inap/antrean-data-poli/table-poli",
        },
      ],
    },
  ],
};

export const menuItems = [
  {
    label: "Pelayanan Kesehatan",
    key: "ManajemenKesehatan",
    pathname: "/",
    subMenu: [
      { pathname: "/MasterData", label: "Master Data" },
      { pathname: "/pendaftaran", label: "Admisi" },
      { pathname: "/dokter", label: "Pelayanan Dokter" },
      { pathname: "/IGD", label: "IGD" },
      { pathname: "/instalasi-poli", label: "Poli" },
    ],
  },
  {
    label: "Pelayanan Medis",
    key: "pelayananMedis",
    pathname: "/pelayanan-medik",
    subMenu: [
      {
        pathname: "/pelayanan-medik/instalasi-medik",
        label: "Instalasi Rawat Intensif",
      },
      { pathname: "/app/List Pasien", label: "List Pasien" },
    ],
  },
];
