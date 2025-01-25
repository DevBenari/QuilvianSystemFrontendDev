import axios from "axios";
import { useEffect, useState } from "react";

export const useAboutOperasi = () => {
  const [aboutOperasi, setAboutOperasi] = useState([]); // Corrected casing for consistency
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAboutOperasi = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(
          `https://run.mocky.io/v3/9bec176b-c9a8-4d9e-aad3-d70d985966da`
        );
        setAboutOperasi(response.data); // Update state with the fetched data
      } catch (err) {
        setError("Gagal memuat aboutOperasi."); // Corrected error message
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getAboutOperasi();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { aboutOperasi, loading, error };
};
