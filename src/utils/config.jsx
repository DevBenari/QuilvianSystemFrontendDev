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
        { title: "Keanggotaan", href: "/pendaftaran/keanggotaan" },
      ],
    },
    {
      title: "Perjanjian",
      subItems: [
        { title: "Data Pasien Perjanjian", href: "/perjanjian/data-pasien" },
        { title: "Pasien Perjanjian Reguler", href: "/perjanjian/perjanjian-reguler" },
        { title: "Pasien Perjanjian ODC", href: "/perjanjian/odc" },
        {title: "Pasien Perjanjian Rawat Jalan",href: "/perjanjian/rawat-jalan",},
        {title: "Pasien Perjanjian Rawat Inap",href: "/perjanjian/rawat-inap",},
        { title: "Pasien Perjanjian Radiologi", href: "/perjanjian/radiologi" },
        { title: "Pasien Perjanjian MCU", href: "/perjanjian/MCU" },
        { title: "Pasien Perjanjian Operasi", href: "/perjanjian/Operasi" },
        {title: "Pasien Perjanjian Laboratorium",href: "/perjanjian/laboratorium",},
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
};
