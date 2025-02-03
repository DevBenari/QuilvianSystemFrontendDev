"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { editTitle, titleById, useTitle } from "@/lib/hooks/masterData/title";

const TitleEditPage = ({ params }) => {
  const router = useRouter();
  const { title } = useTitle();
  const [userData, setUserData] = useState(title);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch title data based on the slug
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for slug:", params.slug);
        const id = extractIdFromSlug(params.slug);
        console.log("Extracted ID:", id);

        const user = await titleById(id);
        console.log("Found User:", user);

        if (!user) {
          throw new Error("User not found");
        }

        setUserData(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/404");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.slug, router]);

  // Handle form submission
  const handleSubmit = async (data) => {
    try {
      // Pastikan userData dan titleId ada

      const response = await editTitle(data, userData.titleId);
      alert("Title updated successfully!");
      router.push("/MasterData/master-title/table-title");
    } catch (error) {
      console.error("Failed to update title:", error);
      alert("Failed to update title.");
    }
  };

  // Form configuration
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Title",
          name: "kodeTitle",
          placeholder: "Masukkan Kode Title...",
          colSize: 6,
          rules: { required: "Kode Title harus diisi" },
        },
        {
          type: "text",
          label: "Nama Title",
          name: "namaTitle",
          placeholder: "Masukkan Nama Title...",
          colSize: 6,
          rules: { required: "Nama Title harus diisi" },
        },
      ],
    },
  ];

  // Loading state
  if (isLoading) {
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

  // Error state (if userData is not found)
  if (!userData) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-danger">
            Data title tidak ditemukan atau terjadi kesalahan saat memuat data.
          </div>
        </div>
      </div>
    );
  }

  // Render form
  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Title"
        formConfig={formFields.map((section) => ({
          ...section,
          fields: section.fields.map((field) => ({
            ...field,
            value: userData[field.name] || "", // Data dari userData sesuai dengan key di name
          })),
        }))}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-title/table-title`}
        isAddMode={false}
      />
    </Fragment>
  );
};

export default TitleEditPage;
