import { createPatient } from "../api/create";

export const handlePatientSubmit = async (
  e,
  formData,
  setFormData,
  setSuccessMessage,
  setErrorMessage
) => {
  e.preventDefault();

  // Validasi sederhana
  for (const key in formData) {
    if (!formData[key]) {
      setErrorMessage(`Field ${key} harus diisi!`);
      return;
    }
  }

  try {
    await createPatient(formData); // Simpan ke API
    setSuccessMessage("Pasien berhasil ditambahkan!");
    setErrorMessage("");
    setFormData({
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

    // Navigasi ke halaman daftar pasien
    alert("data berhasil ditambahkan");
    window.location.href = "/igd";
  } catch (err) {
    console.error(err);
    setErrorMessage("Terjadi kesalahan saat menambahkan pasien.");
  }
};
