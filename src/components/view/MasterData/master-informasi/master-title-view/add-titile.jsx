"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createTitle } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useDispatch } from "react-redux";

const PenambahanTitle = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createTitle(data)).unwrap(); // Tunggu hasil dari dispatch
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-informasi/title/table-title");
      });
    } catch (error) {
      console.error("Gagal menambahkan title:", error);
      showAlert.error("Gagal menambahkan data title");
    }
  };
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Title",
          name: "namaTitle",
          placeholder: "Masukkan Nama Title...",
          colSize: 6,
          rules: { required: "Nama Title harus diisi" },
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Title"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-informasi/title/table-title"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default PenambahanTitle;
