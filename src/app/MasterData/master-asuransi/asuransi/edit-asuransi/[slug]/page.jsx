"use client";
import React, { useEffect, useState, Fragment, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deleteAsuransi,
  fetchAsuransiById,
  updateAsuransi,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";

const AsuransiEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Local state untuk data Asuransi
  const [dataAsuransi, setDataAsuransi] = useState([]);

  // Mengambil data dari Redux store
  const { selectedAsuransi, loading, error } = useSelector(
    (state) => state.Asuransi
  );

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchAsuransiById(id));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedAsuransi) {
      setDataAsuransi(selectedAsuransi);
    }
  }, [selectedAsuransi]);

  console.log("data Asuransi : ", dataAsuransi);

  const handleSubmit = async (formData) => {
    try {
      await dispatch(
        updateAsuransi({ id: selectedAsuransi.asuransiId, data: formData })
      ).unwrap();
      showAlert.success("Data berhasil diperbarui", () => {
        router.push("/MasterData/master-asuransi/daftar-asuransi");
      });
    } catch (error) {
      showAlert.error("Gagal memperbarui data asuransi.");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete("Yakin ingin menghapus?", async () => {
      try {
        await dispatch(deleteAsuransi(selectedAsuransi.asuransiId)).unwrap();
        showAlert.success("Data berhasil dihapus!", () => {
          router.push("/MasterData/master-asuransi/daftar-asuransi");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data asuransi.");
      }
    });
  };
  // Konfigurasi Form Fields
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

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataAsuransi?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Asuransi"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataAsuransi}
        backPath="/MasterData/master-asuransi/daftar-asuransi"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default AsuransiEditForm;
