"use client";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import DateInput from "@/components/ui/date-input";

const CustomSearchFilter = ({
  data,
  setFilteredData,
  filterFields = [], // List field yang akan dicari (misalnya ["nama", "kodeAgama"])
  dateField = "date", // Field yang menyimpan tanggal
}) => {
  const [filters, setFilters] = useState({
    searchQuery: "",
    startDate: null,
    endDate: null,
    timeFilter: "",
  });

  // 🔹 Perbarui data yang difilter ketika filters berubah
  useEffect(() => {
    applyFilters(filters);
  }, [filters, data]);

  // 🔹 Fungsi untuk memfilter data berdasarkan search query
  const handleFilterChange = (value) => {
    setFilters((prevFilters) => ({ ...prevFilters, searchQuery: value }));
  };

  // 🔹 Fungsi untuk menerapkan semua filter
  const applyFilters = (filters) => {
    let filtered = [...data];

    // 1️⃣ Filter berdasarkan search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        filterFields.some(
          (field) => item[field]?.toLowerCase().includes(query)
        )
      );
    }

    // 2️⃣ Filter berdasarkan waktu (Today, Last Week, etc.)
    if (filters.timeFilter) {
      filtered = filterByTime(filtered, filters.timeFilter);
    }

    // 3️⃣ Filter berdasarkan rentang tanggal
    if (filters.startDate && filters.endDate) {
      filtered = filterByDateRange(filtered, filters.startDate, filters.endDate);
    }

    setFilteredData(filtered);
  };

  // 🔹 Fungsi untuk filter by predefined time ranges
  const filterByTime = (data, filterType) => {
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
        return data;
    }

    return data.filter((item) => {
      const itemDate = new Date(item[dateField]);
      return itemDate >= start && itemDate <= end;
    });
  };

  // 🔹 Fungsi untuk filter berdasarkan rentang tanggal
  const filterByDateRange = (data, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return data.filter((item) => {
      const itemDate = new Date(item[dateField]);
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

        {/* 🔹 Dropdown untuk filter berdasarkan waktu */}
        <Col md="2">
          <SelectField
            name="ByTime"
            label="Filter By:"
            placeholder="Pilih opsi"
            options={[
              { value: "Today", label: "Today" },
              { value: "Last Day", label: "Last Day" },
              { value: "Last Week", label: "Last Week" },
              { value: "This Month", label: "This Month" },
              { value: "Last Month", label: "Last Month" },
            ]}
            onChangeCallback={(value) =>
              setFilters((prevFilters) => ({ ...prevFilters, timeFilter: value }))
            }
          />
        </Col>

        {/* 🔹 Input untuk memilih tanggal awal */}
        <Col md="3">
          <DateInput
            name="startDate"
            label="Tanggal Awal:"
            placeholder="Pilih tanggal awal"
            onChange={(value) =>
              setFilters((prevFilters) => ({ ...prevFilters, startDate: value }))
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

        {/* 🔹 Tombol untuk menerapkan filter */}
        <Col md="1" className="mt-2">
          <button className="btn btn-info mt-4" onClick={() => applyFilters(filters)}>
            <i className="ri-search-line"></i>
          </button>
        </Col>
      </Row>
    </Col>
  );
};

export default CustomSearchFilter;
