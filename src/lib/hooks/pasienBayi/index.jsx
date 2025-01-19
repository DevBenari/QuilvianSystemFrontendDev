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
