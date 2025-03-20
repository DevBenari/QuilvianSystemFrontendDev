"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deleteDokterPoli,
  fetchDokterPoliById,
  updateDokterPoli,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPoliSlice";
import useMedicalData from "@/lib/hooks/useDokter";

const EditDokterPoliForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedDokterPoli, loading } = useSelector(
    (state) => state.DokterPoli
  );

  const [dataDokterPoli, setDataDokterPoli] = useState(null);

  const {
    DokterOptions,
    handleLoadMoreDokter,
    PoliKlinikOptions,
    handleLoadMorePoliKlinik,
  } = useMedicalData();

  // Fetch data DokterPoli berdasarkan ID
  useEffect(() => {
    dispatch(fetchDokterPoliById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedDokterPoli) {
      setDataDokterPoli(selectedDokterPoli);
    }
  }, [selectedDokterPoli]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataDokterPoli) {
    return <p className="text-center">Memuat data...</p>;
  }

  const formFields = [
    {
      fields: [
        {
          type: "select",
          label: "PoliKlinik",
          name: "poliId",
          options: PoliKlinikOptions,
          colSize: 6,
          onMenuScrollToBottom: handleLoadMorePoliKlinik,
          rules: { required: "Poli harus dipilih" },
        },
        {
          type: "select",
          label: "Dokter",
          name: "dokterId",
          options: DokterOptions,
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreDokter,
          rules: { required: "Dokter harus dipilih" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      await dispatch(
        updateDokterPoli({ id: dataDokterPoli.dokterPoliId, data })
      ).unwrap();
      showAlert.success("Data DokterPoli berhasil diperbarui!", () => {
        router.push("/MasterData/master-dokter/dokter-poli/table-DokterPoli");
      });
    } catch (error) {
      showAlert.error("Gagal memperbarui data Dokter Poli.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataDokterPoli?.dokterPoliId) {
      showAlert.error("Gagal menghapus: ID DokterPoli tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete(
      "Data DokterPoli akan dihapus permanen",
      async () => {
        try {
          await dispatch(
            deleteDokterPoli(dataDokterPoli.dokterPoliId)
          ).unwrap();
          showAlert.success("Data DokterPoli berhasil dihapus!", () => {
            router.push(
              "/MasterData/master-dokter/dokter-poli/table-DokterPoli"
            );
          });
        } catch (error) {
          showAlert.error("Gagal menghapus data Dokter Poli.");
        }
      }
    );
  };

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataDokterPoli?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Dokter Poli"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataDokterPoli}
        backPath="/MasterData/master-dokter/dokter-poli/table-DokterPoli"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditDokterPoliForm;
