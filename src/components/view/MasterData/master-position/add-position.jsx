"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import useDepartementData from "@/lib/hooks/useDepartemen";
import { createPosition } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-position-slice/PositionSlice";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useDispatch } from "react-redux";

const FormAddPosition = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    DepartementOptions,
    loading: DepartementLoading,
    handleLoadMore: handleLoadMoreDepartement,
  } = useDepartementData();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createPosition(data)).unwrap(); // Tunggu hasil dari dispatch
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-position/table-position");
      });
    } catch (error) {
      console.error("Gagal menambahkan Position :", error);
      showAlert.error("Gagal menambahkan data Position ");
    }
  };

  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Position",
          name: "positionName",
          placeholder: "Masukkan Nama Position...",
          colSize: 6,
          rules: { required: "Nama Position harus diisi" },
        },
        {
          type: "select",
          id: "departementId",
          label: "Departemen",
          name: "departementId",
          options: DepartementOptions,
          rules: { required: "Departemen harus diisi" },
          colSize: 6,
          onMenuScrollToBottom: handleLoadMoreDepartement,
          isLoading: DepartementLoading,
        },
      ],
    },
  ];

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Position"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-position/table-position"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddPosition;
