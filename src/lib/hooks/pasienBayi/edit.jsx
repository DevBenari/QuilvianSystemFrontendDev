import axios from "axios";

export const BayiEdit = async (bayiData, id) => {
  try {
    const response = await axios.put(
      `https://67417a07e4647499008dcdb4.mockapi.io/DataPasienBayi/${id}`,
      bayiData
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error adding bayi:", error);
    throw new Error("Failed to add bayi. Please try again.");
  }
};
