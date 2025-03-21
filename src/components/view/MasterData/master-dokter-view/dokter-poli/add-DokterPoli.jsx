"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createDokterPoli } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPoliSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

const AddFormDokterPoli = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formFields = [
    {
      fields: [
        {
          type: "select",
          label: "Poli",
          name: "poliId",
          options: [], // Harus diisi dengan daftar poli yang tersedia
          colSize: 6,
          rules: { required: "Poli harus dipilih" },
        },
        {
          type: "select",
          label: "Dokter",
          name: "dokterId",
          options: [], // Harus diisi dengan daftar dokter yang tersedia
          colSize: 6,
          rules: { required: "Dokter harus dipilih" },
        },
        {
          type: "text",
          label: "Nama Dokter",
          name: "namaDokter",
          placeholder: "Masukkan Nama Dokter...",
          colSize: 6,
          rules: { required: "Nama Dokter harus diisi" },
        },
        {
          type: "text",
          label: "Nama Poli Klinik",
          name: "namaPoliKlinik",
          placeholder: "Masukkan Nama Poli Klinik...",
          colSize: 6,
          rules: { required: "Nama Poli Klinik harus diisi" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      await dispatch(createDokterPoli(data)).unwrap();
      showAlert.success("Data dokter berhasil ditambahkan!", () => {
        router.push("/MasterData/master-dokter/dokter-poli/table-DokterPoli");
      });
    } catch (error) {
      console.error("Gagal menambahkan Dokter Poli:", error);
      showAlert.error("Gagal menambahkan data Dokter Poli.");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Dokter Poli"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-dokter/dokter-poli/table-DokterPoli"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default AddFormDokterPoli;
