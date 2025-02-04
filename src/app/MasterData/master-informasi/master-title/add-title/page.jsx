"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createTitle } from "@/lib/state/slice/TitleSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

const PenambahanTitle = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createTitle(data)).unwrap(); // Tunggu hasil dari dispatch
      alert("Title berhasil ditambahkan!");
      router.push("/MasterData/master-informasi/master-title/table-title");
    } catch (error) {
      console.error("Gagal menambahkan title:", error);
      alert("Gagal menambahkan title.");
    }
  };
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

  // const handleSubmit = async (data) => {
  //   // Validasi data sebelum submit
  //   const errors = validateFormData(data, formFields);

  //   if (errors.length > 0) {
  //     alert(`Form tidak valid:\n${errors.join("\n")}`);
  //     return;
  //   }

  //   try {
  //     const response = await addTitle(data);
  //     alert("Title added successfully!");
  //     console.log("Response:", response);
  //     router.push("/MasterData/master-informasi/master-title");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to add Title.");
  //   }
  // };

  // const validateFormData = (data, fields) => {
  //   const errors = [];
  //   fields.forEach((section) => {
  //     section.fields.forEach((field) => {
  //       const { name, label, rules } = field; // Ganti id dengan name
  //       const value = data[name]; // Ambil value berdasarkan name

  //       if (rules?.required && (!value || value.trim() === "")) {
  //         errors.push(`${label} harus diisi`);
  //       }

  //       if (rules?.pattern && !rules.pattern.test(value)) {
  //         errors.push(`${label} tidak valid`);
  //       }
  //     });
  //   });
  //   return errors;
  // };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Title"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-informasi/master-title/table-title"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default PenambahanTitle;
