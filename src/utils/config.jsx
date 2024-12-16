const menu = [
    {
        id: "pendaftaran",
        title: "Pendaftaran",
        path: "/pendaftaran",
        submenus: [
          { id: "pasien-baru", title: "Pasien Baru", path: "/pendaftaran/pasien-baru" },
          { id: "pasien-lama", title: "Pasien Lama", path: "/pendaftaran/pasien-lama" },
        ],
      },
      {
        id: "asuransi",
        title: "Asuransi",
        path: "/asuransi",
        submenus: [
          { id: "klaim", title: "Klaim Asuransi", path: "/asuransi/klaim" },
          { id: "daftar-asuransi", title: "Daftar Asuransi", path: "/asuransi/daftar-asuransi" },
        ],
      },
]

export default menu