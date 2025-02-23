import axios from "axios";
import { useEffect, useState } from "react";

export const useBayi = () => {
  const [bayi, setBayi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBayi = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(
          `https://67417a07e4647499008dcdb4.mockapi.io/DataPasienBayi`
        );
        setBayi(response.data); // Update state with the fetched data
      } catch (err) {
        setError("Gagal memuat daftar pasien bayi."); // Corrected error message
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getBayi();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { bayi, loading, error };
};

export const getBayiById = async (id) => {
  try {
    const response = await axios.get(
      `https://67417a07e4647499008dcdb4.mockapi.io/DataPasienBayi/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bayi:", error);
    throw new Error("gagal dalam menampilkan data");
  }
};

export const BayiEdit = async (bayiData, id) => {
  try {
    const response = await axios.put(
      `https://67417a07e4647499008dcdb4.mockapi.io/DataPasienBayi/${id}`,
      bayiData
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error adding bayi:", error);
    throw new Error("Failed to add bayi. Please try again.");
  }
};

export const deleteBayi = async (id) => {
  try {
    const response = await axios.delete(
      `https://67417a07e4647499008dcdb4.mockapi.io/DataPasienBayi/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding bayi:", error);
    throw new Error("Failed to add bayi. Please try again.");
  }
};
