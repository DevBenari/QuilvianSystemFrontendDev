import { useState, useCallback } from "react";

const UseSelectWilayah = (setValue, dataWilayah) => {
  // State untuk menyimpan data wilayah yang terfilter
  const [pasienSelectedProvinsi, setPasienSelectedProvinsi] = useState("");
  const [pasienFilteredKabupaten, setPasienFilteredKabupaten] = useState([]);
  const [pasienFilteredKecamatan, setPasienFilteredKecamatan] = useState([]);
  const [pasienFilteredKelurahan, setPasienFilteredKelurahan] = useState([]);

  // Fungsi untuk menangani perubahan wilayah
  const handleChange = useCallback(
    (field, value) => {
      if (field === "provinsi") {
        setPasienSelectedProvinsi(value);

        // Cari provinsi yang dipilih dan filter kabupatennya
        const selectedProvinsi = dataWilayah.find(
          (item) => item.provinsi === value
        );
        setPasienFilteredKabupaten(selectedProvinsi?.kabupaten || []);

        // Reset kecamatan dan kelurahan
        setPasienFilteredKecamatan([]);
        setPasienFilteredKelurahan([]);
        setValue("pasien_provinsi", value);
        setValue("pasien_kabupaten", "");
        setValue("pasien_kecamatan", "");
        setValue("pasien_kelurahan", "");
      } else if (field === "kabupaten") {
        const selectedKabupaten = pasienFilteredKabupaten.find(
          (item) => item.nama === value
        );
        setPasienFilteredKecamatan(selectedKabupaten?.kecamatan || []);
        setPasienFilteredKelurahan([]);
        setValue("pasien_kabupaten", value);
        setValue("pasien_kecamatan", "");
        setValue("pasien_kelurahan", "");
      } else if (field === "kecamatan") {
        const selectedKecamatan = pasienFilteredKecamatan.find(
          (item) => item.nama === value
        );
        setPasienFilteredKelurahan(selectedKecamatan?.kelurahan || []);
        setValue("pasien_kecamatan", value);
        setValue("pasien_kelurahan", "");
      } else if (field === "kelurahan") {
        setValue("pasien_kelurahan", value);
      }
    },
    [dataWilayah, pasienFilteredKabupaten, pasienFilteredKecamatan, setValue]
  );

  // Return state dan fungsi yang dibutuhkan
  return {
    pasienSelectedProvinsi,
    pasienFilteredKabupaten,
    pasienFilteredKecamatan,
    pasienFilteredKelurahan,
    handleChange,
  };
};

export default UseSelectWilayah;
