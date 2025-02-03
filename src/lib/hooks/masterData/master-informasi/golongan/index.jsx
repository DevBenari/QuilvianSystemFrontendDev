import axios from "axios";
import { useEffect, useState } from "react";

export const useGolongan = () => {
  const [Golongan, setGolongan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGolongan = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://192.168.15.213:589/api/GolonganDarah`
        );
        // console.log("Data fetched:", response.data); // Tambahkan log ini
        setGolongan(response.data);
      } catch (err) {
        console.error("Failed to fetch Golongan:", err);
        setError("Gagal memuat daftar Golongan.");
      } finally {
        setLoading(false);
      }
    };

    getGolongan();
  }, []);

  return { Golongan, loading, error };
};

export const addGolongan = async (data) => {
  try {
    const response = await axios.post(
      `http://192.168.15.213:589/api/GolonganDarah`,
      data
    );
    console.log("Data added:", response.data); // Tambahkan log ini
    return response.data;
  } catch (err) {
    console.error("Failed to add Golongan:", err);
    throw err;
  }
};

export const GolonganById = async (id) => {
  try {
    const response = await axios.get(
      `http://192.168.15.213:589/api/GolonganDarah/${id}`
    );
    console.log("Response data:", response.data);

    if (response.data) {
      return response.data;
    }

    throw new Error("Data tidak ditemukan");
  } catch (error) {
    console.error(
      "Error fetching Golongan (details):",
      error.response || error
    );
    throw new Error("Failed to fetch Golongan.");
  }
};
