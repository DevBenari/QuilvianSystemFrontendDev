"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import UploadPhotoField from "@/components/ui/uploadPhoto-field";
import { createDokter } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";

import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import TableSelection from "@/components/ui/tableSelection";
import useAsuransiData from "@/lib/hooks/useAsuransi";

// Asumsi: Hook untuk data Poli (buat sesuai kebutuhan)
const usePoliData = () => {
  // Contoh data dummy poli (ganti dengan data asli dari API)
  const PoliOptions = [
    { label: "Poli Umum", value: "123e4567-e89b-12d3-a456-426614174000" },
    { label: "Poli Gigi", value: "223e4567-e89b-12d3-a456-426614174001" },
    { label: "Poli Mata", value: "323e4567-e89b-12d3-a456-426614174002" },
    { label: "Poli Jantung", value: "423e4567-e89b-12d3-a456-426614174003" },
  ];

  return {
    PoliOptions,
    loadingPoli: false,
    handleLoadMorePoli: () => {},
  };
};

const AddFormDokter = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Ambil data asuransi dan poli
  const { AsuransiOptions, loadingAsuransi, handleLoadMoreAsuransi } =
    useAsuransiData();
  const { PoliOptions, loadingPoli, handleLoadMorePoli } = usePoliData();

  const methods = useForm({
    defaultValues: {
      AsuransiId: [], // Inisialisasi array kosong untuk AsuransiId
      PoliId: [], // Inisialisasi array kosong untuk PoliId
      tempAsuransiSelect: null, // Field sementara untuk select asuransi
      tempPoliSelect: null, // Field sementara untuk select poli
    },
  });

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
      ],
    },
    {
      section: "Foto Dokter",
      fields: [
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
      ],
    },
    {
      section: "Data Asuransi dan Data Poli",
      fields: [
        {
          type: "custom",
          name: "AsuransiId", // Pastikan nama-nya sesuai dengan format API
          id: "AsuransiId",
          label: "Data Asuransi",
          customRender: (props) => (
            <TableSelection
              name="AsuransiId"
              label="Asuransi"
              options={AsuransiOptions}
              isLoading={loadingAsuransi}
              onLoadMore={handleLoadMoreAsuransi}
              tempSelectName="tempAsuransiSelect"
              {...props}
            />
          ),
          colSize: 12,
        },
        {
          type: "custom",
          name: "PoliId", // Pastikan nama-nya sesuai dengan format API
          id: "PoliId",
          label: "Data Poli",
          customRender: (props) => (
            <TableSelection
              name="PoliId"
              label="Poli"
              options={PoliOptions}
              isLoading={loadingPoli}
              onLoadMore={handleLoadMorePoli}
              tempSelectName="tempPoliSelect"
              {...props}
            />
          ),
          colSize: 12,
        },
      ],
    },
  ];

  // Di form component
  const handleSubmit = async (data) => {
    try {
      // Bersihkan data sebelum dikirim ke API
      const cleanedData = { ...data };
      delete cleanedData.tempAsuransiSelect;
      delete cleanedData.tempPoliSelect;

      // Log data untuk debugging
      console.log("Form data to be submitted:", cleanedData);

      await dispatch(createDokter(cleanedData)).unwrap();
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
          backPath="/MasterData/master-dokter/dokter/table-dokter"
          isAddMode={true}
        />
      </Fragment>
    </FormProvider>
  );
};

export default AddFormDokter;
