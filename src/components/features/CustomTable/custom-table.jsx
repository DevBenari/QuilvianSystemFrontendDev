"use client";
import React, { memo, useCallback } from "react";
import { Table, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import PaginationControls from "@/utils/paginationControl";

const CustomTableComponent = memo(({ 
  data = [], 
  columns = [], 
  paginationProps = { currentPage: 1, totalPages: 1, itemsPerPage: 10, onPageChange: () => {} }, 
  slugConfig = { textField: "name", idField: "id" }, 
  basePath = "/", 
  actions = [], 
  showActions = false,
}) => {
  const router = useRouter();

  const handleDoubleClick = useCallback(
    (item) => {
      const textField = item[slugConfig.textField];
      const idField = item[slugConfig.idField];

      if (!textField || !idField) return;
      const slug = `${textField.toLowerCase().replace(/\s+/g, "-")}-${idField}`;
      router.push(`${basePath}/${slug}`);
    },
    [router, slugConfig, basePath]
  );

  return (
    <div>
      <div className="table-responsive">
        <Table bordered striped hover>
          <thead>
            <tr>
              {columns.map((col, index) => <th key={index}>{col.label}</th>)}
              {showActions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={columns.length + (showActions ? 1 : 0)}>No data available</td></tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} onDoubleClick={() => handleDoubleClick(item)} style={{ cursor: "pointer" }}>
                  {columns.map((col, i) => (
                    <td key={i}>
                      {col.key === "no"
                        ? (paginationProps.currentPage - 1) * paginationProps.itemsPerPage + index + 1
                        : item[col.key]}
                    </td>
                  ))}
                  {showActions && (
                    <td>
                      {actions.map((action) => (
                        <Button key={action.type} className="mx-3" variant={action.variant} size="sm" onClick={() => action.onClick(item)}>{action.label}</Button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      <PaginationControls {...paginationProps} />
    </div>
  );
});

CustomTableComponent.displayName = "CustomTableComponent";
export default CustomTableComponent;
