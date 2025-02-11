"use client";
import React, { useEffect, useMemo, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
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
  const { selectedAsuransi } = useSelector((state) => state.asuransi);

  // Ambil data asuransi berdasarkan ID dari URL
  useEffect(() => {
    const id = extractIdFromSlug(params.slug);
    dispatch(fetchAsuransiById(id));
  }, [dispatch, params.slug]);

  // Handler submit untuk update data asuransi
  const handleSubmit = async (data) => {
    try {
      await dispatch(
        updateAsuransi({ id: selectedAsuransi.asuransiId, data })
      ).unwrap();
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-asuransi/daftar-asuransi");
      });
    } catch (error) {
      console.error("Gagal memperbarui data asuransi:", error);
      showAlert.error("Gagal memperbarui data asuransi.");
    }
  };

  // Handler delete untuk menghapus data asuransi
  const handleDelete = async () => {
    showAlert.confirmDelete("Data asuransi akan dihapus permanen", async () => {
      try {
        await dispatch(deleteAsuransi(selectedAsuransi.asuransiId)).unwrap();
        showAlert.success("Data asuransi berhasil dihapus!", () => {
          router.push("/MasterData/master-asuransi/daftar-asuransi");
        });
      } catch (error) {
        console.error("Gagal menghapus data asuransi:", error);
        showAlert.error("Gagal menghapus data asuransi.");
      }
    });
  };

  // Memoisasi formFields agar tidak berubah setiap render
  const formFields = useMemo(
    () => [
      {
        section: "Informasi Asuransi",
        fields: [
          {
            type: "text",
            label: "Kode Asuransi",
            name: "kodeAsuransi",
            placeholder: "Masukkan Kode Asuransi...",
            colSize: 6,
            value: selectedAsuransi?.kodeAsuransi || "",
          },
          {
            type: "text",
            label: "Nama Asuransi",
            name: "namaAsuransi",
            placeholder: "Masukkan Nama Asuransi...",
            colSize: 6,
            value: selectedAsuransi?.namaAsuransi || "",
          },
          {
            type: "text",
            label: "Tipe Perusahaan",
            name: "tipePerusahaan",
            placeholder: "Masukkan Tipe Perusahaan...",
            colSize: 6,
            value: selectedAsuransi?.tipePerusahaan || "",
          },
          {
            type: "text",
            label: "Status",
            name: "status",
            placeholder: "Masukkan Status...",
            colSize: 6,
            value: selectedAsuransi?.status || "",
          },
        ],
      },
    ],
    [selectedAsuransi]
  );

  return (
    <Fragment>
      <DynamicForm
        title="Edit Data Asuransi"
        formConfig={formFields}
        onSubmit={handleSubmit}
        handleDelete={handleDelete}
        backPath="/MasterData/master-asuransi/daftar-asuransi"
        isAddMode={false} // Karena ini halaman edit, bukan add baru
      />
    </Fragment>
  );
};

export default AsuransiEditForm;
