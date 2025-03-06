"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deleteOperasi,
  fetchOperasiById,
  updateOperasi,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-operasi/OperasiSlice";

const EditOperasiForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedOperasi, loading } = useSelector((state) => state.Operasi);

  const [dataOperasi, setDataOperasi] = useState(null);

  // Fetch data Operasi berdasarkan ID
  useEffect(() => {
    dispatch(fetchOperasiById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedOperasi) {
      setDataOperasi(selectedOperasi);
    }
  }, [selectedOperasi]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataOperasi) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Submit form untuk update data

  // Konfigurasi Form Fields
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Jenis Operasi",
          name: "jenisOperasi",
          placeholder: "Masukkan Jenis Operasi...",
          colSize: 6,
          rules: { required: "Jenis Operasi harus diisi" },
        },
        {
          type: "text",
          label: "Tipe Operasi",
          name: "tipeOperasi",
          placeholder: "Masukkan Tipe Operasi...",
          colSize: 6,
          rules: { required: "Tipe Operasi harus diisi" },
        },
        {
          type: "text",
          label: "Nama Tindakan Operasi",
          name: "namaTindakanOperasi",
          placeholder: "Masukkan Nama Tindakan Operasi...",
          colSize: 6,
          rules: { required: "Nama Tindakan Operasi harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Operasi",
          name: "tanggalOperasi",
          colSize: 6,
          rules: { required: "Tanggal Operasi harus diisi" },
        },
        {
          type: "text",
          label: "Status Operasi",
          name: "statusOperasi",
          placeholder: "Masukkan Status Operasi...",
          colSize: 6,
          rules: { required: "Status Operasi harus diisi" },
        },
        {
          type: "text",
          label: "Lama Operasi",
          name: "lamaOperasi",
          placeholder: "Masukkan Lama Operasi...",
          colSize: 6,
          rules: { required: "Lama Operasi harus diisi" },
        },
        {
          type: "text",
          label: "Ruangan Operasi",
          name: "ruanganOperasi",
          placeholder: "Masukkan Ruangan Operasi...",
          colSize: 6,
          rules: { required: "Ruangan Operasi harus diisi" },
        },
        {
          type: "text",
          label: "Lokasi Ruangan Operasi",
          name: "lokasiRuanganOperasi",
          placeholder: "Masukkan Lokasi Ruangan Operasi...",
          colSize: 6,
          rules: { required: "Lokasi Ruangan Operasi harus diisi" },
        },
        {
          type: "select",
          label: "Tipe CCVC",
          name: "tipeCCVC",
          options: [
            { value: true, label: "Ya" },
            { value: false, label: "Tidak" },
          ],
          colSize: 6,
          rules: { required: "Pilih Tipe CCVC" },
        },
        {
          type: "text",
          label: "Catatan Medis",
          name: "catatanMedis",
          placeholder: "Masukkan Catatan Medis...",
          colSize: 6,
          rules: { required: "Catatan Medis harus diisi" },
        },
        {
          type: "text",
          label: "Nama Dokter Operator",
          name: "namaDokterOperator",
          placeholder: "Masukkan Nama Dokter Operator...",
          colSize: 6,
          rules: { required: "Nama Dokter Operator harus diisi" },
        },
        {
          type: "text",
          label: "Nama Dokter Anestesi",
          name: "namaDokterAnestesi",
          placeholder: "Masukkan Nama Dokter Anestesi...",
          colSize: 6,
          rules: { required: "Nama Dokter Anestesi harus diisi" },
        },
        {
          type: "text",
          label: "Dokter Tambahan 1",
          name: "dokterTambahan1",
          placeholder: "Masukkan Nama Dokter Tambahan 1...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Dokter Tambahan 2",
          name: "dokterTambahan2",
          placeholder: "Masukkan Nama Dokter Tambahan 2...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Dokter Tambahan 3",
          name: "dokterTambahan3",
          placeholder: "Masukkan Nama Dokter Tambahan 3...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Dokter Tambahan 4",
          name: "dokterTambahan4",
          placeholder: "Masukkan Nama Dokter Tambahan 4...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Dokter Tambahan 5",
          name: "dokterTambahan5",
          placeholder: "Masukkan Nama Dokter Tambahan 5...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Pasien ID",
          name: "pasienId",
          placeholder: "Masukkan ID Pasien...",
          colSize: 6,
          rules: { required: "ID Pasien harus diisi" },
        },
        {
          type: "text",
          label: "Nama Pasien",
          name: "namaPasien",
          placeholder: "Masukkan Nama Pasien...",
          colSize: 6,
          rules: { required: "Nama Pasien harus diisi" },
        },
        {
          type: "text",
          label: "Keluhan Operasi",
          name: "keluhanOperasi",
          placeholder: "Masukkan Keluhan Operasi...",
          colSize: 6,
          rules: { required: "Keluhan Operasi harus diisi" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      if (!dataOperasi.operasiId) {
        showAlert.error("Gagal memperbarui data: ID Operasi tidak ditemukan.");
        return;
      }

      console.log("Data yang dikirim ke backend:", data);

      await dispatch(
        updateOperasi({ id: dataOperasi.operasiId, data })
      ).unwrap();

      showAlert.success("Data Operasi berhasil diperbarui!", () => {
        router.push("/MasterData/master-departement/table-departement");
      });
    } catch (error) {
      console.error("Gagal memperbarui data Operasi", error);
      showAlert.error("Gagal memperbarui data Operasi.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataOperasi?.operasiId) {
      showAlert.error("Gagal menghapus: ID Operasi tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete("Data Operasi akan dihapus permanen", async () => {
      try {
        await dispatch(deleteOperasi(dataOperasi.operasiId)).unwrap();
        showAlert.success("Data Operasi berhasil dihapus!", () => {
          router.push("/MasterData/master-departement/table-departement");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data Operasi.");
      }
    });
  };

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataOperasi?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Operasi"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataOperasi}
        backPath="/MasterData/master-departement/table-departement"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditOperasiForm;
