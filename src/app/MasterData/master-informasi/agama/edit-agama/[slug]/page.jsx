"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import {
  deleteAgama,
  fetchAgamaById,
  updateAgama,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/AgamaSlice";
import { showAlert } from "@/components/features/alert/custom-alert";

const AgamaEditPage = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Local state untuk data agama
  const [dataAgama, setDataAgama] = useState(null);

  // Mengambil data dari Redux store
  const { selectedAgama, loading, error } = useSelector((state) => state.agama);

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchAgamaById(id));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedAgama) {
      setDataAgama(selectedAgama);
    }
  }, [selectedAgama]);

  console.log("data agama : ", dataAgama);

  // Konfigurasi form
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Agama",
          name: "namaAgama",
          colSize: 6,
          rules: { required: "Nama Agama harus diisi" },
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    if (!dataAgama) return;
    try {
      await dispatch(updateAgama({ id: dataAgama.agamaId, data })).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-informasi/agama/table-agama");
      });
    } catch (error) {
      console.error("Gagal menambahkan agama:", error);
      showAlert.error("Gagal menambahkan data agama");
    }
  };

  const handleDelete = async () => {
    if (!dataAgama?.agamaId) {
      showAlert.error("Gagal menghapus: agama ID tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete("Data agama akan dihapus permanen", async () => {
      try {
        await dispatch(deleteAgama(dataAgama.agamaId)).unwrap();
        showAlert.success("Data agama berhasil dihapus!", () => {
          router.push("/MasterData/master-informasi/agama/table-agama");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data agama.");
        console.error("Gagal menghapus data agama:", error);
      }
    });
  };
  // Loading dan error handling
  if (loading) {
    return (
      <div className="iq-card">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-danger">Terjadi kesalahan: {error}</div>
        </div>
      </div>
    );
  }

  if (!dataAgama) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-warning">Data agama tidak ditemukan.</div>
        </div>
      </div>
    );
  }

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataAgama?.[field.name] ?? "",
    })),
  }));

  // Render form
  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Agama"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        userData={dataAgama}
        backPath="/MasterData/master-informasi/master-agama/table-agama"
        isAddMode={false}
        handleDelete={handleDelete}
      />
    </Fragment>
  );
};

export default AgamaEditPage;
