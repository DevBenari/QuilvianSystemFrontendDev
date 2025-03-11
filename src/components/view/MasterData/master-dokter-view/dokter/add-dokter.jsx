"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import UploadPhotoField from "@/components/ui/uploadPhoto-field";
import { createDokter } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddFormDokter = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm();

  // Field names diubah agar sesuai dengan API (diawali dengan huruf kapital)
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Dokter",
          name: "NmDokter", // Diubah dari "nmDokter" menjadi "NmDokter"
          placeholder: "Masukkan Nama Dokter...",
          colSize: 6,
          rules: { required: "Nama Dokter harus diisi" },
        },
        {
          type: "text",
          label: "SIP",
          name: "Sip", // Diubah dari "sip" menjadi "Sip"
          placeholder: "Masukkan SIP...",
          colSize: 6,
          rules: { required: "SIP harus diisi" },
        },
        {
          type: "text",
          label: "STR",
          name: "Str", // Diubah dari "str" menjadi "Str"
          placeholder: "Masukkan STR...",
          colSize: 6,
          rules: { required: "STR harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal SIP",
          name: "TglSip", // Diubah dari "tglSip" menjadi "TglSip"
          placeholder: "Pilih Tanggal SIP...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Tanggal STR",
          name: "TglStr", // Diubah dari "tglStr" menjadi "TglStr"
          placeholder: "Pilih Tanggal STR...",
          colSize: 6,
        },
        {
          type: "text",
          label: "No Hp",
          name: "Nohp", // Diubah dari "nohp" menjadi "Nohp"
          placeholder: "Masukkan No Hp...",
          colSize: 6,
          rules: { required: "No Hp harus diisi" },
        },
        {
          type: "text",
          label: "NIK",
          name: "Nik", // Diubah dari "nik" menjadi "Nik"
          placeholder: "Masukkan NIK...",
          colSize: 6,
          rules: { required: "NIK harus diisi" },
        },
        {
          type: "email",
          label: "Email",
          name: "Email", // Diubah dari "email" menjadi "Email"
          placeholder: "Masukkan Email...",
          colSize: 6,
          rules: { required: "Email harus diisi" },
        },
        {
          type: "textarea",
          label: "Alamat",
          name: "Alamat", // Diubah dari "alamat" menjadi "Alamat"
          placeholder: "Masukkan Alamat...",
          colSize: 12,
        },
        {
          type: "select",
          id: "isAsuransi",
          label: "Asuransi",
          name: "IsAsuransi", // Diubah dari "isAsuransi" menjadi "IsAsuransi"
          placeholder: "Asuransi",
          options: [
            { label: "Ya", value: true },
            { label: "Tidak", value: false },
          ],

          colSize: 6,
        },
        {
          type: "custom",
          id: "Foto",
          name: "Foto",
          label: "Upload Foto Pasien",
          rules: { required: "Foto pasien wajib diisi" },
          customRender: (props) => <UploadPhotoField {...props} />,
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Foto",
          name: "FotoName",
          placeholder: "Masukkan Nama Foto...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Path Foto",
          name: "FotoPath",
          placeholder: "Masukkan Path Foto...",
          colSize: 6,
        },
      ],
    },
  ];

  // Di form component

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

  return (
    <FormProvider {...methods}>
      <Fragment>
        <DynamicStepForm
          title="Tambah Data Dokter"
          formConfig={formFields}
          onSubmit={handleSubmit}
          backPath="/MasterData/master-dokter/table-dokter"
          isAddMode={true}
        />
      </Fragment>
    </FormProvider>
  );
};

export default AddFormDokter;
