import axios from "axios";

export const addAnggota = async (anggotaData) => {
  try {
    const response = await axios.post(
      "https://67417a07e4647499008dcdb4.mockapi.io/keanggotaan/",
      anggotaData
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error adding promo:", error);
    throw new Error("Failed to add promo. Please try again.");
  }
};
