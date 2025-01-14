import React from "react";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import SearchableSelectField from "@/components/ui/select-field-search";

const TindakanTableHarga = ({ tindakan, title, judul }) => {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tindakanList", // Menghubungkan ke form utama
  });

  // Transformasikan tindakanDataConfig agar sesuai dengan format dropdown
  const tindakanOptions = tindakan.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  // Fungsi untuk menambahkan tindakan ke tabel
  const handleAddToTable = () => {
    const dataToAdd = watch("tindakanSelect");

    if (dataToAdd?.select && dataToAdd?.qty) {
      const qtyToAdd = parseInt(dataToAdd.qty);

      // Cari harga dari dataFasilitas berdasarkan ID yang dipilih
      const selectedTindakan = tindakan.find(
        (item) => item.id === dataToAdd.select.value
      );

      // Periksa apakah tindakan sudah ada di tabel berdasarkan ID
      const existingIndex = fields.findIndex(
        (item) => item.lab.value === dataToAdd.select.value
      );

      if (existingIndex > -1) {
        // Jika tindakan sudah ada, perbarui jumlahnya
        const updatedFields = [...fields];
        updatedFields[existingIndex] = {
          ...updatedFields[existingIndex],
          jumlah: qtyToAdd,
          harga: selectedTindakan?.harga || 0,
        };
        setValue("tindakanList", updatedFields);
      } else {
        // Jika tindakan belum ada, tambahkan entri baru
        append({
          lab: dataToAdd.select,
          jumlah: qtyToAdd,
          harga: selectedTindakan?.harga || 0,
        });
      }

      // Reset input Qty setelah ditambahkan ke tabel
      setValue("tindakanSelect.qty", "1");
    } else {
      console.error(
        "ERROR: Data yang ditambahkan tidak lengkap (qty atau tindakan kosong)"
      );
    }
  };

  // Fungsi untuk mengubah jumlah tindakan di tabel
  const handleJumlahChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index] = {
      ...updatedFields[index],
      jumlah: parseInt(value) || 0,
    };
    setValue("tindakanList", updatedFields); // Perbarui tindakanList di form utama
  };

  // Fungsi untuk menghitung total harga per baris
  const calculateTotalHargaPerRow = (jumlah, harga) => {
    return jumlah * harga;
  };

  // Fungsi untuk menghitung total keseluruhan harga
  const calculateTotalHargaKeseluruhan = () => {
    return fields.reduce((total, item) => {
      return total + calculateTotalHargaPerRow(item.jumlah, item.harga);
    }, 0);
  };

  const handleDeleteRow = (index) => {
    remove(fields, index);
  };

  return (
    <Container fluid>
      <div className="table-responsive-md w-100">
        <div className="iq-header-title">
          <h4 className="card-title">{judul}</h4>
        </div>
        <Row>
          <Col lg="6">
            <Controller
              name="tindakanSelect.select"
              control={control}
              rules={{ required: "Tindakan is required" }}
              render={({ field, fieldState }) => (
                <SearchableSelectField
                  {...field}
                  label="Fasilitas"
                  options={tindakanOptions}
                  placeholder="Pilih Fasilitas"
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
                  value={field.value || ""} // Berikan nilai default jika undefined
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
              Tambahkan Ke Table
            </Button>
          </Col>
        </Row>
        <Table bordered striped className="text-center">
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
            {fields.length > 0 ? (
              fields.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.lab.label}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={row.jumlah}
                      onChange={(e) =>
                        handleJumlahChange(index, e.target.value)
                      }
                    />
                  </td>
                  <td>Rp {row.harga.toLocaleString()}</td>
                  <td>Rp {(row.jumlah * row.harga).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => handleDeleteRow(index)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Tidak ada Data
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

export default TindakanTableHarga;
