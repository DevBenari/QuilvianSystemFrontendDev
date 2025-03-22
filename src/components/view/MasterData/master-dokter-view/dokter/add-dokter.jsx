"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import UploadPhotoField from "@/components/ui/uploadPhoto-field";
import { createDokter } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";
import TableSelection from "@/components/ui/tableSelection";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useMedicalData from "@/lib/hooks/useDokter";
import useAsuransiData from "@/lib/hooks/useAsuransi";

// Import custom hooks for data

const AddFormDokter = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Ambil data asuransi dan poli dari API menggunakan custom hooks
  const { AsuransiOptions, loadingAsuransi, handleLoadMoreAsuransi } =
    useAsuransiData();
  const { PoliKlinikOptions, loadingPoliKlinik, handleLoadMorePoliKlinik } =
    useMedicalData();

  const methods = useForm({
    defaultValues: {
      NmDokter: "",
      Sip: "",
      Str: "",
      TglSip: "",
      TglStr: "",
      Nohp: "",
      Nik: "",
      Email: "",
      Alamat: "",
      IsAsuransi: false,
      Foto: null,
      AsuransiId: [],
      PoliId: [],
    },
  });

  // Field names diubah agar sesuai dengan API (diawali dengan huruf kapital)
  const formFields = [
    {
      section: "Data Asuransi dan Data Poli",
      fields: [
        {
          type: "custom",
          name: "AsuransiId",
          id: "AsuransiId",
          label: "Data Asuransi",
          rules: { required: "Minimal satu asuransi harus dipilih" },
          customRender: ({ field, commonProps }) => (
            <TableSelection
              {...commonProps}
              options={AsuransiOptions}
              loading={loadingAsuransi}
              handleLoadMore={handleLoadMoreAsuransi}
              selectPlaceholder="Pilih Asuransi..."
              rules={{ required: "Minimal satu asuransi harus dipilih" }}
            />
          ),
          colSize: 12,
        },
        {
          type: "custom",
          name: "PoliId",
          id: "PoliId",
          label: "Data Poli",
          rules: { required: "Minimal satu poli harus dipilih" },
          customRender: ({ field, commonProps }) => (
            <TableSelection
              {...commonProps}
              options={PoliKlinikOptions}
              loading={loadingPoliKlinik}
              handleLoadMore={handleLoadMorePoliKlinik}
              selectPlaceholder="Pilih Poli..."
              rules={{ required: "Minimal satu poli harus dipilih" }}
            />
          ),
          colSize: 12,
        },
      ],
    },
    // {
    //   section: "Informasi Dokter",
    //   fields: [
    //     {
    //       type: "text",
    //       label: "Nama Dokter",
    //       name: "NmDokter",
    //       placeholder: "Masukkan Nama Dokter...",
    //       colSize: 6,
    //       rules: { required: "Nama Dokter harus diisi" },
    //     },
    //     {
    //       type: "text",
    //       label: "SIP",
    //       name: "Sip",
    //       placeholder: "Masukkan SIP...",
    //       colSize: 6,
    //       rules: { required: "SIP harus diisi" },
    //     },
    //     {
    //       type: "text",
    //       label: "STR",
    //       name: "Str",
    //       placeholder: "Masukkan STR...",
    //       colSize: 6,
    //       rules: { required: "STR harus diisi" },
    //     },
    //     {
    //       type: "date",
    //       label: "Tanggal SIP",
    //       name: "TglSip",
    //       placeholder: "Pilih Tanggal SIP...",
    //       colSize: 6,
    //     },
    //     {
    //       type: "date",
    //       label: "Tanggal STR",
    //       name: "TglStr",
    //       placeholder: "Pilih Tanggal STR...",
    //       colSize: 6,
    //     },
    //     {
    //       type: "text",
    //       label: "No Hp",
    //       name: "Nohp",
    //       placeholder: "Masukkan No Hp...",
    //       colSize: 6,
    //       rules: { required: "No Hp harus diisi" },
    //     },
    //     {
    //       type: "text",
    //       label: "NIK",
    //       name: "Nik",
    //       placeholder: "Masukkan NIK...",
    //       colSize: 6,
    //       rules: { required: "NIK harus diisi" },
    //     },
    //     {
    //       type: "email",
    //       label: "Email",
    //       name: "Email",
    //       placeholder: "Masukkan Email...",
    //       colSize: 6,
    //       rules: { required: "Email harus diisi" },
    //     },
    //     {
    //       type: "textarea",
    //       label: "Alamat",
    //       name: "Alamat",
    //       placeholder: "Masukkan Alamat...",
    //       colSize: 12,
    //     },
    //   ],
    // },
    // {
    //   section: "Foto dan Status Asuransi",
    //   fields: [
    //     {
    //       type: "select",
    //       id: "isAsuransi",
    //       label: "Asuransi",
    //       name: "IsAsuransi",
    //       placeholder: "Asuransi",
    //       options: [
    //         { label: "Ya", value: true },
    //         { label: "Tidak", value: false },
    //       ],
    //       colSize: 6,
    //     },
    //     {
    //       type: "custom",
    //       id: "Foto",
    //       name: "Foto",
    //       label: "Upload Foto Dokter",
    //       rules: { required: "Foto dokter wajib diisi" },
    //       customRender: (props) => <UploadPhotoField {...props} />,
    //       colSize: 6,
    //     },
    //   ],
    // },
  ];

  // Handler submit form
  const handleSubmit = async (data) => {
    try {
      // Parse string arrays to actual arrays if needed
      const parsedData = { ...data };

      // Parse AsuransiId if it's a string
      if (typeof parsedData.AsuransiId === "string") {
        try {
          parsedData.AsuransiId = JSON.parse(parsedData.AsuransiId);
        } catch (e) {
          console.error("Error parsing AsuransiId", e);
          parsedData.AsuransiId = [];
        }
      }

      // Parse PoliId if it's a string
      if (typeof parsedData.PoliId === "string") {
        try {
          parsedData.PoliId = JSON.parse(parsedData.PoliId);
        } catch (e) {
          console.error("Error parsing PoliId", e);
          parsedData.PoliId = [];
        }
      }

      // Log data untuk debugging
      console.log("Form data to be submitted:", parsedData);

      // // Kirim data ke API
      // await dispatch(createDokter(parsedData)).unwrap();

      // // Tampilkan notifikasi sukses
      // showAlert.success("Data dokter berhasil ditambahkan!", () => {
      //   router.push("/MasterData/master-dokter/dokter/table-dokter");
      // });
    } catch (error) {
      // console.error("Gagal menambahkan dokter:", error);
      // showAlert.error(
      //   "Gagal menambahkan data dokter: " +
      //     (error.message || "Terjadi kesalahan")
      // );
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
          navigationConfig={{
            nextButtonText: "Selanjutnya",
            prevButtonText: "Sebelumnya",
            submitButtonText: "Simpan Data Dokter",
          }}
        />
      </Fragment>
    </FormProvider>
  );
};

export default AddFormDokter;
