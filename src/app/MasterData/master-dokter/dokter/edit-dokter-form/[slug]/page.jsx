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
  const { register, handleSubmit, setValue } = useForm();

  // Fetch data saat halaman dimuat
  useEffect(() => {
    dispatch(fetchDokterById(extractIdFromSlug(params.slug)));
  }, [dispatch, params.slug]);

  // Update state setelah data dokter berhasil di-fetch
  useEffect(() => {
    if (selectedDokter) {
      setDataDokter(selectedDokter);
      Object.keys(selectedDokter).forEach((key) =>
        setValue(key, selectedDokter[key] || "")
      );
    }
  }, [selectedDokter, setValue]);

  // Submit form untuk update data
  const onSubmit = async (formData) => {
    try {
      const cleanedData = {
        kdDokter: formData.kdDokter,
        nmDokter: formData.nmDokter,
        sip: formData.sip,
        str: formData.str,
        tglSip: formData.tglSip,
        tglStr: formData.tglStr,
        panggilDokter: formData.panggilDokter,
        nik: formData.nik,
      };

      console.log("Data yang dikirim ke backend:", cleanedData);

      await dispatch(
        updateDokter({ id: dataDokter.dokterId, data: cleanedData })
      ).unwrap();
      showAlert.success("Data dokter berhasil diperbarui!", () => {
        router.push("/MasterData/master-dokter/table-dokter");
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
          router.push("/MasterData/master-dokter/table-dokter");
        });
      } catch (error) {
        showAlert.error("Gagal menghapus data dokter.");
      }
    });
  };

  // Konfigurasi Form Fields
  const formFields = dataDokter
    ? [
        {
          section: "Informasi Dokter",
          fields: [
            {
              type: "text",
              label: "Kode Dokter",
              name: "kdDokter",
              placeholder: "Masukkan Kode Dokter...",
              colSize: 6,
              defaultValue: dataDokter.kdDokter || "",
              onChangeCallback: (e) => setValue("kdDokter", e.target.value),
            },
            {
              type: "text",
              label: "Nama Dokter",
              name: "nmDokter",
              placeholder: "Masukkan Nama Dokter...",
              colSize: 6,
              defaultValue: dataDokter.nmDokter || "",
              onChangeCallback: (e) => setValue("nmDokter", e.target.value),
            },
            {
              type: "text",
              label: "SIP",
              name: "sip",
              placeholder: "Masukkan SIP...",
              colSize: 6,
              defaultValue: dataDokter.sip || "",
              onChangeCallback: (e) => setValue("sip", e.target.value),
            },
            {
              type: "text",
              label: "STR",
              name: "str",
              placeholder: "Masukkan STR...",
              colSize: 6,
              defaultValue: dataDokter.str || "",
              onChangeCallback: (e) => setValue("str", e.target.value),
            },
            {
              type: "date",
              label: "Tanggal SIP",
              name: "tglSip",
              placeholder: "Pilih Tanggal SIP...",
              colSize: 6,
              defaultValue: dataDokter.tglSip || "",
              onChangeCallback: (e) => setValue("tglSip", e.target.value),
            },
            {
              type: "date",
              label: "Tanggal STR",
              name: "tglStr",
              placeholder: "Pilih Tanggal STR...",
              colSize: 6,
              defaultValue: dataDokter.tglStr || "",
              onChangeCallback: (e) => setValue("tglStr", e.target.value),
            },
            {
              type: "text",
              label: "Panggilan Dokter",
              name: "panggilDokter",
              placeholder: "Masukkan Panggilan Dokter...",
              colSize: 6,
              defaultValue: dataDokter.panggilDokter || "",
              onChangeCallback: (e) =>
                setValue("panggilDokter", e.target.value),
            },
            {
              type: "text",
              label: "NIK",
              name: "nik",
              placeholder: "Masukkan NIK...",
              colSize: 6,
              defaultValue: dataDokter.nik || "",
              onChangeCallback: (e) => setValue("nik", e.target.value),
            },
          ],
        },
      ]
    : [];

  return (
    <Fragment>
      {loading ? (
        <p>Loading...</p>
      ) : dataDokter ? (
        <DynamicForm
          title="Edit Data Dokter"
          formConfig={formFields}
          onSubmit={handleSubmit(onSubmit)}
          handleDelete={handleDelete}
          backPath="/MasterData/master-dokter/table-dokter"
          isAddMode={false}
        />
      ) : (
        <p>Data tidak ditemukan</p>
      )}
    </Fragment>
  );
};

export default EditDokter;
