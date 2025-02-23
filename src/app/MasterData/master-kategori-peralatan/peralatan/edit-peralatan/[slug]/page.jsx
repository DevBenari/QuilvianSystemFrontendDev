"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deletePeralatan,
  fetchPeralatanById,
  updatePeralatan,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-peralatan/PeralatanSlice";
import useKategoriPeralatanData from "@/lib/hooks/useKategoriPeralatan";

const EditPeralatanForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedPeralatan, loading } = useSelector(
    (state) => state.Peralatan
  );

  // select peralatan
  const {
    KategoriPeralatanOptions,
    loading: KategoriPeralatanLoading,
    handleLoadMore,
  } = useKategoriPeralatanData();

  const [dataPeralatan, setDataPeralatan] = useState([]);

  // Fetch data Peralatan berdasarkan ID
  useEffect(() => {
    dispatch(fetchPeralatanById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedPeralatan) {
      setDataPeralatan(selectedPeralatan);
    }
  }, [selectedPeralatan]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataPeralatan) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Submit form untuk update data
  const handleSubmit = async (data) => {
    try {
      if (!dataPeralatan.peralatanId) {
        showAlert.error(
          "Gagal memperbarui data: ID Peralatan tidak ditemukan."
        );
        return;
      }
      console.log("Data yang dikirim ke backend:", data);

      await dispatch(
        updatePeralatan({
          id: dataPeralatan.peralatanId,
          data,
        })
      ).unwrap();

      showAlert.success("Data  Peralatan berhasil diperbarui!", () => {
        router.push(
          "/MasterData/master-kategori-peralatan/peralatan/table-peralatan"
        );
      });
    } catch (error) {
      console.error("Gagal memperbarui data  Peralatan", error);
      showAlert.error("Gagal memperbarui data  Peralatan.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataPeralatan?.peralatanId) {
      showAlert.error("Gagal menghapus: ID  Peralatan tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete(
      "Data Peralatan akan dihapus permanen",
      async () => {
        try {
          await dispatch(deletePeralatan(dataPeralatan.peralatanId)).unwrap();
          showAlert.success("Data  Peralatan berhasil dihapus!", () => {
            router.push(
              "/MasterData/master-kategori-peralatan/peralatan/table-peralatan"
            );
          });
        } catch (error) {
          showAlert.error("Gagal menghapus data  Peralatan.");
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
          label: "Nama Peralatan",
          name: "namaPeralatan",
          placeholder: "Masukkan Nama Peralatan...",
          colSize: 6,
          rules: { required: "Nama Peralatan harus diisi" },
        },
        {
          type: "text",
          label: "Manufacturer",
          name: "manufacturer",
          placeholder: "Masukkan Nama Manufacturer...",
          colSize: 6,
          rules: { required: "Manufacturer harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Pembelian",
          name: "purchase_date",
          colSize: 6,
          rules: { required: "Tanggal Pembelian harus diisi" },
        },
        {
          type: "text",
          label: "Status Pemeliharaan",
          name: "maintenance_status",
          placeholder: "Masukkan Status Pemeliharaan...",
          colSize: 6,
          rules: { required: "Status Pemeliharaan harus diisi" },
        },
        {
          type: "text",
          label: "Status Operasional",
          name: "operational_status",
          placeholder: "Masukkan Status Operasional...",
          colSize: 6,
          rules: { required: "Status Operasional harus diisi" },
        },
        {
          type: "text",
          label: "Nama Departemen",
          name: "department_name",
          placeholder: "Masukkan Nama Departemen...",
          colSize: 6,
          rules: { required: "Nama Departemen harus diisi" },
        },
        {
          type: "text",
          label: "Lokasi",
          name: "location",
          placeholder: "Masukkan Lokasi...",
          colSize: 6,
          rules: { required: "Lokasi harus diisi" },
        },
        {
          type: "select",
          id: "kategoriPeralatanId",
          label: "Kategori Peralatan",
          name: "kategoriPeralatanId",
          options: KategoriPeralatanOptions,
          rules: { required: "Kategori Peralatan harus diisi" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMore,
          isLoading: KategoriPeralatanLoading,
        },
      ],
    },
  ];

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataPeralatan?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Peralatan"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataPeralatan}
        backPath="/MasterData/master-kategori-peralatan/peralatan/table-peralatan"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditPeralatanForm;
