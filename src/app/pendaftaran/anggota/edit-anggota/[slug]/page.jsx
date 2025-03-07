"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { showAlert } from "@/components/features/alert/custom-alert";
import {
  fetchAnggotaById,
  updateAnggota,
  deleteAnggota,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/admisi/Anggota/anggotaSlice";

const EditAnggotaForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedAnggota } = useSelector((state) => state.anggota);
  const [dataAnggota, setDataAnggota] = useState(null);
  console.log("selectedAnggota:", selectedAnggota);
  // Fetch data saat komponen pertama kali dimuat
  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchAnggotaById(id));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedAnggota) {
      setDataAnggota(selectedAnggota);
    }
  }, [selectedAnggota]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataAnggota) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Submit form untuk update data
  const handleSubmit = async (formData) => {
    try {
      if (!dataAnggota.keanggotaanId) {
        showAlert.error("Gagal memperbarui data: Anggota ID tidak ditemukan.");
        return;
      }

      console.log("Data yang dikirim ke backend:", formData);

      await dispatch(
        updateAnggota({ id: dataAnggota.keanggotaanId, data: formData })
      ).unwrap();

      showAlert.success("Data berhasil diperbarui!", () => {
        router.push("/pendaftaran/anggota/table-anggota");
      });
    } catch (error) {
      console.error("Gagal memperbarui data Anggota:", error);
      showAlert.error("Gagal memperbarui data Anggota.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataAnggota?.keanggotaanId) {
      showAlert.error("Gagal menghapus: Anggota ID tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete("Data Anggota akan dihapus permanen", async () => {
      try {
        await dispatch(deleteAnggota(dataAnggota.keanggotaanId)).unwrap();
        showAlert.success("Data Anggota berhasil dihapus!", () => {
          router.push("/pendaftaran/anggota/table-anggota");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data Anggota.");
      }
    });
  };

  // Konfigurasi Form Fields
  const formFields = [
    {
      section: "Informasi Anggota",
      fields: [
        {
          type: "text",
          label: "Jenis Anggota",
          name: "jenisKeanggotaan",
          placeholder: "Masukkan Jenis Anggota...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Jenis Promo",
          name: "jenisPromo",
          placeholder: "Masukkan Jenis Promo...",
          colSize: 6,
        },
      ],
    },
  ];

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataAnggota?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Anggota"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataAnggota}
        backPath="/pendaftaran/anggota/table-anggota"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditAnggotaForm;
