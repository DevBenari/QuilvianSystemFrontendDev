import axios from "axios";
import { getHeaders } from "../../headers/headers";
import { useEffect, useState } from "react";

export const useAnggota = () => {
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAnggota = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(
          `https://67417a07e4647499008dcdb4.mockapi.io/keanggotaan`,
          {
            headers: getHeaders(),
          }
        );
        setAnggota(response.data); // Update state with the fetched data
      } catch (err) {
        setError("Gagal memuat daftar Anggota."); // Corrected error message
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getAnggota();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { anggota, loading, error };
};
