"use client";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm";
import React, { memo, useState } from "react";
import { addPromo } from "@/lib/hooks/masterData/admisi/keanggotaan/add";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { useForm } from "react-hook-form";
import dataWilayah from "@/utils/dataWilayah";
import UseSelectWilayah from "@/lib/hooks/useSelectWilayah";
import { pemeriksaRadiologi } from "@/utils/dataTindakan";
import TableTindakan from "@/components/features/tindakanTable/tindakantTable";
const PendaftaranRadiologi = memo(() => {
  const router = useRouter();
  const [handleSelectedOption, setHandleSelectedOption] = useState(null);

  const handleRadioChange = (value) => {
    setHandleSelectedOption(value);
  };

  const handleSelectChange = (value) => {
    setHandleSelectedOption(value);
  };

  const { setValue } = useForm();
  // fungsi untuk melakukan select provinsi
  const {
    pasienSelectedProvinsi,
    pasienFilteredKabupaten,
    pasienFilteredKecamatan,
    pasienFilteredKelurahan,
    handleChange,
  } = UseSelectWilayah(setValue, dataWilayah);

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "noRegistrasi",
          label: "No Registrasi",
          name: "noRegistrasi",
          placeholder: "No Registrasi",
          rules: { required: "No Registrasi is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "noRekamMedis",
          label: "No Rekam Medis",
          name: "noRekamMedis",
          placeholder: "No Rekam Medis",
          rules: { required: "No Rekam Medis is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaPasien",
          label: "Nama Pasien",
          name: "namaPasien",
          placeholder: "Nama Pasien",
          rules: { required: "Nama Pasien is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "nomorHP",
          label: "Nomor HP",
          name: "nomorHP",
          placeholder: "Nomor HP",
          rules: { required: "Nomor HP is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tglLahir",
          label: "Tanggal Lahir",
          name: "tglLahir",
          rules: { required: "Tanggal Lahir is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "jenisKelamin",
          label: "Jenis Kelamin",
          name: "jenisKelamin",
          placeholder: "Jenis Kelamin",
          options: [
            { label: "Laki-laki", value: "laki-laki" },
            { label: "Perempuan", value: "perempuan" },
          ],
          rules: { required: "Jenis Kelamin is required" },

          colSize: 6,
        },
        {
          type: "email",
          id: "email",
          label: "Email",
          name: "email",
          placeholder: "Email",
          rules: {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Masukkan email yang valid",
            },
          },
          colSize: 6,
        },
        {
          type: "textarea",
          id: "alamatRumah",
          label: "Alamat Rumah",
          name: "alamatRumah",
          placeholder: "Alamat Rumah",
          rules: { required: "Alamat Rumah is required" },
          colSize: 12,
        },
        {
          type: "select",
          id: "pasien_provinsi",
          label: "Provinsi Pasien",
          name: "pasien_provinsi",
          placeholder: "Pilih Provinsi",
          options: dataWilayah.map((item) => ({
            label: item.provinsi,
            value: item.provinsi,
          })),
          rules: { required: "Provinsi is required" },
          colSize: 6,
          onChangeCallback: (value) => handleChange("provinsi", value),
        },
        {
          type: "select",
          id: "pasien_kabupaten",
          label: "Kabupaten Pasien",
          name: "pasien_kabupaten",
          placeholder: "Pilih Kabupaten",
          options: pasienFilteredKabupaten.map((item) => ({
            label: item.nama,
            value: item.nama,
          })),
          rules: { required: "Kabupaten is required" },
          colSize: 6,
          onChangeCallback: (value) => handleChange("kabupaten", value),
        },
        {
          type: "select",
          id: "pasien_kecamatan",
          label: "Kecamatan Pasien",
          name: "pasien_kecamatan",
          placeholder: "Pilih Kecamatan",
          options: pasienFilteredKecamatan.map((item) => ({
            label: item.nama,
            value: item.nama,
          })),
          rules: { required: "Kecamatan is required" },
          colSize: 6,
          onChangeCallback: (value) => handleChange("kecamatan", value),
        },
        {
          type: "select",
          id: "pasien_kelurahan",
          label: "Kelurahan Pasien",
          name: "pasien_kelurahan",
          placeholder: "Pilih Kelurahan",
          options: pasienFilteredKelurahan.map((item) => ({
            label: item,
            value: item,
          })),
          rules: { required: "Kelurahan is required" },
          colSize: 6,
          onChangeCallback: (value) => handleChange("kelurahan", value),
        },
      ],
    },
    {
      // section: "Detail Konsultasi",
      fields: [
        {
          type: "select",
          id: "penjamin",
          label: "Tipe Pasien",
          name: "penjamin",
          placeholder: "Penjamin",
          options: [
            { label: "Umum", value: "umum" },
            { label: "Penjamin", value: "penjamin" },
          ],
          rules: { required: "Penjamin is required" },
          colSize: 8,
        },
        {
          type: "select",
          id: "tipepenjamin",
          name: "tipePenjamin",
          hide: (watchValues) => watchValues.penjamin !== "penjamin",

          label: "Tipe penjamin",
          placeholder: "Penjamin",
          options: [
            { label: "BPJS", value: "bpjs" },
            { label: "Non BPJS", value: "non-bpjs" },
          ],
          rules: { required: "Penjamin is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tglRegistrasi",
          label: "Tanggal Registrasi",
          name: "tglRegistrasi",
          rules: { required: "Tanggal Registrasi is required" },
          colSize: 6,
        },
      ],
    },
    {
      section: "Dirujuk",
      fields: [
        {
          type: "select",
          id: "dirujuk",
          name: "dirujuk",
          placeholder: "Pilih Rujukan",
          options: [
            { label: "Konsul", value: "konsul" },
            { label: "Luar RS", value: "luarRs" },
            {
              label: "Atas Permintaan Sendiri",
              value: "atasPermintaanSendiri",
            },
          ],
          colSize: 8,
          className: "mb-3",
        },
        {
          type: "select",
          id: "dokterPemeriksa",
          name: "dokterPemeriksa",
          label: "Dokter Pemeriksa",
          placeholder: "Pilih Dokter",
          options: [
            { label: "Dr. Sarah Johnson", value: "dr_sarah_johnson" },
            { label: "Dr. Michael Brown", value: "dr_michael_brown" },
            { label: "Dr. Emily Davis", value: "dr_emily_davis" },
            { label: "Dr. John Smith", value: "dr_john_smith" },
            { label: "Dr. Emma Wilson", value: "dr_emma_wilson" },
          ],
          hide: (watchValues) => watchValues.dirujuk !== "konsul", // Tampilkan hanya untuk "konsul"
          colSize: 6,
          className: "mb-3",
        },
        {
          type: "select",
          id: "tipeRs",
          name: "tipeRs",
          label: "Tipe RSU/RS/RB",
          placeholder: "Pilih Tipe RSU/RS/RB",
          options: [
            { label: "Puskesmas", value: "puskesmas" },
            { label: "Dr/Drg", value: "dr_drg" },
            { label: "Maramedik", value: "maramedik" },
          ],
          hide: (watchValues) => watchValues.dirujuk !== "luarRs", // Tampilkan hanya untuk "luarRs"
          colSize: 6,
        },
        {
          type: "text",
          id: "namaLuarRs",
          name: "namaLuarRs",
          label: "Nama",
          placeholder: "Masukkan Nama",
          hide: (watchValues) => watchValues.dirujuk !== "luarRs", // Tampilkan hanya untuk "luarRs"
          colSize: 6,
        },
        {
          type: "text",
          id: "teleponLuarRs",
          name: "teleponLuarRs",
          label: "Nomor Telepon",
          placeholder: "Masukkan Nomor Telepon",
          hide: (watchValues) => watchValues.dirujuk !== "luarRs", // Tampilkan hanya untuk "luarRs"
          colSize: 6,
          className: "mb-3",
        },
      ],
    },
    {
      // section: "Kode Member",
      fields: [
        {
          type: "select",
          id: "pilihPromoo",
          label: "Pilih Promo",
          name: "pilihPromoo",
          placeholder: "Pilih Promo",
          options: [
            { label: "Voucher Potongan", value: "voucher_potongan" },
            { label: "RS MMC Dokter", value: "rs_mmc_dokter" },
            { label: "RS MMC Tunai (10%)", value: "rs_mmc_tunai" },
            { label: "VIP BKM Tanpa Part", value: "vip_bkm" },
          ],
          rules: { required: "Pilih Promo is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipePemeriksaan",
          label: "Tipe Pemeriksaan",
          name: "tipePemeriksaan",
          placeholder: "Pilih Tipe Pemeriksaan",
          options: [
            { label: "Patologi Klinik", value: "patologi_klinik" },
            { label: "Patologi Anatomi", value: "patologi_anatomi" },
            { label: "Mikrobiologi", value: "mikrobiologi" },
          ],
          rules: { required: "Tipe Pemeriksaan is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "suratRujukan",
          label: "Surat Rujukan",
          name: "suratRujukan",
          placeholder: "Pilih Surat Rujukan",
          options: [
            { label: "Ada", value: "Ada" },
            { label: "Tidak Ada", value: "Tidak Ada" },
          ],
          rules: { required: "Surat Rujukan is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tglSampling",
          label: "Tanggal Sampling",
          name: "tglSampling",
          rules: { required: "Tanggal Sampling is required" },
          colSize: 3,
        },
        {
          type: "time",
          id: "timeSampling",
          label: "Jam",
          name: "timeSampling",
          rules: { required: "time Sampling is required" },
          colSize: 3,
        },
        {
          type: "textarea",
          id: "diagnosaAwal",
          label: "Diagnosa Awal",
          name: "diagnosaAwal",
          placeholder: "Diagnosa Awal",
          rules: { required: "Diagnosa Awal is required" },
          colSize: 12,
        },
      ],
    },
    {
      section: "Pemeriksaan Radiologi",
      fields: [
        {
          type: "custom",
          customRender: () => <TableTindakan tindakan={pemeriksaRadiologi} />,
          colSize: 12,
        },
      ],
    },
    {
      fields: [
        {
          type: "table",
          id: "tableTindakan",
          label: "Table Tindakan",
          name: "tableTindakan",
          columns: ["Pemeriksaan Lab", "Jumlah", "Action"],
          rules: { required: "Table Tindakan is required" },
          colSize: 12,
        },
        {
          type: "select",
          id: "dokterPemeriksa",
          label: "Dokter Pemeriksa",
          name: "dokterPemeriksa",
          placeholder: "Pilih Dokter",
          options: [
            { label: "Dr. Sarah Johnson", value: "dr_sarah_johnson" },
            { label: "Dr. Michael Brown", value: "dr_michael_brown" },
            { label: "Dr. Emily Davis", value: "dr_emily_davis" },
            { label: "Dr. John Smith", value: "dr_john_smith" },
            { label: "Dr. Emma Wilson", value: "dr_emma_wilson" },
          ],
          rules: { required: "Dokter Pemeriksa is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "pemeriksaanTestCito",
          label: "Pemeriksaan Test Cito",
          name: "pemeriksaanTestCito",
          placeholder: "Pilih Pemeriksaan Test Cito",
          options: [
            { label: "Ya", value: "ya" },
            { label: "Tidak ", value: "tidak " },
          ],
          rules: { required: "pemeriksaan Test Cito is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "cetakkartu",
          label: "Cetak Kartu",
          name: "cetakkartu",
          placeholder: "Pilih Cetak Kartu",
          options: [
            { label: "Ya", value: "ya" },
            { label: "Tidak ", value: "tidak " },
          ],
          rules: { required: "Cetak Kartu is required" },
          colSize: 6,
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      const response = await addPromo(data);
      alert("Promo added successfully!");
      router.push("/pendaftaran");
    } catch (error) {
      console.error(error);
      alert("Failed to add promo.");
    }
  };
  return (
    <div>
      <DynamicForm
        title="Registrasi Radiologi"
        formConfig={formFields}
        onSubmit={handleSubmit}
        url="/pendaftaran/pasien-luar-radiologi"
      />
    </div>
  );
});
PendaftaranRadiologi.displayName = "PendaftaranRadiologi";
export default PendaftaranRadiologi;
