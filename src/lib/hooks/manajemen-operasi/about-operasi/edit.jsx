import axios from "axios";

export const editAboutOperasi = async (data, id) => {
  try {
    const response = await axios.put(
      `https://run.mocky.io/v3/9bec176b-c9a8-4d9e-aad3-d70d985966da/${id}`,
      data
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error adding tindakan operasi:", error);
    throw new Error("Failed to add tindakan operasi. Please try again.");
  }
};
