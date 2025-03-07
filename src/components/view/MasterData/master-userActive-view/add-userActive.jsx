"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createUserActive } from "@/lib/state/slice/auth/master-userActive/UserActive";

import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useDispatch } from "react-redux";

const FormAddUserActive = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Lengkap",
          name: "fullName",
          placeholder: "Masukkan Nama Lengkap",
          colSize: 6,
          rules: { required: "Nama Lengkap harus diisi " },
        },
        {
          type: "text",
          label: "Indetitas Number",
          name: "identityNumber",
          placeholder: "Masukkan Indetitas Number...",
          colSize: 6,
          rules: { required: "Indetitas Number harus diisi" },
        },
        {
          type: "text",
          label: "Tempat Lahir",
          name: "placeOfBirth",
          placeholder: "Masukkan Tempat Lahir...",
          colSize: 6,
          rules: { required: "Tempat Lahir harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Lahir",
          name: "dateOfBirth",
          colSize: 6,
          rules: { required: "Tanggal Lahir harus diisi" },
        },
        {
          type: "select",
          id: "gender",
          label: "Jenis Kelamin",
          name: "gender",
          placeholder: "Jenis Kelamin",
          options: [
            { label: "Laki-laki", value: "Laki-Laki" },
            { label: "Perempuan", value: "Perempuan" },
          ],
          rules: { required: "Jenis Kelamin is required" },
          colSize: 6,
        },
        {
          type: "text",
          label: "Alamat",
          name: "address",
          placeholder: "Masukkan Alamat...",
          colSize: 6,
          rules: { required: "Alamat harus diisi" },
        },
        {
          type: "text",
          label: "Handphone",
          name: "handphone",
          placeholder: "Masukkan Nomor Handphone...",
          colSize: 6,
          rules: { required: "Handphone harus diisi" },
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
          type: "select",
          label: "Aktif",
          name: "isActive",
          colSize: 6,
          options: [
            { label: "Aktif", value: true },
            { label: "Nonaktif", value: false },
          ],
          rules: { required: "Status aktif harus dipilih" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    console.log("form Data", data);
    try {
      await dispatch(createUserActive(data)).unwrap(); // Tunggu hasil dari dispatch
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-userActive/table-userActive");
      });
    } catch (error) {
      console.error("Gagal menambahkan User Active :", error);
      showAlert.error("Gagal menambahkan data UserActive ");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data UserActive"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-userActive/table-userActive"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddUserActive;
