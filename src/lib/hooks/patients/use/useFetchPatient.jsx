// hooks/useFetchPatient.js

import { useState, useEffect } from "react";
import { fetchPatients } from "../api";

const useFetchPatient = (id) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getPatientData = async (id) => {
      try {
        const data = await fetchPatients(id); // Panggil fungsi dari lib/api.js
        setFormData(data);
      } catch (error) {
        setErrorMessage("Terjadi kesalahan saat mengambil data pasien.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getPatientData();
    }
  }, [id]);

  return { formData, setFormData, loading, errorMessage };
};

export default useFetchPatient;
