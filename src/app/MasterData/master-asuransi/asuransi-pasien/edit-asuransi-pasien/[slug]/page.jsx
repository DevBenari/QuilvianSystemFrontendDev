"use client";
import React, { useEffect, useState, Fragment, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deleteAsuransiPasien,
  fetchAsuransiPasienById,
  updateAsuransiPasien,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/AsuransiPasienSlice";
import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import { options } from "@amcharts/amcharts4/core";
import useAsuransiData from "@/lib/hooks/useAsuransi";
import usePasienData from "@/lib/hooks/usePasien";

const AsuransiPasienEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Local state untuk data AsuransiPasien
  const [dataAsuransiPasien, setDataAsuransiPasien] = useState([]);

  // Mengambil data dari Redux store
  const { selectedAsuransiPasien, loading, error } = useSelector(
    (state) => state.AsuransiPasien
  );

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchAsuransiPasienById(id));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedAsuransiPasien) {
      setDataAsuransiPasien(selectedAsuransiPasien);
    }
  }, [selectedAsuransiPasien]);

  console.log("data AsuransiPasien : ", dataAsuransiPasien);

  const { AsuransiOptions, handleLoadMoreAsuransi } = useAsuransiData();
  const { PasienOptions, handleLoadMorePasien } = usePasienData();

  const formFields = [
    {
      fields: [
        {
          type: "select",
          label: " Asuransi Pasien",
          name: "asuransiPasienId",
          options: AsuransiOptions,
          placeholder: "Masukkan  Asuransi Pasien...",
          colSize: 6,
          rules: { required: " Asuransi Pasien harus diisi" },
          onMenuScrollToBottom: handleLoadMoreAsuransi,
        },
        {
          type: "select",
          label: "Nama Pasien",
          name: "pasienId",
          placeholder: "Masukkan Nama Pasien...",
          colSize: 6,
          options: PasienOptions,
          rules: { required: "Nama Pasien harus diisi" },
          onMenuScrollToBottom: handleLoadMorePasien,
        },

        {
          type: "text",
          label: "Nomor Polis",
          name: "noPolis",
          placeholder: "Masukkan Nomor Polis...",
          colSize: 6,
          rules: { required: "Nomor Polis harus diisi" },
        },
      ],
    },
  ];

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataAsuransiPasien?.[field.name] ?? "",
    })),
  }));

  const handleSubmit = async (formData) => {
    try {
      await dispatch(
        updateAsuransiPasien({
          id: selectedAsuransiPasien.asuransiPasienId,
          data: formData,
        })
      ).unwrap();
      showAlert.success("Data berhasil diperbarui", () => {
        router.push(
          "/MasterData/master-asuransi/asuransi-pasien/daftar-asuransi-pasien"
        );
      });
    } catch (error) {
      showAlert.error("Gagal memperbarui data asuransi.");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete("Yakin ingin menghapus?", async () => {
      try {
        await dispatch(
          deleteAsuransiPasien(selectedAsuransiPasien.asuransiPasienId)
        ).unwrap();
        showAlert.success("Data berhasil dihapus!", () => {
          router.push(
            "/MasterData/master-asuransi/asuransi-pasien/daftar-asuransi-pasien"
          );
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data asuransi.");
      }
    });
  };

  return (
    <Fragment>
      <DynamicStepForm
        title="Edit Data AsuransiPasien"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataAsuransiPasien}
        backPath="/MasterData/master-asuransi/asuransi-pasien/daftar-asuransi-pasien"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default AsuransiPasienEditForm;
