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
    console.log(data);
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
          label: "Nama Negara",
          name: "namaNegara",
          placeholder: "Masukkan Nama Negara...",
          colSize: 6,
          rules: { required: "Nama negara harus diisi" },
          defaultValue: dataNegara?.namaNegara || "",
          onChangeCallback: (e) =>
            setDataNegara((prev) => ({
              ...prev,
              namaNegara: e.target.value,
            })),
        },
      ],
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Terjadi kesalahan: {error}</div>;

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Negara"
        formConfig={formFields}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        backPath="/MasterData/master-informasi/negara/table-negara"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default NegaraEditForm;
