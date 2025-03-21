"use client";
import React, { useState, useEffect, Fragment, memo } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { useDispatch, useSelector } from "react-redux";

import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deleteFasilitas,
  fetchFasilitasById,
  updateFasilitas,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-fasilitas/FasilitasSlice";

const EditFormFasilitas = memo(({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [dataFasilitas, setDataFasilitas] = useState(null);

  const { selectedFasilitas, loading, error } = useSelector(
    (state) => state.Fasilitas
  );

  // Fetch data Fasilitas berdasarkan ID dari URL params
  useEffect(() => {
    try {
      const id = extractIdFromSlug(params.slug);
      dispatch(fetchFasilitasById(id));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [dispatch, params.slug, router]);

  // Update dataFasilitas setelah data Fasilitas berhasil di-fetch
  useEffect(() => {
    if (selectedFasilitas) {
      console.log("Selected Fasilitas:", selectedFasilitas); // Cek apakah data tersedia
      setDataFasilitas(selectedFasilitas);
    }
  }, [selectedFasilitas]);

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
    try {
      // Panggil update pekerjaan melalui Redux
      await dispatch(
        updateFasilitas({ id: dataFasilitas.fasilitasPasienId, data })
      ).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-fasilitas/table-fasilitas");
      });
    } catch (error) {
      console.error("Gagal menambahkan Fasilitas:", error);
      showAlert.error("Gagal menambahkan data Fasilitas");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete(
      "Data Fasilitas akan dihapus permanen",
      async () => {
        if (!dataFasilitas?.fasilitasPasienId) {
          alert("Data Fasilitas tidak ditemukan atau ID tidak valid.");
          return;
        }

        try {
          await dispatch(
            deleteFasilitas(dataFasilitas.fasilitasPasienId)
          ).unwrap();
          showAlert.success("Data berhasil dihapus", () => {
            router.push("/MasterData/master-fasilitas/table-fasilitas");
          });
        } catch (error) {
          console.error("Gagal  menghapus data Fasilitas:", error);
          showAlert.error("Gagal  menghapus data  Fasilitas");
        }
      }
    );
  };

  // Form configuration
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Fasilitas",
          name: "namaFasilitasPasien",
          placeholder: "Masukkan Nama Fasilitas...",
          colSize: 6,
          defaultValue: dataFasilitas?.namaFasilitasPasien || [],
          rules: { required: "Nama Fasilitas harus diisi" },
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

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataFasilitas?.[field.name] ?? "",
    })),
  }));

  // Render form
  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Fasilitas"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-fasilitas/table-fasilitas`}
        isAddMode={false}
        handleDelete={handleDelete}
        userData={dataFasilitas}
      />
    </Fragment>
  );
});

EditFormFasilitas.displayName = "EditFormFasilitas";

export default EditFormFasilitas;
