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

  const pksOptions = [
    {
      value: true,
      label: "Ya",
    },
    {
      value: false,
      label: "Tidak",
    },
  ];

  const formFields = [
    {
      section: "Data Asuransi",
      fields: [
        {
          type: "date",
          label: "Tanggal Dibuat",
          name: "createdate",
          colSize: 6,
          defaultValue: "2025-03-20",
          rules: { required: "Tanggal Dibuat harus diisi" },
        },
        {
          type: "text",
          label: "Nama Asuransi",
          name: "namaAsuransi",
          placeholder: "Masukkan Nama Asuransi...",
          colSize: 6,
          defaultValue: "",
          rules: { required: "Nama Asuransi harus diisi" },
        },
        {
          type: "text",
          label: "Jenis Asuransi",
          name: "jenisAsuransi",
          placeholder: "Masukkan Jenis Asuransi...",
          colSize: 6,
          defaultValue: "",
          rules: { required: "Jenis Asuransi harus diisi" },
        },
        {
          type: "text",
          label: "Kategori Asuransi",
          name: "kategoriAsuransi",
          placeholder: "Masukkan Kategori Asuransi...",
          colSize: 6,
          defaultValue: "",
          rules: { required: "Kategori Asuransi harus diisi" },
        },
        {
          type: "text",
          label: "Status Asuransi",
          name: "statusAsuransi",
          placeholder: "Masukkan Status Asuransi...",
          colSize: 6,
          defaultValue: "",
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
          defaultValue: "",
          rules: { required: "Tanggal Mulai Kerjasama harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Akhir Kerjasama",
          name: "tanggalAkhirKerjasama",
          colSize: 6,
          defaultValue: "",
          rules: { required: "Tanggal Akhir Kerjasama harus diisi" },
        },
        {
          type: "text",
          label: "RS Rekanan",
          name: "rsRekanan",
          colSize: 6,
          placeholder: "Masukkan RS Rekanan...",
          defaultValue: "",
          rules: { required: "Rekanan harus diisi" },
        },
        {
          type: "select",
          label: "PKS (Perjanjian Kerja Sama)",
          name: "isPKS",
          colSize: 6,
          defaultValue: true,
          options: pksOptions,
          rules: { required: "PKS harus dipilih" },
        },
        {
          type: "text",
          label: "Metode Klaim",
          name: "metodeKlaim",
          colSize: 6,
          placeholder: "Masukkan Metode Klaim...",
          defaultValue: "",
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
          type: "number", // Ubah dari number ke number untuk menghindari masalah konversi
          label: "Batas Maksimal Klaim Per Tahun",
          name: "batasMaxKlaimPerTahun",
          colSize: 6,

          rules: {
            required: "Batas maksimal klaim per tahun harus diisi",
            pattern: {
              value: /^[0-9]+$/,
              message: "Hanya angka yang diperbolehkan",
            },
          },
          placeholder: "Masukkan Batas Maksimal Klaim Per Tahun...",
        },
        {
          type: "number", // Ubah dari number ke number
          label: "Batas Maksimal Klaim Per Kunjungan",
          name: "batasMaxKlaimPerKunjungan",
          colSize: 6,

          rules: {
            required: "Batas maksimal klaim per kunjungan harus diisi",
            pattern: {
              value: /^[0-9]+$/,
              message: "Hanya angka yang diperbolehkan",
            },
          },
        },
      ],
    },
    {
      section: "Informasi Biaya Pertanggungan",
      fields: [
        {
          type: "text", // Ubah dari number ke text
          label: "Persentase Biaya Pertanggungan",
          name: "persentasiBiayaPertanggungan",
          placeholder: "Masukkan Persentase Biaya Pertanggungan...",
          colSize: 6,

          rules: {
            pattern: {
              value: /^[0-9]+$/,
              message: "Hanya angka yang diperbolehkan",
            },
          },
        },
        {
          type: "number", // Ubah dari number ke text
          label: "Tambahan Tanggungan",
          name: "tambahanTanggungan",
          placeholder: "Masukkan Tambahan Tanggungan...",
          colSize: 6,
          rules: {
            pattern: {
              value: /^[0-9]+$/,
              message: "Hanya angka yang diperbolehkan",
            },
          },
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
          defaultValue: "",
        },
        {
          type: "text",
          label: "Nama Bank",
          name: "namaBank",
          placeholder: "Masukkan Nama Bank...",
          colSize: 6,
          defaultValue: "",
        },
        {
          type: "text",
          label: "Term Of Payment",
          name: "termOfPayment",
          placeholder: "Masukkan Term Of Payment...",
          colSize: 6,
          defaultValue: "",
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
          defaultValue: "",
        },
        {
          type: "text",
          label: "No Telepon",
          name: "noTelepon",
          placeholder: "Masukkan No Telepon...",
          colSize: 6,
          defaultValue: "",
        },
        {
          type: "text",
          label: "Email Pusat",
          name: "emailPusat",
          placeholder: "Masukkan Email Pusat...",
          colSize: 6,
          defaultValue: "",
        },
      ],
    },
  ];

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
        backPath="/MasterData/master-asuransi/asuransi/daftar-asuransi"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default AsuransiEditForm;
