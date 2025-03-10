"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import { showAlert } from "@/components/features/alert/custom-alert";
import {
  deletePersalinan,
  fetchPersalinanById,
  updatePersalinan,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-operasi/PersalinanSlice";

const EditPersalinanForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedPersalinan, loading } = useSelector(
    (state) => state.Persalinan
  );

  const [dataPersalinan, setDataPersalinan] = useState(null);

  // Fetch data Persalinan berdasarkan ID
  useEffect(() => {
    dispatch(fetchPersalinanById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State
  useEffect(() => {
    if (selectedPersalinan) {
      setDataPersalinan(selectedPersalinan);
    }
  }, [selectedPersalinan]);

  // Pastikan data sudah ada sebelum menampilkan form
  if (!dataPersalinan) {
    return <p className="text-center">Memuat data...</p>;
  }

  // Submit form untuk update data

  // Konfigurasi Form Fields
  const formFields = [
    {
      fields: [
        {
          type: "text",
          label: "Nama Persalinan",
          name: "namaPersalinan",
          placeholder: "Masukkan Nama Persalinan...",
          colSize: 6,
          rules: { required: "Nama Persalinan harus diisi" },
        },
        {
          type: "date",
          label: "Tanggal Persalinan",
          name: "tanggalPersalinan",
          colSize: 6,
          rules: { required: "Tanggal Persalinan harus diisi" },
        },
        {
          type: "text",
          label: "Tipe Persalinan",
          name: "tipePersalinan",
          placeholder: "Masukkan Tipe Persalinan...",
          colSize: 6,
          rules: { required: "Tipe Persalinan harus diisi" },
        },
        {
          type: "text",
          label: "Tindakan Persalinan",
          name: "tindakanPersalinan",
          placeholder: "Masukkan Tindakan Persalinan...",
          colSize: 6,
          rules: { required: "Tindakan Persalinan harus diisi" },
        },
        {
          type: "text",
          label: "Sub Tindakan Persalinan",
          name: "subTindakanPersalinan",
          placeholder: "Masukkan Sub Tindakan Persalinan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Komplikasi Persalinan",
          name: "komplikasiPersalinan",
          placeholder: "Masukkan Komplikasi Persalinan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Kamar",
          name: "namaKamar",
          placeholder: "Masukkan Nama Kamar...",
          colSize: 6,
        },
        {
          type: "text",
          label: "No Kamar",
          name: "noKamar",
          placeholder: "Masukkan Nomor Kamar...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Kategori Kamar",
          name: "kategoriKamar",
          placeholder: "Masukkan Kategori Kamar...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Catatan Persalinan",
          name: "catatanPersalinan",
          placeholder: "Masukkan Catatan Persalinan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Dokter Persalinan",
          name: "dokterPersalinan",
          placeholder: "Masukkan Nama Dokter Persalinan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Bidan Persalinan",
          name: "bidanPersalinan",
          placeholder: "Masukkan Nama Bidan Persalinan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Anestesi Persalinan",
          name: "anastesiPersalinan",
          placeholder: "Masukkan Anestesi Persalinan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Observasi Persalinan",
          name: "observasiPersalinan",
          placeholder: "Masukkan Observasi Persalinan...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Bayi",
          name: "namaBayi",
          placeholder: "Masukkan Nama Bayi...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Jenis Kelamin Bayi",
          name: "jenisKelaminBayi",
          placeholder: "Masukkan Jenis Kelamin Bayi...",
          colSize: 6,
        },
        {
          type: "date",
          label: "Tanggal Lahir Bayi",
          name: "ttlBayi",
          colSize: 6,
          rules: { required: "Tanggal Lahir Bayi harus diisi" },
        },
        {
          type: "text",
          label: "Berat Bayi",
          name: "beratBayi",
          placeholder: "Masukkan Berat Bayi...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Panjang Bayi",
          name: "panjangBayi",
          placeholder: "Masukkan Panjang Bayi...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Ayah",
          name: "namaAyah",
          placeholder: "Masukkan Nama Ayah...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Nama Ibu",
          name: "namaIbu",
          placeholder: "Masukkan Nama Ibu...",
          colSize: 6,
        },
        {
          type: "text",
          label: "Status Bayi",
          name: "statusBayi",
          placeholder: "Masukkan Status Bayi...",
          colSize: 6,
        },
      ],
    },
  ];

  const handleSubmit = async (data) => {
    try {
      if (!dataPersalinan.persalinanId) {
        showAlert.error(
          "Gagal memperbarui data: ID Persalinan tidak ditemukan."
        );
        return;
      }

      console.log("Data yang dikirim ke backend:", data);

      await dispatch(
        updatePersalinan({ id: dataPersalinan.persalinanId, data })
      ).unwrap();

      showAlert.success("Data Persalinan berhasil diperbarui!", () => {
        router.push("/MasterData/master-departement/table-departement");
      });
    } catch (error) {
      console.error("Gagal memperbarui data Persalinan", error);
      showAlert.error("Gagal memperbarui data Persalinan.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    if (!dataPersalinan?.persalinanId) {
      showAlert.error("Gagal menghapus: ID Persalinan tidak ditemukan.");
      return;
    }

    showAlert.confirmDelete(
      "Data Persalinan akan dihapus permanen",
      async () => {
        try {
          await dispatch(
            deletePersalinan(dataPersalinan.persalinanId)
          ).unwrap();
          showAlert.success("Data Persalinan berhasil dihapus!", () => {
            router.push(
              "/MasterData/master-persalinan/persalinan/table-persalinan"
            );
          });
        } catch (error) {
          showAlert.error("Gagal menghapus data Persalinan.");
        }
      }
    );
  };

  // Menyesuaikan field form dengan data yang sudah ada di Redux
  const formFieldsWithData = formFields.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: dataPersalinan?.[field.name] ?? "",
    })),
  }));

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Persalinan"
        formConfig={formFieldsWithData}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        userData={dataPersalinan}
        backPath="/MasterData/master-persalinan/persalinan/table-persalinan"
        isAddMode={false}
      />
    </Fragment>
  );
};

export default EditPersalinanForm;
