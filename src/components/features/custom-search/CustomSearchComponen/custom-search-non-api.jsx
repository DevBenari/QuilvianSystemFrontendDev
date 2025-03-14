"use client";
import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import DateInput from "@/components/ui/date-input";
import { FaSearch } from "react-icons/fa"; // 🔹 Tambahkan ikon search
import { showAlert } from "../../alert/custom-alert";

const CustomSearchFilterNonApi = ({
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
        patient.namaDepartemen?.toLowerCase().includes(query) ||
        "" ||
        patient.penanggungJawab?.toLowerCase().includes(query) ||
        "" ||
        patient.ruangan?.toLowerCase().includes(query) ||
        "" ||
        patient.namaAdministrasi?.toLowerCase().includes(query) ||
        "" ||
        patient.tipeRawat?.toLowerCase().includes(query) ||
        "" ||
        patient.tipeAdministrasi?.toLowerCase().includes(query) ||
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
      showAlert.warning("Harap pilih rentang tanggal!");
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
      <Row className="mx-3">
        <Col md="3">
          <TextField
            label="Cari Pasien:"
            name="registrasiPasien"
            type="text"
            placeholder="Cari berdasarkan nama, no rekam medis, atau no telp..."
            className="form-control mb-0"
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange(e.target.value)}
            // errorMessage={filters.searchQuery === "" ? "Field tidak boleh kosong" : ""}
          />
        </Col>
        <Col md="3">
          <SelectField
            name="ByTime"
            label="Filter By : *"
            placeholder="Select Option"
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
        <Col md="3">
          <DateInput
            name="startDate"
            label="Tanggal Awal Regist Pasien :"
            placeholder={"Enter tanggal regist Pasien"}
            onChange={setStartDate}
          />
        </Col>
        <Col md="3">
          <DateInput
            name="endDate"
            label="Tanggal Akhir Regist Pasien :"
            placeholder={"Enter tanggal regist Pasien"}
            onChange={setEndDate}
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md="12" className="d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={handleFilterDate}
            style={{
              background: "linear-gradient(135deg, #007bff, #0056b3)",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "0.3s ease",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.9")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            <FaSearch /> Cari
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default CustomSearchFilterNonApi;
