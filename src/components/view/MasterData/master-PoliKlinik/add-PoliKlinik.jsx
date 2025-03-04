"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import useDepartementData from "@/lib/hooks/useDepartemen";
import { createPoliKlinik } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-poliklinik-slice/PoliKlinikSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useDispatch } from "react-redux";

const FormAddPoliKlinik = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Poliklinik",
          name: "namaPoliklinik",
          placeholder: "Masukkan Nama Poliklinik...",
          colSize: 6,
          rules: { required: "Nama Poliklinik harus diisi" },
        },
        {
          type: "text",
          label: "Kepala Poliklinik",
          name: "kepalaPoliklinik",
          placeholder: "Masukkan Kepala Poliklinik...",
          colSize: 6,
          rules: { required: "Kepala Poliklinik harus diisi" },
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
          type: "text",
          label: "Hari Operasional",
          name: "hariOperasional",
          placeholder: "Masukkan Hari Operasional...",
          colSize: 6,
          rules: { required: "Hari Operasional harus diisi" },
        },
        {
          type: "time",
          label: "Jam Buka",
          name: "jamBuka",
          colSize: 6,
          rules: { required: "Jam Buka harus diisi" },
        },
        {
          type: "time",
          label: "Jam Tutup",
          name: "jamTutup",
          colSize: 6,
          rules: { required: "Jam Tutup harus diisi" },
        },
        {
          type: "text",
          label: "Layanan Poliklinik",
          name: "layananPoliklinik",
          placeholder: "Masukkan Layanan Poliklinik...",
          colSize: 6,
          rules: { required: "Layanan Poliklinik harus diisi" },
        },
        {
          type: "number",
          label: "Jumlah Maksimal Pasien",
          name: "jumlahMaxPasien",
          placeholder: "Masukkan Jumlah Maksimal Pasien...",
          colSize: 6,
          rules: { required: "Jumlah Maksimal Pasien harus diisi" },
        },
        {
          type: "textarea",
          label: "Deskripsi",
          name: "deskripsi",
          placeholder: "Masukkan Deskripsi...",
          colSize: 6,
          rules: { required: "Deskripsi harus diisi" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      await dispatch(createPoliKlinik(data)).unwrap(); // Tunggu hasil dari dispatch
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-PoliKlinik/table-PoliKlinik");
      });
    } catch (error) {
      console.error("Gagal menambahkan PoliKlinik :", error);
      showAlert.error("Gagal menambahkan data PoliKlinik ");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data PoliKlinik"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-PoliKlinik/table-PoliKlinik"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddPoliKlinik;
