import axios from "axios";
import { getHeaders } from "../../headers/headers";
import { useEffect, useState } from "react";

export const useBayi = () => {
  const [isurance, setIsurance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getIsurance = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(
          `http://160.20.104.177:4141/api/Insurance/insurance`,
          {
            headers: getHeaders(),
          }
        );
        setIsurance(response.data); // Update state with the fetched data
      } catch (err) {
        setError("Gagal memuat daftar isurance."); // Corrected error message
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getIsurance();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { isurance, loading, error };
};
