"use client";

import { showAlert } from "@/components/features/alert/custom-alert";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import { createPersalinan } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-operasi/PersalinanSlice";

import { useRouter } from "next/navigation";
import { Fragment } from "react";

import { useDispatch } from "react-redux";

const FormAddPersalinan = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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
      await dispatch(createPersalinan(data)).unwrap(); // Tunggu hasil dari dispatch
      showAlert.success("Data berhasil disimpan", () => {
        router.push("/MasterData/master-operasi/persalinan/table-persalinan");
      });
    } catch (error) {
      console.error("Gagal menambahkan Persalinan :", error);
      showAlert.error("Gagal menambahkan data Persalinan ");
    }
  };

  return (
    <Fragment>
      <DynamicForm
        title="Tambah Data Persalinan"
        formConfig={formFields}
        onSubmit={handleSubmit}
        backPath={"/MasterData/master-operasi/persalinan/table-persalinan"}
        isAddMode={true}
      />
    </Fragment>
  );
};

export default FormAddPersalinan;
