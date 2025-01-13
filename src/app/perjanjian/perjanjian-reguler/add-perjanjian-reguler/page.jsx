"use client";

import DynamicDuaForm from "@/components/features/dynamicDuaForm.jsx/dynamicDuaForm";
import DynamicForm from "@/components/features/dynamicForm/dynamicForm";
import TableTindakan from "@/components/features/tindakanTable/tindakantTable";
import DateInput from "@/components/ui/date-input";
import RadioInput from "@/components/ui/radio-input";
import SelectField from "@/components/ui/select-field";
import SearchableSelectField from "@/components/ui/select-field-search";
import TextField from "@/components/ui/text-field";
import TextArea from "@/components/ui/textArea-field";
import { pemeriksaRadiologi } from "@/utils/dataTindakan";
import {
  dataDepartemen,
  dataDokter,
  dataKelas,
  paketMcu,
  ruangOperasi,
} from "@/utils/SearchSelect";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";
import AddPerjanjianForm from "../add-perjanjian/page";

const AddPerjanjianReguler = () => {
  const router = useRouter();
  // Fungsi handle untuk perubahan pada radio input
  const [selectedLayanan, setSelectedLayanan] = useState(""); // Awalnya null
  const handleLayananChange = (value) => {
    setSelectedLayanan(value); // Update state lokal
  };

  // Konfigurasi form
  const formFields = [
    {
      fields: [
        // Informasi Pasien
        {
          type: "text",
          id: "nama",
          label: "Nama Pasien",
          name: "nama",
          placeholder: "Masukkan nama pasien",
          rules: { required: "Nama pasien harus diisi" },
          colSize: 3,
        },
        {
          type: "text",
          id: "tempatLahir",
          label: "Tempat Lahir",
          name: "tempatLahir",
          placeholder: "Masukkan tempat lahir",
          rules: { required: "Tempat lahir harus diisi" },
          colSize: 3,
        },
        {
          type: "date",
          id: "tglLahir",
          label: "Tanggal Lahir",
          name: "tglLahir",
          rules: { required: "Tanggal lahir harus diisi" },
          colSize: 6,
        },
        {
          type: "select",
          id: "jenisKelamin",
          label: "Jenis Kelamin",
          name: "jenisKelamin",
          placeholder: "Pilih jenis kelamin",
          options: [
            { label: "Laki-Laki", value: "Laki-Laki" },
            { label: "Perempuan", value: "Perempuan" },
          ],
          rules: { required: "Jenis kelamin harus dipilih" },
          colSize: 6,
        },
        {
          type: "textarea",
          id: "alamat",
          label: "Alamat Rumah",
          name: "alamat",
          placeholder: "Masukkan alamat rumah",
          rules: { required: "Alamat rumah harus diisi" },
          colSize: 12,
        },

        {
          type: "text",
          id: "noHp",
          label: "No HP",
          name: "noHp",
          placeholder: "Masukkan nomor HP",
          rules: { required: "Nomor HP harus diisi" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipepenjamin",
          name: "tipePenjamin",
          label: "Tipe penjamin",
          placeholder: "Penjamin",
          options: [
            { label: "BPJS", value: "bpjs" },
            { label: "Non BPJS", value: "non-bpjs" },
          ],
          rules: { required: "Penjamin is required" },
          colSize: 6,
        },
        {
          type: "textarea",
          id: "diagnosaAwal",
          label: "Diagnosa Awal",
          name: "diagnosaAwal",
          placeholder: "Masukkan diagnosa awal",
        },
        {
          type: "textarea",
          id: "informasiLainnya",
          label: "Informasi Lainnya",
          name: "informasiLainnya",
          placeholder: "Masukkan informasi lainnya",
        },
      ],
    },

    // Diagnosa dan Informasi Tambahan
  ];

  const handleSubmit = async (data) => {
    console.log("Data yang disubmit:", data);
    alert("Perjanjian berhasil dibuat!");
    router.push("/perjanjian");
  };

  return (
    <Fragment>
      <DynamicForm
        title="Pendaftaran Perjanjian Reguler"
        formConfig={formFields}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default AddPerjanjianReguler;
