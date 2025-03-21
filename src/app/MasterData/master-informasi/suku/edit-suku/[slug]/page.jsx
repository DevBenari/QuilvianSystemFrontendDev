"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deleteSuku,
  fetchSukuById,
  updateSuku,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/SukuSlice";

const SukuEditPage = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Ambil data dari Redux store
  const { selectedSuku, loading, error } = useSelector((state) => state.suku);

  const [sukuData, setSukuData] = useState(null);

  // Fetch data suku berdasarkan ID dari URL params
  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchSukuById(id));
  }, [dispatch, params.slug]);

  // Update state setelah data suku berhasil di-fetch
  useEffect(() => {
    if (selectedSuku) {
      setSukuData(selectedSuku);
    }
  }, [selectedSuku]);

  console.log("sukuData:", sukuData);

  const handleSubmit = async (data) => {
    try {
      if (!sukuData) return;
      await dispatch(updateSuku({ id: sukuData.sukuId, data })).unwrap();
      showAlert.success("Data suku berhasil diperbarui!", () => {
        router.push("/MasterData/master-informasi/suku/table-suku");
      });
    } catch (error) {
      console.error("Gagal memperbarui data suku:", error);
      showAlert.error("Gagal memperbarui data suku.");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete("Data suku akan dihapus permanen", async () => {
      try {
        await dispatch(deleteSuku(sukuData.sukuId)).unwrap();
        showAlert.success("Data suku berhasil dihapus!", () => {
          router.push("/MasterData/master-informasi/suku/table-suku");
        });
      } catch (error) {
        console.error("Gagal menghapus data suku:", error);
        showAlert.error("Gagal menghapus data suku.");
      }
    });
  };

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

  if (!sukuData) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-warning">Data suku tidak ditemukan.</div>
        </div>
      </div>
    );
  }

  // Konfigurasi form
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Suku",
          name: "namaSuku",
          placeholder: "Masukkan Nama Suku...",
          colSize: 6,
          rules: { required: "Nama suku harus diisi" },
        },
      ],
    },
  ];

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: sukuData?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Suku"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-informasi/suku/table-suku`}
        isAddMode={false}
        handleDelete={handleDelete}
        userData={sukuData}
      />
    </Fragment>
  );
};

export default SukuEditPage;
