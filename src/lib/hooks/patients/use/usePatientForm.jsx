import { useState } from "react";

export const usePatientForm = () => {
  const [formData, setFormData] = useState({
    namaLengkapPasien: "",
    kodePasien: "",
    jenisKelamin: "",
    tanggalLahir: "",
    tipePasien: "",
    alamat: "",
    nomorTelepon: "",
    email: "",
    pekerjaan: "",
    namaKantor: "",
    alamatKantor: "",
    nomorTeleponKantor: "",
    alergi: "",
    namaKeluargaTerdekat: "",
    karyawanRumahSakit: "",
    alamatKeluargaPasien: "",
    nomorTeleponKeluargaPasien: "",
    namaAyahPasien: "",
    pekerjaanAyahPasien: "",
    namaIbuPasien: "",
    pekerjaanIbuPasien: "",
    namaSutriPasien: "",
    pekerjaanSutriPasien: "",
    nomorIdentitasSutriPasien: "",
    AlamatLengkap: "",
    HubunganKeluarga: "",
    Kewarganegaraan: "",
    NomorIdentitasPasien: "",
    NomorRekamMedisBaru: "",
    NomorTelepon1: "",
    PasienPrioritas: "",
    StatusPasien: "",
    TempatLahir: "",
    Title: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return {
    formData,
    setFormData,
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
  };
};
