"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import useKategoriPeralatanData from "@/lib/hooks/useKategoriPeralatan";
import { createPeralatan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-peralatan/PeralatanSlice";
import { is, options, type } from "@amcharts/amcharts4/core";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useDispatch } from "react-redux";

const FormAddPeralatan = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    KategoriPeralatanOptions,
    loading: KategoriPeralatanLoading,
    handleLoadMore,
  } = useKategoriPeralatanData();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createPeralatan(data)).unwrap(); // Tunggu hasil dari dispatch
      showAlert.success("Data berhasil disimpan", () => {
        router.push(
          "/MasterData/master-kategori-peralatan/peralatan/table-peralatan"
        );
      });
    } catch (error) {
      console.error("Gagal menambahkan Peralatan :", error);
      showAlert.error("Gagal menambahkan data Peralatan ");
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Peralatan",
          name: "namaPeralatan",
          placeholder: "Masukkan Nama Peralatan...",
          colSize: 6,
          rules: { required: "Nama Peralatan harus diisi" },
        },
        {
          type: "text",
          label: "Manufacturer",
          name: "manufacturer",
          placeholder: "Masukkan Nama Manufacturer...",
          colSize: 6,
          rules: { required: "Manufacturer harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Pembelian",
          name: "purchase_date",
          colSize: 6,
          rules: { required: "Tanggal Pembelian harus diisi" },
        },
        {
          type: "text",
          label: "Status Pemeliharaan",
          name: "maintenance_status",
          placeholder: "Masukkan Status Pemeliharaan...",
          colSize: 6,
          rules: { required: "Status Pemeliharaan harus diisi" },
        },
        {
          type: "text",
          label: "Status Operasional",
          name: "operational_status",
          placeholder: "Masukkan Status Operasional...",
          colSize: 6,
          rules: { required: "Status Operasional harus diisi" },
        },
        {
          type: "text",
          label: "Nama Departemen",
          name: "department_name",
          placeholder: "Masukkan Nama Departemen...",
          colSize: 6,
          rules: { required: "Nama Departemen harus diisi" },
        },
        {
          type: "text",
          label: "Lokasi",
          name: "location",
          placeholder: "Masukkan Lokasi...",
          colSize: 6,
          rules: { required: "Lokasi harus diisi" },
        },
        {
          type: "select",
          id: "kategoriPeralatanId",
          label: "Kategori Peralatan",
          name: "kategoriPeralatanId",
          options: KategoriPeralatanOptions,
          rules: { required: "Kategori Peralatan harus diisi" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMore,
          isLoading: KategoriPeralatanLoading,
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Peralatan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={
          "/MasterData/master-kategori-peralatan/peralatan/table-peralatan"
        }
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddPeralatan;
