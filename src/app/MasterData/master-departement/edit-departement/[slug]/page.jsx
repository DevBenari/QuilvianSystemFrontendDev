"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deleteDepartement,
  fetchDepartementById,
  updateDepartement,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-departemen/DepartemenSlice";

const EditDepartementForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedDepartement, loading } = useSelector(
    (state) => state.Departement
  );

  const [dataDepartement, setDataDepartement] = useState(null);

  // Fetch data Departement berdasarkan ID
  useEffect(() => {
    dispatch(fetchDepartementById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedDepartement) {
      setDataDepartement(selectedDepartement);
    }
  }, [selectedDepartement]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataDepartement) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Submit form untuk update data
  const handleSubmit = async (data) => {
    try {
      if (!dataDepartement.departementId) {
        showAlert.error(
          "Gagal memperbarui data: ID Departement tidak ditemukan."
        );
        return;
      }

      console.log("Data yang dikirim ke backend:", data);

      await dispatch(
        updateDepartement({ id: dataDepartement.departementId, data })
      ).unwrap();

      showAlert.success("Data Departement berhasil diperbarui!", () => {
        router.push("/MasterData/master-departement/table-departement");
      });
    } catch (error) {
      console.error("Gagal memperbarui data Departement", error);
      showAlert.error("Gagal memperbarui data Departement.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataDepartement?.departementId) {
      showAlert.error("Gagal menghapus: ID Departement tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete(
      "Data Departement akan dihapus permanen",
      async () => {
        try {
          await dispatch(
            deleteDepartement(dataDepartement.departementId)
          ).unwrap();
          showAlert.success("Data Departement berhasil dihapus!", () => {
            router.push("/MasterData/master-departement/table-departement");
          });
        } catch (error) {
          showAlert.error("Gagal menghapus data Departement.");
        }
      }
    );
  };

  // Konfigurasi Form Fields
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Departement",
          name: "kodeDepartement",
          placeholder: "Masukkan Kode Departement...",
          colSize: 6,
          rules: { required: "Kode Departement harus diisi" },
        },
        {
          type: "text",
          label: "Nama Departement",
          name: "namaDepartement",
          placeholder: "Masukkan Nama Departement...",
          colSize: 6,
          rules: { required: "Nama Departement harus diisi" },
        },
        {
          type: "text",
          label: "Kepala Departement",
          name: "kepalaDepartement",
          placeholder: "Masukkan Kepala Departement...",
          colSize: 6,
          rules: { required: "Kepala Departement harus diisi" },
        },
        {
          type: "text",
          label: "Lokasi",
          name: "lokasi",
          placeholder: "Masukkan Lokasi...",
          colSize: 6,
          rules: { required: "Lokasi harus diisi" },
        },
        {
          type: "text",
          label: "Telepon",
          name: "telepon",
          placeholder: "Masukkan Nomor Telepon...",
          colSize: 6,
          rules: { required: "Telepon harus diisi" },
        },
        {
          type: "text",
          label: "Email",
          name: "email",
          placeholder: "Masukkan Email...",
          colSize: 6,
          rules: { required: "Email harus diisi" },
        },
        {
          type: "date",
          label: "Jam Buka",
          name: "jamBuka",
          colSize: 6,
          rules: { required: "Jam Buka harus diisi" },
        },
        {
          type: "date",
          label: "Jam Tutup",
          name: "jamTutup",
          colSize: 6,
          rules: { required: "Jam Tutup harus diisi" },
        },
        {
          type: "text",
          label: "Layanan",
          name: "layanan",
          placeholder: "Masukkan Layanan...",
          colSize: 6,
          rules: { required: "Layanan harus diisi" },
        },
      ],
    },
  ];

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataDepartement?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Departement"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataDepartement}
        backPath="/MasterData/master-departement/table-departement"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditDepartementForm;
