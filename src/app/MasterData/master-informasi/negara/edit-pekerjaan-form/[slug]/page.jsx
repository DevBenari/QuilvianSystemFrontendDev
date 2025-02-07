"use client";
import React, { useState, useEffect, Fragment, useMemo } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPekerjaanById,
  updatePekerjaan,
} from "@/lib/state/slices/masterData/master-informasi/pekerjaanSlice";

const PekerjaanEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Ambil data pekerjaan dari Redux state
  const { selectedPekerjaan, loading, error } = useSelector(
    (state) => state.pekerjaan
  );

  const [dataPekerjaan, setDataPekerjaan] = useState(null);

  // Fetch data pekerjaan berdasarkan ID dari URL params
  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchPekerjaanById(id));
  }, [dispatch, params.slug]);

  // Update dataPekerjaan setelah data pekerjaan berhasil di-fetch
  useEffect(() => {
    if (selectedPekerjaan) {
      console.log("Selected pekerjaan:", selectedPekerjaan); // Cek apakah data tersedia
      setDataPekerjaan(selectedPekerjaan);
    }
  }, [selectedPekerjaan]);

  // Fungsi submit form
  const handleSubmit = (data) => {
    if (!dataPekerjaan) return;
    dispatch(updatePekerjaan({ id: dataPekerjaan.pekerjaanId, data }))
      .unwrap()
      .then(() => {
        router.push(
          "/MasterData/master-informasi/master-pekerjaan/table-pekerjaan"
        );
      })
      .catch((err) => {
        console.error("Gagal memperbarui data pekerjaan:", err);
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

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Pekerjaan",
          name: "namaPekerjaan",
          placeholder: "Masukkan Nama Pekerjaan...",
          colSize: 6,
          rules: { required: "Nama Pekerjaan harus diisi" },
          defaultValue: dataPekerjaan.data.namaPekerjaan || "", // Null-safe check
          onChangeCallback: (e) =>
            setDataPekerjaan({
              ...dataPekerjaan,
              namaPekerjaan: e.target.value,
            }),
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

  if (error) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-danger">Terjadi kesalahan: {error}</div>
        </div>
      </div>
    );
  }

  // Render form
  return (
    <Fragment>
      <DynamicForm
        pekerjaan="Edit Data Pekerjaan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-informasi/master-pekerjaan/table-pekerjaan`}
        isAddMode={false}
      />
    </Fragment>
  );
};

export default PekerjaanEditForm;
