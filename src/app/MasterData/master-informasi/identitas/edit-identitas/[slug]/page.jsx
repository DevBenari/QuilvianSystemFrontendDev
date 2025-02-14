"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { showAlert } from "@/components/features/alert/custom-alert";
import {
  fetchIdentitasById,
  updateIdentitas,
  deleteIdentitas,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice";

const EditIdentitasForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedIdentitas } = useSelector((state) => state.identitas);
  const [dataIdentitas, setDataIdentitas] = useState(null);
  console.log("selectedIdentitas:", selectedIdentitas);
  // Fetch data saat komponen pertama kali dimuat
  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchIdentitasById(id));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedIdentitas) {
      setDataIdentitas(selectedIdentitas);
    }
  }, [selectedIdentitas]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataIdentitas) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Submit form untuk update data
  const handleSubmit = async (formData) => {
    try {
      if (!dataIdentitas.identitasId) {
        showAlert.error(
          "Gagal memperbarui data: Identitas ID tidak ditemukan."
        );
        return;
      }

      console.log("Data yang dikirim ke backend:", formData);

      await dispatch(
        updateIdentitas({ id: dataIdentitas.identitasId, data: formData })
      ).unwrap();

      showAlert.success("Data berhasil diperbarui!", () => {
        router.push("/MasterData/master-informasi/identitas/table-identitas");
      });
    } catch (error) {
      console.error("Gagal memperbarui data identitas:", error);
      showAlert.error("Gagal memperbarui data identitas.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataIdentitas?.identitasId) {
      showAlert.error("Gagal menghapus: Identitas ID tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete(
      "Data identitas akan dihapus permanen",
      async () => {
        try {
          await dispatch(deleteIdentitas(dataIdentitas.identitasId)).unwrap();
          showAlert.success("Data identitas berhasil dihapus!", () => {
            router.push("/MasterData/master-identitas/daftar-identitas");
          });
        } catch (error) {
          showAlert.error("Gagal menghapus data identitas.");
        }
      }
    );
  };

  // Konfigurasi Form Fields
  const formFields = [
    {
      section: "Informasi Identitas",
      fields: [
        {
          type: "text",
          label: "Jenis Identitas",
          name: "jenisIdentitas",
          placeholder: "Masukkan Jenis Identitas...",
          colSize: 6,
          rules: { required: "Jenis Identitas wajib diisi" },
        },
      ],
    },
  ];

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataIdentitas?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Identitas"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataIdentitas}
        backPath="/MasterData/master-informasi/identitas/table-identitas"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditIdentitasForm;
