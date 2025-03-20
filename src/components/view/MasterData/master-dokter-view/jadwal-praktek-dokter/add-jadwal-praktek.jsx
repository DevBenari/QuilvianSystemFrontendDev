"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import ImprovedTimePicker from "@/components/ui/time-input";
import useMedicalData from "@/lib/hooks/useDokter";
import { createJadwalPraktek } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/JadwalPraktekSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddFormJadwalPraktek = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { DokterPoliOptions, handleLoadMoreDokterPoli } = useMedicalData();

  const formFields = [
    {
      fields: [
        {
          type: "select",
          label: "Pilih Dokter",
          name: "dokterPoliId",
          options: DokterPoliOptions,
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreDokterPoli,
          rules: { required: "Dokter harus dipilih" },
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
          id: "jamMulai",
          type: "time", // Gunakan komponen TimeField
          label: "Jam Mulai Praktek",
          name: "jamMulai",
          placeholder: "Pilih Jam Mulai...",
          colSize: 6,
          rules: { required: "Jam Mulai harus diisi" },
        },
        {
          id: "jamSelesai",
          type: "time", // Gunakan komponen TimeField
          label: "Jam Selesai Praktek",
          name: "jamSelesai",
          placeholder: "Pilih Jam Selesai...",
          colSize: 6,
          // rules: {
          //   required: "Jam Selesai harus diisi",
          //   validate: (value, formValues) => {
          //     if (formValues.jamMulai && value <= formValues.jamMulai) {
          //       return "Jam Selesai harus lebih besar dari Jam Mulai";
          //     }
          //     return true;
          //   },
          // },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    console.log("form data", data);
    // try {
    //   await dispatch(createJadwalPraktek(data)).unwrap();
    //   showAlert.success("Data dokter berhasil ditambahkan!", () => {
    //     router.push(
    //       "/MasterData/master-dokter/jadwal-praktek/table-jadwal-praktek"
    //     );
    //   });
    // } catch (error) {
    //   console.error("Gagal menambahkan Dokter Poli:", error);
    //   showAlert.error("Gagal menambahkan data Dokter Poli.");
    // }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Jadwal Praktek"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-dokter/jadwal-praktek/table-jadwal-praktek"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default AddFormJadwalPraktek;
