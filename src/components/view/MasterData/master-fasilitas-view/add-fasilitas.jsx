"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createFasilitas } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-fasilitas/FasilitasSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useDispatch } from "react-redux";

const FormAddFasilitas = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Fasilitas",
          name: "namaFasilitasPasien",
          placeholder: "Masukkan Nama Fasilitas...",
          colSize: 6,
          rules: { required: "Nama Fasilitas harus diisi" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      await dispatch(createFasilitas(data)).unwrap(); // Tunggu hasil dari dispatch
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-fasilitas/table-fasilitas");
      });
    } catch (error) {
      console.error("Gagal menambahkan Fasilitas :", error);
      showAlert.error("Gagal menambahkan data Fasilitas ");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Fasilitas"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-fasilitas/table-fasilitas"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddFasilitas;
