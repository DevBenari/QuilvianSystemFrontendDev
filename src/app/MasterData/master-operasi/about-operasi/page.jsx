"use client";

import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import CustomTableComponent from "@/components/features/CustomTable/custom-table";
import CustomSearchFilter from "@/components/features/CustomSearchComponen/Form-search-dashboard";

import { useEffect, useState } from "react";

import TextField from "@/components/ui/text-field";
import { useAboutOperasi } from "@/lib/hooks/manajemen-operasi/about-operasi";

const AboutOperasi = () => {
  const methods = useForm({
    mode: "onSubmit", // Validasi hanya saat submit
    defaultValues: {
      tipe_penggunaan_operasi: "",
      operator: "",
      anastesi: "",
      resusitator: "",
      alat: "",
      ruangan: "",
    },
  });

  const { aboutOperasi, loading, error } = useAboutOperasi();

  const [filteredOperasi, setFilteredOperasi] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditData, setCurrentEditData] = useState(null);

  useEffect(() => {
    setFilteredOperasi(aboutOperasi);
  }, [aboutOperasi]);

  const closeModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setCurrentEditData(null);
    methods.reset();
  };

  const handleSubmit = async (data) => {
    try {
      // Bersihkan data sebelum dikirim
      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );

      if (isEditMode && currentEditData?.id) {
        console.log(`Mengedit data dengan ID: ${currentEditData.id}`);
        console.log("Data yang dikirim untuk pengeditan:", cleanedData); // Cetak data lengkap

        // Simulasikan pengeditan data
        const updatedData = filteredOperasi.map((item) =>
          item.id === currentEditData.id ? { ...item, ...cleanedData } : item
        );
        setFilteredOperasi(updatedData);
      } else {
        console.log("Menambahkan data baru");
        console.log("Data yang dikirim untuk penambahan:", cleanedData); // Cetak data lengkap

        // Simulasikan penambahan data
        const newData = [
          ...filteredOperasi,
          { id: Date.now(), ...cleanedData },
        ];
        setFilteredOperasi(newData);
      }

      closeModal();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
    }
  };

  const handleEdit = (id) => {
    const selectedData = filteredOperasi.find((item) => item.id === id);
    if (selectedData) {
      setCurrentEditData(selectedData);
      methods.reset(selectedData);
      setIsEditMode(true);
      setShowModal(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <Col lg="12" className="iq-card p-4">
        <div className="d-flex justify-content-between iq-card-header">
          <h2 className="mb-3">Searching</h2>
          <button
            className="btn btn-dark my-3 mx-3"
            onClick={() => setFilteredOperasi(aboutOperasi)} // Hindari reload
          >
            <i className="ri-refresh-line"></i>
          </button>
        </div>
        <Col lg="12" className="mt-2">
          <CustomSearchFilter
            data={aboutOperasi}
            setFilteredPatients={setFilteredOperasi}
            onFilteredPatients={filteredOperasi}
          />
        </Col>
      </Col>
      <div className="mt-3">
        <Row>
          <Col sm="12" className="p-3">
            <div className="iq-card p-3">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title font-widest">Tabel Operasi</h4>
                </div>
                <Button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    setShowModal(true);
                    setIsEditMode(false);
                    methods.reset();
                  }}
                >
                  Tambah
                </Button>
              </div>
              <div className="iq-card-body">
                {!error && (
                  <CustomTableComponent
                    data={filteredOperasi}
                    columns={[
                      { key: "id", label: "NO" },
                      {
                        key: "tipe_penggunaan_operasi",
                        label: "Tipe Penggunaan Operasi",
                      },
                      { key: "operator", label: "Operator" },
                      { key: "anastesi", label: "Anastesi" },
                      { key: "resusitator", label: "Resusitator" },
                      { key: "alat", label: "Alat" },
                      { key: "ruangan", label: "Ruangan" },
                    ]}
                    itemsPerPage={10}
                    onRemove={(id) =>
                      setFilteredOperasi((prev) =>
                        prev.filter((item) => item.id !== id)
                      )
                    }
                    onEdit={handleEdit}
                    labelEdit="Edit"
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Modal Bootstrap */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Tipe Operasi" : "Tambah Tipe Operasi"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={methods.handleSubmit(handleSubmit)}>
            <TextField
              name="tipe_penggunaan_operasi"
              label="Tipe Operasi"
              type="text"
              placeholder="Masukkan Tipe Operasi"
              rules={{ required: "Tipe Operasi harus diisi" }}
              className="mb-3"
            />
            <TextField
              name="operator"
              label="Operator"
              type="text"
              placeholder="Masukkan Operator"
              rules={{
                required: "Operator harus diisi",
                pattern: {
                  value: /^[0-9]+%$/,
                  message: "Operator harus berupa angka diikuti tanda %",
                },
              }}
              className="mb-3"
            />
            <TextField
              name="anastesi"
              label="Anastesi"
              type="text"
              placeholder="Masukkan Anastesi"
              rules={{ required: "Anastesi harus diisi" }}
              className="mb-3"
            />
            <TextField
              name="resusitator"
              label="Resusitator"
              type="text"
              placeholder="Masukkan Resusitator"
              rules={{ required: "Resusitator harus diisi" }}
              className="mb-3"
            />
            <TextField
              name="alat"
              label="Alat"
              type="text"
              placeholder="Masukkan Alat"
              rules={{ required: "Alat harus diisi" }}
              className="mb-3"
            />
            <TextField
              name="ruangan"
              label="Ruangan"
              type="text"
              placeholder="Masukkan Ruangan"
              rules={{ required: "Ruangan harus diisi" }}
              className="mb-3"
            />
            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={closeModal}>
                Batal
              </Button>
              <Button type="submit" variant="primary" className="mx-2">
                {isEditMode ? "Simpan Perubahan" : "Simpan"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </FormProvider>
  );
};

export default AboutOperasi;
