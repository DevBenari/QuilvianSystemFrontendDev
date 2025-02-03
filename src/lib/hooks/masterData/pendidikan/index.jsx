import axios from "axios";
import { useEffect, useState } from "react";

export const usePendidikan = () => {
  const [pendidikan, setPendidikan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPendidikan = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://192.168.15.213:589/api/Pendidikan`
        );
        // console.log("Data fetched:", response.data); // Tambahkan log ini
        setPendidikan(response.data);
      } catch (err) {
        console.error("Failed to fetch Pendidikan:", err);
        setError("Gagal memuat daftar Pendidikan.");
      } finally {
        setLoading(false);
      }
    };

    getPendidikan();
  }, []);

  return { pendidikan, loading, error };
};

export const addPendidikan = async (data) => {
  try {
    const response = await axios.post(
      `http://192.168.15.213:589/api/Pendidikan`,
      data
    );
    console.log("Data added:", response.data); // Tambahkan log ini
    return response.data;
  } catch (err) {
    console.error("Failed to add Pendidikan:", err);
    throw err;
  }
};

export const pendidikanById = async (id) => {
  try {
    const response = await axios.get(
      `http://192.168.15.213:589/api/pendidikan/${id}`
    );
    console.log("Response data:", response.data);

    if (response.data) {
      return response.data;
    }

    throw new Error("Data tidak ditemukan");
  } catch (error) {
    console.error(
      "Error fetching pendidikan (details):",
      error.response || error
    );
    throw new Error("Failed to fetch pendidikan.");
  }
};
