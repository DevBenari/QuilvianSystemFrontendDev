"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { ManajemenDepartemen } from "@/utils/masterData";

const DepartemenEditPage = ({ params }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(ManajemenDepartemen);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk menangani pengambilan data dari URL slug
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for slug:", params.slug);
        const id = extractIdFromSlug(params.slug);
        console.log("Extracted ID:", id);

        const user = ManajemenDepartemen.find((u) => u.id === parseInt(id, 10));
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

  const handleSubmit = async (data) => {
    console.log("data", data);
  };

  const formFields = [
    {
      section: "Informasi Umum",
      fields: [
        {
          type: "text",
          id: "departemen",
          label: "Nama Departemen",
          placeholder: "Masukkan Nama Departemen...",
          name: "departemen",
          rules: { required: "Nama departemen wajib diisi" },
        },
        {
          type: "text",
          id: "penanggungJawab",
          label: "Penanggung Jawab",
          placeholder: "Masukkan Penanggung Jawab...",
          name: "penanggungJawab",
          rules: { required: "Penanggung jawab wajib diisi" },
        },
        {
          type: "timeRange",
          id: "jamOperasional",
          label: "Jam Operasional",
          name: "jamOperasional",
          placeholder: "Masukkan Jam Operasional...",
          rules: { required: "Jam operasional wajib diisi" },
        },
        {
          type: "text",
          id: "ruangan",
          label: "Ruangan",
          placeholder: "Masukkan Informasi Ruangan...",
          name: "ruangan",
          rules: { required: "Informasi ruangan wajib diisi" },
        },
        {
          type: "text",
          id: "noTelp",
          label: "No Telepon",
          placeholder: "Masukkan No Telepon...",
          name: "noTelp",
          rules: { required: "No telepon wajib diisi" },
        },
        {
          type: "date",
          id: "tanggalPembuatan",
          label: "Tanggal Pembuatan",
          placeholder: "Masukkan Tanggal Pembuatan...",
          name: "tanggalPembuatan",
          rules: { required: "Tanggal pembuatan wajib diisi" },
        },
        {
          type: "textarea",
          id: "deskripsi",
          label: "Deskripsi",
          placeholder: "Masukkan Deskripsi Departemen...",
          name: "deskripsi",
          rules: { required: "Deskripsi wajib diisi" },
          rows: 3,
        },
      ],
    },
  ];

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

  if (!userData) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-danger">
            User not found or error loading data
          </div>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Departemen"
        formConfig={formFields.map((section) => ({
          ...section,
          fields: section.fields.map((field) => ({
            ...field,
            value: userData[field.name] || "", // Data dari userData sesuai dengan key di name
          })),
        }))}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-departemen/manajemen-departemen/tables-departemen`}
        isAddMode={false}
      />
    </Fragment>
  );
};

export default DepartemenEditPage;
