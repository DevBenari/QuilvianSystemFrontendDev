"use client";
import React from "react";
import { Button } from "react-bootstrap";

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="d-flex justify-content-between align-items-center my-3 mx-2">

      {/* Tombol Previous */}
      <Button variant="dark" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Previous
      </Button>

      {/* Info Halaman */}
      <span className="mx-3">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>

      {/* Tombol Next */}
      <Button variant="dark" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
