import axios from "axios";
import { useEffect, useState } from "react";

export const usePekerjaan = () => {
  const [Pekerjaan, setPekerjaan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPekerjaan = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://192.168.15.213:589/api/Pekerjaan`
        );
        // console.log("Data fetched:", response.data); // Tambahkan log ini
        setPekerjaan(response.data);
      } catch (err) {
        console.error("Failed to fetch Pekerjaan:", err);
        setError("Gagal memuat daftar Pekerjaan.");
      } finally {
        setLoading(false);
      }
    };

    getPekerjaan();
  }, []);

  return { Pekerjaan, loading, error };
};

export const addPekerjaan = async (data) => {
  try {
    const response = await axios.post(
      `http://192.168.15.213:589/api/Pekerjaan`,
      data
    );
    console.log("Data added:", response.data); // Tambahkan log ini
    return response.data;
  } catch (err) {
    console.error("Failed to add Pekerjaan:", err);
    throw err;
  }
};

export const PekerjaanById = async (id) => {
  try {
    const response = await axios.get(
      `http://192.168.15.213:589/api/Pekerjaan/${id}`
    );
    console.log("Response data:", response.data);

    if (response.data) {
      return response.data;
    }

    throw new Error("Data tidak ditemukan");
  } catch (error) {
    console.error(
      "Error fetching Pekerjaan (details):",
      error.response || error
    );
    throw new Error("Failed to fetch Pekerjaan.");
  }
};
