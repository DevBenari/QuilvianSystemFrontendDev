import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import SearchableSelectField from "@/components/ui/select-field-search";

const OptikTable = ({ tindakan }) => {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      tindakanSelect: { select: null, qty: "" },
    },
  });

  const [data, setData] = React.useState([]);

  const handleAddToTable = () => {
    const dataToAdd = watch("tindakanSelect"); // Ambil data input form

    if (dataToAdd.select && dataToAdd.qty) {
      const qtyToAdd = parseInt(dataToAdd.qty); // Konversi qty ke angka
      console.log("===== DEBUGGING =====");
      console.log("Qty Ditambahkan:", qtyToAdd);
      console.log("Tindakan Dipilih:", dataToAdd.select);

      setData((prev) => {
        console.log("Data Sebelum Update:", prev);

        // Periksa apakah tindakan sudah ada di tabel berdasarkan ID
        const existingIndex = prev.findIndex(
          (item) => item.lab.value === dataToAdd.select.value
        );

        if (existingIndex > -1) {
          // Jika tindakan sudah ada, tambahkan qty baru langsung dari input
          const updatedData = [...prev];
          updatedData[existingIndex] = {
            ...updatedData[existingIndex],
            jumlah: qtyToAdd, // Ganti langsung dengan nilai qty input baru
          };
          console.log("Data Setelah Update (Jika Sudah Ada):", updatedData);
          return updatedData;
        } else {
          // Jika tindakan belum ada, tambahkan entri baru
          const tindakanItem = tindakan.find(
            (item) => item.id === dataToAdd.select.value
          );
          const newData = [
            ...prev,
            {
              lab: dataToAdd.select,
              jumlah: qtyToAdd,
              harga: tindakanItem.harga,
            },
          ];
          console.log("Data Baru Ditambahkan:", newData);
          return newData;
        }
      });

      // Reset nilai qty setelah ditambahkan ke tabel
      setValue("tindakanSelect.qty", "1");
      console.log("Qty Reset ke 1");
    } else {
      console.log(
        "ERROR: Data yang ditambahkan tidak lengkap (qty atau tindakan kosong)"
      );
    }
  };

  const handleDeleteRow = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleJumlahChange = (index, value) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? {
              ...item,
              jumlah: parseInt(value),
            }
          : item
      )
    );
  };

  const calculateTotalHargaPerRow = (jumlah, harga) => {
    return jumlah * harga;
  };

  const calculateTotalHargaKeseluruhan = () => {
    return data.reduce((total, item) => {
      return total + calculateTotalHargaPerRow(item.jumlah, item.harga);
    }, 0);
  };

  return (
    <Container fluid>
      <div className="table-responsive-md w-100">
        <Row>
          <Col lg="6">
            <Controller
              name="tindakanSelect.select"
              control={control}
              rules={{ required: "Tindakan is required" }}
              render={({ field, fieldState }) => (
                <SearchableSelectField
                  {...field}
                  label="Tindakan"
                  options={tindakan.map((item) => ({
                    label: item.tindakan,
                    value: item.id,
                  }))}
                  placeholder="Pilih Tindakan"
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
              name="tindakanSelect.qty"
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
              onClick={handleAddToTable}
            >
              Add To Table
            </Button>
          </Col>
        </Row>
        <Table className="text-center" bordered striped>
          <thead>
            <tr>
              <th>No</th>
              <th>Tindakan</th>
              <th>Jumlah</th>
              <th>Harga</th>
              <th>Total Harga</th>
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
                  <td>Rp {row.harga.toLocaleString()}</td>
                  <td>
                    Rp{" "}
                    {calculateTotalHargaPerRow(
                      row.jumlah,
                      row.harga
                    ).toLocaleString()}
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
                <td colSpan="6" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="text-end mt-3">
          <h5>
            Total Harga Keseluruhan:{" "}
            <strong>
              Rp {calculateTotalHargaKeseluruhan().toLocaleString()}
            </strong>
          </h5>
        </div>
      </div>
    </Container>
  );
};

export default OptikTable;
