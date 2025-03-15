import Cookies from "js-cookie";

export const getHeaders = (contentType = "application/json") => {
  const token = Cookies.get("token");
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`, // Token diambil dari cookies
  };

  // Hanya tambahkan Content-Type jika bukan multipart/form-data
  if (contentType && contentType !== "multipart/form-data") {
    headers["Content-Type"] = contentType;
  }

  return headers;
};

export const getHeadersFormData = () => {
  const token = Cookies.get("token");
  const headersFormData = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`, // Token diambil dari cookies
  };

  return headersFormData;
};
