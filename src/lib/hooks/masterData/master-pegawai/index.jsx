import axios from "axios";
import { useEffect, useState } from "react";

export const usePegawai = () => {
  const [Pegawai, setPegawai] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPegawai = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://192.168.15.213:589/api/Pegawai`
        );
        // console.log("Data fetched:", response.data); // Tambahkan log ini
        setPegawai(response.data);
      } catch (err) {
        console.error("Failed to fetch Pegawai:", err);
        setError("Gagal memuat daftar Pegawai.");
      } finally {
        setLoading(false);
      }
    };

    getPegawai();
  }, []);

  return { Pegawai, loading, error };
};

export const addPegawai = async (data) => {
  try {
    const response = await axios.post(
      `http://192.168.15.213:589/api/Pegawai`,
      data,
      {
        headers: {
          "Content-Type": "application/json", // Pastikan data dikirim sebagai JSON
          Accept: "application/json", // Memberi tahu server untuk mengembalikan JSON
        },
      }
    );

    // Log response dari server
    console.log("Data added:", response.data);
    return response.data;
  } catch (error) {
    // Debugging error lebih rinci

    // Melempar error agar ditangani oleh pemanggil
    throw error;
  }
};

export const PegawaiById = async (id) => {
  try {
    const response = await axios.get(
      `http://192.168.15.213:589/api/Pegawai/${id}`
    );
    console.log("Response data:", response.data);

    if (response.data) {
      return response.data;
    }

    throw new Error("Data tidak ditemukan");
  } catch (error) {
    console.error("Error fetching Pegawai (details):", error.response || error);
    throw new Error("Failed to fetch Pegawai.");
  }
};

export const editPegawai = async (id, data) => {
  try {
    const response = await axios.put(
      `http://192.168.15.213:589/api/Pegawai/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json", // Pastikan data dikirim sebagai JSON
          Accept: "application/json", // Memberi tahu server untuk mengembalikan JSON
        },
      }
    );

    // Log response dari server
    console.log("Data added:", response.data);
    return response.data;
  } catch (error) {
    // Debugging error lebih rinci

    // Melempar error agar ditangani oleh pemanggil
    throw error;
  }
};
