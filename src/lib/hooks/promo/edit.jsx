import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";
export const editPromo = async (promoData, id) => {
  try {
    const response = await axios.put(
      `http://160.20.104.177:4141/api/Promo/promo/${id}`,
      promoData,
      {
        headers: getHeaders(),
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error adding promo:", error);
    throw new Error("Failed to add promo. Please try again.");
  }
};
