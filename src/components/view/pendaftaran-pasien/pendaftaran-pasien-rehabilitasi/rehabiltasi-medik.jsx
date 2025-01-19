"use client";
import FormValidations from "@/components/features/formValidations/formValidations";

import React, { Fragment, useState, useEffect, useCallback } from "react";

import dataWilayah from "@/utils/dataWilayah";
import DynamicForm from "@/components/features/dynamicFormAnimasi/dynamicFormAnimasi";

export default function PendaftaranRehabilitasiMedik() {
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
          type: "text",
          id: "nomorTlpn",
          label: "Nomor Telepon",
          name: "nomorTlpn",
          placeholder: "Nomor Telepon",
          rules: { required: "Nomor Telepon is required" },
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
      ],
    },
    {
      section: "Detatil Konsultasi ",
      fields: [
        {
          type: "select",
          id: "penjamin",
          label: "Tipe Pasien",
          name: "penjamin",
          placeholder: "Tipe Penjamin",
          options: [
            { label: "Umum", value: "umum" },
            { label: "Penjamin", value: "penjamin" },
          ],
          rules: { required: "Penjamin is required" },
          colSize: 6,
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
        {
          type: "select",
          id: "tindakanMedik",
          name: "tindakanMedik",
          label: "Daftar Tindakan Rehabilitasi Medik",
          placeholder: "Daftar Tindakan Rehabilitasi Medik",
          options: [
            { label: "jasa suntik", value: "jasaSuntik" },
            { label: "jasa medik", value: "jasaMedik" },
            { label: "latihan ambulasi", value: "latihanAmbulasi" },
            { label: "latihan lingkup gerak", value: "latihanLingkupGerak" },
          ],
          rules: { required: "Daftar Tindakan Rehabilitasi Medik is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "dokterPemeriksa",
          label: "Dokter Pemeriksa",
          name: "dokterPemeriksa",
          placeholder: "Dokter Pemeriksa",
          options: [
            { label: "Dr. Sarah Johnson", value: "dr_sarah_johnson" },
            { label: "Dr. Michael Brown", value: "dr_michael_brown" },
            { label: "Dr. Emily Davis", value: "dr_emily_davis" },
            { label: "Dr. John Smith", value: "dr_john_smith" },
            { label: "Dr. Emma Wilson", value: "dr_emma_wilson" },
          ],
          rules: { required: "Dokter Lab is required" },
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
          label: "Pilih Rujukan",
          placeholder: "Pilih Rujukan",
          options: [
            { label: "Konsul", value: "konsul" },
            { label: "Luar RS", value: "luarRs" },
            {
              label: "Atas Permintaan Sendiri",
              value: "atasPermintaanSendiri",
            },
          ],
          colSize: 12,
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

        {
          type: "select",
          id: "suratRujukan",
          label: "Surat Rujukan",
          name: "suratRujukan",
          placeholder: "Surat Rujukan",
          options: [
            { label: "Ada", value: "Ada" },
            { label: "Tidak Ada", value: "Tidak Ada" },
          ],
          rules: { required: "Surat Rujukan is required" },
          colSize: 6,
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
  ];

  const handleSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Fragment>
      <DynamicForm
        title="Registrasi Rehabilitasi Medik"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
}
