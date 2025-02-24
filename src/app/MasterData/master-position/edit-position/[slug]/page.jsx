"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deletePosition,
  fetchPositionById,
  updatePosition,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-position/positionSlice";
import useDepartementData from "@/lib/hooks/useDepartemen";

const EditPositionForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    DepartementOptions,
    loading: DepartementLoading,
    handleLoadMore: handleLoadMoreDepartement,
  } = useDepartementData();

  const { selectedPosition, loading } = useSelector((state) => state.Position);

  const [dataPosition, setDataPosition] = useState(null);

  // Fetch data Position berdasarkan ID
  useEffect(() => {
    dispatch(fetchPositionById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedPosition) {
      setDataPosition(selectedPosition);
    }
  }, [selectedPosition]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataPosition) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Submit form untuk update data

  // Konfigurasi Form Fields
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Position",
          name: "positionName",
          placeholder: "Masukkan Nama Position...",
          colSize: 6,
          rules: { required: "Nama Position harus diisi" },
        },
        {
          type: "select",
          id: "departementId",
          label: "Departemen",
          name: "departementId",
          options: DepartementOptions,
          rules: { required: "Departemen harus diisi" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreDepartement,
          isLoading: DepartementLoading,
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      if (!dataPosition.positionId) {
        showAlert.error("Gagal memperbarui data: ID Position tidak ditemukan.");
        return;
      }

      console.log("Data yang dikirim ke backend:", data);

      await dispatch(
        updatePosition({ id: dataPosition.positionId, data })
      ).unwrap();

      showAlert.success("Data Position berhasil diperbarui!", () => {
        router.push("/MasterData/master-position/table-position");
      });
    } catch (error) {
      console.error("Gagal memperbarui data Position", error);
      showAlert.error("Gagal memperbarui data Position.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataPosition?.positionId) {
      showAlert.error("Gagal menghapus: ID Position tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete("Data Position akan dihapus permanen", async () => {
      try {
        await dispatch(deletePosition(dataPosition.positionId)).unwrap();
        showAlert.success("Data Position berhasil dihapus!", () => {
          router.push("/MasterData/master-position/table-Position");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data Position.");
      }
    });
  };

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataPosition?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Position"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataPosition}
        backPath="/MasterData/master-position/table-position"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditPositionForm;
