"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { extractIdFromSlug } from "@/utils/slug";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";

import useProvinsiData from "@/lib/hooks/useProvinsiData";

import useKabupatenKotaData from "@/lib/hooks/useKabupatenKotaData";
import {
  updateKelurahan,
  deleteKelurahan,
  fetchKelurahanById,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kelurahanSlice";
import useKecamatanData from "@/lib/hooks/useKecamatanData";

const KelurahanEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedKelurahan, loading, error } = useSelector(
    (state) => state.Kelurahan
  );
  const [dataKelurahan, setDataKelurahan] = useState(null);

  // Start option data kabupaten kota dan provinsi

  const {
    KecamatanOptions,
    loading: KecamatanLoading,
    handleLoadMore: handleLoadMoreKecamatan,
  } = useKecamatanData();

  const {
    KabupatenKotaOptions,
    loading: KabupatenKotaLoading,
    handleLoadMore: handleLoadMoreKabupatenKota,
  } = useKabupatenKotaData();

  const {
    ProvinsiOptions,
    loading: provinsiLoading,
    handleLoadMore: handleLoadMoreProvinsi,
  } = useProvinsiData();

  // End  option data kabupaten kota dan provinsi

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchKelurahanById(id));
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (selectedKelurahan) {
      setDataKelurahan(selectedKelurahan);
    }
  }, [selectedKelurahan]);

  const handleSubmit = async (data) => {
    try {
      const id = dataKelurahan?.kelurahanId; // Pastikan ID tidak undefined
      if (!id) {
        console.error("❌ ID Kelurahan tidak ditemukan, gagal update.");
        return;
      }
      console.log("📢 Data yang dikirim ke API (PUT):", { id, data });

      await dispatch(updateKelurahan({ id, data })).unwrap();
      showAlert.success("Data Kelurahan berhasil diperbarui!", () => {
        router.push("/MasterData/master-wilayah/kelurahan/table-kelurahan");
      });
    } catch (error) {
      console.error("❌ Gagal memperbarui data Kelurahan:", error);
      showAlert.error("Gagal memperbarui data Kelurahan.");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete(
      "Data Kelurahan akan dihapus permanen",
      async () => {
        try {
          await dispatch(deleteKelurahan(dataKelurahan.kelurahanId)).unwrap();
          showAlert.success("Data Kelurahan berhasil dihapus!", () => {
            router.push("/MasterData/master-wilayah/kelurahan/table-kelurahan");
          });
        } catch (error) {
          console.error("❌ Gagal menghapus data Kelurahan:", error);
          showAlert.error("Gagal menghapus data Kelurahan.");
        }
      }
    );
  };

  const formFields = [
    {
      fields: [
        {
          type: "select",
          id: "kecamatanId",
          label: "Kecamatan",
          name: "kecamatanId",
          placeholder: "Pilih Kecamatan",
          options: KecamatanOptions,
          rules: { required: "Kecamatan is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreKecamatan,
          isLoading: KecamatanLoading,
        },
        {
          type: "text",
          label: "Nama Kelurahan",
          name: "namaKelurahan",
          placeholder: "Masukkan Nama Kelurahan",
          colSize: 6,
          rules: { required: "Nama Kelurahan Kota harus diisi" },
        },
      ],
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Terjadi kesalahan: {error}</div>;

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataKelurahan?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Kelurahan"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        backPath="/MasterData/master-wilayah/kelurahan/table-kelurahan"
        isAddMode={false}
        userData={dataKelurahan}
      />
    </Fragment>
  );
};

export default KelurahanEditForm;
