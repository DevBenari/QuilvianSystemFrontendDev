"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deleteUserActive,
  fetchUserActiveById,
  updateUserActive,
} from "@/lib/state/slice/auth/master-userActive/UserActive";

const EditUserActiveForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedUserActive, loading } = useSelector(
    (state) => state.UserActive
  );

  const [dataUserActive, setDataUserActive] = useState(null);

  // Fetch data UserActive berdasarkan ID
  useEffect(() => {
    dispatch(fetchUserActiveById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedUserActive) {
      setDataUserActive(selectedUserActive);
    }
  }, [selectedUserActive]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataUserActive) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Konfigurasi Form Fields
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Lengkap",
          name: "fullName",
          placeholder: "Masukkan Nama Lengkap",
          colSize: 6,
          rules: { required: "Nama Lengkap harus diisi " },
        },
        {
          type: "text",
          label: "Indetitas Number",
          name: "identityNumber",
          placeholder: "Masukkan Indetitas Number...",
          colSize: 6,
          rules: { required: "Indetitas Number harus diisi" },
        },
        {
          type: "text",
          label: "Tempat Lahir",
          name: "placeOfBirth",
          placeholder: "Masukkan Tempat Lahir...",
          colSize: 6,
          rules: { required: "Tempat Lahir harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Lahir",
          name: "dateOfBirth",
          colSize: 6,
          rules: { required: "Tanggal Lahir harus diisi" },
        },
        {
          type: "select",
          id: "gender",
          label: "Jenis Kelamin",
          name: "gender",
          placeholder: "Jenis Kelamin",
          options: [
            { label: "Laki-laki", value: "Laki-Laki" },
            { label: "Perempuan", value: "Perempuan" },
          ],
          rules: { required: "Jenis Kelamin is required" },
          colSize: 6,
        },
        {
          type: "text",
          label: "Alamat",
          name: "address",
          placeholder: "Masukkan Alamat...",
          colSize: 6,
          rules: { required: "Alamat harus diisi" },
        },
        {
          type: "text",
          label: "Handphone",
          name: "handphone",
          placeholder: "Masukkan Nomor Handphone...",
          colSize: 6,
          rules: { required: "Handphone harus diisi" },
        },
        {
          type: "text",
          label: "Email",
          name: "email",
          placeholder: "Masukkan Email...",
          colSize: 6,
          rules: { required: "Email harus diisi" },
        },
        {
          type: "select",
          label: "Aktif",
          name: "isActive",
          colSize: 6,
          options: [
            { label: "Aktif", value: true },
            { label: "Nonaktif", value: false },
          ],
          rules: { required: "Status aktif harus dipilih" },
        },
      ],
    },
  ];

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataUserActive?.[field.name] ?? "",
    })),
  }));

  // Submit form untuk update data
  const handleSubmit = async (data) => {
    try {
      if (!dataUserActive.userActiveId) {
        showAlert.error(
          "Gagal memperbarui data: ID User Aktif tidak ditemukan."
        );
        return;
      }

      console.log("Data yang dikirim ke backend:", data);

      await dispatch(
        updateUserActive({ id: dataUserActive.userActiveId, data })
      ).unwrap();

      showAlert.success("Data User berhasil diperbarui!", () => {
        router.push("/MasterData/master-userActive/table-userActive");
      });
    } catch (error) {
      console.error("Gagal memperbarui data UserActive", error);
      showAlert.error("Gagal memperbarui data User Aktif.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataUserActive?.userActiveId) {
      showAlert.error("Gagal menghapus: ID User Aktif tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete(
      "Data User Aktif akan dihapus permanen",
      async () => {
        try {
          await dispatch(
            deleteUserActive(dataUserActive.userActiveId)
          ).unwrap();
          showAlert.success("Data UserActive berhasil dihapus!", () => {
            router.push("/MasterData/master-userActive/table-userActive");
          });
        } catch (error) {
          showAlert.error("Gagal menghapus data User Aktif.");
        }
      }
    );
  };

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data UserActive"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataUserActive}
        backPath="/MasterData/master-UserActive/table-UserActive"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditUserActiveForm;
