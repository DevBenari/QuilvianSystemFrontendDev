"use client";
import React, { Fragment, memo, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "@/components/features/alert/custom-alert";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";
import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";

const PendaftaranAsuransi = memo(() => {
  const dispatch = useDispatch();
  const formFields = [
    {
      section: "Data Asuransi",
      fields: [
        {
          type: "date",
          label: "Tanggal Dibuat",
          name: "createdate",
          colSize: 6,
          rules: { required: "Tanggal Dibuat harus diisi" },
        },
        {
          type: "text",
          label: "Nama Asuransi",
          name: "namaAsuransi",
          placeholder: "Masukkan Nama Asuransi...",
          colSize: 6,
          rules: { required: "Nama Asuransi harus diisi" },
        },
        {
          type: "text",
          label: "Jenis Asuransi",
          name: "jenisAsuransi",
          placeholder: "Masukkan Jenis Asuransi...",
          colSize: 6,
          rules: { required: "Jenis Asuransi harus diisi" },
        },
        {
          type: "text",
          label: "Kategori Asuransi",
          name: "kategoriAsuransi",
          placeholder: "Masukkan Kategori Asuransi...",
          colSize: 6,
          rules: { required: "Kategori Asuransi harus diisi" },
        },
        {
          type: "text",
          label: "Status Asuransi",
          name: "statusAsuransi",
          placeholder: "Masukkan Status Asuransi...",
          colSize: 6,
          rules: { required: "Status Asuransi harus diisi" },
        },
      ],
    },
    {
      section: "Informasi Kerja Sama",
      fields: [
        {
          type: "date",
          label: "Tanggal Mulai Kerjasama",
          name: "tanggalMulaiKerjasama",
          colSize: 6,
          rules: { required: "Tanggal Mulai Kerjasama harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Akhir Kerjasama",
          name: "tanggalAkhirKerjasama",
          colSize: 6,
          rules: { required: "Tanggal Akhir Kerjasama harus diisi" },
        },
        {
          type: "text",
          label: "RS Rekanan",
          name: "rsRekanan",
          colSize: 6,
          placeholder: "Masukkan RS Rekanan...",
          rules: { required: "Rekanan harus diisi" },
        },
        {
          type: "cekbox",
          label: "PKS (Perjanjian Kerja Sama)",
          name: "isPKS",
          colSize: 6,
        },
        {
          type: "text",
          label: "Metode Klaim",
          name: "metodeKlaim",
          colSize: 6,
          placeholder: "Masukkan Metode Klaim...",
          rules: { required: "Metode Klaim harus diisi" },
        },
        {
          type: "date",
          label: "Waktu Klaim",
          name: "waktuKlaim",
          colSize: 6,
          rules: { required: "Waktu Klaim harus diisi" },
        },
        {
          type: "number",
          label: "Batas Maksimal Klaim Per Tahun",
          name: "batasMaxKlaimPerTahun",
          colSize: 6,
          rules: { required: "Batas maksimal klaim per tahun harus diisi" },
          placeholder: "Masukkan Batas Maksimal Klaim Per Tahun...",
        },
        {
          type: "number",
          label: "Batas Maksimal Klaim Per Kunjungan",
          name: "batasMaxKlaimPerKunjungan",
          colSize: 6,
          rules: {
            required: "Batas maksimal klaim per kunjungan harus diisi",
          },
          placeholder: "Masukkan Batas Maksimal Klaim Per Kunjungan...",
        },
      ],
    },
    {
      section: "Informasi Biaya Pertanggungan",
      fields: [
        {
          type: "number",
          label: "Persentase Biaya Pertanggungan",
          name: "persentasiBiayaPertanggungan",
          placeholder: "Masukkan Persentase Biaya Pertanggungan...",
          colSize: 6,
        },
        {
          type: "number",
          label: "Tambahan Tanggungan",
          name: "tambahanTanggungan",
          placeholder: "Masukkan Tambahan Tanggungan...",
          colSize: 6,
        },
      ],
    },
    {
      section: "Informasi Pembayaran",
      fields: [
        {
          type: "text",
          label: "No Rekening Rumah Sakit",
          name: "noRekRumahSakit",
          placeholder: "Masukkan No Rekening Rumah Sakit...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Bank",
          name: "namaBank",
          placeholder: "Masukkan Nama Bank...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Term Of Payment",
          name: "termOfPayment",
          placeholder: "Masukkan Term Of Payment...",
          colSize: 6,
        },
      ],
    },
    {
      section: "Informasi Perusahaan Asuransi",
      fields: [
        {
          type: "text",
          label: "Nama Perusahaan Asuransi",
          name: "namaPerusahaanAsuransi",
          placeholder: "Masukkan Nama Perusahaan Asuransi...",
          colSize: 6,
        },
        {
          type: "text",
          label: "No Telepon",
          name: "noTelepon",
          placeholder: "Masukkan No Telepon...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Email Pusat",
          name: "emailPusat",
          placeholder: "Masukkan Email Pusat...",
          colSize: 6,
        },
      ],
    },
  ];

  const handleSubmitWithApi = async (data) => {
    try {
      console.log("Form Data:", data);
      await dispatch(createAsuransi(data)).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        // router.push("/MasterData/master-asuransi/daftar-asuransi");
      });
    } catch (error) {
      console.error("Gagal menambahkan asuransi:", error);
      showAlert.error("Gagal menambahkan data asuransi");
    }
  };

  return (
    <Fragment>
      <DynamicStepForm
        title="Pendaftaran Pasien Asuransi"
        formConfig={formFields}
        onSubmit={handleSubmitWithApi}
        backPath="/MasterData/master-asuransi/asuransi/table-asuransi"
        isAddMode={true}
      />
    </Fragment>
  );
});

PendaftaranAsuransi.displayName = "PendaftaranAsuransi";
export default PendaftaranAsuransi;
