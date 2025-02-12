"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { extractIdFromSlug } from "@/utils/slug";
import {
  fetchAsuransiById,
  updateAsuransi,
  deleteAsuransi,
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";
import { showAlert } from "@/components/features/alert/custom-alert";

const AsuransiEditForm = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedAsuransi, loading } = useSelector((state) => state.asuransi);

  const [dataAsuransi, setDataAsuransi] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  // Fetch data saat komponen pertama kali dimuat
  useEffect(() => {
    dispatch(fetchAsuransiById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Sinkronisasi data Redux dengan State dan Form
  useEffect(() => {
    if (selectedAsuransi) {
      setDataAsuransi(selectedAsuransi);
      Object.keys(selectedAsuransi).forEach((key) =>
        setValue(key, selectedAsuransi[key] || "")
      );
    }
  }, [selectedAsuransi, setValue]);

  // Submit form untuk update data
  const onSubmit = async (formData) => {
    try {
      const cleanedData = {
        namaAsuransi: formData.namaAsuransi,
        kodeAsuransi: formData.kodeAsuransi,
        tipePerusahaan: formData.tipePerusahaan,
        status: formData.status,
      };

      console.log("Data yang dikirim ke backend:", cleanedData);

      await dispatch(
        updateAsuransi({ id: dataAsuransi.asuransiId, data: cleanedData })
      ).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-asuransi/daftar-asuransi");
      });
    } catch (error) {
      console.error("Gagal memperbarui data asuransi:", error);
      showAlert.error("Gagal memperbarui data asuransi.");
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async () => {
    showAlert.confirmDelete("Data asuransi akan dihapus permanen", async () => {
      try {
        await dispatch(deleteAsuransi(dataAsuransi.asuransiId)).unwrap();
        showAlert.success("Data asuransi berhasil dihapus!", () => {
          router.push("/MasterData/master-asuransi/daftar-asuransi");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data asuransi.");
      }
    });
  };

  // Konfigurasi Form Fields
  const formFields = dataAsuransi
    ? [
        {
          section: "Informasi Asuransi",
          fields: [
            {
              type: "text",
              label: "Kode Asuransi",
              name: "kodeAsuransi",
              placeholder: "Masukkan Kode Asuransi...",
              colSize: 6,
              defaultValue: dataAsuransi.kodeAsuransi || "",
              onChangeCallback: (e) => setValue("kodeAsuransi", e.target.value),
            },
            {
              type: "text",
              label: "Nama Asuransi",
              name: "namaAsuransi",
              placeholder: "Masukkan Nama Asuransi...",
              colSize: 6,
              defaultValue: dataAsuransi.namaAsuransi || "",
              onChangeCallback: (e) => setValue("namaAsuransi", e.target.value),
            },
            {
              type: "text",
              label: "Tipe Perusahaan",
              name: "tipePerusahaan",
              placeholder: "Masukkan Tipe Perusahaan...",
              colSize: 6,
              defaultValue: dataAsuransi.tipePerusahaan || "",
              onChangeCallback: (e) =>
                setValue("tipePerusahaan", e.target.value),
            },
            {
              type: "text",
              label: "Status",
              name: "status",
              placeholder: "Masukkan Status...",
              colSize: 6,
              defaultValue: dataAsuransi.status || "",
              onChangeCallback: (e) => setValue("status", e.target.value),
            },
          ],
        },
      ]
    : [];

  return (
    <Fragment>
      {loading ? (
        <p>Loading...</p>
      ) : dataAsuransi ? (
        <DynamicForm
          title="Edit Data Asuransi"
          formConfig={formFields}
          onSubmit={handleSubmit(onSubmit)}
          handleDelete={handleDelete}
          backPath="/MasterData/master-asuransi/daftar-asuransi"
          isAddMode={false}
        />
      ) : (
        <p>Data tidak ditemukan</p>
      )}
    </Fragment>
  );
};

export default AsuransiEditForm;
