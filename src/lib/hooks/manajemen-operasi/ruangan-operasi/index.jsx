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
