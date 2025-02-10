"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import ReusableAlert from "@/components/ui/reusable-alert";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { createPekerjaan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice";

const FormAddPekerjaan = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("success");
  const router = useRouter();
  const dispatch = useDispatch();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Pekerjaan",
          name: "kodePekerjaan",
          placeholder: "Masukkan Kode Pekerjaan...",
          defaultValue: "",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Pekerjaan",
          name: "namaPekerjaan",
          placeholder: "Masukkan Nama Pekerjaan...",
          colSize: 6,
          rules: { required: "Nama Pekerjaan harus diisi" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      await dispatch(createPekerjaan(data)).unwrap(); // Tunggu hasil dari dispatch
      alert("pekerjaan berhasil ditambahkan!");
      console.log(data);
      router.push(
        "/MasterData/master-informasi/master-pekerjaan/table-pekerjaan"
      );
    } catch (error) {
      console.error("Gagal menambahkan pekerjaan:", error);
      alert("Gagal menambahkan pekerjaan.");
    }
  };

  return (
    <Fragment>
      <ReusableAlert
        message={alertMessage}
        variant={alertVariant}
        onClose={() => setAlertMessage(null)}
        autoClose={alertVariant === "success" ? 2000 : null}
      />
      <DynamicForm
        title="Tambah Data Pekerjaan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={
          "/MasterData/master-informasi/master-pekerjaan/table-pekerjaan"
        }
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddPekerjaan;
