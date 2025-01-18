import { useState } from "react";
import { datakelas } from "@/utils/datakelas";

const useSelectKelas = () => {
  const [selectedKelas, setSelectedKelas] = useState("");
  const [selectedRuang, setSelectedRuang] = useState("");
  const [filteredRuang, setFilteredRuang] = useState([]);
  const [filteredTempatTidur, setFilteredTempatTidur] = useState([]);

  const handleChange = (type, value) => {
    if (type === "kelas") {
      setSelectedKelas(value);
      const selectedData = datakelas.find((d) => d.kelas === value);
      setFilteredRuang(selectedData ? selectedData.ruang : []);
      setSelectedRuang("");
      setFilteredTempatTidur([]);
    } else if (type === "ruang") {
      setSelectedRuang(value);
      const selectedData = datakelas.find((d) => d.kelas === selectedKelas);
      if (selectedData) {
        const ruangData = selectedData.ruang.find((r) => r.nama === value);
        setFilteredTempatTidur(ruangData ? ruangData.tempatTidur : []);
      }
    }
  };

  return {
    selectedKelas,
    selectedRuang,
    filteredRuang,
    filteredTempatTidur,
    handleChange,
  };
};

export default useSelectKelas;
