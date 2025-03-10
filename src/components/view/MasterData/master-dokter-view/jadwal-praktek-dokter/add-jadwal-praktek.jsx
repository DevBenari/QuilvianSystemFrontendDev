"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createJadwalPraktek } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/JadwalPraktekSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

const AddFormJadwalPraktek = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formFields = [
    {
      fields: [
        {
          type: "select",
          label: "Dokter",
          name: "dokterId",
          options: [], // Harus diisi dengan daftar dokter yang tersedia
          colSize: 6,
          rules: { required: "Dokter harus dipilih" },
        },
        {
          type: "select",
          label: "Dokter Poli",
          name: "dokterPoliId",
          options: [], // Harus diisi dengan daftar dokter poli yang tersedia
          colSize: 6,
          rules: { required: "Dokter Poli harus dipilih" },
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
          type: "select",
          label: "Poli",
          name: "poliId",
          options: [], // Harus diisi dengan daftar poli yang tersedia
          colSize: 6,
          rules: { required: "Poli harus dipilih" },
        },
        {
          type: "select",
          label: "Sub Poli",
          name: "subPoliId",
          options: [], // Harus diisi dengan daftar sub poli yang tersedia
          colSize: 6,
          rules: { required: "Sub Poli harus dipilih" },
        },
        {
          type: "text",
          label: "Waktu Praktek",
          name: "waktuPraktek",
          placeholder: "Masukkan Waktu Praktek...",
          colSize: 6,
          rules: { required: "Waktu Praktek harus diisi" },
        },
        {
          type: "text",
          label: "Hari Praktek",
          name: "hariPraktek",
          placeholder: "Masukkan Hari Praktek...",
          colSize: 6,
          rules: { required: "Hari Praktek harus diisi" },
        },
        {
          type: "time",
          label: "Jam Mulai",
          name: "jamMulai",
          colSize: 6,
          rules: { required: "Jam Mulai harus diisi" },
        },
        {
          type: "time",
          label: "Jam Berakhir",
          name: "jamBerakhir",
          colSize: 6,
          rules: { required: "Jam Berakhir harus diisi" },
        },
        {
          type: "text",
          label: "Maksimal Pasien",
          name: "maxPasien",
          placeholder: "Masukkan Maksimal Pasien...",
          colSize: 6,
          rules: { required: "Maksimal Pasien harus diisi" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      await dispatch(createJadwalPraktek(data)).unwrap();
      showAlert.success("Data dokter berhasil ditambahkan!", () => {
        router.push(
          "/MasterData/master-dokter/jadwal-praktek/table-jadwal-praktek"
        );
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
        backPath="/MasterData/master-dokter/jadwal-praktek/table-jadwal-praktek"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default AddFormJadwalPraktek;
