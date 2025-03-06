"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";

import useDepartementData from "@/lib/hooks/useDepartemen";
import {
  fetchSubPoliById,
  updateSubPoli,
  deleteSubPoli,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-slice/SubPoliSlice";

const EditSubPoliForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedSubPoli, loading } = useSelector((state) => state.SubPoli);

  const [dataSubPoli, setDataSubPoli] = useState(null);

  // Fetch data SubPoli berdasarkan ID
  useEffect(() => {
    dispatch(fetchSubPoliById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedSubPoli) {
      setDataSubPoli(selectedSubPoli);
    }
  }, [selectedSubPoli]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataSubPoli) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Submit form untuk update data

  // Konfigurasi Form Fields
  const formFields = [
    {
      fields: [
        {
          type: "select",
          label: "Poli",
          name: "poliId",
          options: [], // Harus diisi dengan daftar poli yang tersedia
          colSize: 6,
          rules: { required: "Poli harus dipilih" },
        },
        {
          type: "text",
          label: "Nama Sub Poli",
          name: "namaSubPoli",
          placeholder: "Masukkan Nama Sub Poli...",
          colSize: 6,
          rules: { required: "Nama Sub Poli harus diisi" },
        },
        {
          type: "text",
          label: "Deskripsi",
          name: "deskripsi",
          placeholder: "Masukkan Deskripsi...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Kepala Sub Poli",
          name: "kepalaSubPoli",
          placeholder: "Masukkan Nama Kepala Sub Poli...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Lokasi",
          name: "lokasi",
          placeholder: "Masukkan Lokasi...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Telepon",
          name: "telepon",
          placeholder: "Masukkan Nomor Telepon...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Email",
          name: "email",
          placeholder: "Masukkan Email...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Hari Operasional",
          name: "hariOperasional",
          placeholder: "Masukkan Hari Operasional...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Tanggal Buka",
          name: "jamBuka",
          colSize: 6,
          rules: { required: "Tanggal Buka harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Tutup",
          name: "jamTutup",
          colSize: 6,
          rules: { required: "Tanggal Tutup harus diisi" },
        },
        {
          type: "text",
          label: "Layanan Sub Poli",
          name: "layananSubPoli",
          placeholder: "Masukkan Layanan Sub Poli...",
          colSize: 6,
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      if (!dataSubPoli.subPoliId) {
        showAlert.error("Gagal memperbarui data: ID SubPoli tidak ditemukan.");
        return;
      }

      console.log("Data yang dikirim ke backend:", data);

      await dispatch(
        updateSubPoli({ id: dataSubPoli.subPoliId, data })
      ).unwrap();

      showAlert.success("Data SubPoli berhasil diperbarui!", () => {
        router.push("/MasterData/master-SubPoli/table-SubPoli");
      });
    } catch (error) {
      console.error("Gagal memperbarui data SubPoli", error);
      showAlert.error("Gagal memperbarui data SubPoli.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataSubPoli?.subPoliId) {
      showAlert.error("Gagal menghapus: ID SubPoli tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete("Data SubPoli akan dihapus permanen", async () => {
      try {
        await dispatch(deleteSubPoli(dataSubPoli.subPoliId)).unwrap();
        showAlert.success("Data SubPoli berhasil dihapus!", () => {
          router.push("/MasterData/master-SubPoli/table-SubPoli");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data SubPoli.");
      }
    });
  };

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataSubPoli?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data SubPoli"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataSubPoli}
        backPath="/MasterData/master-SubPoli/table-SubPoli"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditSubPoliForm;
