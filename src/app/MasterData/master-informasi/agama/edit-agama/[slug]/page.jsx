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

  // Fetch data Agama berdasarkan ID dari URL params
  useEffect(() => {
    try {
      const id = extractIdFromSlug(params.slug);
      dispatch(fetchAgamaById(id));
    } catch (error) {
      console.error("Error fetching agama:", error);
      router.push("/404");
    }
  }, [dispatch, params.slug, router]);

  // Update data lokal setelah data Agama berhasil di-fetch
  useEffect(() => {
    if (selectedAgama) {
      console.log("Selected Agama:", selectedAgama);
      setDataAgama(selectedAgama); // Update state lokal dengan data dari Redux
    }
  }, [selectedAgama]);

  // Handle form submission

  // Konfigurasi form
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Agama",
          name: "agamaKode",
          defaultValue: dataAgama?.agamaKode || "",
          colSize: 6,
          rules: { required: "Kode Agama harus diisi" },
        },
        {
          type: "text",
          label: "Nama Agama",
          name: "jenisAgama",
          defaultValue: dataAgama?.jenisAgama || "",
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
    showAlert.confirmDelete("Data asuransi akan dihapus permanen", async () => {
      try {
        await dispatch(deleteAgama(dataAgama.agamaId)).unwrap();
        showAlert.success("Data berhasil dihapus", () => {
          router.push("/MasterData/master-informasi/agama/table-agama");
        });
      } catch (error) {
        console.error("Gagal menghapus data agama:", error);
        showAlert.error("Gagal menghapus data data agama");
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

  // Render form
  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Agama"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-informasi/master-agama/table-agama"
        isAddMode={false}
        handleDelete={handleDelete}
      />
    </Fragment>
  );
};

export default AgamaEditPage;
