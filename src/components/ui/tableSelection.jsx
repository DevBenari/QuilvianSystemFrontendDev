import React from "react";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import SelectField from "@/components/ui/select-field";

const TableSelection = ({
  name, // Nama field dalam form (AsuransiId, PoliId, dll)
  label, // Label untuk ditampilkan (Asuransi, Poli, dll)
  options, // Array opsi untuk dropdown
  isLoading, // Status loading dari data
  onLoadMore, // Callback untuk infinite scroll
  tempSelectName, // Nama untuk field select sementara
}) => {
  const { control, setValue, getValues } = useFormContext();

  // Gunakan useFieldArray untuk mengelola array ID di dalam form
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  // Fungsi untuk menambahkan ID ke tabel
  const handleAddToTable = () => {
    const selectedItem = getValues(tempSelectName);

    if (selectedItem) {
      // Mengambil nilai value dari objek select, bukan objek lengkapnya
      const selectedValue =
        typeof selectedItem === "object" && selectedItem !== null
          ? selectedItem.value
          : selectedItem;

      if (selectedValue) {
        // Periksa apakah ID sudah ada dalam array
        const existingIndex = fields.findIndex((item) => {
          const itemValue =
            typeof item === "object" && item !== null ? item.value : item;
          return itemValue === selectedValue;
        });

        if (existingIndex === -1) {
          // Tambahkan ID (nilai value saja) ke array jika belum ada
          append(selectedValue);
        }

        // Reset input setelah ditambahkan
        setValue(tempSelectName, null);
      }
    }
  };

  return (
    <Container fluid>
      <div className="table-responsive-md w-100">
        <div className="iq-header-title">
          <h4 className="card-title">{label}</h4>
        </div>
        <Row>
          <Col lg="8">
            <Controller
              name={tempSelectName}
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={`Pilih ${label}`}
                  options={options}
                  placeholder={`Pilih ${label}...`}
                  isLoading={isLoading}
                  onMenuScrollToBottom={onLoadMore}
                  className="mb-3"
                />
              )}
            />
          </Col>
          <Col lg="4">
            <Button
              type="button"
              className="btn btn-primary py-2 my-4"
              onClick={handleAddToTable}
            >
              Tambahkan Ke Table
            </Button>
          </Col>
        </Row>
        <Table bordered striped className="text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>{label} ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fields.length > 0 ? (
              fields.map((item, index) => (
                <tr key={`${name}-${index}`}>
                  <td>{index + 1}</td>
                  <td>
                    {typeof item === "object" && item !== null
                      ? item.value || JSON.stringify(item)
                      : String(item)}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <IoMdClose size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Tidak ada Data
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default TableSelection;
