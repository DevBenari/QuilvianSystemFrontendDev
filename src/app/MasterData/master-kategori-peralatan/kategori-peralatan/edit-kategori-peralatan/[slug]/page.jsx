"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deleteKategoriPeralatan,
  fetchKategoriPeralatanById,
  updateKategoriPeralatan,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-peralatan/KategoriPeralatanSlice";

const EditKategoriPeralatanForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedKategoriPeralatan, loading } = useSelector(
    (state) => state.KategoriPeralatan
  );

  const [dataKategoriPeralatan, setDataKategoriPeralatan] = useState([]);

  // Fetch data KategoriPeralatan berdasarkan ID
  useEffect(() => {
    dispatch(fetchKategoriPeralatanById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedKategoriPeralatan) {
      setDataKategoriPeralatan(selectedKategoriPeralatan);
    }
  }, [selectedKategoriPeralatan]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataKategoriPeralatan) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Submit form untuk update data
  const handleSubmit = async (data) => {
    try {
      if (!dataKategoriPeralatan.kategoriPeralatanId) {
        showAlert.error(
          "Gagal memperbarui data: ID KategoriPeralatan tidak ditemukan."
        );
        return;
      }

      console.log("Data yang dikirim ke backend:", data);

      await dispatch(
        updateKategoriPeralatan({
          id: dataKategoriPeralatan.kategoriPeralatanId,
          data,
        })
      ).unwrap();

      showAlert.success("Data Kategori Peralatan berhasil diperbarui!", () => {
        router.push(
          "/MasterData/master-kategori-peralatan/kategori-peralatan/table-kategori-peralatan"
        );
      });
    } catch (error) {
      console.error("Gagal memperbarui data Kategori Peralatan", error);
      showAlert.error("Gagal memperbarui data Kategori Peralatan.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataKategoriPeralatan?.kategoriPeralatanId) {
      showAlert.error(
        "Gagal menghapus: ID Kategori Peralatan tidak ditemukan."
      );
      return;
    }

    showAlert.confirmDelete(
      "Data KategoriPeralatan akan dihapus permanen",
      async () => {
        try {
          await dispatch(
            deleteKategoriPeralatan(dataKategoriPeralatan.kategoriPeralatanId)
          ).unwrap();
          showAlert.success("Data Kategori Peralatan berhasil dihapus!", () => {
            router.push(
              "/MasterData/master-kategori-peralatan/kategori-peralatan/table-kategori-peralatan"
            );
          });
        } catch (error) {
          showAlert.error("Gagal menghapus data Kategori Peralatan.");
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
          label: "Nama Kategori Peralatan",
          name: "namaKategoriPeralatan",
          placeholder: "Masukkan Nama Kategori Peralatan...",
          colSize: 6,
          rules: { required: "Nama Kategori Peralatan harus diisi" },
        },
      ],
    },
  ];

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataKategoriPeralatan?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data KategoriPeralatan"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataKategoriPeralatan}
        backPath="/MasterData/master-kategori-peralatan/kategori-peralatan/table-kategori-peralatan"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditKategoriPeralatanForm;
