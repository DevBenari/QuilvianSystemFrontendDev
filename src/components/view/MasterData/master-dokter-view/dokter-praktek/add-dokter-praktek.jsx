"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

import { showAlert } from "@/components/features/alert/custom-alert";
import { createDokterPraktek } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPraktek";
import { useDispatch, useSelector } from "react-redux";
import useDokterData from "@/lib/hooks/useDokter";

const AddFormDokterPraktek = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    DokterOptions,
    loading: DokterLoading,
    handleLoadMore: handleLoadMoreDokter,
  } = useDokterData();

  // Konfigurasi Form Fields
  const formFields = [
    {
      section: "Informasi Dokter Praktek",
      fields: [
        {
          type: "text",
          label: "Nama Dokter",
          name: "dokter",
          placeholder: "Masukkan Nama Dokter...",
          colSize: 6,
          rules: { required: "Nama Dokter harus diisi" },
        },
        {
          type: "text",
          label: "Layanan",
          name: "layanan",
          placeholder: "Masukkan Layanan...",
          colSize: 6,
          rules: { required: "Layanan harus diisi" },
        },
        {
          type: "time",
          label: "Jam Praktek",
          name: "jamPraktek",
          placeholder: "Masukkan Jam Praktek...",
          colSize: 6,
          rules: { required: "Jam Praktek harus diisi" },
        },
        {
          type: "text",
          label: "Hari",
          name: "hari",
          placeholder: "Masukkan Hari Praktek...",
          colSize: 6,
          rules: { required: "Hari harus diisi" },
        },
        {
          type: "date",
          label: "Jam Masuk",
          name: "jamMasuk",
          placeholder: "Pilih Jam Masuk...",
          colSize: 6,
          rules: { required: "Jam Masuk harus diisi" },
        },
        {
          type: "date",
          label: "Jam Keluar",
          name: "jamKeluar",
          placeholder: "Pilih Jam Keluar...",
          colSize: 6,
          rules: { required: "Jam Keluar harus diisi" },
        },
        {
          type: "select",
          id: "dokterId",
          label: "Dokter",
          name: "dokterId",
          options: DokterOptions,
          rules: { required: "Kategori Peralatan harus diisi" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreDokter,
          isLoading: DokterLoading,
        },
      ],
    },
  ];

  // Fungsi untuk menangani submit form
  const handleSubmit = async (data) => {
    console.log(data);
    try {
      // Validasi data sebelum submit
      const errors = validateFormData(data, formFields);
      if (errors.length > 0) {
        showAlert.error(errors.join("\n"));
        return;
      }

      // Kirim data ke Redux API
      await dispatch(createDokterPraktek(data)).unwrap();

      showAlert.success("Data Dokter Praktek berhasil ditambahkan!", () => {
        router.push(
          "/MasterData/master-dokter/dokter-praktek/table-dokter-praktek"
        );
      });
    } catch (error) {
      console.error("Gagal menambahkan Dokter Praktek:", error);
      showAlert.error("Gagal menambahkan data Dokter Praktek.");
    }
  };

  // Fungsi untuk validasi form
  const validateFormData = (data, fields) => {
    const errors = [];
    fields.forEach((section) => {
      section.fields.forEach((field) => {
        const { name, label, rules } = field;
        const value = data[name];

        if (rules?.required && (!value || value.trim() === "")) {
          errors.push(`${label} harus diisi`);
        }

        if (rules?.pattern && !rules.pattern.test(value)) {
          errors.push(`${label} tidak valid`);
        }
      });
    });
    return errors;
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Dokter Praktek"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={
          "/MasterData/master-dokter/dokter-praktek/table-dokter-praktek"
        }
        isAddMode={true}
      />
    </Fragment>
  );
};

export default AddFormDokterPraktek;
