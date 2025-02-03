"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { AgamaById } from "@/lib/hooks/masterData/agama";

const AgamaEditPage = ({ params }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Agama data based on the slug
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for slug:", params.slug);
        const id = extractIdFromSlug(params.slug);
        console.log("Extracted ID:", id);

        const user = await AgamaById(id);
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
    //   // Pastikan userData dan AgamaId ada

    //   const response = await editAgama(data, userData.AgamaId);
    //   alert("Agama updated successfully!");
    //   router.push("/MasterData/master-Agama/table-Agama");
    // } catch (error) {
    //   console.error("Failed to update Agama:", error);
    //   alert("Failed to update Agama.");
    // }
  };

  // Form configuration
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Agama",
          name: "agamaKode",
          placeholder: "Masukkan Kode Agama...",
          colSize: 6,
          rules: { required: "Kode Agama harus diisi" },
        },
        {
          type: "text",
          label: "Nama Agama",
          name: "jenisAgama",
          placeholder: "Masukkan Nama Agama...",
          colSize: 6,
          rules: { required: "Nama Agama harus diisi" },
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
            Data Agama tidak ditemukan atau terjadi kesalahan saat memuat data.
          </div>
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
        backPath={`/MasterData/master-Agama/table-Agama`}
        isAddMode={false}
      />
    </Fragment>
  );
};

export default AgamaEditPage;
