"use client";
import React, { useState, useEffect, Fragment, useMemo } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { useSelector, useDispatch } from "react-redux";
import { updateTitle } from "@/lib/state/slices/masterData/master-informasi/TitleSlice";

const TitleEditPage = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    data: titlesData,
    loading,
    error,
  } = useSelector((state) => state.titles);

  // Gunakan useMemo agar titles hanya dihitung ulang saat titlesData berubah
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
    router.push("/MasterData/master-informasi/master-title/table-title");
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
          label: "Kode Title",
          name: "kodeTitle",
          colSize: 6,
          defaultValue: titleData.kodeTitle, // Default value dari state
          onChangeCallback: (e) =>
            setTitleData({ ...titleData, kodeTitle: e.target.value }),
        },
        {
          type: "text",
          label: "Nama Title",
          name: "namaTitle",
          colSize: 6,
          defaultValue: titleData.namaTitle, // Default value dari state
          onChangeCallback: (e) =>
            setTitleData({ ...titleData, namaTitle: e.target.value }),
        },
      ],
    },
  ];

  // Render form
  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Title"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-informasi/master-title/table-title`}
        isAddMode={false}
      />
    </Fragment>
  );
};

export default TitleEditPage;
