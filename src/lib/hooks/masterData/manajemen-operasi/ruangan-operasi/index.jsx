import axios from "axios";
import { useEffect, useState } from "react";

export const useRuanganOperasi = () => {
  const [ruanganOperasi, setRuanganOperasi] = useState([]); // Corrected casing for consistency
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRuanganOperasi = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(
          `https://rumahsakit.free.beeceptor.com/ruanganOperasi`
        );
        setRuanganOperasi(response.data); // Update state with the fetched data
      } catch (err) {
        setError("Gagal memuat RuanganOperasi."); // Corrected error message
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getRuanganOperasi();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { ruanganOperasi, loading, error };
};

export const getbyidRuanganOperasi = async (id) => {
  try {
    const response = await axios.get(
      `https://rumahsakit.free.beeceptor.com/ruanganOperasi/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding tindakan operasi:", error);
    throw new Error("Failed to add tindakan operasi. Please try again.");
  }
};

export const RuanganOperasiEdit = async (Data, id) => {
  try {
    const response = await axios.put(
      `https://rumahsakit.free.beeceptor.com/ruanganOperasi/${id}`,
      Data
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Gagal Mengedit RuanganOperasi", error);
    throw new Error("Gagal Mengedit RuanganOperasi , Coba Lagi");
  }
};

export const addRuanganOperasi = async (data) => {
  try {
    const response = await axios.post(
      "https://rumahsakit.free.beeceptor.com/ruanganOperasi",
      data
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error menambahkan ruangan operasi:", error);
    throw new Error(
      "Gagal dalam menambahkan ruangan operasi. Please try again."
    );
  }
};
