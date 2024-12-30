import { getHeaders } from "@/lib/headers/headers";
import axios from "axios";

const addLastEducation = async (newData) => {
  try {
    const response = await axios.post(
      "http://160.20.104.177:4141/api/LastEducation/last-education",
      newData,
      { headers: getHeaders() }
    );
    return response.data; // Mengembalikan data respons dari server
  } catch (error) {
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
};

export default addLastEducation;
