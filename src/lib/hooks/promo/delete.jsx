import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";
export const deletePromo = async (id) => {
  try {
    const response = await axios.delete(
      `http://160.20.104.177:4141/api/Promo/promo/${id}`,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding promo:", error);
    throw new Error("Failed to add promo. Please try again.");
  }
};
