import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";
export const addPromo = async (promoData) => {
  try {
    const response = await axios.post(
      "http://160.20.104.177:4141/api/Promo/promo",
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
