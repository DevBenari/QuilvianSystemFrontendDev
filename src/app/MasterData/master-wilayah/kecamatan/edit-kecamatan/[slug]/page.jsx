"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { extractIdFromSlug } from "@/utils/slug";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";

import {
  deleteKecamatan,
  fetchKecamatanById,
  updateKecamatan,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KecamatanSlice";
import useWilayahData from "@/lib/hooks/useWilayahData";

const KecamatanEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedKecamatan, loading, error } = useSelector(
    (state) => state.Kecamatan
  );
  const [dataKecamatan, setDataKecamatan] = useState(null);

  // Start option data kabupaten kota dan provinsi

  // End  option data kabupaten kota dan provinsi

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchKecamatanById(id));
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (selectedKecamatan) {
      setDataKecamatan(selectedKecamatan);
    }
  }, [selectedKecamatan]);

  console.log("selected kecamatan :", selectedKecamatan);

  const {
    KabupatenKotaOptions,
    loadingKabupatenKota,
    handleLoadMoreKabupatenKota,
  } = useWilayahData();

  const formFields = [
    {
      fields: [
        {
          type: "select",
          id: "kabupatenKotaId",
          label: "Kabupaten Kota",
          name: "kabupatenKotaId",
          placeholder: "Pilih Kabupaten Kota",
          options: KabupatenKotaOptions,
          rules: { required: "Kabupaten Kota is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreKabupatenKota,
          isLoading: loadingKabupatenKota,
        },
        {
          type: "text",
          label: "Nama Kecamatan",
          name: "namaKecamatan",
          placeholder: "Masukkan Nama Kecamatan...",
          colSize: 6,
          rules: { required: "Nama Kabupaten Kota harus diisi" },
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
      value: dataKecamatan?.[field.name] ?? "",
    })),
  }));

  const handleSubmit = async (data) => {
    try {
      const id = dataKecamatan?.kecamatanId; // Pastikan ID tidak undefined
      if (!id) {
        console.error("❌ ID Kecamatan tidak ditemukan, gagal update.");
        return;
      }
      console.log("📢 Data yang dikirim ke API (PUT):", { id, data });

      await dispatch(updateKecamatan({ id, data })).unwrap();
      showAlert.success("Data Kecamatan berhasil diperbarui!", () => {
        router.push("/MasterData/master-wilayah/kecamatan/table-kecamatan");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
    } catch (error) {
      console.error("❌ Gagal memperbarui data Kecamatan:", error);
      showAlert.error("Gagal memperbarui data Kecamatan.");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete(
      "Data Kecamatan akan dihapus permanen",
      async () => {
        try {
          await dispatch(deleteKecamatan(dataKecamatan.kecamatanId)).unwrap();
          showAlert.success("Data Kecamatan berhasil dihapus!", () => {
            router.push("/MasterData/master-wilayah/kecamatan/table-kecamatan");
            setTimeout(() => {
              window.location.reload();
            }, 100);
          });
        } catch (error) {
          console.error("❌ Gagal menghapus data Kecamatan:", error);
          showAlert.error("Gagal menghapus data Kecamatan.");
        }
      }
    );
  };

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Kecamatan"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        backPath="/MasterData/master-wilayah/kecamatan/table-kecamatan"
        isAddMode={false}
        userData={dataKecamatan}
      />
    </Fragment>
  );
};

export default KecamatanEditForm;
