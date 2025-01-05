import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import SearchableSelectField from "@/components/ui/select-field-search";
import { Value } from "sass";

const TindakanTable = ({ kecamatans, cities }) => {
  const { control, setValue, watch } = useForm({
    defaultValues: {
      analisaHb: { select: null, qty: "" },
      cairanTubuh: { select: null, qty: "" },
    },
  });

  const [data, setData] = React.useState([]);
  const handleAddToTable = (source) => {
    const dataToAdd = watch(source === "analisa" ? "analisaHb" : "cairanTubuh");

    if (dataToAdd.select && dataToAdd.qty) {
      setData((prev) => [
        ...prev,
        { lab: dataToAdd.select, jumlah: dataToAdd.qty },
      ]);

      if (source === "analisa") {
        setValue("analisaHb.select", null);
        setValue("analisaHb.qty", "");
      } else if (source === "cairan") {
        setValue("cairanTubuh.select", null);
        setValue("cairanTubuh.qty", "");
      }
    }
  };

  const handleDeleteRow = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleJumlahChange = (index, value) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, jumlah: value } : item
      )
    );
  };

  return (
    <Container fluid>
      <div className="table-responsive-md w-100">
        <Row>
          <Col lg="6">
            <Controller
              name="analisaHb.select"
              control={control}
              rules={{ required: "Analisa Hb is required" }}
              render={({ field, fieldState }) => (
                <SearchableSelectField
                  {...field}
                  label="Analisa Hb"
                  options={kecamatans.map((kecamatan) => ({
                    label: kecamatan.namaKelurahan,
                    value: kecamatan.subDistrictId,
                  }))}
                  placeholder="Pilih Analisa Hb"
                  className={`mb-3 ${
                    fieldState.error ? "error-highlight" : ""
                  }`}
                />
              )}
            />
          </Col>
          <Col lg="2">
            <label htmlFor="">Qty</label>
            <Controller
              name="analisaHb.qty"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="form-control"
                  placeholder="qty"
                />
              )}
            />
          </Col>
          <Col lg="2">
            <Button
              type="button"
              className="btn btn-primary py-2 my-4"
              onClick={() => handleAddToTable("analisa")}
            >
              Add To Table
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Controller
              name="cairanTubuh.select"
              control={control}
              rules={{ required: "Data belum disi" }}
              render={({ field, fieldState }) => (
                <SearchableSelectField
                  {...field}
                  label="Cairan Tubuh"
                  options={cities.map((kecamatan) => ({
                    label: kecamatan.namaKota,
                    value: kecamatan.cityId,
                  }))}
                  placeholder="Pilih Cairan Tubuh"
                  className={`mb-3 ${
                    fieldState.error ? "error-highlight" : ""
                  }`}
                />
              )}
            />
          </Col>
          <Col lg="2">
            <label htmlFor="">Qty</label>
            <Controller
              name="cairanTubuh.qty"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="form-control"
                  placeholder="qty"
                />
              )}
            />
          </Col>
          <Col lg="2">
            <Button
              type="button"
              className="btn btn-primary py-2 my-4"
              onClick={() => handleAddToTable("cairan")}
            >
              Add To Table
            </Button>
          </Col>
        </Row>
        {/* Table component remains the same */}
        <Table className="text-center" bordered striped>
          <thead>
            <tr>
              <th>No</th>
              <th>Pemeriksaan Lab</th>
              <th>Jumlah</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowIndex + 1}</td>
                  <td>{row.lab.label || "-"}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={row.jumlah}
                      onChange={(e) =>
                        handleJumlahChange(rowIndex, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => handleDeleteRow(rowIndex)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default TindakanTable;
