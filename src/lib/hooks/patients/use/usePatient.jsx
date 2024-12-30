import { useState, useEffect } from "react";
import { fetchPatients } from "../api";

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (err) {
        setError("Gagal memuat daftar pasien.");
      } finally {
        setLoading(false);
      }
    };

    getPatients();
  }, []);

  return { patients, loading, error };
};
