"use client";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import DateInput from "@/components/ui/date-input";

const CustomSearchText = ({
  data,
  setFilteredPatients,
  onFilteredPatients,
  placeholderText,
  labelText,
}) => {
  // const methods = useForm();
  const [filters, setFilters] = useState({
    searchQuery: "",
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Filter by search query
  const handleFilterChange = (value) => {
    const newFilters = { ...filters, searchQuery: value };
    setFilters(newFilters); // Perbarui state filters
    applyFilters(newFilters); // Terapkan filter ke data
  };

  const applyFilters = (filters) => {
    const query = filters.searchQuery.toLowerCase();
    const filtered = data.filter(
      (patient) =>
        patient.nomorRekamMedis?.toLowerCase().includes(query) ||
        "" ||
        patient.nama?.toLowerCase().includes(query) ||
        "" ||
        patient.penjamin?.toLowerCase().includes(query) ||
        "" ||
        (typeof patient.dokter === "string" &&
          patient.dokter.toLowerCase().includes(query)) ||
        patient.departemen?.toLowerCase().includes(query) ||
        "" ||
        patient.tipe_perjanjian?.toLowerCase().includes(query) ||
        "" ||
        patient.user?.toLowerCase().includes(query) ||
        "" ||
        patient.tipeOperasi?.toLowerCase().includes(query) ||
        "" ||
        patient.namaTindakan?.toLowerCase().includes(query) ||
        "" ||
        patient.jenisOperasi?.toLowerCase().includes(query) ||
        "" ||
        patient.namaTindakanOperasi?.toLowerCase().includes(query) ||
        "" ||
        patient.kategoriOperasi?.toLowerCase().includes(query) ||
        "" ||
        patient.namaKelas?.toLowerCase().includes(query) ||
        ""
    );
    setFilteredPatients(filtered);
  };

  // Filter by time
  const handleFilterTime = (filterType) => {
    const now = new Date();
    let start = new Date();
    let end = new Date();

    switch (filterType) {
      case "Today":
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case "Last Day":
        start.setDate(now.getDate() - 1);
        end = start;
        break;
      case "Last Week":
        start.setDate(now.getDate() - 7);
        end = now;
        break;
      case "This Month":
        start.setDate(1);
        end.setMonth(now.getMonth() + 1);
        end.setDate(0);
        break;
      case "Last Month":
        start.setMonth(now.getMonth() - 1);
        start.setDate(1);
        end.setMonth(now.getMonth());
        end.setDate(0);
        break;
      default:
        return;
    }

    const filtered = data.filter((patient) => {
      const patientDate = new Date(patient.date);
      return patientDate >= start && patientDate <= end;
    });

    setFilteredPatients(filtered);
  };

  // Filter by date range
  const handleFilterDate = () => {
    if (!startDate || !endDate) {
      alert("Harap pilih rentang tanggal!");
      return;
    }

    const filtered = data.filter((patient) => {
      const patientDate = new Date(patient.date);
      const start = new Date(startDate);
      const end = new Date(endDate);

      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      return patientDate >= start && patientDate <= end;
    });

    setFilteredPatients(filtered);
  };
  return (
    <Col lg="12" className=" mx-4">
      <Row>
        <Col md="3">
          <TextField
            label={labelText}
            name="registrasiPasien"
            type="text"
            placeholder={placeholderText}
            className="form-control mb-0"
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange(e.target.value)}
            // errorMessage={filters.searchQuery === "" ? "Field tidak boleh kosong" : ""}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default CustomSearchText;
