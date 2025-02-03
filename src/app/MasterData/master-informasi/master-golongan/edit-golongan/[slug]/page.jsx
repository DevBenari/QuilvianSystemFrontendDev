"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { GolonganById } from "@/lib/hooks/masterData/master-informasi/golongan";

const GolonganEditForm = ({ params }) => {
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch golongan data based on the slug
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for slug:", params.slug);
        const id = extractIdFromSlug(params.slug);
        console.log("Extracted ID:", id);

        const user = await GolonganById(id);
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
    console.log("form data ", data);
    // try {
    //   // Pastikan userData dan titleId ada
    //   const response = await editTitle(data, userData.titleId);
    //   alert("Title updated successfully!");
    //   router.push("/MasterData/master-golongan/table-golongan");
    // } catch (error) {
    //   console.error("Failed to update golongan:", error);
    //   alert("Failed to update golongan.");
    // }
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
            Data golongan tidak ditemukan atau terjadi kesalahan saat memuat
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
