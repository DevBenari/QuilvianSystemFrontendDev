"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { extractIdFromSlug } from "@/utils/slug";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import {
  fetchNegaraById,
  updateNegara,
  deleteNegara,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/negaraSlice";
import { showAlert } from "@/components/features/alert/custom-alert";

const NegaraEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedNegara, loading, error } = useSelector(
    (state) => state.negara
  );
  const [dataNegara, setDataNegara] = useState(null);

  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchNegaraById(id));
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (selectedNegara) {
      setDataNegara(selectedNegara);
    }
  }, [selectedNegara]);

  const handleSubmit = async (data) => {
    try {
      if (!dataNegara) return;
      await dispatch(updateNegara({ id: dataNegara.negaraId, data })).unwrap();
      showAlert.success("Data negara berhasil diperbarui!", () => {
        router.push("/MasterData/master-informasi/negara/table-negara");
      });
    } catch (error) {
      console.error("Gagal memperbarui data negara:", error);
      showAlert.error("Gagal memperbarui data negara.");
    }
  };

  const handleDelete = async () => {
    showAlert.confirmDelete("Data negara akan dihapus permanen", async () => {
      try {
        await dispatch(deleteNegara(dataNegara.negaraId)).unwrap();
        showAlert.success("Data negara berhasil dihapus!", () => {
          router.push("/MasterData/master-informasi/negara/table-negara");
        });
      } catch (error) {
        console.error("Gagal menghapus data negara:", error);
        showAlert.error("Gagal menghapus data negara.");
      }
    });
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "kode Negara",
          name: "kodeNegara",
          placeholder: "Masukkan kode Negara...",
          colSize: 6,
          rules: { required: "kode negara harus diisi" },
        },
        {
          type: "text",
          label: "Nama Negara",
          name: "namaNegara",
          placeholder: "Masukkan Nama Negara...",
          colSize: 6,
          rules: { required: "Nama negara harus diisi" },
        },
      ],
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Terjadi kesalahan: {error}</div>;

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataNegara?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Negara"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        backPath="/MasterData/master-informasi/negara/table-negara"
        isAddMode={false}
        userData={dataNegara}
      />
    </Fragment>
  );
};

export default NegaraEditForm;
