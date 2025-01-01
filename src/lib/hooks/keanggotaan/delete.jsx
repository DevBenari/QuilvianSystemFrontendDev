import axios from "axios";
import { getHeaders } from "@/lib/headers/headers";

export const deleteAnggota = async (id) => {
  try {
    const response = await axios.delete(
      `https://67417a07e4647499008dcdb4.mockapi.io/keanggotaan/${id}`,
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