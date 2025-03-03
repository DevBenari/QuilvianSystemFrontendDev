"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { extractIdFromSlug } from "@/utils/slug";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";
import {
  updateKabupatenKota,
  fetchKabupatenKotaById,
  deleteKabupatenKota,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/KabupatenKotaSlice";
import LoadingScreen from "@/components/features/loading/loadingScreen";
import useWilayahData from "@/lib/hooks/useWilayahData";

const KabupatenKotaEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedKabupatenKota, loading, error } = useSelector(
    (state) => state.KabupatenKota
  );
  const [dataKabupatenKota, setDataKabupatenKota] = useState(null);

  // untuk option data kabupaten kota

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchKabupatenKotaById(id));
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (selectedKabupatenKota) {
      setDataKabupatenKota(selectedKabupatenKota);
    }
  }, [selectedKabupatenKota]);

  const { ProvinsiOptions, loadingProvinsi, handleLoadMoreProvinsi } =
    useWilayahData();

  const formFields = [
    {
      fields: [
        {
          type: "select",
          id: "provinsiId",
          label: "Provinsi",
          name: "provinsiId",
          placeholder: "Pilih Provinsi",
          options: ProvinsiOptions,
          rules: { required: "Provinsi is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreProvinsi,
          isLoading: loadingProvinsi,
        },
        {
          type: "text",
          label: "Nama Kabupaten / Kota",
          name: "namaKabupatenKota",
          placeholder: "Masukkan Nama Kabupaten  / Kota...",
          colSize: 6,
          rules: { required: "Nama Kabupaten Kota harus diisi" },
        },
      ],
    },
  ];

  if (loading) return <LoadingScreen text="Please wait, loading..." />;
  if (error) return <div>Terjadi kesalahan: {error}</div>;

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataKabupatenKota?.[field.name] ?? "",
    })),
  }));

  const handleSubmit = async (data) => {
    try {
      const id = dataKabupatenKota?.kabupatenKotaId; // Pastikan ID tidak undefined
      if (!id) {
        console.error("❌ ID KabupatenKota tidak ditemukan, gagal update.");
        return;
      }
      console.log("📢 Data yang dikirim ke API (PUT):", { id, data });

      await dispatch(updateKabupatenKota({ id, data })).unwrap();
      showAlert.success("Data Kabupaten Kota berhasil diperbarui!", () => {
        router.push(
          "/MasterData/master-wilayah/kabupaten-kota/table-kabupaten-kota"
        );
      });
    } catch (error) {
      console.error("❌ Gagal memperbarui data Kabupaten Kota:", error);
      showAlert.error("Gagal memperbarui data Kabupaten Kota.");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete(
      "Data KabupatenKota akan dihapus permanen",
      async () => {
        try {
          await dispatch(
            deleteKabupatenKota(dataKabupatenKota.kabupatenKotaId)
          ).unwrap();
          showAlert.success("Data Kabupaten Kota berhasil dihapus!", () => {
            router.push(
              "/MasterData/master-wilayah/kabupaten-kota/table-kabupaten-kota"
            );
          });
        } catch (error) {
          console.error("❌ Gagal menghapus data Kabupaten Kota:", error);
          showAlert.error("Gagal menghapus data Kabupaten Kota.");
        }
      }
    );
  };

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data KabupatenKota"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        backPath="/MasterData/master-wilayah/KabupatenKota/table-KabupatenKota"
        isAddMode={false}
        userData={dataKabupatenKota}
      />
    </Fragment>
  );
};

export default KabupatenKotaEditForm;
