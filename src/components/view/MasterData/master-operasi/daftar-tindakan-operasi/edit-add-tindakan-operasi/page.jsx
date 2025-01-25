"use client";

import DynamicFormEdit from "@/components/features/dynamic-form/dynamicForm-Edit-Add/dynamicFormEditAdd";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { addTindakanOperasi } from "@/lib/hooks/manajemen-operasi/tindakan-operasi/add";
import { editByIdTindakanOperasi } from "@/lib/hooks/manajemen-operasi/tindakan-operasi/edit";

import { getbyidTindakanOperasi } from "@/lib/hooks/manajemen-operasi/tindakan-operasi/getById";

import { jenisOperasi, kategoriOperasi } from "@/utils/masterData";
import { useSearchParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const AddEditOperasiForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditMode = Boolean(id); // Menentukan mode edit atau tambah

  const [tindakanOperasi, setTindakanOperasi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isEditMode && id) {
      // Fetch data jika dalam mode edit
      getbyidTindakanOperasi(id)
        .then((response) => {
          setTindakanOperasi(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch tindakanOperasi:", error);
          setLoading(false);
        });
    } else {
      setLoading(false); // Tidak perlu fetch data pada mode tambah
    }
  }, [id, isEditMode]);

  const handleSubmit = async (data) => {
    try {
      if (isEditMode) {
        await editByIdTindakanOperasi(data, id);
        alert("Data berhasil diperbarui");
        console.log("Edit Response:", data);
      } else {
        await addTindakanOperasi(data);
        alert("Data berhasil ditambahkan");
        console.log("Add Response:", data);
      }
      router.push("/MasterData/daftar-tindakan-operasi");
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menyimpan data");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const formFields = [
    {
      section: "Data Tindakan Operasi",
      fields: [
        {
          type: "select",
          id: "kategoriOperasi",
          label: "Kategori Operasi",
          name: "kategoriOperasi",
          placeholder: tindakanOperasi?.kategoriOperasi || "Pilih kategori",
          value: tindakanOperasi?.kategoriOperasi || "",
          options: kategoriOperasi,
          rules: { required: "Kategori Operasi is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipeOperasi",
          label: "Jenis Operasi",
          name: "tipeOperasi",
          placeholder: tindakanOperasi?.tipeOperasi || "Pilih jenis operasi",
          value: tindakanOperasi?.tipeOperasi || "",
          options: jenisOperasi,
          rules: { required: "Jenis Operasi is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaTindakanOperasi",
          label: "Nama Tindakan Operasi",
          name: "namaTindakanOperasi",
          value: tindakanOperasi?.namaTindakanOperasi || "",
          rules: { required: "Nama Tindakan Operasi is required" },
          colSize: 6,
          placeholder: "isi nama tindakan operasi",
        },
      ],
    },
    {
      section: "Dokter Tambahan",
      fields: [
        {
          type: "text",
          id: "namaDokterOperasi1",
          label: "Nama Dokter Operasi 1",
          name: "namaDokterOperasi1",
          value: tindakanOperasi?.namaDokterOperasi1 || "",
          placeholder: "isi nama dokter",
          rules: { required: "Nama Dokter Operasi 1 is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaDokterOperasi2",
          label: "Nama Dokter Operasi 2",
          name: "namaDokterOperasi2",
          value: tindakanOperasi?.namaDokterOperasi2 || "",
          placeholder: "isi nama dokter",

          rules: { required: "Nama Dokter Operasi 2 is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaDokterOperasi3",
          label: "Nama Dokter Operasi 3",
          name: "namaDokterOperasi3",
          value: tindakanOperasi?.namaDokterOperasi3 || "",
          placeholder: "isi nama dokter",

          rules: { required: "Nama Dokter Operasi 3 is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "perhitunganRewardDokter",
          label: "Kategori Operasi",
          name: "perhitunganRewardDokter",
          value: tindakanOperasi?.perhitunganRewardDokter || "",
          options: [
            { label: "Dapat Reward", value: "Dapat Reward" },
            { label: "Tidak Dapat Reward", value: "Tidak Dapat Reward" },
          ],
          rules: { required: "Kategori Operasi is required" },
          colSize: 6,
          placeholder:
            tindakanOperasi?.perhitunganRewardDokter || "Pilih Kategori Reward",
        },
      ],
    },
  ];

  return (
    <DynamicFormEdit
      title={isEditMode ? "Edit Tindakan Operasi" : "Tambah Tindakan Operasi"}
      formConfig={formFields}
      onSubmit={handleSubmit}
    />
  );
};

export default AddEditOperasiForm;
