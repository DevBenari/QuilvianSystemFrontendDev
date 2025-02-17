"use client";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import TextField from "@/components/ui/text-field";
import DateInput from "@/components/ui/date-input";

const CustomSearchFilter = ({ data, setFilteredData, filterFields = [] }) => {
  const [filters, setFilters] = useState({
    searchQuery: "",
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      applyFilters(filters);
    } else {
      console.error("Data yang diterima bukan array:", data);
    }
  }, [filters, data]);

  const handleFilterChange = (value) => {
    setFilters((prevFilters) => ({ ...prevFilters, searchQuery: value }));
  };

  const applyFilters = (filters) => {
    let filtered = [...data];

    // Filter berdasarkan search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        filterFields.some((field) => item[field]?.toLowerCase().includes(query))
      );
    }

    // Filter berdasarkan rentang tanggal
    if (filters.startDate && filters.endDate) {
      filtered = filterByDateRange(
        filtered,
        filters.startDate,
        filters.endDate
      );
    }

    setFilteredData(filtered);
  };

  const filterByDateRange = (data, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return data.filter((item) => {
      const itemDate = new Date(item.createdDate);
      return itemDate >= start && itemDate <= end;
    });
  };

  return (
    <Col lg="12" className="mt-2">
      <Row>
        {/* 🔹 Input untuk pencarian */}
        <Col md="3">
          <TextField
            label="Cari Data:"
            name="searchQuery"
            type="text"
            placeholder="Masukkan kata kunci..."
            className="form-control mb-0"
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange(e.target.value)}
          />
        </Col>

        {/* 🔹 Input untuk memilih tanggal awal */}
        <Col md="3">
          <DateInput
            name="startDate"
            label="Tanggal Awal:"
            placeholder="Pilih tanggal awal"
            onChange={(value) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                startDate: value,
              }))
            }
          />
        </Col>

        {/* 🔹 Input untuk memilih tanggal akhir */}
        <Col md="3">
          <DateInput
            name="endDate"
            label="Tanggal Akhir:"
            placeholder="Pilih tanggal akhir"
            onChange={(value) =>
              setFilters((prevFilters) => ({ ...prevFilters, endDate: value }))
            }
          />
        </Col>
      </Row>
    </Col>
  );
};

export default CustomSearchFilter;
