"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import {
  editIdentitas,
  IdentitasById,
  useIdentitas,
} from "@/lib/hooks/masterData/title";

const EditFormIndetitas = ({ params }) => {
  const router = useRouter();
  const { Identitas } = useIdentitas();
  const [userData, setUserData] = useState(Identitas);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Identitas data based on the slug
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for slug:", params.slug);
        const id = extractIdFromSlug(params.slug);
        console.log("Extracted ID:", id);

        const user = await IdentitasById(id);
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
      // Pastikan userData dan IdentitasId ada

      const response = await editIdentitas(data, userData.IdentitasId);
      alert("Identitas updated successfully!");
      router.push("/MasterData/master-Identitas/table-Identitas");
    } catch (error) {
      console.error("Failed to update Identitas:", error);
      alert("Failed to update Identitas.");
    }
  };

  // Form configuration
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Identitas",
          name: "kodeIdentitas",
          placeholder: "Masukkan Kode Identitas...",
          colSize: 6,
          rules: { required: "Kode Identitas harus diisi" },
        },
        {
          type: "text",
          label: "Nama Identitas",
          name: "namaIdentitas",
          placeholder: "Masukkan Nama Identitas...",
          colSize: 6,
          rules: { required: "Nama Identitas harus diisi" },
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
            Data Identitas tidak ditemukan atau terjadi kesalahan saat memuat
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
        Identitas="Edit Data Identitas"
        formConfig={formFields.map((section) => ({
          ...section,
          fields: section.fields.map((field) => ({
            ...field,
            value: userData[field.name] || "", // Data dari userData sesuai dengan key di name
          })),
        }))}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-Identitas/table-Identitas`}
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditFormIndetitas;
