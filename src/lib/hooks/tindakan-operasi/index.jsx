import axios from "axios";
import { useEffect, useState } from "react";

export const useTindakanOperasi = () => {
  const [tindakanOperasi, setTindakanOperasi] = useState([]); // Corrected casing for consistency
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTindakanOperasi = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(
          `https://671641c033bc2bfe40bd1f2a.mockapi.io/TindakanOperasi`
        );
        setTindakanOperasi(response.data); // Update state with the fetched data
      } catch (err) {
        setError("Gagal memuat tindakanOperasi."); // Corrected error message
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getTindakanOperasi();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { tindakanOperasi, loading, error };
};
