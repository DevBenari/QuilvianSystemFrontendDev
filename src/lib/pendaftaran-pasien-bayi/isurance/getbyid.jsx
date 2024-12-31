import axios from "axios";
import { getHeaders } from "../../headers/headers";

export const getIsuranceId = async (id) => {
  try {
    const response = await axios.get(
      `http://160.20.104.177:4141/api/Insurance/insurance/${id}`,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bayi:", error);
    throw new Error("gagal dalam menampilkan data");
  }
};
