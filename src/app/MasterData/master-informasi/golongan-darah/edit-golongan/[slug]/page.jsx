"use client";
import React, { useState, useEffect, Fragment, useMemo } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { useDispatch, useSelector } from "react-redux";
import { updateGolongan } from "@/lib/state/slices/masterData/master-informasi/golonganSlice";

const GolonganEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data: golonganData,
    loading,
    error,
  } = useSelector((state) => state.golongan);

  // Gunakan useMemo untuk menghitung ulang golongan hanya ketika golonganData berubah
  const golongan = useMemo(() => golonganData.data, [golonganData]);

  const [golonganDarahData, setGolonganDarahData] = useState(null);

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    const golonganDarah = golongan.find((item) => item.golonganDarahId === id);

    if (golonganDarah) setGolonganDarahData(golonganDarah);
  }, [params.slug, golongan]);

  const handleSubmit = (data) => {
    console.log(data);
  };

  // Form configuration
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama golongan",
          name: "namaGolonganDarah",
          placeholder: "Masukkan Nama golongan...",
          colSize: 6,
          rules: { required: "Nama golongan harus diisi" },
          defaultValue: golonganDarahData?.namaGolonganDarah, // Default value dari state
          onChangeCallback: (e) =>
            setGolonganDarahData({
              ...golonganDarahData,
              namaGolonganDarah: e.target.value,
            }),
        },
      ],
    },
  ];

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

  if (!golongan) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-warning">
            Data golongan tidak ditemukan.
          </div>
        </div>
      </div>
    );
  }

  // Render form
  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Golongan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-golongan/table-golongan`}
        isAddMode={false}
      />
    </Fragment>
  );
};

export default GolonganEditForm;
