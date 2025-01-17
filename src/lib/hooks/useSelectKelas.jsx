import { useCallback, useState } from "react";

const UseSelectKelas = (setValue, dataKelas) => {
  const [selectedKelas, setSelectedKelas] = useState("");
  const [filteredRuang, setFilteredRuang] = useState([]);
  const [filteredTempatTidur, setFilteredTempatTidur] = useState([]);

  const handleChange = useCallback(
    (field, value) => {
      if (field === "kelas") {
        setSelectedKelas(value);

        const selectedKelasObj = dataKelas.find((item) => item.value === value);
        setFilteredRuang(selectedKelasObj?.ruang || []);
        setFilteredTempatTidur([]);
        setValue("kelas", value);
        setValue("ruang", "");
        setValue("tempatTidur", "");
      } else if (field === "ruang") {
        const selectedRuangObj = filteredRuang.find(
          (item) => item.value === value
        );
        setFilteredTempatTidur(selectedRuangObj?.noTempatTidur || []);
        setValue("ruang", value);
        setValue("tempatTidur", "");
      } else if (field === "tempatTidur") {
        setValue("tempatTidur", value);
      }
    },
    [dataKelas, filteredRuang, setValue]
  );

  return {
    selectedKelas,
    filteredRuang,
    filteredTempatTidur,
    handleChange,
  };
};

export default UseSelectKelas;
