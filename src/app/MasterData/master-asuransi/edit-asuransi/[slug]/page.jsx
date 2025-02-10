"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";

import { extractIdFromSlug } from "@/utils/slug";
import {
  fetchAsuransiById,
  updateAsuransi,
  deleteAsuransi,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";

const AsuransiEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedAsuransi, loading, error } = useSelector(
    (state) => state.asuransi
  );
  const [dataAsuransi, setDataAsuransi] = useState(null);

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchAsuransiById(id));
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (selectedAsuransi) {
      setDataAsuransi(selectedAsuransi);
    }
  }, [selectedAsuransi]);

  const handleSubmit = async (data) => {
    try {
      await dispatch(
        updateAsuransi({ id: dataAsuransi.asuransiId, data })
      ).unwrap();
      alert("Data asuransi berhasil diperbarui!");
      router.push("/MasterData/master-asuransi/daftar-asuransi");
    } catch (error) {
      console.error("Gagal memperbarui data asuransi:", error);
      alert("Gagal memperbarui data asuransi.");
    }
  };

  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await dispatch(deleteAsuransi(dataAsuransi.asuransiId)).unwrap();
        alert("Data asuransi berhasil dihapus!");
        router.push("/MasterData/master-asuransi/daftar-asuransi");
      } catch (error) {
        console.error("Gagal menghapus data asuransi:", error);
        alert("Gagal menghapus data asuransi.");
      }
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
          colSize: 6,
          defaultValue: dataAsuransi?.kodeAsuransi || "",
        },

        {
          type: "select",
          label: "Nama Asuransi",
          name: "namaAsuransi",

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
          defaultValue: dataAsuransi?.namaAsuransi || "",
          placeholder: dataAsuransi?.namaAsuransi || "Pilih Nama Asuransi...",
          rules: { required: "Nama asuransi harus dipilih" },
        },
        {
          type: "select",
          label: "Tipe Perusahaan",
          name: "tipePerusahaan",
          placeholder:
            dataAsuransi?.tipePerusahaan || "Pilih Tipe Perusahaan...",
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
          defaultValue: dataAsuransi?.tipePerusahaan || "",

          rules: { required: "Tipe perusahaan harus dipilih" },
        },
        {
          type: "select",
          label: "Status",
          name: "status",
          placeholder: dataAsuransi?.status || "Pilih Status...",
          colSize: 6,
          options: [
            { value: "Aktif", label: "Aktif" },
            { value: "Non-Aktif", label: "Non-Aktif" },
          ],
          defaultValue: dataAsuransi?.status || "",
          rules: { required: "Status harus dipilih" },
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Asuransi"
        formConfig={formFields}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        backPath="/MasterData/master-asuransi/daftar-asuransi"
      />
    </Fragment>
  );
};

export default AsuransiEditForm;
