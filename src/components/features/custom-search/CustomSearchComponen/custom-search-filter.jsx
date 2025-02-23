"use client";
import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import TextField from "@/components/ui/text-field";
import DateInput from "@/components/ui/date-input";
import { FaSearch } from "react-icons/fa"; // 🔹 Tambahkan ikon search

/**
 * Base Component untuk pencarian dinamis
 * @param {Function} fetchFunction - Fungsi Redux untuk fetch data (contoh: fetchAgamaWithFilters)
 * @param {Function} setFilteredData - Fungsi untuk menyimpan hasil pencarian
 */
const CustomSearchFilter = ({ fetchFunction, setFilteredData }) => {
  const dispatch = useDispatch();

  // 🔹 State untuk menyimpan filter pencarian
  const [filters, setFilters] = useState({
    search: "",
    orderBy: "CreateDateTime",
    sortDirection: "desc",
    startDate: "",
    endDate: "",
    periode: "", // Tambahan filter Periode
  });

  // 🔹 Handle perubahan pada input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // 🔹 Handle pencarian dengan Redux Thunk
  const handleSearch = () => {
    dispatch(fetchFunction(filters)).then((result) => {
      if (fetchFunction.fulfilled.match(result)) {
        setFilteredData(result.payload?.data?.rows || []);
      }
    });
  };

  return (
    <Col lg="12" className="mt-2">
      <Row className="mx-2 ">
        {/* 🔹 Input Search */}
        <Col md="4" className="mb-2">
          <TextField
            label="Cari Data:"
            name="search"
            type="text"
            placeholder="Masukkan kata kunci..."
            className="form-control mb-0"
            value={filters.search}
            onChange={handleInputChange}
          />
        </Col>

        {/* 🔹 Input Start Date */}
        <Col md="4" className="mb-2">
          <DateInput
            name="startDate"
            label="Tanggal Awal:"
            placeholder="Pilih tanggal awal"
            onChange={(value) => setFilters({ ...filters, startDate: value })}
          />
        </Col>

        {/* 🔹 Input End Date */}
        <Col md="4" className="mb-2">
          <DateInput
            name="endDate"
            label="Tanggal Akhir:"
            placeholder="Pilih tanggal akhir"
            onChange={(value) => setFilters({ ...filters, endDate: value })}
          />
        </Col>

        <Col md="4" className="mb-2">
          <Form.Group>
            <Form.Label>Urutan Sortir:</Form.Label>
            <Form.Select
              value={filters.sortDirection}
              onChange={(e) =>
                setFilters({ ...filters, sortDirection: e.target.value })
              }
            >
              <option value="desc">Terbaru</option>
              <option value="asc">Terlama</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* 🔹 Dropdown Periode */}
        <Col md="4" className="mb-2">
          <Form.Group>
            <Form.Label>Periode:</Form.Label>
            <Form.Select
              name="periode"
              value={filters.periode}
              onChange={handleInputChange}
            >
              <option value="">-- Pilih Periode --</option>
              <option value="Today">Hari Ini</option>
              <option value="ThisWeek">Minggu Ini</option>
              <option value="LastWeek">Minggu Lalu</option>
              <option value="ThisMonth">Bulan Ini</option>
              <option value="LastMonth">Bulan Lalu</option>
              <option value="ThisYear">Tahun Ini</option>
              <option value="LastYear">Tahun Lalu</option>
              <option value="Last3Months">3 Bulan Terakhir</option>
              <option value="Last6Months">6 Bulan Terakhir</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* 🔹 Tombol Cari */}
      <Row className="mt-3">
        <Col md="12" className="d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={handleSearch}
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

export default CustomSearchFilter;
