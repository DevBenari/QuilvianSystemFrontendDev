import axios from "axios";

export const editByIdTindakanOperasi = async (data, id) => {
  try {
    const response = await axios.put(
      `https://671641c033bc2bfe40bd1f2a.mockapi.io/TindakanOperasi/${id}`,
      data
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error adding tindakan operasi:", error);
    throw new Error("Failed to add tindakan operasi. Please try again.");
  }
};
