import { useState, useCallback } from "react";
import { dataWilayah } from "@/utils/config"; // Import data wilayah

const UseSelectWilayah = (setValue) => {
  // State untuk pasien
  const [pasienSelectedProvinsi, setPasienSelectedProvinsi] = useState("");
  const [pasienFilteredKabupaten, setPasienFilteredKabupaten] = useState([]);
  const [pasienFilteredKecamatan, setPasienFilteredKecamatan] = useState([]);
  const [pasienFilteredKelurahan, setPasienFilteredKelurahan] = useState([]);

  // State untuk keluarga
  const [keluargaSelectedProvinsi, setKeluargaSelectedProvinsi] = useState("");
  const [keluargaFilteredKabupaten, setKeluargaFilteredKabupaten] = useState([]);
  const [keluargaFilteredKecamatan, setKeluargaFilteredKecamatan] = useState([]);
  const [keluargaFilteredKelurahan, setKeluargaFilteredKelurahan] = useState([]);

  // Handle perubahan wilayah
  const handleChange = useCallback(
    (type, field, value) => {
      if (type === "pasien") {
        if (field === "provinsi") {
          setPasienSelectedProvinsi(value);
          const selected = dataWilayah.find((item) => item.provinsi === value);
          setPasienFilteredKabupaten(selected ? selected.kabupaten : []);
          setValue("pasien_provinsi", value);
        } else if (field === "kabupaten") {
          const selectedKabupaten = pasienFilteredKabupaten.find(
            (item) => item.nama === value
          );
          setPasienFilteredKecamatan(
            selectedKabupaten ? selectedKabupaten.kecamatan : []
          );
          setValue("pasien_kabupaten", value);
        } else if (field === "kecamatan") {
          const selectedKecamatan = pasienFilteredKecamatan.find(
            (item) => item.nama === value
          );
          setPasienFilteredKelurahan(
            selectedKecamatan ? selectedKecamatan.kelurahan : []
          );
          setValue("pasien_kecamatan", value);
        }
      } else if (type === "keluarga") {
        if (field === "provinsi") {
          setKeluargaSelectedProvinsi(value);
          const selected = dataWilayah.find((item) => item.provinsi === value);
          setKeluargaFilteredKabupaten(selected ? selected.kabupaten : []);
          setValue("keluarga_provinsi", value);
        } else if (field === "kabupaten") {
          const selectedKabupaten = keluargaFilteredKabupaten.find(
            (item) => item.nama === value
          );
          setKeluargaFilteredKecamatan(
            selectedKabupaten ? selectedKabupaten.kecamatan : []
          );
          setValue("keluarga_kabupaten", value);
        } else if (field === "kecamatan") {
          const selectedKecamatan = keluargaFilteredKecamatan.find(
            (item) => item.nama === value
          );
          setKeluargaFilteredKelurahan(
            selectedKecamatan ? selectedKecamatan.kelurahan : []
          );
          setValue("keluarga_kecamatan", value);
        }
      }
    },
    [
      pasienFilteredKabupaten,
      pasienFilteredKecamatan,
      keluargaFilteredKabupaten,
      keluargaFilteredKecamatan,
      setValue,
    ]
  );

  return {
    // State pasien
    pasienSelectedProvinsi,
    pasienFilteredKabupaten,
    pasienFilteredKecamatan,
    pasienFilteredKelurahan,

    // State keluarga
    keluargaSelectedProvinsi,
    keluargaFilteredKabupaten,
    keluargaFilteredKecamatan,
    keluargaFilteredKelurahan,

    // Function
    handleChange,
  };
};

export default UseSelectWilayah;
