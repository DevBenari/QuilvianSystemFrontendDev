"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import ReusableAlert from "@/components/ui/reusable-alert";
import { useDispatch } from "react-redux";

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { createPekerjaan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice";
import { showAlert } from "@/components/features/alert/custom-alert";

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
      console.log(data);
      showAlert.success("Data berhasil disimpan", () => {
        router.push(
          "/MasterData/master-informasi/master-pekerjaan/table-pekerjaan"
        );
      });
    } catch (error) {
      console.error("Gagal menambahkan negara:", error);
      showAlert.error("Gagal menambahkan data negara");
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
