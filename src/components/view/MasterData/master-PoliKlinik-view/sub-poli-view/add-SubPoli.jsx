"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";

import { createSubPoli } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-slice/SubPoliSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useDispatch } from "react-redux";

const FormAddSubPoli = () => {
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
          type: "text",
          label: "Nama Sub Poli",
          name: "namaSubPoli",
          placeholder: "Masukkan Nama Sub Poli...",
          colSize: 6,
          rules: { required: "Nama Sub Poli harus diisi" },
        },
        {
          type: "text",
          label: "Deskripsi",
          name: "deskripsi",
          placeholder: "Masukkan Deskripsi...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Kepala Sub Poli",
          name: "kepalaSubPoli",
          placeholder: "Masukkan Nama Kepala Sub Poli...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Lokasi",
          name: "lokasi",
          placeholder: "Masukkan Lokasi...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Telepon",
          name: "telepon",
          placeholder: "Masukkan Nomor Telepon...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Email",
          name: "email",
          placeholder: "Masukkan Email...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Hari Operasional",
          name: "hariOperasional",
          placeholder: "Masukkan Hari Operasional...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Tanggal Buka",
          name: "jamBuka",
          colSize: 6,
          rules: { required: "Tanggal Buka harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Tutup",
          name: "jamTutup",
          colSize: 6,
          rules: { required: "Tanggal Tutup harus diisi" },
        },
        {
          type: "text",
          label: "Layanan Sub Poli",
          name: "layananSubPoli",
          placeholder: "Masukkan Layanan Sub Poli...",
          colSize: 6,
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      await dispatch(createSubPoli(data)).unwrap(); // Tunggu hasil dari dispatch
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-PoliKlinik/subPoli/table-subPoli");
      });
    } catch (error) {
      console.error("Gagal menambahkan SubPoli :", error);
      showAlert.error("Gagal menambahkan data SubPoli ");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data SubPoli"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-PoliKlinik/subPoli/table-subPoli"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddSubPoli;
