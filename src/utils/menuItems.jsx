import {
  RiTestTubeLine,
  RiSurgicalMaskLine,
  RiMedicineBottleLine,
  RiDatabase2Line,
  RiClipboardLine,
  RiHospitalLine,
  RiHealthBookLine,
  RiRestaurantLine,
  RiWalkLine,
  RiHotelLine,
  RiUserLine,
  RiArrowRightSLine,
  RiArrowLeftLine,
  RiFolderLine,
  RiFolderOpenLine,
} from "react-icons/ri";
import { PiWheelchairFill } from "react-icons/pi";
import { GiMicroscope } from "react-icons/gi";
import { FaStethoscope, FaFirstAid } from "react-icons/fa";
import { MdScanner } from "react-icons/md";

export const menuItems = [
  {
    label: "Pelayanan Kesehatan",
    key: "ManajemenKesehatan",
    pathname: "/DashboardPelayanKesehatan",
    subMenu: [
      {
        pathname: "/MasterData",
        label: "Master Data",
        key: "masterData",
        icon: <RiDatabase2Line className="fs-4" />,
        masterDataMenu: [
          {
            title: "User Aktif",
            key: "userAktif",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "User Aktif",
                href: "/MasterData/master-userActive/table-userActive",
              },
            ],
          },

          {
            title: "Asuransi",
            key: "asuransi",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Daftar Asuransi",
                href: "/MasterData/master-asuransi/asuransi/daftar-asuransi",
              },
              {
                title: "Daftar Asuransi Pasien",
                href: "/MasterData/master-asuransi/asuransi-pasien/daftar-asuransi-pasien",
              },
              {
                title: "Coveran Asuransi",
                href: "/MasterData/master-asuransi/coveran-asuransi/daftar-CoveranAsuransi",
              },
            ],
          },
          {
            title: "Master Position",
            key: "masterPosition",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Daftar Position",
                href: "/MasterData/master-position/table-position",
              },
            ],
          },
          {
            title: "Peralatan kesehatan",
            key: "peralatanKesehatan",
            icon: <RiFolderLine className="fs-4" />,
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
            key: "manajemenOperasi",
            icon: <RiFolderLine className="fs-4" />,
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
              {
                title: "About ",
                href: "/MasterData/master-operasi/about-operasi",
              },
            ],
          },
          {
            title: "Admisi",
            key: "masterAdmisi",
            icon: <RiFolderLine className="fs-4" />,
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
            key: "departement",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Manajemen departement",
                href: "/MasterData/master-departement/table-departement",
              },
            ],
          },
          {
            title: "Master Poliklinik",
            key: "masterPoliklinik",
            icon: <RiFolderLine className="fs-4" />,
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
            key: "masterInformasi",
            icon: <RiFolderLine className="fs-4" />,
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
            key: "masterDokter",
            icon: <RiFolderLine className="fs-4" />,
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
            key: "masterWilayah",
            icon: <RiFolderLine className="fs-4" />,
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
      },
      {
        pathname: "/pendaftaran",
        label: "Admisi",
        key: "admisi",
        icon: <RiClipboardLine className="fs-4" />,
        pendaftaranMenu: [
          {
            title: "Pendaftaran",
            key: "pendaftaran",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Pasien Baru",
                href: "/pendaftaran/pendaftaran-pasien-baru",
              },
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
              {
                title: "Keanggotaan",
                href: "/pendaftaran/anggota/table-anggota",
              },
            ],
          },
          {
            title: "Perjanjian",
            key: "perjanjian",
            icon: <RiFolderLine className="fs-4" />,
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
              {
                title: "Pasien Perjanjian Radiologi",
                href: "/perjanjian/radiologi",
              },
              { title: "Pasien Perjanjian MCU", href: "/perjanjian/MCU" },
              {
                title: "Pasien Perjanjian Operasi",
                href: "/perjanjian/Operasi",
              },
            ],
          },
          {
            title: "Antrian",
            key: "antrian",
            icon: <RiFolderLine className="fs-4" />,
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
            key: "pemesananBed",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              { title: "Pemesanan Bed", href: "/pendaftaran/pemesanan-bed" },
            ],
          },
        ],
      },
      {
        pathname: "/dokter",
        label: "Dokter",
        key: "dokter",
        icon: <FaStethoscope className="fs-4" />,
      },
      {
        pathname: "/IGD",
        label: "IGD",
        key: "igd",
        icon: <RiHospitalLine className="fs-4" />,
      },
      {
        pathname: "/radiologi",
        label: "Radiologi",
        key: "radiologi",
        icon: <MdScanner className="fs-4" />,
      },
      {
        pathname: "/laboratorium",
        label: "Laboratorium",
        key: "laboratorium",
        icon: <RiTestTubeLine className="fs-4" />,
      },
      {
        pathname: "/rehabilitasi",
        label: "Rehabilitasi",
        key: "rehabilitasi",
        icon: <PiWheelchairFill className="fs-4" />,
      },
      {
        pathname: "/medical-check-up",
        label: "Medical Check-Up",
        key: "medicalCheckUp",
        icon: <RiHealthBookLine className="fs-4" />,
      },
      {
        pathname: "/pelayanan-gizi",
        label: "Pelayanan Gizi",
        key: "pelayananGizi",
        icon: <RiRestaurantLine className="fs-4" />,
      },
      {
        pathname: "/instalasi-rawat-jalan",
        label: "Rawat Jalan",
        key: "rawatJalan",
        icon: <RiWalkLine className="fs-4" />,
      },
      {
        pathname: "/instalasi-rawat-inap",
        label: "Rawat Inap",
        key: "rawatInap",
        icon: <RiHotelLine className="fs-4" />,
      },
      {
        pathname: "/instalasi-bedah",
        label: "Instalasi Bedah",
        key: "instalasiiBedah",
        icon: <RiSurgicalMaskLine className="fs-4" />,
      },
      {
        pathname: "/instalasi-Operasi",
        label: "Instalasi Operasi",
        key: "instalasiOperasi",
        icon: <GiMicroscope className="fs-4" />,
      },
      {
        pathname: "/farmasi",
        label: "Farmasi",
        key: "farmasi",
        icon: <RiMedicineBottleLine className="fs-4" />,
      },
    ],
  },
  {
    label: "Pelayanan Medis",
    key: "pelayananMedis",
    pathname: "/pendaftaran",
    icon: <RiHospitalLine className="fs-4" />,
    subMenu: [
      {
        pathname: "/pelayanan-medik/instalasi-medik",
        label: "Instalasi Medik",
        key: "instalasiMedik",
        icon: <RiHospitalLine className="fs-4" />,
      },
      {
        pathname: "/app/List Pasien",
        label: "List Pasien",
        key: "listPasien",
        icon: <RiUserLine className="fs-4" />,
      },
    ],
  },
  {
    label: "Kiosk",
    key: "kioskPendaftaran",
    pathname: "/kiosk",
    icon: <RiUserLine className="fs-4" />,
  },
];
