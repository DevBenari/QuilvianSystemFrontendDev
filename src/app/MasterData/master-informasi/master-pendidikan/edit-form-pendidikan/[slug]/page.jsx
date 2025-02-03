"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { pendidikanById } from "@/lib/hooks/masterData/pendidikan";

const EditFormPendidikan = ({ params }) => {
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Pendidikan data based on the slug
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for slug:", params.slug);
        const id = extractIdFromSlug(params.slug);
        console.log("Extracted ID:", id);

        const user = await pendidikanById(id);
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
    console.log("Form Data:", data);

    // try {
    //   // Pastikan userData dan PendidikanId ada

    //   const response = await editPendidikan(data, userData.PendidikanId);
    //   alert("Pendidikan updated successfully!");
    //   router.push("/MasterData/master-Pendidikan/table-Pendidikan");
    // } catch (error) {
    //   console.error("Failed to update Pendidikan:", error);
    //   alert("Failed to update Pendidikan.");
    // }
  };

  // Form configuration
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Pendidikan",
          name: "kodePendidikan",
          placeholder: "Masukkan Kode Pendidikan...",
          colSize: 6,
          rules: { required: "Kode Pendidikan harus diisi" },
        },
        {
          type: "text",
          label: "Nama Pendidikan",
          name: "namaPendidikan",
          placeholder: "Masukkan Nama Pendidikan...",
          colSize: 6,
          rules: { required: "Nama Pendidikan harus diisi" },
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
            Data Pendidikan tidak ditemukan atau terjadi kesalahan saat memuat
            data.
          </div>
        </div>
      </div>
    );
  }

  // Render form
  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Pendidikan"
        formConfig={formFields.map((section) => ({
          ...section,
          fields: section.fields.map((field) => ({
            ...field,
            value: userData[field.name] || "", // Data dari userData sesuai dengan key di name
          })),
        }))}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-Pendidikan/table-Pendidikan`}
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditFormPendidikan;
