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
import { FaStethoscope, FaFirstAid, FaBaby, FaGlasses } from "react-icons/fa";
import { MdScanner } from "react-icons/md";

export const menuItems = [
  {
    label: "Pelayanan Kesehatan",
    key: "ManajemenKesehatan",
    pathname: "/PelayananKesehatan",
    subMenu: [
      {
        pathname: "/MasterData",
        label: "Master Data",
        key: "masterData",
        icon: <RiDatabase2Line className="fs-4" />,
        masterDataMenu: [
          {
            title: "Beranda ",
            key: "dashboardIgd",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Dashboard Master Data",
                href: "/MasterData/dashboard-masterData",
              },
            ],
          },
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
                title: "Daftar Manajemen Operasi",
                href: "/MasterData/master-operasi/daftar-manajemen-operasi",
              },
              {
                title: "Persalinan",
                href: "/MasterData/master-operasi/persalinan/table-persalinan",
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
                title: "Tarif Rawat Jalan",
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
            title: "Beranda",
            key: "DashboardAdmisi",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Dashboard Admisi",
                href: "/pendaftaran/dashboard-admisi",
              },
            ],
          },
          {
            title: "Pendaftaran",
            key: "pendaftaran",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Pendaftaran Pasien Fasilitas",
                href: "/pendaftaran/pendaftaran-pasien-fasilitas",
              },
              {
                title: "Pendaftaran Pasien Ambulance",
                href: "/pendaftaran/pendaftaran-pasien-ambulance",
              },

              {
                title: "Keanggotaan",
                href: "/pendaftaran/anggota/table-anggota",
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
        // Perbaikan untuk bagian menuIGD dengan menambahkan key dan icon
        menuIGD: [
          {
            title: "Beranda",
            key: "BerandaIGD", // Tambahkan key unik
            icon: <RiFolderLine className="fs-4" />, // Pastikan ada icon
            subItems: [
              {
                title: "Dashboard IGD",
                href: "/IGD",
              },
              {
                title: "Data Pasien Rawat Jalan",
                href: "/IGD/Data-Pasien-Rawat-Jalan",
              },
            ],
          },

          {
            title: "Administrasi",
            key: "administrasiIGD", // Tambahkan key unik
            icon: <RiFolderLine className="fs-4" />, // Pastikan ada icon
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
            key: "triaseIGD", // Tambahkan key unik
            icon: <RiFolderLine className="fs-4" />, // Pastikan ada icon
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
            key: "penangananPasienIGD", // Tambahkan key unik
            icon: <RiFolderLine className="fs-4" />, // Pastikan ada icon
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
            key: "diagnostikTerapiIGD", // Tambahkan key unik
            icon: <RiFolderLine className="fs-4" />, // Pastikan ada icon
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
            key: "manajemenRuanganIGD", // Tambahkan key unik
            icon: <RiFolderLine className="fs-4" />, // Pastikan ada icon
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
            key: "disposisiPasienIGD", // Tambahkan key unik
            icon: <RiFolderLine className="fs-4" />, // Pastikan ada icon
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
            key: "laporanAnalitikIGD", // Tambahkan key unik
            icon: <RiFolderLine className="fs-4" />, // Pastikan ada icon
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
      },
      {
        pathname: "/rawat-inap",
        label: "Rawat Inap",
        key: "rawatInap",
        icon: <RiHotelLine className="fs-4" />,
        menuRawatInap: [
          {
            title: "Beranda",
            key: "dashhboardRawatInap", // Tambahkan key unik
            icon: <RiFolderLine className="fs-4" />, // Pastikan ada icon
            subItems: [
              {
                title: "Dashboard Rawat Inap",
                href: "/Rawat-Inap/Beranda/dashboard-rawat-inap",
              },
              {
                title: "Table Pasien lama",
                href: "/Rawat-Inap/Beranda/table-pasien-lama",
              },
              {
                title: "Table Pasien Perjanjian",
                href: "/Rawat-Inap/Beranda/perjanjian-rawat-inap",
              },
            ],
          },
          {
            title: "Pendaftaran",
            key: "pendaftaranRawatInap",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Pendaftaran Pasien",
                href: "/Rawat-Jalan/pendaftaran-pasien-baru/add-pasien-baru",
              },
            ],
          },
        ],
      },
      {
        pathname: "/rawat-jalan",
        label: "Rawat Jalan",
        key: "dashboardRawatJalan",
        icon: <RiWalkLine className="fs-4" />,
        menuRawatJalan: [
          {
            title: "Beranda",
            key: "dashhboardRawatJalan", // Tambahkan key unik
            icon: <RiFolderLine className="fs-4" />, // Pastikan ada icon
            subItems: [
              {
                title: "Dashboard Rawat Jalan",
                href: "/Rawat-Jalan/Beranda/dashboard-rawat-jalan",
              },
              {
                title: "Table Pasien lama",
                href: "/Rawat-Jalan/Beranda/table-pasien-lama",
              },
              {
                title: "Table Pasien Perjanjian",
                href: "/Rawat-Jalan/Beranda/perjanjian-rawat-jalan",
              },
            ],
          },
          {
            title: "Antrean & Jadwal",
            key: "antreanJadwalRawatJalan",
            icon: <RiFolderLine className="fs-4" />, // Pastikan ada icon
            subItems: [
              {
                title: "Daftar Poli",
                href: "/Rawat-Jalan/antrean-data-poli/table-poli",
              },
            ],
          },
          {
            title: "Pendaftaran",
            key: "pendaftaranRawatJalan",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Pendaftaran Pasien",
                href: "/Rawat-Jalan/pendaftaran-pasien-baru/add-pasien-baru",
              },
            ],
          },
          {
            title: "Pemeriksaan Dokter",
            key: "pemeriksaanDokterRawatJalan",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Data Pemeriksaan",
                href: "/Rawat-Jalan/pemeriksaan-dokter",
              },
            ],
          },
          {
            title: "Tindakan & Pemeriksaan Penunjang",
            key: "tindakanPenunjangRawatJalan",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Tindakan Medis",
                href: "/Rawat-Jalan/tindakan-medis",
              },
              {
                title: "Pemeriksaan Penunjang",
                href: "/Rawat-Jalan/pemeriksaan-penunjang",
              },
            ],
          },
          {
            title: "Resep & Apotek",
            key: "resepApotekRawatJalan",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Resep Dokter",
                href: "/Rawat-Jalan/resep-dokter",
              },
              {
                title: "Pengambilan Obat",
                href: "/Rawat-Jalan/pengambilan-obat",
              },
            ],
          },
          {
            title: "Billing & Klaim",
            key: "billingKlaimRawatJalan",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Tagihan Pasien",
                href: "/Rawat-Jalan/billing-pasien",
              },
              {
                title: "Klaim BPJS/Asuransi",
                href: "/Rawat-Jalan/klaim-bpjs-asuransi",
              },
            ],
          },
        ],
      },
      {
        pathname: "/Operasi",
        label: "Instalasi Operasi",
        key: "instalasiOperasi",
        icon: <GiMicroscope className="fs-4" />,
        menuOperasi: [
          {
            title: "Beranda",
            key: "dashhboardOperasi", // Tambahkan key unik
            icon: <RiFolderLine className="fs-4" />, // Pastikan ada icon
            subItems: [
              {
                title: "Dashboard Operasi",
                href: "/Operasi/Beranda/dashboard-operasi",
              },
              {
                title: "Table Pasien Operasi",
                href: "/Operasi/Beranda/table-pasien-operasi",
              },
              {
                title: "Table Pasien Perjanjian",
                href: "/Operasi/Beranda/perjanjian-operasi",
              },
            ],
          },
        ],
      },
      {
        pathname: "/Radiologi",
        label: "Radiologi",
        key: "radiologi",
        icon: <MdScanner className="fs-4" />,
        menuRadiologi: [
          {
            title: "Beranda",
            key: "dashboardRadiologi",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Dashboard Radiologi",
                href: "/Radiologi/Beranda/dashboard-radiologi",
              },
              {
                title: "Table Perjanjian Radiologi",
                href: "/Radiologi/Beranda/perjanjian-radiologi",
              },
              {
                title: "Table Pasien Radiologi",
                href: "/Radiologi/Beranda/table-pasien-radiologi",
              },
            ],
          },
          {
            title: "Pendaftaran",
            key: "pendaftaranRadiologi",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Pendaftaran Pasien",
                href: "/Radiologi/pendaftaran-pasien-radiologi/add-pasien-radiologi",
              },
            ],
          },
        ],
      },
      {
        pathname: "/Laboratorium",
        label: "Laboratorium",
        key: "Laboratorium",
        icon: <RiTestTubeLine className="fs-4" />,
        menuLaboratorium: [
          {
            title: "Beranda",
            key: "dashboardLaboratorium",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Dashboard Laboratorium",
                href: "/Laboratorium/Beranda/dashboard-laboratorium",
              },
              {
                title: "Table Pasien Laboratorium",
                href: "/Laboratorium/Beranda/table-pasien-laboratorium",
              },
              {
                title: "Table Pemeriksaan Laboratorium",
                href: "/Laboratorium/Beranda/pemeriksaan-laboratorium",
              },
            ],
          },
          {
            title: "Pendaftaran",
            key: "pendaftaranLaboratorium",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Pendaftaran Pasien",
                href: "/Laboratorium/pendaftaran-pasien-laboratorium/add-pasien-laboratorium",
              },
            ],
          },
        ],
      },
      {
        pathname: "/Rehabilitasi",
        label: "Rehabilitasi",
        key: "Rehabilitasi",
        icon: <PiWheelchairFill className="fs-4" />,
        menuRehabilitasi: [
          {
            title: "Beranda",
            key: "dashboardRehabilitasi",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Dashboard Rehabilitasi",
                href: "/Rehabilitasi/Beranda/dashboard-rehabilitasi",
              },
              {
                title: "Table Pasien Rehabilitasi",
                href: "/Rehabilitasi/Beranda/table-pasien-rehabilitasi",
              },
              // {
              //   title: "Jadwal Terapi",
              //   href: "/Rehabilitasi/Beranda/jadwal-terapi",
              // },
            ],
          },
          {
            title: "Pendaftaran",
            key: "pendaftaranRehabilitasi",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Pendaftaran Pasien",
                href: "/Rehabilitasi/pendaftaran-pasien-rehabilitasi/add-rehabilitasi-medik",
              },
            ],
          },
        ],
      },
      {
        pathname: "/Medical-check-up",
        label: "Medical Check-Up",
        key: "medicalCheckUp",
        icon: <RiHealthBookLine className="fs-4" />,
        menuMCU: [
          {
            title: "Beranda",
            key: "dashboardMCU",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Dashboard MCU",
                href: "/Medical-check-up/Beranda/dashboard-mcu",
              },
              {
                title: "Table Pasien MCU",
                href: "/Medical-check-up/Beranda/table-pasien-mcu",
              },
              {
                title: "Table Perjanjian MCU",
                href: "/Medical-check-up/Beranda/perjanjian-mcu",
              },
            ],
          },
          {
            title: "Pendaftaran",
            key: "pendaftaranMCU",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Pendaftaran Pasien",
                href: "/Medical-check-up/pendaftaran-pasien-mcu",
              },
            ],
          },
        ],
      },
      {
        pathname: "/Layanan-bayi",
        label: "Palayanan Bayi",
        key: "pelayananBayi",
        icon: <FaBaby className="fs-4" />, // Menggunakan ikon bayi yang lebih cocok
        menuBayi: [
          {
            title: "Beranda",
            key: "dashboardBayi",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              // {
              //   title: "Dashboard Bayi",
              //   href: "/Layanan-bayi/Beranda/dashboard-bayi",
              // },
              {
                title: "Table Pasien Bayi",
                href: "/Layanan-bayi/Beranda/table-pasien-bayi",
              },
              // {
              //   title: "Paket Diet Pasien",
              //   href: "/Layanan-bayi/Beranda/paket-diet-pasien",
              // },
            ],
          },
          {
            title: "Pendaftaran",
            key: "pendaftaranBayi",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Pendaftaran Pasien",
                href: "/Layanan-bayi/pendaftaran-pasien-bayi/add-pasien-bayi",
              },
            ],
          },
        ],
      },
      {
        pathname: "/Optik",
        label: "Optik",
        key: "Optik",
        icon: <FaGlasses className="fs-4" />, // Menggunakan ikon yang sesuai untuk layanan Optik
        menuOptik: [
          {
            title: "Beranda",
            key: "dashboardOptik",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Table Pasien Optik",
                href: "/Optik/Beranda/table-pasien-optik",
              },
              {
                title: "Dashboard Optik",
                href: "/Optik/Beranda/dashboard-optik",
              },
              // {
              //   title: "Riwayat Resep Kacamata",
              //   href: "/Optik/Beranda/riwayat-resep-kacamata",
              // },
            ],
          },
          {
            title: "Pendaftaran",
            key: "pendaftaranOptik",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Pendaftaran Pasien",
                href: "/Optik/pendaftaran-pasien-optik/add-pendaftaran-optik",
              },
            ],
          },
        ],
      },

      {
        pathname: "/farmasi",
        label: "Farmasi",
        key: "farmasi",
        icon: <RiMedicineBottleLine className="fs-4" />,
        menuFarmasi: [
          {
            title: "Beranda",
            key: "dashboardFarmasi",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Dashboard Farmasi",
                href: "/farmasi/Beranda/dashboard-farmasi",
              },
              {
                title: "Table Obat",
                href: "/farmasi/Beranda/table-obat",
              },
              {
                title: "Pengadaan Obat",
                href: "/farmasi/Beranda/pengadaan-obat",
              },
            ],
          },
          {
            title: "Pendaftaran",
            key: "pendaftaranFarmasi",
            icon: <RiFolderLine className="fs-4" />,
            subItems: [
              {
                title: "Pendaftaran Pasien",
                href: "/farmasi/pendaftaran-pasien",
              },
            ],
          },
        ],
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
