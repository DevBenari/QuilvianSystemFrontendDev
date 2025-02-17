"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";

import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deleteDokterPraktek,
  fetchDokterPraktekById,
  updateDokterPraktek,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPraktek";
import { fetchDokter } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterSlice";



const EditDokterPraktekForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedDokterPraktek } = useSelector((state) => state.dokterPraktek);
  const [dataDokterPraktek, setDataDokterPraktek] = useState(null);
  console.log("selectedDokterPraktek:", selectedDokterPraktek);

   const { data: dokterData } = useSelector((state) => state.dokter);
  
   

  // Fetch data saat pertama kali dimuat
  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchDokterPraktekById(id));
    dispatch(fetchDokter());
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedDokterPraktek) {
      setDataDokterPraktek(selectedDokterPraktek);
    }
  }, [selectedDokterPraktek]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataDokterPraktek) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Submit form untuk update data
  const handleSubmit = async (formData) => {
    try {
      if (!dataDokterPraktek.dokterPraktekId) {
        showAlert.error(
          "Gagal memperbarui data: Dokter Praktek ID tidak ditemukan."
        );
        return;
      }

      console.log("Data yang dikirim ke backend:", formData);

      await dispatch(
        updateDokterPraktek({
          id: dataDokterPraktek.dokterPraktekId,
          data: formData,
        })
      ).unwrap();

      showAlert.success("Data berhasil diperbarui!", () => {
        router.push(
          "/MasterData/master-dokter/dokter-praktek/table-dokter-praktek"
        );
      });
    } catch (error) {
      console.error("Gagal memperbarui data Dokter Praktek:", error);
      showAlert.error("Gagal memperbarui data Dokter Praktek.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataDokterPraktek?.dokterPraktekId) {
      showAlert.error("Gagal menghapus: Dokter Praktek ID tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete(
      "Data Dokter Praktek akan dihapus permanen",
      async () => {
        try {
          await dispatch(
            deleteDokterPraktek(dataDokterPraktek.dokterPraktekId)
          ).unwrap();
          showAlert.success("Data Dokter Praktek berhasil dihapus!", () => {
            router.push(
              "/MasterData/master-dokter/dokter-praktek/table-dokter-praktek"
            );
          });
        } catch (error) {
          showAlert.error("Gagal menghapus data Dokter Praktek.");
        }
      }
    );
  };

  // Konfigurasi Form Fields
  const formFields = [
    {
      section: "Informasi Dokter Praktek",
      fields: [
        {
          type: "text",
          label: "Nama Dokter",
          name: "dokter",
          placeholder: "Masukkan Nama Dokter...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Layanan",
          name: "layanan",
          placeholder: "Masukkan Layanan...",
          colSize: 6,
        },
        {
          type: "time",
          label: "Jam Praktek",
          name: "jamPraktek",
          placeholder: "Masukkan Jam Praktek...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Hari",
          name: "hari",
          placeholder: "Masukkan Hari Praktek...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Jam Masuk",
          name: "jamMasuk",
          placeholder: "Pilih Jam Masuk...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Jam Keluar",
          name: "jamKeluar",
          placeholder: "Pilih Jam Keluar...",
          colSize: 6,
        },
        {
          type: "select",
          label: "Dokter",
          name: "dokterId",
          placeholder: "Pilih Dokter...",
          colSize: 6,
          options: dokterData.data.map((item) => ({
            label: item.nmDokter,
            value: item.dokterId,
          })),

          rules: { required: "Dokter harus dipilih" },
        },
      ],
    },
  ];

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataDokterPraktek?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Dokter Praktek"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataDokterPraktek}
        backPath="/MasterData/master-dokter/dokter-praktek/table-dokter-praktek"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditDokterPraktekForm;
