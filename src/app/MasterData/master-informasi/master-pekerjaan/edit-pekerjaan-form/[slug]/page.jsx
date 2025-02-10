"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPekerjaanById,
  updatePekerjaan,
  deletePekerjaan,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/pekerjaanSlice";

const PekerjaanEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedPekerjaan, loading, error } = useSelector(
    (state) => state.pekerjaan
  );
  const [dataPekerjaan, setDataPekerjaan] = useState(null);

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchPekerjaanById(id));
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (selectedPekerjaan) {
      setDataPekerjaan(selectedPekerjaan);
    }
  }, [selectedPekerjaan]);

  const handleSubmit = async (data) => {
    if (!dataPekerjaan) {
      alert("Data pekerjaan tidak tersedia.");
      return;
    }

    try {
      // Panggil update pekerjaan melalui Redux
      await dispatch(
        updatePekerjaan({ id: dataPekerjaan.pekerjaanId, data })
      ).unwrap();

      // Berikan notifikasi sukses
      alert("Data pekerjaan berhasil diperbarui!");

      // Redirect ke halaman tabel pekerjaan setelah sukses
      router.push(
        "/MasterData/master-informasi/master-pekerjaan/table-pekerjaan"
      );
    } catch (error) {
      console.error("Gagal memperbarui data pekerjaan:", error);

      // Berikan notifikasi kesalahan
      alert("Gagal memperbarui data pekerjaan.");
    }
  };

  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await dispatch(deletePekerjaan(dataPekerjaan.pekerjaanId)).unwrap();
        alert("Data pekerjaan berhasil dihapus!");
        router.push(
          "/MasterData/master-informasi/master-pekerjaan/table-pekerjaan"
        );
      } catch (error) {
        console.error("Gagal menghapus data pekerjaan:", error);
        alert("Gagal menghapus data pekerjaan.");
      }
    }
  };

  // Konfigurasi form
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Pekerjaan",
          name: "namaPekerjaan",
          placeholder: "Masukkan Nama Pekerjaan...",
          colSize: 6,
          rules: { required: "Nama pekerjaan harus diisi" },
          defaultValue: dataPekerjaan?.namaPekerjaan || "",
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

  if (!dataPekerjaan) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-warning">
            Data pekerjaan tidak ditemukan.
          </div>
        </div>
      </div>
    );
  }

  // Render form
  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Pekerjaan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        backPath="/MasterData/master-informasi/master-pekerjaan/table-pekerjaan"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default PekerjaanEditForm;
