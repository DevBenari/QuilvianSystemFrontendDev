"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createDepartement } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-departemen/DepartemenSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useDispatch } from "react-redux";

const FormAddDepartement = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createDepartement(data)).unwrap(); // Tunggu hasil dari dispatch
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-departement/table-departement");
      });
    } catch (error) {
      console.error("Gagal menambahkan Departement :", error);
      showAlert.error("Gagal menambahkan data Departement ");
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Departement",
          name: "kodeDepartement",
          placeholder: "Masukkan Kode Departement...",
          colSize: 6,
          rules: { required: "Kode Departement harus diisi" },
        },
        {
          type: "text",
          label: "Nama Departement",
          name: "namaDepartement",
          placeholder: "Masukkan Nama Departement...",
          colSize: 6,
          rules: { required: "Nama Departement harus diisi" },
        },
        {
          type: "text",
          label: "Kepala Departement",
          name: "kepalaDepartement",
          placeholder: "Masukkan Kepala Departement...",
          colSize: 6,
          rules: { required: "Kepala Departement harus diisi" },
        },
        {
          type: "text",
          label: "Lokasi",
          name: "lokasi",
          placeholder: "Masukkan Lokasi...",
          colSize: 6,
          rules: { required: "Lokasi harus diisi" },
        },
        {
          type: "text",
          label: "Telepon",
          name: "telepon",
          placeholder: "Masukkan Nomor Telepon...",
          colSize: 6,
          rules: { required: "Telepon harus diisi" },
        },
        {
          type: "text",
          label: "Email",
          name: "email",
          placeholder: "Masukkan Email...",
          colSize: 6,
          rules: { required: "Email harus diisi" },
        },
        {
          type: "date",
          label: "Jam Buka",
          name: "jamBuka",
          colSize: 6,
          rules: { required: "Jam Buka harus diisi" },
        },
        {
          type: "date",
          label: "Jam Tutup",
          name: "jamTutup",
          colSize: 6,
          rules: { required: "Jam Tutup harus diisi" },
        },
        {
          type: "text",
          label: "Layanan",
          name: "layanan",
          placeholder: "Masukkan Layanan...",
          colSize: 6,
          rules: { required: "Layanan harus diisi" },
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Departement"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-departement/table-departement"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddDepartement;
