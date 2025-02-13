"use client";
import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import DateInput from "@/components/ui/date-input";

const CustomSearchFilterApi = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    search: "",
    periode: "",
    startDate: "",
    endDate: "",
    orderBy: "",
    sortDirection: "asc",
    page: 1,
    perPage: 10,
  });

  const handleInputChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (typeof onSearch === "function") {
      onSearch(filters);
    } else {
      console.error("onSearch is not defined as a function");
    }
  };

  return (
    <Col lg="12" className="mt-2">
      <Row>
        {/* Pencarian berdasarkan Nama */}
        <Col md="3">
          <TextField
            label="Cari Nama Agama:"
            name="search"
            type="text"
            placeholder="Masukkan nama agama..."
            className="form-control mb-0"
            value={filters.search}
            onChange={(e) => handleInputChange("search", e.target.value)}
          />
        </Col>

        {/* Filter berdasarkan Periode */}
        <Col md="2">
          <SelectField
            name="periode"
            label="Periode:"
            placeholder="Pilih Periode"
            options={[
              { value: "ThisYear", label: "Tahun Ini" },
              { value: "LastYear", label: "Tahun Lalu" },
            ]}
            onChangeCallback={(value) => handleInputChange("periode", value)}
          />
        </Col>

        {/* Filter berdasarkan Tanggal Mulai */}
        <Col md="3">
          <DateInput
            name="startDate"
            label="Tanggal Mulai:"
            placeholder="Pilih tanggal awal"
            onChange={(value) => handleInputChange("startDate", value)}
          />
        </Col>

        {/* Filter berdasarkan Tanggal Akhir */}
        <Col md="3">
          <DateInput
            name="endDate"
            label="Tanggal Akhir:"
            placeholder="Pilih tanggal akhir"
            onChange={(value) => handleInputChange("endDate", value)}
          />
        </Col>

        {/* Tombol Pencarian */}
        <Col md="1" className="mt-2">
          <Button onClick={handleSubmit} className="btn btn-info mt-4">
            <i className="ri-search-line"></i> Cari
          </Button>
        </Col>

        {/* Sort Direction */}
        <Col md="3" className="mt-3">
          <SelectField
            name="sortDirection"
            label="Urutan:"
            placeholder="Pilih Urutan"
            options={[
              { value: "asc", label: "Ascending" },
              { value: "desc", label: "Descending" },
            ]}
            onChangeCallback={(value) =>
              handleInputChange("sortDirection", value)
            }
          />
        </Col>

        {/* Urutan berdasarkan (OrderBy) */}
        <Col md="3" className="mt-3">
          <SelectField
            name="orderBy"
            label="Urutkan Berdasarkan:"
            placeholder="Pilih OrderBy"
            options={[
              { value: "CreateDateTime", label: "Tanggal Dibuat" },
              { value: "NamaAgama", label: "Nama Agama" },
            ]}
            onChangeCallback={(value) => handleInputChange("orderBy", value)}
          />
        </Col>

        {/* Per Page */}
        <Col md="2" className="mt-3">
          <TextField
            label="Data per Halaman:"
            name="perPage"
            type="number"
            min="1"
            placeholder="Jumlah data per halaman"
            className="form-control mb-0"
            value={filters.perPage}
            onChange={(e) => handleInputChange("perPage", e.target.value)}
          />
        </Col>

        {/* Pagination Page */}
        <Col md="2" className="mt-3">
          <TextField
            label="Halaman:"
            name="page"
            type="number"
            min="1"
            placeholder="Halaman"
            className="form-control mb-0"
            value={filters.page}
            onChange={(e) => handleInputChange("page", e.target.value)}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default CustomSearchFilterApi;
