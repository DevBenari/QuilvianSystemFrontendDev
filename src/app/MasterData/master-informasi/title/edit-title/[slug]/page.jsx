"use client";
import React, { useState, useEffect, Fragment, useMemo } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteTitle,
  updateTitle,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice";

const TitleEditPage = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    data: titlesData,
    loading,
    error,
  } = useSelector((state) => state.titles);

  const titles = useMemo(() => titlesData?.data || [], [titlesData]);
  const [titleData, setTitleData] = useState(null);

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    const title = titles.find((item) => item.titleId === id);
    if (title) setTitleData(title);
  }, [params.slug, titles]);

  const handleSubmit = (data) => {
    if (!titleData) return;
    dispatch(updateTitle({ id: titleData.titleId, data }));
    console.log("Submitted data:", data);
    router.push("/MasterData/master-informasi/title/table-title");
  };

  const handleDelete = async () => {
    if (!titleData) return;
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await dispatch(deleteTitle(titleData.titleId)).unwrap();
        alert("Data title berhasil dihapus.");
        router.push("/MasterData/master-informasi/title/table-title");
      } catch (error) {
        console.error("Error deleting title:", error);
        alert("Gagal menghapus data title.");
      }
    }
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

  // Form configuration
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Title",
          name: "namaTitle",
          colSize: 6,
          defaultValue: titleData.namaTitle,
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Title"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-informasi/title/table-title`}
        isAddMode={false}
        handleDelete={handleDelete}
      />
    </Fragment>
  );
};

export default TitleEditPage;
