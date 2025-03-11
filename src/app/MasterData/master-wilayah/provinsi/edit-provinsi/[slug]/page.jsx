"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { extractIdFromSlug } from "@/utils/slug";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";
import {
  updateProvinsi,
  fetchProvinsiById,
  deleteProvinsi,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";
import useWilayahData from "@/lib/hooks/useWilayahData";

const ProvinsiEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedProvinsi, loading, error } = useSelector(
    (state) => state.Provinsi
  );
  const [dataProvinsi, setDataProvinsi] = useState(null);

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchProvinsiById(id));
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (selectedProvinsi) {
      setDataProvinsi(selectedProvinsi);
    }
  }, [selectedProvinsi]);

  const { NegaraOptions, loadingNegara, handleLoadMoreNegara } =
    useWilayahData();

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Provinsi",
          name: "namaProvinsi",
          placeholder: "Masukkan Nama Provinsi...",
          colSize: 6,
          rules: { required: "Nama Provinsi harus diisi" },
        },
        {
          type: "select",
          id: "negaraId",
          label: "Negara",
          name: "negaraId",
          placeholder: "Pilih Negara",
          options: NegaraOptions,
          rules: { required: "Negara is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreNegara,
          isLoading: loadingNegara,
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
      value: dataProvinsi?.[field.name] ?? "",
    })),
  }));

  const handleSubmit = async (data) => {
    try {
      const id = dataProvinsi?.provinsiId; // Pastikan ID tidak undefined
      if (!id) {
        console.error("❌ ID Provinsi tidak ditemukan, gagal update.");
        return;
      }

      console.log("📢 Data yang dikirim ke API (PUT):", { id, data });

      await dispatch(updateProvinsi({ id, data })).unwrap();
      showAlert.success("Data Provinsi berhasil diperbarui!", () => {
        router.push("/MasterData/master-wilayah/provinsi/table-provinsi");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
    } catch (error) {
      console.error("❌ Gagal memperbarui data Provinsi:", error);
      showAlert.error("Gagal memperbarui data Provinsi.");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete("Data Provinsi akan dihapus permanen", async () => {
      try {
        await dispatch(deleteProvinsi(dataProvinsi.provinsiId)).unwrap();
        showAlert.success("Data Provinsi berhasil dihapus!", () => {
          router.push("/MasterData/master-wilayah/provinsi/table-provinsi");
          setTimeout(() => {
            window.location.reload();
          }, 100);
        });
      } catch (error) {
        console.error("❌ Gagal menghapus data Provinsi:", error);
        showAlert.error("Gagal menghapus data Provinsi.");
      }
    });
  };

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Provinsi"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        backPath="/MasterData/master-wilayah/provinsi/table-provinsi"
        isAddMode={false}
        userData={dataProvinsi}
      />
    </Fragment>
  );
};

export default ProvinsiEditForm;
