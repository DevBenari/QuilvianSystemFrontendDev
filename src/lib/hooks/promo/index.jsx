import { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers"; // Assuming getHeaders is defined here

export const usePromos = () => {
  const [promos, setPromos] = useState([]); // Corrected casing for consistency
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPromos = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(
          `http://160.20.104.177:4141/api/Promo/promo`,
          {
            headers: getHeaders(),
          }
        );
        setPromos(response.data); // Update state with the fetched data
      } catch (err) {
        setError("Gagal memuat daftar promo."); // Corrected error message
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getPromos();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { promos, loading, error };
};
