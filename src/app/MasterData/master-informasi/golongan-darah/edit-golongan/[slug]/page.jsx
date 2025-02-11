"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGolonganById,
  updateGolongan,
  deleteGolongan,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/golonganSlice";
import { showAlert } from "@/components/features/alert/custom-alert";

const GolonganEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedGolongan, loading, error } = useSelector(
    (state) => state.golongan
  );

  const [golonganDarahData, setGolonganDarahData] = useState(null);

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchGolonganById(id));
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (selectedGolongan) setGolonganDarahData(selectedGolongan);
  }, [selectedGolongan]);

  const handleSubmit = async (data) => {
    try {
      await dispatch(
        updateGolongan({ id: golonganDarahData.golonganDarahId, data })
      ).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push(
          "/MasterData/master-informasi/golongan-darah/table-golongan"
        );
      });
    } catch (error) {
      console.error("Gagal menambahkan golongan:", error);
      showAlert.error("Gagal menambahkan data golongan");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete("Data golongan akan dihapus permanen", async () => {
      try {
        await dispatch(
          deleteGolongan(golonganDarahData.golonganDarahId)
        ).unwrap();
        showAlert.success("Data berhasil dihapus", () => {
          router.push(
            "/MasterData/master-informasi/golongan-darah/table-golongan"
          );
        });
      } catch (error) {
        console.error("Gagal  menghapus data golongan:", error);
        showAlert.error("Gagal  menghapus data  golongan");
      }
    });
  };

  // Form configuration
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Golongan",
          name: "namaGolonganDarah",
          placeholder: "Masukkan Nama golongan...",
          colSize: 6,
          rules: { required: "Nama golongan harus diisi" },
          defaultValue: golonganDarahData?.namaGolonganDarah || "",
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

  if (!golonganDarahData) {
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

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Golongan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath="/MasterData/master-informasi/golongan-darah/table-golongan"
        isAddMode={false}
        handleDelete={handleDelete}
      />
    </Fragment>
  );
};

export default GolonganEditForm;
