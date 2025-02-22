// components/common/Alert.js
import Swal from "sweetalert2";

export const showAlert = {
  success: (message, callback) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
      confirmButtonColor: "#3085d6", // Bisa disesuaikan dengan tema aplikasi
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed && callback) {
        callback();
      }
    });
  },

  error: (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  },

  warning: (message) => {
    Swal.fire({
      icon: "warning",
      title: "Peringatan",
      text: message,
      confirmButtonColor: "#f0ad4e",
      confirmButtonText: "OK",
    });
  },

  confirm: (message, callback) => {
    Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: message,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed && callback) {
        callback();
      }
    });
  },

  confirmDelete: (message, callback) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: message || "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed && callback) {
        callback();
      }
    });
  },
};
