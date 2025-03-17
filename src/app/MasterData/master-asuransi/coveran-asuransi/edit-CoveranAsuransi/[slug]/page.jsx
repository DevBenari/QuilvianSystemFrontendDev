"use client";
import React, { useEffect, useState, Fragment, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deleteCoveranAsuransi,
  fetchCoveranAsuransiById,
  updateCoveranAsuransi,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/CoveranAsuransiSlice";
import useAsuransiData from "@/lib/hooks/useAsuransi";

const CoveranAsuransiEditForm = memo(({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Local state untuk data CoveranAsuransi
  const [dataCoveranAsuransi, setDataCoveranAsuransi] = useState([]);

  // Mengambil data dari Redux store
  const { selectedCoveranAsuransi, loading, error } = useSelector(
    (state) => state.CoveranAsuransi
  );

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchCoveranAsuransiById(id));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedCoveranAsuransi) {
      setDataCoveranAsuransi(selectedCoveranAsuransi);
    }
  }, [selectedCoveranAsuransi]);

  console.log("data CoveranAsuransi : ", dataCoveranAsuransi);

  const {
    AsuransiOptions,
    loading: AsuransiLoading,
    handleLoadMore: handleLoadMoreAsuransi,
  } = useAsuransiData();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Asuransi",
          name: "namaAsuransi",
          placeholder: "Masukkan Nama Asuransi...",
          colSize: 6,
          rules: { required: "Nama Asuransi harus diisi" },
        },
        {
          type: "text",
          label: "Kode Layanan",
          name: "serviceCode",
          placeholder: "Masukkan Kode Layanan...",
          colSize: 6,
          rules: { required: "Kode Layanan harus diisi" },
        },
        {
          type: "text",
          label: "Deskripsi Layanan",
          name: "serviceDesc",
          placeholder: "Masukkan Deskripsi Layanan...",
          colSize: 6,
          rules: { required: "Deskripsi Layanan harus diisi" },
        },
        {
          type: "text",
          label: "Kode Kelas Layanan",
          name: "serviceCodeClass",
          placeholder: "Masukkan Kode Kelas Layanan...",
          colSize: 6,
          rules: { required: "Kode Kelas Layanan harus diisi" },
        },
        {
          type: "text",
          label: "Kelas",
          name: "class",
          placeholder: "Masukkan Kelas...",
          colSize: 6,
          rules: { required: "Kelas harus diisi" },
        },
        {
          type: "select",
          label: "Apakah Operasi?",
          name: "isSurgery",
          options: [
            { value: true, label: "Ya" },
            { value: false, label: "Tidak" },
          ],
          colSize: 6,
          rules: { required: "Pilih apakah ini operasi atau bukan" },
        },
        {
          type: "text",
          label: "Tarif",
          name: "tarif",
          placeholder: "Masukkan Tarif...",
          colSize: 6,
          rules: { required: "Tarif harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Berlaku",
          name: "tglBerlaku",
          colSize: 6,
          rules: { required: "Tanggal Berlaku harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Berakhir",
          name: "tglBerakhir",
          colSize: 6,
          rules: { required: "Tanggal Berakhir harus diisi" },
        },
        {
          type: "select",
          label: "Apakah PKS?",
          name: "isPKS",
          options: [
            { value: true, label: "Ya" },
            { value: false, label: "Tidak" },
          ],
          colSize: 6,
          rules: { required: "Pilih apakah ini PKS atau bukan" },
        },
        {
          type: "select",
          label: "Jenis Asuransi",
          name: "asuransiId",
          colSize: 6,
          rules: { required: "Asuransi harus dipilih" },
          options: AsuransiOptions,
          handleLoadMore: handleLoadMoreAsuransi,
          isLoading: AsuransiLoading,
        },
      ],
    },
  ];

  const handleSubmit = async (formData) => {
    try {
      await dispatch(
        updateCoveranAsuransi({
          id: selectedCoveranAsuransi.coveranAsuransiId,
          data: formData,
        })
      ).unwrap();
      showAlert.success("Data berhasil diperbarui", () => {
        router.push("/MasterData/master-asuransi/daftar-asuransi");
      });
    } catch (error) {
      showAlert.error("Gagal memperbarui data asuransi.");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete("Yakin ingin menghapus?", async () => {
      try {
        await dispatch(
          deleteCoveranAsuransi(selectedCoveranAsuransi.coveranAsuransiId)
        ).unwrap();
        showAlert.success("Data berhasil dihapus!", () => {
          router.push("/MasterData/master-asuransi/daftar-asuransi");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data asuransi.");
      }
    });
  };

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataCoveranAsuransi?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Coveran Asuransi"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataCoveranAsuransi}
        backPath="/MasterData/master-asuransi/daftar-asuransi"
        isAddMode={false}
      />
    </Fragment>
  );
});

CoveranAsuransiEditForm.displayName = "CoveranAsuransiEditForm";

export default CoveranAsuransiEditForm;
