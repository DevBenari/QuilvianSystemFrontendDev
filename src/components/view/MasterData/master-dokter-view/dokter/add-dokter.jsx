"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createDokter } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

const AddFormDokter = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createDokter(data)).unwrap();
      showAlert.success("Data dokter berhasil ditambahkan!", () => {
        router.push("/MasterData/master-dokter/dokter/table-dokter");
      });
    } catch (error) {
      console.error("Gagal menambahkan dokter:", error);
      showAlert.error("Gagal menambahkan data dokter.");
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Dokter",
          name: "kdDokter",
          placeholder: "Masukkan Kode Dokter...",
          colSize: 6,
          rules: { required: "Kode Dokter harus diisi" },
        },
        {
          type: "text",
          label: "Nama Dokter",
          name: "nmDokter",
          placeholder: "Masukkan Nama Dokter...",
          colSize: 6,
          rules: { required: "Nama Dokter harus diisi" },
        },
        {
          type: "text",
          label: "SIP",
          name: "sip",
          placeholder: "Masukkan SIP...",
          colSize: 6,
          rules: { required: "SIP harus diisi" },
        },
        {
          type: "text",
          label: "STR",
          name: "str",
          placeholder: "Masukkan STR...",
          colSize: 6,
          rules: { required: "STR harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal SIP",
          name: "tglSip",
          placeholder: "Pilih Tanggal SIP...",
          colSize: 6,
          rules: { required: "Tanggal SIP harus dipilih" },
        },
        {
          type: "date",
          label: "Tanggal STR",
          name: "tglStr",
          placeholder: "Pilih Tanggal STR...",
          colSize: 6,
          rules: { required: "Tanggal STR harus dipilih" },
        },
        {
          type: "text",
          label: "Panggilan Dokter",
          name: "panggilDokter",
          placeholder: "Masukkan Panggilan Dokter...",
          colSize: 6,
          rules: { required: "Panggilan Dokter harus diisi" },
        },
        {
          type: "text",
          label: "NIK",
          name: "nik",
          placeholder: "Masukkan NIK...",
          colSize: 6,
          rules: { required: "NIK harus diisi" },
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Dokter"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-dokter/table-dokter"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default AddFormDokter;
