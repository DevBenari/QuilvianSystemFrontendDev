"use client";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import DateInput from "@/components/ui/date-input";

const CustomSearchFilter = ({
  data,
  setFilteredPatients,
  onFilteredPatients,
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
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    const query = filters.searchQuery.toLowerCase();
    const filtered = data.filter(
      (patient) =>
        String(patient.noRekamMedis || "")
          .toLowerCase()
          .includes(query) ||
        patient.nama?.toLowerCase().includes(query) ||
        patient.namaPasienMelahirkan?.toLowerCase().includes(query) ||
        patient.dokter?.toLowerCase().includes(query) ||
        patient.ruang?.toLowerCase().includes(query) ||
        patient.kelas?.toLowerCase().includes(query) ||
        patient.tipeMember?.toLowerCase().includes(query) ||
        patient.statusMember?.toLowerCase().includes(query)
    );
    setFilteredPatients(filtered);
    console.log(data);
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
    <Col lg="12" className="mt-2">
      <Row>
        <Col xs="3">
          <TextField
            label="Cari Pasien:"
            name="registrasiPasien"
            type="text"
            placeholder="Cari berdasarkan nama, no rekam medis, atau no telp..."
            className="form-control mb-0"
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange(e.target.value)}
          />
        </Col>
        <Col xs="2">
          <SelectField
            name="ByTime"
            label="Filter By : *"
            options={[
              { value: "Today", label: "Today" },
              { value: "Last Day", label: "Last Day" },
              { value: "Last Week", label: "Last Week" },
              { value: "This Month", label: "This Month" },
              { value: "Last Month", label: "Last Month" },
            ]}
            onChangeCallback={handleFilterTime}
          />
        </Col>
        <Col xs="3">
          <DateInput
            name="startDate"
            label="Tanggal Awal Regist Pasien :"
            placeholder={"Enter tanggal regist Pasien"}
            onChange={setStartDate}
          />
        </Col>
        <Col xs="3">
          <DateInput
            name="endDate"
            label="Tanggal Akhir Regist Pasien :"
            placeholder={"Enter tanggal regist Pasien"}
            onChange={setEndDate}
          />
        </Col>
        <Col xs="1" className="mt-2">
          <button onClick={handleFilterDate} className="btn btn-info mt-4">
            <i className="ri-search-line"></i>
          </button>
        </Col>
      </Row>
    </Col>
  );
};

export default CustomSearchFilter;
