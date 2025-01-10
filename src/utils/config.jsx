export const dataWilayah = [
  {
      provinsi: "Jawa Barat",
      kabupaten: [
          {
              nama: "Bandung",
              kecamatan: [
                  {
                      nama: "Coblong",
                      kelurahan: ["Dago", "Ciumbuleuit"]
                  },
                  {
                      nama: "Cicendo",
                      kelurahan: ["Arjuna", "Husen"]
                  }
              ]
          },
          {
              nama: "Bogor",
              kecamatan: [
                  {
                      nama: "Cibinong",
                      kelurahan: ["Pondok Rajeg", "Karadenan"]
                  }
              ]
          }
      ]
  },
  {
      provinsi: "Jawa Tengah",
      kabupaten: [
          {
              nama: "Semarang",
              kecamatan: [
                  {
                      nama: "Candisari",
                      kelurahan: ["Gajahmungkur", "Kedungmundu"]
                  }
              ]
          }
      ]
  }
];

export const dataPasien = [
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
    }
];


// menuData.js
// export const menuPendaftaran = [
//     {
//       title: "Pendaftaran",
//       subItems: [
//         { title: "Pasien Baru", href: "/pendaftaran/pendaftaran-pasien-baru" },
//         { title: "Pasien Bayi", href: "/pendaftaran/pendaftaran-pasien-bayi" },
//         { title: "Pasien Luar Laboratorium", href: "/pendaftaran/pasien-luar-laboratorium" },
//         { title: "Pasien Luar Radiologi", href: "/pendaftaran/pasien-luar-radiologi" },
//         { title: "Pasien Luar Rehabilitasi", href: "/pendaftaran/pasien-luar-rehabilitasi" },
//         { title: "Pasien Luar Medical Check Up", href: "/pendaftaran/pasien-luar-medical-check-up" },
//         { title: "Pasien Luar Fasilitas", href: "/pendaftaran/pasien-luar-fasilitas" },
//         { title: "Pasien Luar Ambulance", href: "/pendaftaran/pasien-luar-ambulance" },
//         { title: "Keanggotaan", href: "/pendaftaran/keanggotaan" },
//         // Tambahkan item lainnya sesuai kebutuhan
//       ],
//     },
//     {
//       title: "Perjanjian",
//       subItems: [
//         { title: "Data Pasien Perjanjian", href: "/perjanjian/data-pasien" },
//         { title: "Pasien Perjanjian ODC", href: "/perjanjian/odc" },
//         { title: "Pasien Perjanjian Rawat Jalan", href: "/perjanjian/rawat-jalan" },
//         { title: "Pasien Perjanjian Rawat Inap", href: "/perjanjian/rawat-inap" },
//         { title: "Pasien Perjanjian Radiologi", href: "/perjanjian/radiologi" },
//         { title: "Pasien Perjanjian MCU", href: "/perjanjian/MCU" },
//         { title: "Pasien Perjanjian Operasi", href: "/perjanjian/Operasi" },
//         // Tambahkan item lainnya sesuai kebutuhan
//       ],
//     },
//     // Tambahkan menu lainnya sesuai kebutuhan
//     {
//         title: "Antrian",
//         subItems: [
//             { title: "Pengaturan Antrian", href: "/Antrian/pengaturan-antrian" },
//             { title: "Display Antrian", href: "/Antrian/display-antrian" },
//         ]
//     }
//   ];

  // config.js
export const menus = {
    pendaftaran: [
      {
        title: "Pendaftaran",
        subItems: [
            { title: "Pasien Baru", href: "/pendaftaran/pendaftaran-pasien-baru" },
            { title: "Pasien Bayi", href: "/pendaftaran/pendaftaran-pasien-bayi" },
            { title: "Pasien Luar Laboratorium", href: "/pendaftaran/pasien-luar-laboratorium" },
            { title: "Pasien Luar Radiologi", href: "/pendaftaran/pasien-luar-radiologi" },
            { title: "Pasien Luar Rehabilitasi", href: "/pendaftaran/pasien-luar-rehabilitasi" },
            { title: "Pasien Luar Medical Check Up", href: "/pendaftaran/pasien-luar-medical-check-up" },
            { title: "Pasien Luar Fasilitas", href: "/pendaftaran/pasien-luar-fasilitas" },
            { title: "Pasien Luar Ambulance", href: "/pendaftaran/pasien-luar-ambulance" },
            { title: "Keanggotaan", href: "/pendaftaran/keanggotaan" },
        ],
      },
      {
        title: "Perjanjian",
        subItems: [
            { title: "Data Pasien Perjanjian", href: "/perjanjian/data-pasien" },
            { title: "Pasien Perjanjian ODC", href: "/perjanjian/odc" },
            { title: "Pasien Perjanjian Rawat Jalan", href: "/perjanjian/rawat-jalan" },
            { title: "Pasien Perjanjian Rawat Inap", href: "/perjanjian/rawat-inap" },
            { title: "Pasien Perjanjian Radiologi", href: "/perjanjian/radiologi" },
            { title: "Pasien Perjanjian MCU", href: "/perjanjian/MCU" },
            { title: "Pasien Perjanjian Operasi", href: "/perjanjian/Operasi" },
        ],
      },
      {
        title: "Antrian",
        subItems: [
            { title: "Pengaturan Antrian", href: "/Antrian/pengaturan-antrian" },
            { title: "Display Antrian", href: "/Antrian/display-antrian" },
        ]
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
          { title: "Pemeriksaan Pasien Rawat Jalan", href: "/pemeriksaan/rawat-jalan" },
          { title: "Pemeriksaan Pasien Rawat Inap", href: "/pemeriksaan/rawat-inap" },
          { title: "Pemeriksaan Pasien Radiologi", href: "/pemeriksaan/radiologi" },
        ],
      },
    ],
  };
  
  