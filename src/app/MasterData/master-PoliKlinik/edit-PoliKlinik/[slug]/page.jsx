"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";

import useDepartementData from "@/lib/hooks/useDepartemen";
import {
  deletePoliKlinik,
  fetchPoliKlinikById,
  updatePoliKlinik,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-Slice/PoliKlinikSlice";

const EditPoliKlinikForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    DepartementOptions,
    loading: DepartementLoading,
    handleLoadMore: handleLoadMoreDepartement,
  } = useDepartementData();

  const { selectedPoliKlinik, loading } = useSelector(
    (state) => state.PoliKlinik
  );

  const [dataPoliKlinik, setDataPoliKlinik] = useState(null);

  // Fetch data PoliKlinik berdasarkan ID
  useEffect(() => {
    dispatch(fetchPoliKlinikById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedPoliKlinik) {
      setDataPoliKlinik(selectedPoliKlinik);
    }
  }, [selectedPoliKlinik]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataPoliKlinik) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Submit form untuk update data

  // Konfigurasi Form Fields
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Poliklinik",
          name: "namaPoliklinik",
          placeholder: "Masukkan Nama Poliklinik...",
          colSize: 6,
          rules: { required: "Nama Poliklinik harus diisi" },
        },
        {
          type: "text",
          label: "Kepala Poliklinik",
          name: "kepalaPoliklinik",
          placeholder: "Masukkan Kepala Poliklinik...",
          colSize: 6,
          rules: { required: "Kepala Poliklinik harus diisi" },
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
          type: "text",
          label: "Hari Operasional",
          name: "hariOperasional",
          placeholder: "Masukkan Hari Operasional...",
          colSize: 6,
          rules: { required: "Hari Operasional harus diisi" },
        },
        {
          type: "time",
          label: "Jam Buka",
          name: "jamBuka",
          colSize: 6,
          rules: { required: "Jam Buka harus diisi" },
        },
        {
          type: "time",
          label: "Jam Tutup",
          name: "jamTutup",
          colSize: 6,
          rules: { required: "Jam Tutup harus diisi" },
        },
        {
          type: "text",
          label: "Layanan Poliklinik",
          name: "layananPoliklinik",
          placeholder: "Masukkan Layanan Poliklinik...",
          colSize: 6,
          rules: { required: "Layanan Poliklinik harus diisi" },
        },
        {
          type: "number",
          label: "Jumlah Maksimal Pasien",
          name: "jumlahMaxPasien",
          placeholder: "Masukkan Jumlah Maksimal Pasien...",
          colSize: 6,
          rules: { required: "Jumlah Maksimal Pasien harus diisi" },
        },
        {
          type: "textarea",
          label: "Deskripsi",
          name: "deskripsi",
          placeholder: "Masukkan Deskripsi...",
          colSize: 6,
          rules: { required: "Deskripsi harus diisi" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      if (!dataPoliKlinik.poliKlinikId) {
        showAlert.error(
          "Gagal memperbarui data: ID PoliKlinik tidak ditemukan."
        );
        return;
      }

      console.log("Data yang dikirim ke backend:", data);

      await dispatch(
        updatePoliKlinik({ id: dataPoliKlinik.poliKlinikId, data })
      ).unwrap();

      showAlert.success("Data PoliKlinik berhasil diperbarui!", () => {
        router.push("/MasterData/master-PoliKlinik/table-PoliKlinik");
      });
    } catch (error) {
      console.error("Gagal memperbarui data PoliKlinik", error);
      showAlert.error("Gagal memperbarui data PoliKlinik.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataPoliKlinik?.poliKlinikId) {
      showAlert.error("Gagal menghapus: ID PoliKlinik tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete(
      "Data PoliKlinik akan dihapus permanen",
      async () => {
        try {
          await dispatch(
            deletePoliKlinik(dataPoliKlinik.poliKlinikId)
          ).unwrap();
          showAlert.success("Data PoliKlinik berhasil dihapus!", () => {
            router.push("/MasterData/master-PoliKlinik/table-PoliKlinik");
          });
        } catch (error) {
          showAlert.error("Gagal menghapus data PoliKlinik.");
        }
      }
    );
  };

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataPoliKlinik?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data PoliKlinik"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataPoliKlinik}
        backPath="/MasterData/master-PoliKlinik/table-PoliKlinik"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditPoliKlinikForm;
