"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";

import {
  fetchJabatanById,
  updateJabatan,
  deleteJabatan,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/jabatanSlice";

const EditJabatanForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedJabatan, loading } = useSelector((state) => state.jabatan);

  const [dataJabatan, setDataJabatan] = useState(null);

  // Fetch data jabatan berdasarkan ID
  useEffect(() => {
    dispatch(fetchJabatanById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedJabatan) {
      setDataJabatan(selectedJabatan);
    }
  }, [selectedJabatan]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataJabatan) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Submit form untuk update data
  const handleSubmit = async (formData) => {
    try {
      if (!dataJabatan.jabatanId) {
        showAlert.error("Gagal memperbarui data: ID Jabatan tidak ditemukan.");
        return;
      }

      console.log("Data yang dikirim ke backend:", formData);

      await dispatch(
        updateJabatan({ id: dataJabatan.jabatanId, data: formData })
      ).unwrap();

      showAlert.success("Data Jabatan berhasil diperbarui!", () => {
        router.push("/MasterData/master-informasi/jabatan/table-jabatan");
      });
    } catch (error) {
      console.error("Gagal memperbarui data jabatan:", error);
      showAlert.error("Gagal memperbarui data jabatan.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataJabatan?.jabatanId) {
      showAlert.error("Gagal menghapus: ID Jabatan tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete("Data jabatan akan dihapus permanen", async () => {
      try {
        await dispatch(deleteJabatan(dataJabatan.jabatanId)).unwrap();
        showAlert.success("Data Jabatan berhasil dihapus!", () => {
          router.push("/MasterData/master-informasi/jabatan/table-jabatan");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data jabatan.");
      }
    });
  };

  // Konfigurasi Form Fields
  const formFields = [
    {
      section: "Informasi Jabatan",
      fields: [
        {
          type: "text",
          label: "Nama Jabatan",
          name: "namaJabatan",
          placeholder: "Masukkan Nama Jabatan...",
          colSize: 6,
          rules: { required: "Nama Jabatan wajib diisi" },
        },
      ],
    },
  ];

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataJabatan?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Jabatan"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataJabatan}
        backPath="/MasterData/master-informasi/jabatan/table-jabatan"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditJabatanForm;
