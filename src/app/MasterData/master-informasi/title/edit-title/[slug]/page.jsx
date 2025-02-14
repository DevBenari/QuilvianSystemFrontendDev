"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import {
  fetchTitleById,
  updateTitle,
  deleteTitle,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";
import { showAlert } from "@/components/features/alert/custom-alert";

const TitleEditPage = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Ambil data dari Redux store
  const { selectedTitle, loading, error } = useSelector(
    (state) => state.titles
  );

  const [titleData, setTitleData] = useState(null);

  // Fetch data title berdasarkan ID dari URL params
  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchTitleById(id));
  }, [dispatch, params.slug]);

  // Update state setelah data title berhasil di-fetch
  useEffect(() => {
    if (selectedTitle) {
      setTitleData(selectedTitle);
    }
  }, [selectedTitle]);

  const handleSubmit = async (data) => {
    try {
      if (!titleData) return;
      await dispatch(updateTitle({ id: titleData.titleId, data })).unwrap();
      showAlert.success("Data title berhasil diperbarui!", () => {
        router.push("/MasterData/master-informasi/title/table-title");
      });
    } catch (error) {
      console.error("Gagal memperbarui data title:", error);
      showAlert.error("Gagal memperbarui data title.");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete("Data title akan dihapus permanen", async () => {
      try {
        await dispatch(deleteTitle(titleData.titleId)).unwrap();
        showAlert.success("Data title berhasil dihapus!", () => {
          router.push("/MasterData/master-informasi/title/table-title");
        });
      } catch (error) {
        console.error("Gagal menghapus data title:", error);
        showAlert.error("Gagal menghapus data title.");
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

  if (!titleData) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-warning">Data title tidak ditemukan.</div>
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
          label: "Kode Title",
          name: "kodeTitle",
          placeholder: "Masukkan Kode Title...",
          colSize: 6,
          rules: { required: "Kode title harus diisi" },
        },
        {
          type: "text",
          label: "Nama Title",
          name: "namaTitle",
          placeholder: "Masukkan Nama Title...",
          colSize: 6,
          rules: { required: "Nama title harus diisi" },
        },
      ],
    },
  ];

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: titleData?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Title"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-informasi/title/table-title`}
        isAddMode={false}
        handleDelete={handleDelete}
        userData={titleData}
      />
    </Fragment>
  );
};

export default TitleEditPage;
