"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createKategoriPeralatan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-peralatan/KategoriPeralatanSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useDispatch } from "react-redux";

const FormAddKategoriPeralatan = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createKategoriPeralatan(data)).unwrap(); // Tunggu hasil dari dispatch
      showAlert.success("Data berhasil disimpan", () => {
        router.push(
          "/MasterData/master-kategori-peralatan/kategori-peralatan/table-kategori-peralatan"
        );
      });
    } catch (error) {
      console.error("Gagal menambahkan Kategori Peralatan :", error);
      showAlert.error("Gagal menambahkan data Kategori Peralatan ");
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Kategori Peralatan",
          name: "namaKategoriPeralatan",
          placeholder: "Masukkan Nama Kategori Peralatan...",
          colSize: 6,
          rules: { required: "Nama Kategori Peralatan harus diisi" },
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data KategoriPeralatan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={
          "/MasterData/master-kategori-peralatan/kategori-peralatan/table-kategori-peralatan"
        }
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddKategoriPeralatan;
