"use client";
import React, { Fragment, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "@/components/features/alert/custom-alert";
import { createAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";

const PendaftaranAsuransi = memo(() => {
  const dispatch = useDispatch();
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Asuransi",
          name: "kodeAsuransi",
          placeholder: "Masukkan Kode Asuransi...",
          colSize: 6,
          rules: { required: "Kode Asuransi harus diisi" },
        },
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
        {
          type: "date",
          label: "Tanggal Mulai Kerjasama",
          name: "tanggalMulaiKerjasama",
          placeholder: "Masukkan RS Rekanan...",

          colSize: 6,
          rules: { required: "Tanggal Mulai Kerjasama harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Akhir Kerjasama",
          name: "tanggalAkhirKerjasama",
          placeholder: "Masukkan RS Rekanan...",

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
          placeholder: "Masukkan Metode Klaim...",
          rules: { required: "Waktu Klaim harus diisi" },
        },
        {
          type: "text",
          label: "Dokumen Klaim",
          name: "dokumenKlaim",
          placeholder: "Masukkan Dokumen Klaim...",
          colSize: 6,
          rules: { required: "Batas maksimal klaim per tahun harus diisi" },
          placeholder: "Masukkan Batas maksimal klaim per tahun harus diisi...",
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
          rules: { required: "Batas maksimal klaim per tahun harus diisi" },
          placeholder: "Masukkan Batas Maksimal Klaim Per Kunjungan...",
        },

        {
          type: "text",
          label: "Layanan",
          name: "layanan",
          placeholder: "Masukkan Layanan...",
          colSize: 6,
          rules: { required: "Layanan harus diisi" },
        },
        {
          type: "number",
          label: "Persentase Biaya Pertanggungan",
          name: "persentasiBiayaPertanggungan",
          placeholder: "Masukkan Persentase Biaya Pertanggungan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Obat Ditanggung",
          name: "obatDitanggung",
          placeholder: "Masukkan Obat Ditanggung...",
          colSize: 6,
        },
        {
          type: "number",
          label: "Tambahan Tanggungan",
          name: "tambahanTanggungan",
          placeholder: "Masukkan Tambahan Tanggungan...",
          colSize: 6,
        },
        {
          type: "number",
          label: "Biaya Tidak Ditanggung",
          name: "biayaTidakDitanggung",
          placeholder: "Masukkan Biaya Tidak Ditanggung...",
          colSize: 6,
        },
        {
          type: "number",
          label: "Masa Tunggu",
          name: "masaTunggu",
          placeholder: "Masukkan Masa Tunggu...",
          colSize: 6,
        },
        {
          type: "number",
          label: "Maksimal Usia Pasien",
          name: "maxUsiaPasien",
          placeholder: "Masukkan Maksimal Usia Pasien...",
          colSize: 6,
        },
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
          label: "Nama Bank Cabang",
          name: "namaBankCabang",
          placeholder: "Masukkan Nama Bank Cabang...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Term Of Payment",
          name: "termOfPayment",
          placeholder: "Masukkan Term Of Payment...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Batas Waktu Pembayaran",
          name: "batasWaktuPembayaran",
          colSize: 6,
        },
        {
          type: "number",
          label: "Penalti Terlambat Bayar",
          name: "penaltiTerlambatBayar",
          placeholder: "Masukkan Penalti Terlambat Bayar...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Perusahaan Asuransi",
          name: "namaPerusahaanAsuransi",
          placeholder: "Masukkan Nama Perusahaan Asuransi...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Alamat Pusat",
          name: "alamatPusat",
          placeholder: "Masukkan Alamat Pusat...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Alamat Cabang",
          name: "alamatCabang",
          placeholder: "Masukkan Alamat Cabang...",
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
        {
          type: "text",
          label: "No Hotline Darurat",
          name: "noHotlineDarurat",
          placeholder: "Masukkan No Hotline Darurat...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Perwakilan",
          name: "namaPerwakilan",
          placeholder: "Masukkan Nama Perwakilan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "No Telepon Perwakilan",
          name: "noTeleponPerwakilan",
          placeholder: "Masukkan No Telepon Perwakilan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Email Perwakilan",
          name: "emailPerwakilan",
          placeholder: "Masukkan Email Perwakilan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Jabatan Perwakilan",
          name: "jabatanPerwakilan",
          placeholder: "Masukkan Jabatan Perwakilan...",
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
