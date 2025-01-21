import axios from "axios";
import { useEffect, useState } from "react";

export const useManajemenOperasi = () => {
  const [operasi, setOperasi] = useState([]); // Corrected casing for consistency
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOperasi = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(
          `https://671641c033bc2bfe40bd1f2a.mockapi.io/manajemenOperasi`
        );
        setOperasi(response.data); // Update state with the fetched data
      } catch (err) {
        setError("Gagal memuat Operasi."); // Corrected error message
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getOperasi();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { operasi, loading, error };
};
