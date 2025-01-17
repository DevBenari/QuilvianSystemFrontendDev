import axios from "axios";

export const deleteBayi = async (id) => {
  try {
    const response = await axios.delete(
      `https://67417a07e4647499008dcdb4.mockapi.io/DataPasienBayi/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding bayi:", error);
    throw new Error("Failed to add bayi. Please try again.");
  }
};
