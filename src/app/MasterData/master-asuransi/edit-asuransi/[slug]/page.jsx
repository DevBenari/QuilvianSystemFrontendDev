"use client";
import React, { useEffect, useState, Fragment, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import {
  fetchAsuransiById,
  updateAsuransi,
  deleteAsuransi,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";
import { showAlert } from "@/components/features/alert/custom-alert";

const AsuransiEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedAsuransi } = useSelector((state) => state.asuransi);

  const [dataAsuransi, setDataAsuransi] = useState(null);
  console.log("selectedAsuransi:", selectedAsuransi);
  // Fetch data saat komponen pertama kali dimuat
  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchAsuransiById(id));
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (selectedAsuransi) {
      setDataAsuransi(selectedAsuransi);
    }
  }, [selectedAsuransi]);

  const handleSubmit = async (formData) => {
    try {
      await dispatch(
        updateAsuransi({ id: selectedAsuransi.asuransiId, data: formData })
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
        await dispatch(deleteAsuransi(selectedAsuransi.asuransiId)).unwrap();
        showAlert.success("Data berhasil dihapus!", () => {
          router.push("/MasterData/master-asuransi/daftar-asuransi");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data asuransi.");
      }
    });
  };
  // Konfigurasi Form Fields
  const formFields = [
    {
      section: "Informasi Asuransi",
      fields: [
        {
          type: "text",
          label: "Kode Asuransi",
          name: "kodeAsuransi",
          placeholder: "Masukkan Kode Asuransi...",
          colSize: 6,
          rules: { required: "Kode Asuransi wajib diisi" },
        },
        {
          type: "text",
          label: "Nama Asuransi",
          name: "namaAsuransi",
          placeholder: "Masukkan Nama Asuransi...",
          colSize: 6,
          rules: { required: "Nama Asuransi wajib diisi" },
        },
        {
          type: "text",
          label: "Tipe Perusahaan",
          name: "tipePerusahaan",
          placeholder: "Masukkan Tipe Perusahaan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Status",
          name: "status",
          placeholder: "Pilih Status",
          colSize: 6,
          rules: { required: "Status wajib dipilih" },
        },
      ],
    },
  ];

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataAsuransi?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Asuransi"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataAsuransi}
        backPath="/MasterData/master-asuransi/daftar-asuransi"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default AsuransiEditForm;
