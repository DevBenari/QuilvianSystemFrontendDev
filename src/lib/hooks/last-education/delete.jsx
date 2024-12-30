import { getHeaders } from "@/lib/headers/headers";
import axios from "axios";

const deleteLastEducation = async (id) => {
  try {
    await axios.delete(
      `http://160.20.104.177:4141/api/LastEducation/last-education/${id}`,
      { headers: getHeaders() }
    );
  } catch (error) {
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    throw error; // Tetap melempar kesalahan untuk ditangani di komponen
  }
};

export default deleteLastEducation;
