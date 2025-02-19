"use client";
import React, { Fragment, memo } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { useForm } from "react-hook-form";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";

const FormAddPoliklinik = () => {
  const router = useRouter();
  const { setValue } = useForm();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          id: "kode",
          label: "Kode",
          name: "kode",
          placeholder: "Masukkan kode tindakan",
          rules: { required: "Kode tindakan wajib diisi" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaTindakan",
          label: "Tindakan",
          name: "namaTindakan",
          placeholder: "Masukkan nama tindakan",
          rules: { required: "Nama tindakan wajib diisi" },
          colSize: 6,
        },
        {
          type: "text",
          id: "tindakanDiTagihan",
          label: "Tindakan Ditagihkan",
          name: "tindakanDiTagihan",
          placeholder: "Masukkan tindakan ditagihkan",
          colSize: 6,
        },
        {
          type: "text",
          id: "medicalService",
          label: "Medical Service in Bill",
          name: "medicalService",
          placeholder: "Masukkan medical service",
          colSize: 6,
        },
        {
          type: "select",
          id: "butuhDokter",
          label: "Butuh Dokter",
          name: "butuhDokter",
          placeholder: "Pilih opsi",
          options: [
            { label: "Ya", value: "ya" },
            { label: "Tidak", value: "tidak" },
          ],
          colSize: 6,
        },
        {
          type: "select",
          id: "konsultasi",
          label: "Konsultasi",
          name: "konsultasi",
          options: [{ label: "Aktif Konsultasi", value: "aktifKonsultasi" }],
          colSize: 12,
        },
        {
          type: "select",
          id: "opsionalCheckbox",
          label: "Pengaturan Tindakan",
          name: "opsionalCheckbox",
          options: [
            {
              label: "Otomatis di-tagihkan sebagai tambahan tarif jasa dokter",
              value: "otomatisTagihan",
            },
            { label: "Ikut tarif jasa medis terkait", value: "ikutJasaMedis" },
            {
              label: "Ikut jasa sarana sesuai tipe tindakan",
              value: "ikutJasaSarana",
            },
          ],
          colSize: 12,
        },
        {
          type: "text",
          id: "jenisPenjamin",
          label: "Termasuk Penjamin",
          name: "jenisPenjamin",
          placeholder: "Masukkan penjamin",
          colSize: 6,
        },
      ],
    },
  ];
  const handleSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <Fragment>
      <DynamicForm
        title="Penambahan Tindakan Poliklinik"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-poliklinik/data-tindakan-poli-klinik`}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddPoliklinik;
