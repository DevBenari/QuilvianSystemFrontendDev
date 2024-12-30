import { getHeaders } from "@/lib/headers/headers";
import axios from "axios";

const editLastEducation = async (id, payload) => {
  try {
    const response = await axios.put(
      `http://160.20.104.177:4141/api/LastEducation/last-education/${id}`,
      payload,
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default editLastEducation;
