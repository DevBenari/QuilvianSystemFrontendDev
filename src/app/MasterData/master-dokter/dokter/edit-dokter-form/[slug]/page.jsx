"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { extractIdFromSlug } from "@/utils/slug";
import {
  fetchDokterById,
  updateDokter,
  deleteDokter,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";
import { showAlert } from "@/components/features/alert/custom-alert";
import UploadPhotoField from "@/components/ui/uploadPhoto-field";
import DynamicStepForm from "@/components/features/dynamic-form/dynamicForm/dynamicFormSteps";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { FormProvider, useForm } from "react-hook-form";

const EditDokter = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedDokter, loading } = useSelector((state) => state.Dokter);
  const [dataDokter, setDataDokter] = useState(null);
  const methods = useForm();
  // Fetch data saat halaman dimuat
  useEffect(() => {
    dispatch(fetchDokterById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Update state setelah data dokter berhasil di-fetch
  useEffect(() => {
    if (selectedDokter) {
      setDataDokter(selectedDokter);
    }
  }, [selectedDokter]);

  console.log("selected by id : ", selectedDokter);
  // Submit form untuk update data
  console.log("data dokter :", dataDokter);

  // Konfigurasi Form Fields
  const formFields = [
    {
      section: "Data Dokter",
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
      section: "Asuransi Dan Foto Dokter",
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

  const handleSubmit = async (formData) => {
    try {
      await dispatch(
        updateDokter({ id: dataDokter.dokterId, data: formData })
      ).unwrap();
      showAlert.success("Data dokter berhasil diperbarui!", () => {
        router.push("/MasterData/master-dokter/dokter/table-dokter");
      });
    } catch (error) {
      console.error("Gagal memperbarui data dokter:", error);
      showAlert.error("Gagal memperbarui data dokter.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    showAlert.confirmDelete("Data dokter akan dihapus permanen", async () => {
      try {
        await dispatch(deleteDokter(dataDokter.dokterId)).unwrap();
        showAlert.success("Data dokter berhasil dihapus!", () => {
          router.push("/MasterData/master-dokter/dokter/table-dokter");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data dokter.");
      }
    });
  };

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataDokter?.[field.name] ?? "",
    })),
  }));

  return (
    <FormProvider {...methods}>
      <Fragment>
        <DynamicStepForm
          title="Edit Data Dokter"
          formConfig={formFieldsWithData}
          onSubmit={handleSubmit}
          userData={dataDokter}
          handleDelete={handleDelete}
          backPath="/MasterData/master-dokter/dokter/table-dokter"
          isAddMode={false}
        />
      </Fragment>
    </FormProvider>
  );
};

export default EditDokter;
