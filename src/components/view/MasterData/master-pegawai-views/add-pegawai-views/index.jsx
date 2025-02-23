"use client";

import React, { Fragment, memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { useForm } from "react-hook-form";
import dataWilayah from "@/utils/dataWilayah";
import UseSelectWilayah from "@/lib/hooks/useSelectWilayah";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { addPegawai } from "@/lib/hooks/masterData/master-pegawai";
import ReusableAlert from "@/components/ui/reusable-alert";

const FormAddPegawai = memo(() => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("success");
  const router = useRouter();
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

          label: "Nama Pasien",
          name: "namaLengkap",
          placeholder: "Nama Pasien",
          rules: { required: "Nama Pasien is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "noIdentitas",
          label: "No Identitas / KTP",
          name: "noIdentitas",
          placeholder: "Enter No Identitas / KTP",
          rules: { required: "No Identitas / KTP is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "nik",
          label: "Nomer Identitas Keluarga / NIK",
          name: "nik",
          placeholder: "NIK",
          rules: { required: "NIK is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "tempatLahir",
          label: "Tempat Lahir",
          name: "tempatLahir",
          placeholder: "Tempat Lahir",
          rules: { required: "Tempat Lahir is required" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalLahir",
          label: "Tanggal Lahir",
          name: "tanggalLahir",
          placeholder: "Tanggal Lahir",
          rules: { required: "Tanggal Lahir is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaKeluarga",
          label: "Nama Keluarga",
          name: "namaKeluarga",
          placeholder: "Nama Keluarga",
          rules: { required: "Nama Keluarga is required" },
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
          type: "select",
          id: "agama",
          label: "Agama",
          name: "agama",
          placeholder: "Agama",
          options: [
            { label: "Islam", value: "Islam" },
            { label: "Kristen", value: "Kristen" },
            { label: "Katolik", value: "Katolik" },
            { label: "Hindu", value: "Hindu" },
            { label: "Buddha", value: "Buddha" },
            { label: "Konghucu", value: "Konghucu" },
          ],
          rules: { required: "Agama is required" },
          colSize: 6,
        },
        {
          type: "radio",
          id: "kewarganegaraan",
          label: "Kewarganegaraan",
          name: "kewarganegaraan",
          options: [
            { label: "WNI", value: "WNI" },
            { label: "WNA", value: "WNA" },
          ],
          rules: { required: "Agama is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "negara",
          label: "Negara",
          name: "negara",
          placeholder: "Negara",
          options: [
            { label: "Amerika", value: "Amerika" },
            { label: "Malaysia", value: "Malaysia" },
            { label: "Singapura", value: "Singapura" },
            { label: "Jepang", value: "Jepang" },
            { label: "Spanyol", value: "Spanyol" },
            { label: "Italia", value: "Italia" },
          ],
          rules: { required: "Negara is required" },
          colSize: 6,
          hide: (watchValues) => watchValues.kewarganegaraan !== "WNA",
        },
        {
          type: "select",
          id: "pendidikanTerakhir",
          label: "Pendidikan Terakhir",
          name: "pendidikanTerakhir",
          placeholder: "Pendidikan Terakhir",
          options: [
            { label: "SD", value: "SD" },
            { label: "SMP", value: "SMP" },
            { label: "SMA", value: "SMA" },
            { label: "S1", value: "S1" },
            { label: "S2", value: "S2" },
            { label: "S3", value: "S3" },
          ],
          rules: { required: "Pendidikan Terakhir is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "nomorHP",
          label: "No Telepon",
          name: "nomorHP",
          placeholder: "No Telepon",
          rules: { required: "No Telepon is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "pekerjaan",
          label: "Pekerjaan",
          name: "pekerjaan",
          placeholder: "Pekerjaan",
          rules: { required: "Pekerjaan is required" },
          colSize: 6,
        },
        // {
        //   type: "select",
        //   id: "tenagaKesehatan",
        //   label: "Tenaga Medis/Non-Medis",
        //   name: "tenagaKesehatan",
        //   placeholder: "Pilih Tenaga Medis/Non-Medis",
        //   options: [
        //     { label: "Tenaga Medis", value: "Tenaga Medis" },
        //     { label: "Non-Medis", value: "Non-Medis" },
        //   ],
        //   rules: { required: "Tenaga Medis/Non-Medis is required" },
        //   colSize: 6,
        // },
      ],
    },
    {
      section: "Alamat Pegawai",
      fields: [
        {
          type: "textarea",
          id: "informasiAlamat",
          label: "Alamat Domisili Pegawai",
          name: "informasiAlamat",
          placeholder: "Alamat",
          rules: { required: "Alamat is required" },
          colSize: 12,
        },
        // {
        //   type: "select",
        //   id: "pasien_provinsi",
        //   label: "Provinsi Pasien",
        //   name: "pasien_provinsi",
        //   placeholder: "Pilih Provinsi",
        //   options: dataWilayah.map((item) => ({
        //     label: item.provinsi,
        //     value: item.provinsi,
        //   })),
        //   rules: { required: "Provinsi is required" },
        //   colSize: 6,
        //   onChangeCallback: (value) =>
        //     handleChange("pasien", "provinsi", value),
        // },
        // {
        //   type: "select",
        //   id: "kabupatenKeluarga",
        //   label: "Kabupaten Pasien",
        //   name: "kabupatenKeluarga",
        //   placeholder: "Pilih Kabupaten",
        //   options: pasienFilteredKabupaten.map((item) => ({
        //     label: item.nama,
        //     value: item.nama,
        //   })),
        //   rules: { required: "Kabupaten is required" },
        //   colSize: 6,
        //   onChangeCallback: (value) =>
        //     handleChange("pasien", "kabupaten", value),
        // },
        // {
        //   type: "select",
        //   id: "kecamatan",
        //   label: "Kecamatan Pasien",
        //   name: "kecamatan",
        //   placeholder: "Pilih Kecamatan",
        //   options: pasienFilteredKecamatan.map((item) => ({
        //     label: item.nama,
        //     value: item.nama,
        //   })),
        //   rules: { required: "Kecamatan is required" },
        //   colSize: 6,
        //   onChangeCallback: (value) =>
        //     handleChange("pasien", "kecamatan", value),
        // },
        // {
        //   type: "select",
        //   id: "kelurahan",
        //   label: "Kelurahan Pasien",
        //   name: "kelurahan",
        //   placeholder: "Pilih Kelurahan",
        //   options: pasienFilteredKelurahan.map((item) => ({
        //     label: item,
        //     value: item,
        //   })),
        //   rules: { required: "Kelurahan is required" },
        //   colSize: 6,
        // },
        // {
        //   type: "text",
        //   id: "kodePos",
        //   label: "Kode Pos",
        //   name: "kodePos",
        //   placeholder: "Kode Pos",
        //   rules: { required: "Kode Pos is required" },
        //   colSize: 6,
        // },
      ],
    },
    {
      section: "Deskripsi Pekerjaan",
      fields: [
        {
          type: "text",
          id: "title",
          label: "Title",
          name: "title",
          placeholder: "Title",
          rules: { required: "Title is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "departemen",
          label: "departemen",
          name: "departemen",
          placeholder: "departemen",
          options: [
            { label: "Farmasi", value: "farmasi" },
            { label: "Gizi", value: "gizi" },
            { label: "Radiologi", value: "radiologi" },
            { label: "Laboratorium", value: "laboratorium" },
            { label: "Bedah", value: "bedah" },
            { label: "Rawat Inap", value: "rawatInap" },
            { label: "Poli Anak", value: "poliAnak" },
            { label: "Poli Penyakit Dalam", value: "poliPenyakitDalam" },
          ],
          rules: { required: "Departement is required" },
          colSize: 6,
        },
        // {
        //   type: "text",
        //   id: "jenisKontrak",
        //   label: "Jenis Kontrak",
        //   name: "jenisKontrak",
        //   placeholder: "Jenis Kontrak",
        //   rules: { required: "Jenis Kontrak is required" },
        //   colSize: 6,
        // },
        // {
        //   type: "date",
        //   id: "tanggalMasuk",
        //   label: "Tanggal Masuk",
        //   name: "tanggalMasuk",
        //   placeholder: "Tanggal Masuk",
        //   rules: { required: "Tanggal Masuk is required" },
        //   colSize: 6,
        // },
        // {
        //   type: "date",
        //   id: "tanggalKeluar",
        //   label: "Tanggal Keluar",
        //   name: "tanggalKeluar",
        //   placeholder: "Tanggal Keluar",
        //   rules: { required: "Tanggal Keluar is required" },
        //   colSize: 6,
        // },
        // {
        //   type: "date",
        //   id: "tanggalAwalKontrak",
        //   label: "Tanggal Awal Kontrak",
        //   name: "tanggalAwalKontrak",
        //   placeholder: "Tanggal Awal Kontrak",
        //   rules: { required: "Tanggal Awal Kontrak is required" },
        //   colSize: 6,
        // },
        // {
        //   type: "date",
        //   id: "tanggalAkhirKontrak",
        //   label: "Tanggal Akhir Kontrak",
        //   name: "tanggalAkhirKontrak",
        //   placeholder: "Tanggal Akhir Kontrak",
        //   rules: { required: "Tanggal Akhir Kontrak is required" },
        //   colSize: 6,
        // },
        // {
        //   type: "text",
        //   id: "asuransi",
        //   label: "Asuransi",
        //   name: "asuransi",
        //   placeholder: "Asuransi",
        //   rules: { required: "Asuransi is required" },
        //   colSize: 6,
        // },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    // Lengkapi data dengan field yang wajib dari backend
    const payload = {
      ...data,
      alamatDomisili: data.alamatDomisili || "Alamat tidak tersedia",
      alamatKantor: data.alamatKantor || "Alamat kantor tidak tersedia",
      alamatKeluarga: data.alamatKeluarga || "Alamat keluarga tidak tersedia",
      dataKaryawanInput: "Input dari frontend",
      email: data.email || "email@example.com",

      hubunganKeluarga: data.hubunganKeluarga || "Tidak ada",
      jenisIdentitas: data.jenisIdentitas || "KTP",
      kabupatenKeluarga: data.kabupatenKeluarga || "Kabupaten",
      kecamatan: data.kecamatan || "Kecamatan",
      kelurahan: data.kelurahan || "Kelurahan",
      kelurahanKeluarga: data.kelurahanKeluarga || "Kelurahan keluarga",
      namaAyah: data.namaAyah || "Nama Ayah",
      namaIbu: data.namaIbu || "Nama Ibu",
      namaKantor: data.namaKantor || "Nama Kantor",
      namaSutri: data.namaSutri || "Nama Suami/Istri",
      noPenjamin: data.noPenjamin || "Nomor Penjamin",
      noRekamMedis: data.noRekamMedis || "12345",
      nomorKeluargaTerdekat: data.nomorKeluargaTerdekat || "081234567890",
      nomorKtpKeluarga: data.nomorKtpKeluarga || "123456789",
      nomorTeleponKantor: data.nomorTeleponKantor || "021123456",
      nomorTeleponKeluarga: data.nomorTeleponKeluarga || "081234567890",
      suku: data.suku || "Jawa",
      foto: data.foto || "Ganteng",
      userActiveCode: data.userActiveCode || "User12345",
    };

    try {
      console.log("Data yang akan dikirim:", payload);

      const response = await addPegawai(payload);
      setAlertMessage("Pegawai added successfully!");
      setAlertVariant("success");
    } catch (error) {
      if (error.response) {
        console.error("Response error status:", error.response.status);
        console.error("Response error data:", error.response.data);
      } else {
        console.error("Unknown error:", error.message);
      }

      setAlertMessage("Failed to add pegawai.");
      setAlertVariant("danger");
    }
  };

  const validateFormData = (data, fields) => {
    const errors = [];
    fields.forEach((section) => {
      section.fields.forEach((field) => {
        const { name, label, rules } = field; // Ganti id dengan name
        const value = data[name]; // Ambil value berdasarkan name

        if (rules?.required && (!value || value.trim() === "")) {
          errors.push(`${label} harus diisi`);
        }

        if (rules?.pattern && !rules.pattern.test(value)) {
          errors.push(`${label} tidak valid`);
        }
      });
    });
    return errors;
  };

  return (
    <Fragment>
      <ReusableAlert
        message={alertMessage}
        variant={alertVariant}
        onClose={() => setAlertMessage(null)}
        autoClose={alertVariant === "success" ? 2000 : null}
      />
      <DynamicForm
        title="Tambah Data Pegawai"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-pegawai/daftar-pegawai"
        isAddMode={true}
      />
    </Fragment>
  );
});

FormAddPegawai.displayName = "FormAddPegawai";
export default FormAddPegawai;
