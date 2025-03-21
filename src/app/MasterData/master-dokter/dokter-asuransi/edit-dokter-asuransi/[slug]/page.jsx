"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";
import { fetchDokterAsuransiById } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/DokterAsuransiSlice";
import useMedicalData from "@/lib/hooks/useDokter";
import useAsuransiData from "@/lib/hooks/useAsuransi";

const EditDokterAsuransiForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedDokterAsuransi, loading } = useSelector(
    (state) => state.DokterAsuransi
  );

  const [dataDokterAsuransi, setDataDokterAsuransi] = useState(null);

  const { DokterOptions, handleLoadMoreDokter } = useMedicalData();
  const { AsuransiOptions, handleLoadMoreAsuransi } = useAsuransiData();

  // Fetch data DokterAsuransi berdasarkan ID
  useEffect(() => {
    dispatch(fetchDokterAsuransiById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedDokterAsuransi) {
      setDataDokterAsuransi(selectedDokterAsuransi);
    }
  }, [selectedDokterAsuransi]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataDokterAsuransi) {
    return <p className="text-center">Memuat data...</p>;
  }

  const formFields = [
    {
      fields: [
        {
          type: "select",
          label: "Pilih Dokter",
          name: "dokterId",
          options: DokterOptions,
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreDokter,
          rules: { required: "Dokter harus dipilih" },
        },
        {
          type: "select",
          label: "Asuransi",
          name: "asuransiId",
          options: AsuransiOptions,
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreAsuransi,
          rules: { required: "Asuransi harus dipilih" },
        },
      ],
    },
  ];

  // Submit form untuk update data
  const handleSubmit = async (data) => {
    try {
      if (!dataDokterAsuransi.dokterAsuransiId) {
        showAlert.error(
          "Gagal memperbarui data: ID DokterAsuransi tidak ditemukan."
        );
        return;
      }

      console.log("Data yang dikirim ke backend:", data);

      await dispatch(
        updateDokterAsuransi({ id: dataDokterAsuransi.dokterAsuransiId, data })
      ).unwrap();

      showAlert.success("Data DokterAsuransi berhasil diperbarui!", () => {
        router.push(
          "/MasterData/master-dokter/dokter-asuransi/table-dokter-asuransi"
        );
      });
    } catch (error) {
      console.error("Gagal memperbarui data Jadwal Praktek", error);
      showAlert.error("Gagal memperbarui data Jadwal Praktek.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataDokterAsuransi?.dokterAsuransiId) {
      showAlert.error("Gagal menghapus: ID Jadwal Praktek tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete(
      "Data DokterAsuransi akan dihapus permanen",
      async () => {
        try {
          await dispatch(
            deleteDokterAsuransi(dataDokterAsuransi.dokterAsuransiId)
          ).unwrap();
          showAlert.success("Data DokterAsuransi berhasil dihapus!", () => {
            router.push(
              "/MasterData/master-dokter/dokter-asuransi/table-dokter-asuransi"
            );
          });
        } catch (error) {
          showAlert.error("Gagal menghapus data Jadwal Praktek.");
        }
      }
    );
  };

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataDokterAsuransi?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Dokter Asuransi"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataDokterAsuransi}
        backPath="/MasterData/master-dokter/dokter-asuransi/table-dokter-asuransi"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditDokterAsuransiForm;
