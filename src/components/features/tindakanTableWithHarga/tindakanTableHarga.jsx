import React from "react";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import SearchableSelectField from "@/components/ui/select-field-search";
import SelectField from "@/components/ui/select-field";

const TindakanTableHarga = ({
  tindakan,
  title,
  judul,
  placeholder,
  label,
  labelKey = "name",
  valueKey = "id",
  hargaKey,
  rules,
}) => {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tindakanList", // Menghubungkan ke form utama
  });

  // Transformasikan tindakanDataConfig agar sesuai dengan format dropdown
  const tindakanOptions = tindakan.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
    harga: hargaKey ? item[hargaKey] : 0,
  }));

  // Fungsi untuk menambahkan tindakan ke tabel
  const handleAddToTable = () => {
    const dataToAdd = watch("tindakanSelect");

    if (dataToAdd?.select && dataToAdd?.qty) {
      const qtyToAdd = parseInt(dataToAdd.qty);

      // Cari harga dari tindakan berdasarkan ID yang dipilih
      const selectedTindakan = tindakanOptions.find(
        (item) => item.value === dataToAdd.select.value
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
      console.error("Data tidak lengkap (qty atau tindakan kosong)");
    }
  };

  // Perbarui total keseluruhan di form utama setiap kali data tabel berubah

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

  // Fungsi untuk menghitung total keseluruhan harga
  const [totalKeseluruhan, setTotalKeseluruhan] = React.useState(0);

  React.useEffect(() => {
    const total = fields.reduce((total, item) => {
      return total + item.jumlah * item.harga;
    }, 0);
    setTotalKeseluruhan(total);
    setValue("totalKeseluruhan", total); // Perbarui nilai di form utama
  }, [fields, setValue]);

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
              rules={rules}
              render={({ field, fieldState }) => (
                <SelectField
                  {...field}
                  label={label}
                  options={tindakanOptions}
                  placeholder={placeholder || "Pilih Tindakan"}
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
            <strong>Rp {totalKeseluruhan.toLocaleString()}</strong>
          </h5>
        </div>
      </div>
    </Container>
  );
};

export default TindakanTableHarga;
