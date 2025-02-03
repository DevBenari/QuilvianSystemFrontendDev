"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { PekerjaanById } from "@/lib/hooks/masterData/master-informasi/pekerjaan";

const PekerjaanEditForm = ({ params }) => {
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Pekerjaan data based on the slug
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for slug:", params.slug);
        const id = extractIdFromSlug(params.slug);
        console.log("Extracted ID:", id);

        const user = await PekerjaanById(id);
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
    //   router.push("/MasterData/master-Pekerjaan/table-Pekerjaan");
    // } catch (error) {
    //   console.error("Failed to update Pekerjaan:", error);
    //   alert("Failed to update Pekerjaan.");
    // }
  };

  // Form configuration
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Pekerjaan",
          name: "kodePekerjaan",
          placeholder: "Masukkan Kode Pekerjaan...",
          colSize: 6,
          rules: { required: "Kode Pekerjaan harus diisi" },
        },
        {
          type: "text",
          label: "Nama Pekerjaan",
          name: "namaPekerjaan",
          placeholder: "Masukkan Nama Pekerjaan...",
          colSize: 6,
          rules: { required: "Nama Pekerjaan harus diisi" },
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
            Data Pekerjaan tidak ditemukan atau terjadi kesalahan saat memuat
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
        title="Edit Data Pekerjaan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-informasi/master-pekerjaan/table-pekerjaan`}
        isAddMode={false}
      />
    </Fragment>
  );
};

export default PekerjaanEditForm;
