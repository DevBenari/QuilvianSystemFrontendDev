"use client";

import DynamicFormEdit from "@/components/dynamicFormEdit/dynamicFormEdit";
import { editByIdTindakanOperasi } from "@/lib/hooks/manajemen-operasi/tindakan-operasi/edit";
import { getbyidTindakanOperasi } from "@/lib/hooks/manajemen-operasi/tindakan-operasi/getById";

import { jenisOperasi, kategoriOperasi } from "@/utils/masterData";
import { useSearchParams, useRouter } from "next/navigation";

import React, { Fragment, useEffect, useState } from "react";

const EditTindakanOperasi = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [tindakanOperasi, setTindakanOperasi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getbyidTindakanOperasi(id)
        .then((response) => {
          setTindakanOperasi(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch tindakanOperasi:", error);
          setLoading(false);
        });
    }
  });

  const handleSubmit = async (data) => {
    try {
      const response = await editByIdTindakanOperasi(data, id);
      alert("sukses memperbarui data tindakan operasi");
      console.log("Response:", response);
      router.push("/MasterData/daftar-tindakan-operasi");
    } catch (error) {
      console.error(error);
      alert("gagal memperbarui data tindakan operasi");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!tindakanOperasi) {
    return <p>Tindakan Operasi not found</p>;
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
          placeholder: tindakanOperasi?.kategoriOperasi,
          value: tindakanOperasi?.kategoriOperasi,
          options: kategoriOperasi,
          rules: { required: "Kategori Operasi is required" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipeOperasi",
          label: "Jenis Operasi",
          name: "tipeOperasi",
          placeholder: tindakanOperasi?.tipeOperasi,
          options: jenisOperasi,
          value: tindakanOperasi?.tipeOperasi,
          rules: { required: "Jenis Operasi is required" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaTindakanOperasi",
          label: "Nama Tindakan Operasi",
          name: "namaTindakanOperasi",
          placeholder: "Nama Tindakan Operasi",
          rules: { required: "Nama Tindakan Operasi is required" },
          colSize: 6,
          value: tindakanOperasi?.namaTindakanOperasi,
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
          placeholder: "Nama Dokter Operasi 1",
          rules: { required: "Nama Dokter Operasi 1 is required" },
          colSize: 6,
          value: tindakanOperasi?.namaDokterOperasi1,
        },
        {
          type: "text",
          id: "namaDokterOperasi2",
          label: "Nama Dokter Operasi 2",
          name: "namaDokterOperasi2",
          placeholder: "Nama Dokter Operasi 2",
          rules: { required: "Nama Dokter Operasi 2 is required" },
          colSize: 6,
          value: tindakanOperasi?.namaDokterOperasi2,
        },
        {
          type: "text",
          id: "namaDokterOperasi3",
          label: "Nama Dokter Operasi 3",
          name: "namaDokterOperasi3",
          placeholder: "Nama Dokter Operasi 3",
          rules: { required: "Nama Dokter Operasi 3 is required" },
          colSize: 6,
          value: tindakanOperasi?.namaDokterOperasi3,
        },
        {
          type: "select",
          id: "perhitunganRewardDokter",
          label: "Kategori Operasi",
          name: "perhitunganRewardDokter",
          placeholder: tindakanOperasi?.perhitunganRewardDokter,
          options: [
            { label: "Dapat Reward", value: "Dapat Reward" },
            { label: "Tidak Dapat Reward", value: "Tidak Dapat Reward" },
          ],
          rules: { required: "Kategori Operasi is required" },
          colSize: 6,
          value: tindakanOperasi?.perhitunganRewardDokter,
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicFormEdit
        title="Edit Tindakan Operasi"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default EditTindakanOperasi;
