"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { extractIdFromSlug } from "@/utils/slug";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";

import {
  updateKelurahan,
  deleteKelurahan,
  fetchKelurahanById,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kelurahanSlice";
import useWilayahData from "@/lib/hooks/useWilayahData";
import { resetWilayahState } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";

const KelurahanEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedKelurahan, loading, error } = useSelector(
    (state) => state.Kelurahan
  );
  const [dataKelurahan, setDataKelurahan] = useState(null);

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchKelurahanById(id));
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (selectedKelurahan) {
      setDataKelurahan(selectedKelurahan);
    }
  }, [selectedKelurahan]);

  const { KecamatanOptions, handleLoadMoreKecamatan } = useWilayahData({
    kecamatan: true,
  });

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

  const handleSubmit = async (data) => {
    try {
      const id = dataKelurahan?.kelurahanId; // Pastikan ID tidak undefined
      if (!id) {
        console.error("❌ ID Kelurahan tidak ditemukan, gagal update.");
        return;
      }
      console.log("📢 Data yang dikirim ke API (PUT):", { id, data });

      await dispatch(updateKelurahan({ id, data })).unwrap();
      dispatch(resetWilayahState());
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
          dispatch(resetWilayahState());
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
