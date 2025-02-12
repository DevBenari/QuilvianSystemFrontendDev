export const generateSlug = (text, id) => {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid text value provided for slug generation");
  }

  const baseSlug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Ganti karakter non-alphanumeric dengan "-"
    .replace(/(^-|-$)+/g, ""); // Hapus "-" di awal atau akhir

  const encodedId = btoa(id.toString()); // Encode ID dengan btoa
  const randomStr = Math.random().toString(36).substring(2, 5); // Random string

  return `${baseSlug}-${randomStr}-${encodedId}`;
};

export const extractIdFromSlug = (slug) => {
  try {
    const parts = slug.split("-");
    const encodedId = parts[parts.length - 1];

    const id = atob(encodedId); // Decode ID dengan atob

    return id;
  } catch (error) {
    console.error("Error extracting ID from slug:", error);
    return null;
  }
};

// export const generateSlugDummy = (text, id) => {
//   if (!text || typeof text !== "string") {
//     throw new Error("Invalid text value provided for slug generation");
//   }

//   const baseSlug = text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-") // Ganti karakter non-alphanumeric dengan "-"
//     .replace(/(^-|-$)+/g, ""); // Hapus "-" di awal atau akhir

//   const encodedId = Buffer.from(id.toString()).toString("base64"); // Encode ID
//   const randomStr = Math.random().toString(36).substring(2, 5); // Random string

//   return `${baseSlug}-${randomStr}-${encodedId}`;
// };

// export const extractIdFromSlugDummy = (slug) => {
//   try {
//     const parts = slug.split("-");
//     const encodedId = parts[parts.length - 1]; // Ambil bagian terakhir (encoded ID)
//     const id = Buffer.from(encodedId, "base64").toString(); // Decode ID
//     return parseInt(id, 10);
//   } catch (error) {
//     console.error("Error extracting ID from slug:", error);
//     return null;
//   }
// };
