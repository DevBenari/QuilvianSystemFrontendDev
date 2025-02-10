import { getHeaders } from "@/lib/headers/headers";
import axios from "axios";
import React,{ useState, useEffect } from "react";

const GetLastEducation = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://160.20.104.177:4141/api/LastEducation/last-education",
        { headers: getHeaders() }
      );
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, refetch: fetchData }; // Tambahkan refetch
};

export default GetLastEducation;
