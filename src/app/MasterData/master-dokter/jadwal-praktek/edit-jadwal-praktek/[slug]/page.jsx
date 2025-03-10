"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deleteJadwalPraktek,
  fetchJadwalPraktekById,
  updateJadwalPraktek,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/JadwalPraktekSlice";

const EditJadwalPraktekForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedJadwalPraktek, loading } = useSelector(
    (state) => state.JadwalPraktek
  );

  const [dataJadwalPraktek, setDataJadwalPraktek] = useState(null);

  // Fetch data JadwalPraktek berdasarkan ID
  useEffect(() => {
    dispatch(fetchJadwalPraktekById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedJadwalPraktek) {
      setDataJadwalPraktek(selectedJadwalPraktek);
    }
  }, [selectedJadwalPraktek]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataJadwalPraktek) {
    return <p className="text-center">Memuat data...</p>;
  }

  const formFields = [
    {
      fields: [
        {
          type: "select",
          label: "Dokter",
          name: "dokterId",
          options: [], // Harus diisi dengan daftar dokter yang tersedia
          colSize: 6,
          rules: { required: "Dokter harus dipilih" },
        },
        {
          type: "select",
          label: "Dokter Poli",
          name: "jadwalPraktekId",
          options: [], // Harus diisi dengan daftar dokter poli yang tersedia
          colSize: 6,
          rules: { required: "Dokter Poli harus dipilih" },
        },
        {
          type: "text",
          label: "Nama Dokter",
          name: "namaDokter",
          placeholder: "Masukkan Nama Dokter...",
          colSize: 6,
          rules: { required: "Nama Dokter harus diisi" },
        },
        {
          type: "select",
          label: "Poli",
          name: "poliId",
          options: [], // Harus diisi dengan daftar poli yang tersedia
          colSize: 6,
          rules: { required: "Poli harus dipilih" },
        },
        {
          type: "select",
          label: "Sub Poli",
          name: "subPoliId",
          options: [], // Harus diisi dengan daftar sub poli yang tersedia
          colSize: 6,
          rules: { required: "Sub Poli harus dipilih" },
        },
        {
          type: "text",
          label: "Waktu Praktek",
          name: "waktuPraktek",
          placeholder: "Masukkan Waktu Praktek...",
          colSize: 6,
          rules: { required: "Waktu Praktek harus diisi" },
        },
        {
          type: "text",
          label: "Hari Praktek",
          name: "hariPraktek",
          placeholder: "Masukkan Hari Praktek...",
          colSize: 6,
          rules: { required: "Hari Praktek harus diisi" },
        },
        {
          type: "time",
          label: "Jam Mulai",
          name: "jamMulai",
          colSize: 6,
          rules: { required: "Jam Mulai harus diisi" },
        },
        {
          type: "time",
          label: "Jam Berakhir",
          name: "jamBerakhir",
          colSize: 6,
          rules: { required: "Jam Berakhir harus diisi" },
        },
        {
          type: "text",
          label: "Maksimal Pasien",
          name: "maxPasien",
          placeholder: "Masukkan Maksimal Pasien...",
          colSize: 6,
          rules: { required: "Maksimal Pasien harus diisi" },
        },
      ],
    },
  ];

  // Submit form untuk update data
  const handleSubmit = async (data) => {
    try {
      if (!dataJadwalPraktek.jadwalPraktekId) {
        showAlert.error(
          "Gagal memperbarui data: ID JadwalPraktek tidak ditemukan."
        );
        return;
      }

      console.log("Data yang dikirim ke backend:", data);

      await dispatch(
        updateJadwalPraktek({ id: dataJadwalPraktek.jadwalPraktekId, data })
      ).unwrap();

      showAlert.success("Data JadwalPraktek berhasil diperbarui!", () => {
        router.push(
          "/MasterData/master-dokter/jadwal-praktek/table-jadwal-praktek"
        );
      });
    } catch (error) {
      console.error("Gagal memperbarui data Jadwal Praktek", error);
      showAlert.error("Gagal memperbarui data Jadwal Praktek.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataJadwalPraktek?.jadwalPraktekId) {
      showAlert.error("Gagal menghapus: ID Jadwal Praktek tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete(
      "Data JadwalPraktek akan dihapus permanen",
      async () => {
        try {
          await dispatch(
            deleteJadwalPraktek(dataJadwalPraktek.jadwalPraktekId)
          ).unwrap();
          showAlert.success("Data JadwalPraktek berhasil dihapus!", () => {
            router.push(
              "/MasterData/master-dokter/jadwal-praktek/table-jadwal-praktek"
            );
          });
        } catch (error) {
          showAlert.error("Gagal menghapus data Jadwal Praktek.");
        }
      }
    );
  };

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataJadwalPraktek?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data JadwalPraktek"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataJadwalPraktek}
        backPath="/MasterData/master-dokter/dokter-poli/table-jadwal-praktek"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditJadwalPraktekForm;
