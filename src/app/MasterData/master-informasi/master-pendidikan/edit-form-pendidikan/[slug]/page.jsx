"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { useDispatch, useSelector } from "react-redux";
import {
  deletePendidikan,
  fetchPendidikanById,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pendidikanSlice";

const EditFormPendidikan = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [dataPendidikan, setDataPendidikan] = useState(null);

  const { selectedPendidikan, loading, error } = useSelector(
    (state) => state.pendidikan
  );

  // Fetch data Pendidikan berdasarkan ID dari URL params
  useEffect(() => {
    try {
      const id = extractIdFromSlug(params.slug);
      dispatch(fetchPendidikanById(id));
    } catch (error) {
      console.error("Error fetching user:", error);
      router.push("/404");
    }
  }, [dispatch, params.slug, router]);

  // Update dataPendidikan setelah data Pendidikan berhasil di-fetch
  useEffect(() => {
    if (selectedPendidikan) {
      console.log("Selected Pendidikan:", selectedPendidikan); // Cek apakah data tersedia
      setDataPendidikan(selectedPendidikan);
    }
  }, [selectedPendidikan]);

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

  // Handle form submission
  const handleSubmit = async (data) => {
    console.log("Form Data:", data);
  };

  const handleDelete = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      if (!dataPendidikan?.pendidikanId) {
        alert("Data pendidikan tidak ditemukan atau ID tidak valid.");
        return;
      }

      try {
        await dispatch(deletePendidikan(dataPendidikan.pendidikanId)).unwrap();
        alert("Data pendidikan berhasil dihapus.");
        router.push(
          "/MasterData/master-informasi/master-pendidikan/table-pendidikan"
        );
      } catch (error) {
        console.error("Error deleting pendidikan:", error);
        alert("Gagal menghapus data pendidikan.");
      }
    }
  };

  // Form configuration
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Pendidikan",
          name: "namaPendidikan",
          placeholder: "Masukkan Nama Pendidikan...",
          colSize: 6,
          defaultValue: dataPendidikan?.namaPendidikan || [],
          rules: { required: "Nama Pendidikan harus diisi" },
        },
      ],
    },
  ];

  // Loading state
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

  // Render form
  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Pendidikan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-Pendidikan/table-Pendidikan`}
        isAddMode={false}
        handleDelete={handleDelete}
      />
    </Fragment>
  );
};

export default EditFormPendidikan;
