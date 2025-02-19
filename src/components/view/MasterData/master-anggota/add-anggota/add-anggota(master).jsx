"use client";

import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "@/components/features/alert/custom-alert";
import { createAnggota } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-anggota/anggotaSlice";

const AddFormAnggota = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Fungsi untuk menangani submit form
  const handleSubmit = async (data) => {
    try {
      // Validasi data sebelum submit
      const errors = validateFormData(data, formFields);
      if (errors.length > 0) {
        showAlert.error(errors.join("\n"));
        return;
      }

      // Kirim data ke Redux API
      await dispatch(createAnggota(data)).unwrap();
      showAlert.success("Data Anggota berhasil ditambahkan!", () => {
        router.push("/MasterData/master-anggota/table-anggota");
      });
    } catch (error) {
      console.error("Gagal menambahkan Anggota:", error);
      showAlert.error("Gagal menambahkan data Anggota.");
    }
  };

  // Konfigurasi Form Fields
  const formFields = [
    {
      section: "Informasi Anggota",
      fields: [
        {
          type: "text",
          label: "Kode Anggota",
          name: "keangotaanKode",
          placeholder: "Masukkan Kode Anggota...",
          colSize: 6,
          rules: { required: "Kode Anggota harus diisi" },
        },
        {
          type: "text",
          label: "Jenis Anggota",
          name: "jenisKeangotaan",
          placeholder: "Masukkan Jenis Anggota...",
          colSize: 6,
          rules: { required: "Jenis Anggota harus diisi" },
        },
        {
          type: "text",
          label: "Jenis Promo",
          name: "jenisPromo",
          placeholder: "Masukkan Jenis Promo...",
          colSize: 6,
          rules: { required: "Jenis Promo harus diisi" },
        },
      ],
    },
  ];

  // Fungsi untuk validasi form
  const validateFormData = (data, fields) => {
    const errors = [];
    fields.forEach((section) => {
      section.fields.forEach((field) => {
        const { name, label, rules } = field;
        const value = data[name];

        if (rules?.required && (!value || value.trim() === "")) {
          errors.push(`${label} harus diisi`);
        }

        if (rules?.pattern && !rules.pattern.test(value)) {
          errors.push(`${label} tidak valid`);
        }
      });
    });
    return errors;
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Anggota"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-anggota/table-anggota"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default AddFormAnggota;
