"use client";
import React, { useState, memo } from "react";
import { Table, Button } from "react-bootstrap";

const CustomTableComponent = memo(
  ({
    data,
    columns,
    itemsPerPage = 10,
    onRemove,
    onEdit,
    onCustom,
    labelEdit,
    labelCustom,
  }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Handle pagination
    const handleNextPage = () => {
      if (currentPage < Math.ceil(data.length / itemsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    return (
      <div>
        <div
          className="table-responsive"
          style={{ maxHeight: "400px", overflowX: "auto" }}
        >
          <Table
            bordered
            striped
            hover
            responsive="md"
            className="text-center "
            style={{ tableLayout: "fixed" }}
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f8f9fa",
                zIndex: 1,
              }}
            >
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col.label}</th>
                ))}
                {onRemove && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  {columns.map((col, i) => (
                    <td key={i}>{item[col.key]}</td>
                  ))}

                  <td>
                    {onRemove && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onRemove(item.id)}
                        className="mx-1"
                      >
                        Remove
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => onEdit(item.id)}
                        className="mx-1"
                      >
                        {labelEdit}
                      </Button>
                    )}
                    {onCustom && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => onCustom(item.id)}
                        className="mx-1"
                      >
                        {labelCustom}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="dark"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
          </span>
          <Button
            variant="dark"
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
);

CustomTableComponent.displayName = "CustomTableComponent";
export default CustomTableComponent;
