"use client";
import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { updateAgama } from "@/lib/state/slices/masterData/master-informasi/AgamaSlice";

const AgamaEditPage = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Mengambil data dari Redux store
  const {
    data: agamaData,
    loading,
    error,
  } = useSelector((state) => state.agama);

  // Memoize data untuk mengurangi proses hitung ulang
  const agama = useMemo(() => agamaData?.data || [], [agamaData]);

  const [agamaaData, setAgamaaData] = useState(null);

  // Menggunakan useEffect untuk mengambil data berdasarkan slug
  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    const selectedAgama = agama.find((item) => item.agamaId === id);
    if (selectedAgama) setAgamaaData(selectedAgama);
  }, [agama, params.slug]);

  const handleSubmit = (data) => {
    if (!agamaaData) return;
    dispatch(updateAgama({ id: agamaaData.agamaId, data }));
    console.log("Submitted data:", data);
    // router.push("/MasterData/master-informasi/master-agama/table-agama");
  };

  // Konfigurasi form
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Agama",
          name: "agamaKode",
          defaultValue: agamaaData?.agamaKode || "",
          colSize: 6,
          rules: { required: "Kode Agama harus diisi" },
          onChangeCallback: (e) =>
            setAgamaaData({ ...agamaaData, agamaKode: e.target.value }),
        },
        {
          type: "text",
          label: "Nama Agama",
          name: "jenisAgama",
          defaultValue: agamaaData?.jenisAgama || "",
          colSize: 6,
          rules: { required: "Nama Agama harus diisi" },
          onChangeCallback: (e) =>
            setAgamaaData({ ...agamaaData, jenisAgama: e.target.value }),
        },
      ],
    },
  ];

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

  if (!agamaaData) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-warning">Data agama tidak ditemukan.</div>
        </div>
      </div>
    );
  }

  // Render form
  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Agama"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-informasi/master-agama/table-agama"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default AgamaEditPage;
