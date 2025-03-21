"use client";
import React, { useEffect, useState, Fragment, memo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { extractIdFromSlug } from "@/utils/slug";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { showAlert } from "@/components/features/alert/custom-alert";

import useWilayahData from "@/lib/hooks/useWilayahData";
import {
  deleteKodePos,
  fetchKodePosById,
  updateKodePos,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/kodePosSlice";
import { resetWilayahState } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-wilayah/provinsiSlice";

const KodePosEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedKodePos, loading, error } = useSelector(
    (state) => state.KodePos
  );
  const [dataKodePos, setDataKodePos] = useState(null);

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchKodePosById(id));
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (selectedKodePos) {
      setDataKodePos(selectedKodePos);
    }
  }, [selectedKodePos]);

  const { KelurahanOptions, handleLoadMoreKelurahan } = useWilayahData({
    kelurahan: true,
  });

  const formFields = [
    {
      fields: [
        {
          type: "select",
          id: "kelurahanId",
          label: "Kelurahan",
          name: "kelurahanId",
          placeholder: "Pilih Kelurahan",
          options: KelurahanOptions,
          rules: { required: "Kelurahan is required" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreKelurahan,
        },
        {
          type: "text",
          label: "Nama KodePos",
          name: "namaKodePos",
          placeholder: "Masukkan Nama KodePos",
          colSize: 6,
          rules: { required: "Nama Kode Pos Kota harus diisi" },
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
      value: dataKodePos?.[field.name] ?? "",
    })),
  }));

  const handleSubmit = async (data) => {
    try {
      const id = dataKodePos?.kodePosId; // Pastikan ID tidak undefined
      if (!id) {
        console.error("❌ ID KodePos tidak ditemukan, gagal update.");
        return;
      }
      console.log("📢 Data yang dikirim ke API (PUT):", { id, data });

      await dispatch(updateKodePos({ id, data })).unwrap();
      dispatch(resetWilayahState());

      showAlert.success("Data KodePos berhasil diperbarui!", () => {
        router.push("/MasterData/master-wilayah/kode-pos/table-kode-pos");
      });
    } catch (error) {
      console.error("❌ Gagal memperbarui data KodePos:", error);
      showAlert.error("Gagal memperbarui data KodePos.");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete("Data KodePos akan dihapus permanen", async () => {
      try {
        await dispatch(deleteKodePos(dataKodePos.kodePosId)).unwrap();
        dispatch(resetWilayahState());

        showAlert.success("Data KodePos berhasil dihapus!", () => {
          router.push("/MasterData/master-wilayah/kode-pos/table-kode-pos");
        });
      } catch (error) {
        console.error("❌ Gagal menghapus data KodePos:", error);
        showAlert.error("Gagal menghapus data KodePos.");
      }
    });
  };

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Kode Pos"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        backPath="/MasterData/master-wilayah/kode-pos/table-kode-pos"
        isAddMode={false}
        userData={dataKodePos}
      />
    </Fragment>
  );
};

export default KodePosEditForm;
