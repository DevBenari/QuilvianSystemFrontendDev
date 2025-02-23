import axios from "axios";
import { useEffect, useState } from "react";

export const useAsuransi = () => {
  const [Asuransi, setAsuransi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAsuransi = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://192.168.15.213:589/api/Asuransi`, {
            headers: {
              "Content-Type": "application/json", // Pastikan data dikirim sebagai JSON
              Accept: "application/json", // Memberi tahu server untuk mengembalikan JSON
            },
          }
        ) 
       
        // console.log("Data fetched:", response.data); // Tambahkan log ini
        setAsuransi(response.data);
      } catch (err) {
        console.error("Failed to fetch Asuransi:", err);
        setError("Gagal memuat daftar Asuransi.");
      } finally {
        setLoading(false);
      }
    };

    getAsuransi();
  }, []);

  return { Asuransi, loading, error };
};

export const addAsuransi = async (data) => {
  try {
    const response = await axios.post(
      `http://192.168.15.213:589/api/Asuransi`,
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

export const AsuransiById = async (id) => {
  try {
    const response = await axios.get(
      `http://192.168.15.213:589/api/Asuransi/${id}`
    );
    console.log("Response data:", response.data);

    if (response.data) {
      return response.data;
    }

    throw new Error("Data tidak ditemukan");
  } catch (error) {
    console.error(
      "Error fetching Asuransi (details):",
      error.response || error
    );
    throw new Error("Failed to fetch Asuransi.");
  }
};

export const editAsuransi = async (id, data) => {
  try {
    const response = await axios.put(
      `http://192.168.15.213:589/api/Asuransi${id}`,
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
