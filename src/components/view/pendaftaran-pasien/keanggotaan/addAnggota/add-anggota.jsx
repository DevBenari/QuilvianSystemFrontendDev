"use client";

import DynamicForm from "@/components/features/dynamicFormAnimasi/dynamicFormAnimasi";
import { addAnggota } from "@/lib/hooks/keanggotaan/add";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const PendaftaranPasienAnggota = () => {
  const formFields = [
    {
      fields: [
        {
          type: "date",
          id: "periodeMulai",
          label: "Periode Mulai",
          name: "periodeMulai",
          colSize: 6,
          rules: { required: "Periode Mulai  harus diisi" },
        },
        {
          type: "date",
          id: "periodeAkhir",
          label: "Periode Akhir ",
          name: "periodeAkhir",
          colSize: 6,
          rules: { required: "Periode Akhir  harus diisi" },
        },
        {
          type: "date",
          id: "tanggalDaftar",
          label: "Tanggal Daftar ",
          name: "tanggalDaftar",
          colSize: 6,
          rules: { required: "Tanggal Daftar harus diisi" },
        },
        {
          type: "text",
          id: "nama",
          label: "Nama Peserta",
          name: "nama",
          placeholder: "Masukkan Nama Peserta...",
          colSize: 6,
          rules: { required: "Nama Peserta harus diisi" },
        },
        {
          type: "select",
          id: "jenisKelamin",
          label: "Jenis Kelamin",
          name: "jenisKelamin",
          placeholder: "jenis kelamin",
          options: [
            { label: "Laki-laki", value: "laki-laki" },
            { label: "Perempuan", value: "perempuan" },
          ],
          rules: { required: "Jenis Kelamin harus dipilih" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipeMember",
          label: "Tipe Member",
          placeholder: "Tipe Member",
          name: "tipeMember",
          options: [
            { label: "VIP Member dengan UP", value: "VIP_Member_dengan_UP" },
            { label: "VIP Member B", value: "VIP_Member_B" },
            { label: "VIP BKM Tanpa UP", value: "VIP_BKM_Tanpa_UP" },
            { label: "Telemedicine", value: "telemedicine" },
          ],
          rules: { required: "Tipe Member harus dipilih" },
          colSize: 6,
        },
        {
          type: "select",
          id: "statusMember",
          label: "Status Member",
          name: "statusMember",
          placeholder: "status member",
          options: [
            { label: "Aktif", value: "aktif" },
            { label: "Non-aktif", value: "non-aktif" },
          ],
          rules: { required: "Status Member harus dipilih" },
          colSize: 6,
        },
        {
          type: "text",
          id: "noRekamMedis",
          label: "No Rekam Medis",
          name: "noRekamMedis",
          placeholder: "No Rekam Medis",
          rules: { required: "No Rekam Medis harus diisi" },
          colSize: 6,
        },
        {
          type: "text",
          id: "nik",
          label: "NIK",
          name: "nik",
          placeholder: "NIK",
          rules: { required: "NIK harus diisi" },
          colSize: 6,
        },
        {
          type: "text",
          id: "tempatLahir",
          label: "Tempat Lahir",
          name: "tempatLahir",
          placeholder: "Tempat Lahir",
          rules: { required: "Tempat Lahir harus diisi" },
          colSize: 6,
        },
        {
          type: "date",
          id: "tanggalLahir",
          label: "Tanggal Lahir",
          name: "tanggalLahir",
          rules: { required: "Tanggal Lahir harus diisi" },
          colSize: 6,
        },
        {
          type: "select",
          id: "agama",
          label: "Agama",
          name: "agama",
          placeholder: "agama",
          options: [
            { label: "Islam", value: "islam" },
            { label: "Kristen Protestan", value: "kristen_protestan" },
            { label: "Katolik", value: "katolik" },
            { label: "Hindu", value: "hindu" },
            { label: "Buddha", value: "buddha" },
            { label: "Konghucu", value: "konghucu" },
          ],
          rules: { required: "Agama harus dipilih" },
          colSize: 6,
        },
        {
          type: "email",
          id: "email",
          label: "E-Mail",
          name: "email",
          placeholder: "E-Mail",
          rules: { required: "E-Mail harus diisi", pattern: /^\S+@\S+\.\S+$/ },
          colSize: 6,
        },
        {
          type: "text",
          id: "noTelepon1",
          label: "No Telepon",
          name: "noTelepon1",
          placeholder: "No Telepon",
          rules: { required: "No Telepon harus diisi" },
          colSize: 6,
        },
        {
          type: "textarea",
          id: "alamat",
          label: "Alamat",
          name: "alamat",
          placeholder: "Alamat",
          rules: { required: "Alamat harus diisi" },
          colSize: 12,
        },
      ],
    },
    {
      section: "Kontak Darurat",
      fields: [
        {
          type: "text",
          id: "namaAyah",
          label: "Nama Ayah",
          name: "namaAyah",
          placeholder: "Nama Ayah",
          rules: { required: "Nama Ayah harus diisi" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaSuamiIstri",
          label: "Nama Suami/Istri",
          name: "namaSuamiIstri",
          placeholder: "Nama Suami/Istri",
          rules: { required: "Nama Suami/Istri harus diisi" },
          colSize: 6,
        },
        {
          type: "text",
          id: "noTelepon2",
          label: "No Telepon",
          name: "noTelepon2",
          placeholder: "No Telepon",
          rules: { required: "No Telepon harus diisi" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaIbu",
          label: "Nama Ibu",
          name: "namaIbu",
          placeholder: "Nama Ibu",
          rules: { required: "Nama Ibu harus diisi" },
          colSize: 6,
        },
        {
          type: "email",
          id: "emailOrtu",
          label: "E-Mail Ortu",
          name: "emailOrtu",
          placeholder: "E-Mail Ortu",
          rules: {
            required: "E-Mail Ortu harus diisi",
            pattern: /^\S+@\S+\.\S+$/,
          },
          colSize: 6,
        },
      ],
    },
  ];

  const router = useRouter();

  const handleSubmit = async (data) => {
    // Validasi data sebelum submit
    const errors = validateFormData(data, formFields);

    if (errors.length > 0) {
      alert(`Form tidak valid:\n${errors.join("\n")}`);
      return;
    }

    try {
      const response = await addAnggota(data);
      alert("Anggota added successfully!");
      console.log("Response:", response);
      router.push("/pendaftaran/keanggotaan");
    } catch (error) {
      console.error(error);
      alert("Failed to add anggota.");
    }
  };

  // Fungsi validasi data
  const validateFormData = (data, fields) => {
    const errors = [];
    fields.forEach((section) => {
      section.fields.forEach((field) => {
        const { id, label, rules } = field;
        const value = data[id];

        if (rules?.required && (!value || value.trim() === "")) {
          errors.push(`${label} harus diisi`);
        }

        if (rules?.pattern && !rules.pattern.test(value)) {
          errors.push(`${label} tidak valid`);
        }
      });
    });
    return errors;
  };

  return (
    <Fragment>
      <DynamicForm formConfig={formFields} onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default PendaftaranPasienAnggota;
