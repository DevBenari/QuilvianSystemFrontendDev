"use client";
import React, { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";

const AsuransiAddForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSubmit = async (data) => {
    try {
      await dispatch(createAsuransi(data)).unwrap();
      alert("Asuransi berhasil ditambahkan!");
      router.push("/MasterData/master-asuransi/daftar-asuransi");
    } catch (error) {
      console.error("Gagal menambahkan asuransi:", error);
      alert("Gagal menambahkan data asuransi.");
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Asuransi",
          name: "kodeAsuransi",
          placeholder: "Masukkan Kode Asuransi...",
          defaultValue: "",
          colSize: 6,
        },
        {
          type: "select",
          label: "Nama Asuransi",
          name: "namaAsuransi",
          placeholder: "Pilih Nama Asuransi...",
          colSize: 6,
          options: [
            { value: "Prudential", label: "Prudential" },
            { value: "Allianz", label: "Allianz" },
            { value: "Manulife", label: "Manulife" },
            { value: "AXA Mandiri", label: "AXA Mandiri" },
            { value: "AIA Financial", label: "AIA Financial" },
            { value: "Sinarmas", label: "Sinarmas" },
            { value: "Zurich Insurance", label: "Zurich Insurance" },
            { value: "Sequis Life", label: "Sequis Life" },
            { value: "FWD Life", label: "FWD Life" },
          ],
          rules: { required: "Nama asuransi harus dipilih" },
        },

        {
          type: "select",
          label: "Tipe Perusahaan",
          name: "tipePerusahaan",
          placeholder: "Pilih Tipe Perusahaan...",
          colSize: 6,
          options: [
            {
              value: "Pemerintah / Instansi Negara",
              label: "Pemerintah / Instansi Negara",
            },
            {
              value: "BUMN (Badan Usaha Milik Negara)",
              label: "BUMN (Badan Usaha Milik Negara)",
            },
            {
              value: "BUMD (Badan Usaha Milik Daerah)",
              label: "BUMD (Badan Usaha Milik Daerah)",
            },
            { value: "Swasta Nasional", label: "Swasta Nasional" },
            { value: "Swasta Multinasional", label: "Swasta Multinasional" },
            { value: "Lembaga Pendidikan", label: "Lembaga Pendidikan" },
            { value: "Lembaga Kesehatan", label: "Lembaga Kesehatan" },
            { value: "Lembaga Keagamaan", label: "Lembaga Keagamaan" },
            {
              value: "Lembaga Sosial / Non-Profit",
              label: "Lembaga Sosial / Non-Profit",
            },
            {
              value: "UMKM (Usaha Mikro, Kecil, dan Menengah)",
              label: "UMKM (Usaha Mikro, Kecil, dan Menengah)",
            },
            {
              value: "Startup / Perusahaan Teknologi",
              label: "Startup / Perusahaan Teknologi",
            },
            { value: "Lainnya", label: "Lainnya" },
          ],
          rules: { required: "Tipe perusahaan harus dipilih" },
        },

        {
          type: "select",
          label: "Status",
          name: "status",
          placeholder: "Pilih Status...",
          colSize: 6,
          options: [
            { value: "Aktif", label: "Aktif" },
            { value: "Non-Aktif", label: "Non-Aktif" },
          ],
          rules: { required: "Status harus dipilih" },
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Asuransi"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-informasi/asuransi/table-asuransi"
        isAddMode={true}
      />
    </Fragment>
  );
};

export default AsuransiAddForm;
