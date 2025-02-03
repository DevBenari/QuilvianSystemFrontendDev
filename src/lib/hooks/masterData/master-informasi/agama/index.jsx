import axios from "axios";
import { useEffect, useState } from "react";

export const useAgama = () => {
  const [Agama, setAgama] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAgama = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://192.168.15.213:589/api/Agama`);
        // console.log("Data fetched:", response.data); // Tambahkan log ini
        setAgama(response.data);
      } catch (err) {
        console.error("Failed to fetch Agama:", err);
        setError("Gagal memuat daftar Agama.");
      } finally {
        setLoading(false);
      }
    };

    getAgama();
  }, []);

  return { Agama, loading, error };
};

export const addAgama = async (data) => {
  try {
    const response = await axios.post(
      `http://192.168.15.213:589/api/Agama`,
      data
    );
    console.log("Data added:", response.data); // Tambahkan log ini
    return response.data;
  } catch (err) {
    console.error("Failed to add Agama:", err);
    throw err;
  }
};

export const AgamaById = async (id) => {
  try {
    const response = await axios.get(
      `http://192.168.15.213:589/api/Agama/${id}`
    );
    console.log("Response data:", response.data);

    if (response.data) {
      return response.data;
    }

    throw new Error("Data tidak ditemukan");
  } catch (error) {
    console.error("Error fetching Agama (details):", error.response || error);
    throw new Error("Failed to fetch Agama.");
  }
};
