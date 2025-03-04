"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlugDummy } from "@/utils/slug";
import { poliAnak } from "@/utils/instalasi-poli";
import { FormProvider, useForm } from "react-hook-form";

const PoliEditPage = ({ params }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(poliAnak);
  const [isLoading, setIsLoading] = useState(true);
  const methods = useForm(); // Inisialisas
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for slug:", params.slug);
        const id = extractIdFromSlugDummy(params.slug);
        console.log("Extracted ID:", id);

        const user = poliAnak.find((u) => u.id === parseInt(id, 10));
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
      fields: [
        {
          type: "text",
          id: "nama",
          label: "Nama Anak",
          name: "nama",
          placeholder: "Nama Anak",
          Value: userData?.nama || "", // Gunakan fallback nilai kosong
          colSize: 6,
          disabled: true,
        },
        {
          type: "select",
          id: "jenisKelamin",
          label: "Jenis Kelamin",
          name: "jenisKelamin",
          options: [
            { value: "Laki-laki", label: "Laki-laki" },
            { value: "Perempuan", label: "Perempuan" },
          ],
          placeholder: userData?.jenisKelamin || "",
          defaultValue: userData?.jenisKelamin || "", // Gunakan fallback nilai kosong
          readOnly: true,
          colSize: 6,
        },

        {
          type: "number",
          id: "antrian",
          label: "Nomor Antrian",
          name: "antrian",
          placeholder: "Nomor Antrian",
          colSize: 6,
          defaultValue: userData?.antrian || "", // Gunakan fallback nilai kosong
          onChangeCallback: (e) =>
            setUserData({ ...userData, antrian: e.target.value }),
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
        title="Edit Data Poli"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={`/MasterData/master-Poli/daftar-Poli`}
        isAddMode={false}
      />
    </Fragment>
  );
};

export default PoliEditPage;
