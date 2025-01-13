import { useState } from "react";
import { updatePatient } from "../api/update";

export const usePatientFormEdit = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updatePatientSubmit = async (
    e,
    formData,
    setFormData,
    setSuccessMessage,
    setErrorMessage,
    id // Pastikan ID pasien dikirim
  ) => {
    e.preventDefault();
    try {
      await updatePatient(id, formData); // Memanggil fungsi updatePatient
      setSuccessMessage("Data pasien berhasil diperbarui.");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Gagal memperbarui data pasien. Silakan coba lagi.");
      setSuccessMessage("");
    }
  };

  return {
    successMessage,
    errorMessage,
    setSuccessMessage,
    setErrorMessage,
    updatePatientSubmit,
  };
};
