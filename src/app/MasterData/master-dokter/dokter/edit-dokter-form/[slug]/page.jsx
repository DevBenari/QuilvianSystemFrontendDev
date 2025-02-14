"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import {
  fetchDokterById,
  updateDokter,
  deleteDokter,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";
import { showAlert } from "@/components/features/alert/custom-alert";

const EditDokter = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedDokter, loading } = useSelector((state) => state.dokter);
  const [dataDokter, setDataDokter] = useState(null);

  // Fetch data saat halaman dimuat
  useEffect(() => {
    dispatch(fetchDokterById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Update state setelah data dokter berhasil di-fetch
  useEffect(() => {
    if (selectedDokter) {
      setDataDokter(selectedDokter);
    }
  }, [selectedDokter]);

  // Submit form untuk update data
  const handleSubmit = async (formData) => {
    try {
      await dispatch(
        updateDokter({ id: dataDokter.dokterId, data: formData })
      ).unwrap();
      showAlert.success("Data dokter berhasil diperbarui!", () => {
        router.push("/MasterData/master-dokter/dokter/table-dokter");
      });
    } catch (error) {
      console.error("Gagal memperbarui data dokter:", error);
      showAlert.error("Gagal memperbarui data dokter.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    showAlert.confirmDelete("Data dokter akan dihapus permanen", async () => {
      try {
        await dispatch(deleteDokter(dataDokter.dokterId)).unwrap();
        showAlert.success("Data dokter berhasil dihapus!", () => {
          router.push("/MasterData/master-dokter/dokter/table-dokter");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data dokter.");
      }
    });
  };

  // Konfigurasi Form Fields
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Kode Dokter",
          name: "kdDokter",
          placeholder: "Masukkan Kode Dokter...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Dokter",
          name: "nmDokter",
          placeholder: "Masukkan Nama Dokter...",
          colSize: 6,
        },
        {
          type: "text",
          label: "SIP",
          name: "sip",
          placeholder: "Masukkan SIP...",
          colSize: 6,
        },
        {
          type: "text",
          label: "STR",
          name: "str",
          placeholder: "Masukkan STR...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Tanggal SIP",
          name: "tglSip",
          placeholder: "Pilih Tanggal SIP...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Tanggal STR",
          name: "tglStr",
          placeholder: "Pilih Tanggal STR...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Panggilan Dokter",
          name: "panggilDokter",
          placeholder: "Masukkan Panggilan Dokter...",
          colSize: 6,
        },
        {
          type: "text",
          label: "NIK",
          name: "nik",
          placeholder: "Masukkan NIK...",
          colSize: 6,
        },
      ],
    },
  ];

  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataDokter?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      {loading ? (
        <p>Loading...</p>
      ) : dataDokter ? (
        <DynamicForm
          title="Edit Data Dokter"
          formConfig={formFieldsWithData}
          onSubmit={handleSubmit}
          userData={dataDokter}
          handleDelete={handleDelete}
          backPath="/MasterData/master-dokter/dokter/table-dokter"
          isAddMode={false}
        />
      ) : (
        <p>Data tidak ditemukan</p>
      )}
    </Fragment>
  );
};

export default EditDokter;
