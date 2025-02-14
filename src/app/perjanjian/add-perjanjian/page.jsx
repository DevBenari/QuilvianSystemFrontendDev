"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Col,
  Form,
  Row,
  Table,
  Label,
  Pagination,
  Button,
} from "react-bootstrap";
import SelectField from "@/components/ui/select-field";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@/components/ui/text-field";
import DateInput from "@/components/ui/date-input";

import { pemeriksaRadiologi } from "@/utils/dataTindakan";
import SearchableSelectField from "@/components/ui/select-field-search";
import {
  dataOperasiTersedia,
  jadwalDokterByDate,
} from "@/utils/PasienPerjanjian";

import { dataKelasTersedia } from "@/utils/PasienPerjanjian";
import {
  dataDepartemen,
  dataDokter,
  dataKelas,
  paketMcu,
  ruangOperasi,
  tipeAnestesiOptions,
} from "@/utils/SearchSelect";
import TextArea from "@/components/ui/textArea-field";
import { motion } from "framer-motion";
import TindakanTableHarga from "@/components/features/tindakanTableWithHarga/tindakanTableHarga";
import DateInputPicker from "@/components/ui/date-picker";
import DataTable from "@/components/features/edit-table/dataTable/page";

const AddPerjanjianForm = memo(() => {
  const [defaultValues, setDefaultValues] = useState({});
  const [selectedLayanan, setSelectedLayanan] = useState("");

  const methods = useForm({
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    const layananFields = {
      Operasi: [
        "ruangOperasi",
        "waktuOperasi",
        "estimasi",
        "dokterOperasi",
        "tindakan",
        "tanggalOperasi",
        "tipeAnestesi",
        "informasiLainnyaRawatInap",
        "diagnosaAwalRawatInap",
        "dokterPemeriksa",
      ],
      MCU: ["janjiTanggalMcu", "paketMcu"],
      "Rawat Jalan": [
        "tanggalKunjungan",
        "noUrut",
        "dokter",
        "departemen",
        "pasienPrioritas",
        "informasiLainnya",
      ],
      Radiologi: [
        "tglJanji",
        "dokterRadiologi",
        "tindakanList",
        "totalKeseluruhan",
      ],
      "Rawat Inap": [
        "janjiTanggal",
        "Kelas",
        "dokter",
        "pasienPrioritas",
        "diagnosaAwalRawatInap",
        "informasiLainnyaRawatInap",
      ],
      ODC: [
        "janjiTanggal",
        "KelasOdc",
        "dokter",
        "diagnosaAwalOdc",
        "informasiLainnyaOdc",
      ],
    };

    const formElements = document.querySelectorAll("form [name]");
    const defaults = Array.from(formElements).reduce((acc, el) => {
      if (layananFields[selectedLayanan]?.includes(el.name)) {
        acc[el.name] = el.value || "";
      }
      return acc;
    }, {});

    // Tambahkan nilai default untuk field umum
    defaults["nama"] = methods.watch("nama") || "";
    defaults["alamat"] = methods.watch("alamat") || "";
    defaults["jenisKelamin"] = methods.watch("jenisKelamin") || "";
    defaults["noHp"] = methods.watch("noHp") || "";
    defaults["tempatLahir"] = methods.watch("tempatLahir") || "";
    defaults["tglLahir"] = methods.watch("tglLahir") || "";
    defaults["tipePenjamin"] = methods.watch("tipePenjamin") || "";

    setDefaultValues(defaults);
  }, [selectedLayanan, methods]);

  // Inisialisasi form dengan defaultValues

  const onSubmit = (data) => {
    const fieldUmum = [
      "nama",
      "alamat",
      "jenisKelamin",
      "noHp",
      "tempatLahir",
      "tglLahir",
      "tipePenjamin",
    ];

    const layananFields = {
      Operasi: [
        "ruangOperasi",
        "waktuOperasi",
        "estimasi",
        "dokterOperasi",
        "tindakan",
        "tanggalOperasi",
        "tipeAnestesi",
        "informasiLainnyaRawatInap",
        "diagnosaAwalRawatInap",
        "dokterPemeriksa",
      ],
      MCU: ["janjiTanggalMcu", "paketMcu"],
      "Rawat Jalan": [
        "tanggalKunjungan",
        "noUrut",
        "dokter",
        "departemen",
        "pasienPrioritas",
        "informasiLainnya",
      ],
      Radiologi: [
        "tglJanji",
        "dokterRadiologi",
        "tindakanList",
        "totalKeseluruhan",
      ],

      "Rawat Inap": [
        "janjiTanggal",
        "Kelas",
        "dokter",
        "pasienPrioritas",
        "diagnosaAwalRawatInap",
        "informasiLainnyaRawatInap",
      ],
      ODC: [
        "janjiTanggal",
        "KelasOdc",
        "dokter",
        "diagnosaAwalOdc",
        "informasiLainnyaOdc",
      ],
    };

    const filteredData = Object.keys(data).reduce((acc, key) => {
      if (
        fieldUmum.includes(key) || // Sertakan semua field umum
        layananFields[selectedLayanan]?.includes(key) // Sertakan field relevan berdasarkan layanan
      ) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    console.log("Data Terkirim:", filteredData);
    alert("Form berhasil disubmit!");
  };

  const { handleSubmit } = methods;
  // =============================Start Jadwal Dokter (Rawat Jalan )===================
  // inisialiasi use state dokter

  const [selectedDate, setSelectedDate] = useState(null); // State untuk tanggal
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(10);

  const searchDokter = methods.watch("searchDokter");
  const searchDepartemen = methods.watch("searchDepartemen");

  // handle filter dokter dan departemen

  const filterDoctors = useCallback(
    (doctors) => {
      const filtered = doctors.filter(
        (doctor) =>
          doctor.label
            ?.toLowerCase()
            .includes(searchDokter?.toLowerCase() || "") &&
          doctor.department
            ?.toLowerCase()
            .includes(searchDepartemen?.toLowerCase() || "")
      );
      setFilteredDoctors(filtered);
      setCurrentPage(1);
    },
    [searchDokter, searchDepartemen]
  );

  // pengambilan data jadwal dokter

  // useEffect(() => {
  //   if (selectedDate) {
  //     const date =
  //       selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
  //     const dateKey = date.toISOString().split("T")[0];
  //     const doctorsForDate = jadwalDokterByDate[dateKey] || [];
  //     setFilteredDoctors(doctorsForDate);
  //   }
  // }, [selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      const date =
        selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
      const dateKey = date.toISOString().split("T")[0];
      const doctorsForDate = jadwalDokterByDate[dateKey] || [];
      filterDoctors(doctorsForDate);
    }
  }, [searchDokter, searchDepartemen, selectedDate, filterDoctors]);

  useEffect(() => {
    if (selectedDate) {
      const date =
        selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
      const dateKey = date.toISOString().split("T")[0];
      const doctorsForDate = jadwalDokterByDate[dateKey] || [];
      filterDoctors(doctorsForDate);
    }
  }, [searchDokter, searchDepartemen, selectedDate, filterDoctors]);

  // handle tanggal dokter

  // handle row clich
  const handleDoctorSelection = (doctor) => {
    methods.setValue("dokter", doctor.label);
    methods.setValue("departemen", doctor.department);
    methods.setValue("waktuPraktek", doctor.waktuPraktek);
    methods.setValue("noUrut", doctor.noUrut.toString());
  };

  // Paginasi
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  // handle paginasi
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // untuk handle layanan

  const handleLayananChange = (value) => {
    setSelectedLayanan(value); // Update state lokal
  };

  // =============================END Jadwal Dokter (Rawat Jalan )===================

  // =============================Start Kelas ODC dan Rawat Inap ====================
  // fungsi Untuk Kelas

  // untuk mencari kelas

  const [filteredData, setFilteredData] = useState(dataKelasTersedia);

  const [selectedKelas, setSelectedKelas] = useState("");

  const [searchKelas, setSearchKelas] = useState({
    Kelas: "",
  });

  useEffect(() => {
    if (selectedKelas) {
      methods.setValue("Kelas", selectedKelas);
      methods.setValue("KelasOdc", selectedKelas);
    }
  }, [selectedKelas, methods]);

  const handleSearch = (key, value) => {
    const updatedKelas = { ...searchKelas, [key]: value };
    setSearchKelas(updatedKelas);

    const filtered = dataKelasTersedia.filter((item) => {
      return Object.keys(updatedKelas).every((KelasKey) => {
        const KelasValue = updatedKelas[KelasKey];
        if (!KelasValue) return true; // Abaikan jika kosong

        return item[KelasKey]?.toString()
          .toLowerCase()
          .includes(KelasValue.toLowerCase());
      });
    });

    setFilteredData(filtered);
  };

  const header = ["No", "Kelas ", "Jml Tersedia", "Jml reservasi"];

  const members = filteredData.map((item, index) => ({
    no: index + 1,
    kelas: item.Kelas,
    jmlRuang: item.JmlRuang,
    jmlReservasi: item.JmlReservasi,
  }));

  // =============================END Kelas ODC dan Rawat Inap ====================

  // ============================= Start Operasi ====================================

  // Function Operasi

  const [selectedDateOperasi, setselectedDateOperasi] = useState(new Date());
  const [filteredDataOperasi, setfilteredDataOperasi] = useState([]);
  const [searchOperasi, setSearchOperasi] = useState({});

  const handleDateChangeOperasi = (date) => {
    if (!(date instanceof Date)) {
      console.error("Invalid date:", date);
      return;
    }

    setselectedDateOperasi(date); // Perbarui state dengan objek Date
    const formattedDate = date.toISOString().slice(0, 10); // Format tanggal menjadi YYYY-MM-DD
    filterData(formattedDate, searchOperasi); // Filter data berdasarkan tanggal
  };

  const handleSearchOperasi = (key, value) => {
    // Update state search dengan nilai terbaru
    const newSearchOperasi = { ...searchOperasi, [key]: value };
    setSearchOperasi(newSearchOperasi);

    // FormattedDate untuk mengambil data berdasarkan tanggal terpilih
    const formattedDate = selectedDateOperasi.toISOString().slice(0, 10);
    const dataTanggal = dataOperasiTersedia[formattedDate] || [];

    // Melakukan filter pada data berdasarkan key dan value yang diinput
    const filtered = dataTanggal.filter((item) =>
      item.ruangan?.toString().toLowerCase().includes(value.toLowerCase())
    );

    setfilteredDataOperasi(filtered);
  };

  const filterData = (formattedDate, searchParams) => {
    const dataTanggal = dataOperasiTersedia[formattedDate] || [];
    const filtered = dataTanggal.filter((item) =>
      Object.entries(searchParams).every(([key, val]) =>
        item[key]?.toString().toLowerCase().includes(val.toLowerCase())
      )
    );
    setfilteredDataOperasi(filtered);
  };

  const headerOperasi = [
    "No",
    "Jam Mulai",
    "Estimasi (Menit)",
    "Dokter Operator",
    "Tindakan",
    "Ruangan",
  ];

  const membersOperasi = filteredDataOperasi.map((item, index) => ({
    no: index + 1,
    jamMulai: item.jamMulai,
    estimasi: `${item.estimasi} Menit`,
    dokterOperator: item.dokterOperator,
    tindakan: item.tindakan,
    ruangan: item.ruangan,
  }));

  // set nilai

  const [selectedRuangOperasi, setSelectedRuangOperasi] = useState("");
  const [selectedWaktuOperasi, setSelectedWaktuOperasi] = useState("");
  const [selectedEstimasiOperasi, setSelectedEstimasiOperasi] = useState("");
  const [selectedDokterOperasi, setSelectedDokterOperasi] = useState("");
  const [selectedTindakanOperasi, setSelectedTindakanOperasi] = useState("");

  useEffect(() => {
    if (selectedLayanan === "Operasi") {
      methods.setValue("ruangOperasi", selectedRuangOperasi || "");
      methods.setValue("waktuOperasi", selectedWaktuOperasi || "");
      methods.setValue("estimasi", selectedEstimasiOperasi || "");
      methods.setValue("dokterOperasi", selectedDokterOperasi || "");
      methods.setValue("tindakan", selectedTindakanOperasi || "");
    }
  }, [
    selectedLayanan, // Tambahkan selectedLayanan ke dependensi
    methods, // Pastikan methods masuk dalam dependensi
    selectedRuangOperasi,
    selectedWaktuOperasi,
    selectedEstimasiOperasi,
    selectedDokterOperasi,
    selectedTindakanOperasi,
  ]);

  // End Operasi

  // ============================= END Operasi ====================================

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleSubmit(onSubmit))}>
        <Row className="mt-3">
          {/* Column Kiri */}
          <Col
            as={motion.div}
            md={
              selectedLayanan === "MCU" || selectedLayanan === "Radiologi"
                ? 12
                : selectedLayanan
                ? 6
                : 12
            }
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <h3 className="card-title">Perjanjian</h3>
              </div>
              <div className="iq-card-body">
                <Row>
                  <Col lg="6">
                    <TextField
                      name="nama"
                      label="Nama Pasien"
                      placeholder="Masukkan nama pasien"
                      rules={{ required: "Nama pasien harus diisi" }}
                    />
                  </Col>
                  <Col lg="3">
                    <TextField
                      name="tempatLahir"
                      label="Tempat Lahir"
                      placeholder="Masukkan tempat lahir"
                      rules={{ required: "Tempat lahir harus diisi" }}
                    />
                  </Col>

                  <Col lg="3">
                    <DateInput
                      name="tglLahir"
                      label="Tanggal Lahir"
                      placeholder="Pilih tanggal lahir"
                      rules={{ required: "Tanggal lahir harus diisi" }}
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="jenisKelamin"
                      label="Jenis Kelamin"
                      options={[
                        { label: "Laki-Laki", value: "Laki-Laki" },
                        { label: "Perempuan", value: "Perempuan" },
                      ]}
                      placeholder="Pilih jenis kelamin"
                      rules={{ required: "Jenis kelamin harus dipilih" }}
                    />
                  </Col>
                  <Col lg="6">
                    <TextField
                      name="noHp"
                      label="No HP"
                      placeholder="Masukkan nomor HP"
                      rules={{ required: "Nomor HP harus diisi" }}
                    />
                  </Col>
                  <Col lg="12">
                    <TextArea
                      name="alamat"
                      label="Alamat Rumah"
                      placeholder="Masukkan alamat rumah"
                      rules={{ required: "Alamat rumah harus diisi" }}
                    />
                  </Col>
                  <Col lg="6">
                    <SelectField
                      name="tipePenjamin"
                      label="Tipe Penjamin"
                      options={[
                        { label: "BPJS", value: "bpjs" },
                        { label: "Non BPJS", value: "non-bpjs" },
                      ]}
                      placeholder="Pilih tipe penjamin"
                      rules={{ required: "Penjamin harus dipilih" }}
                      className={"mb-3"}
                    />
                  </Col>
                </Row>
                {/* Informasi Pasien */}

                <SelectField
                  name="layanan"
                  label="Pilih Layanan"
                  placeholder="Pilih Layanan"
                  options={[
                    { label: "Rawat Inap", value: "Rawat Inap" },
                    { label: "Rawat Jalan", value: "Rawat Jalan" },
                    { label: "ODC", value: "ODC" },
                    { label: "Radiologi", value: "Radiologi" },
                    { label: "Operasi", value: "Operasi" },
                    { label: "MCU", value: "MCU" },
                  ]}
                  onChangeCallback={handleLayananChange}
                  className="mb-3"
                  rules={{ required: "Layanan harus dipilih" }}
                />
                {selectedLayanan === "Rawat Jalan" && (
                  <>
                    <Row>
                      <Col lg="4">
                        <DateInputPicker
                          name="tanggalKunjungan"
                          label="Tanggal Kunjungan"
                          placeholder="Pilih tanggal kunjungan"
                          rules={{ required: "Tanggal harus diisi" }}
                          control={methods.control}
                          onDateChange={(date) => setSelectedDate(date)} // Update state tanggal di komponen induk
                        />
                      </Col>
                      <Col lg="4">
                        <TextField
                          name="dokter"
                          label="Dokter Pemeriksa"
                          type="text"
                          className="form-control"
                          readOnly
                        />
                      </Col>
                      <Col lg="4">
                        <TextField
                          name="departemen"
                          label="Departemen"
                          type="text"
                          className="form-control"
                          readOnly
                        />
                      </Col>
                      <Col lg="4">
                        <TextField
                          name="waktuPraktek"
                          label="Waktu Praktek"
                          type="text"
                          className="form-control"
                          readOnly
                        />
                      </Col>
                      <Col lg="4">
                        <TextField
                          name="noUrut"
                          label="No. Urut"
                          type="text"
                          className="form-control"
                          readOnly
                        />
                      </Col>
                      <Col lg="6">
                        <SelectField
                          name="pasienPrioritas"
                          label="Pasien Prioritas"
                          options={[
                            { label: "Ya", value: "Ya" },
                            { label: "Tidak", value: "Tidak" },
                          ]}
                          placeholder="Pilih Pasien Prioritas"
                          rules={{ required: "Penjamin harus dipilih" }}
                          className={"mb-3"}
                        />
                      </Col>
                      <Col lg="12">
                        <TextArea
                          name="informasiLainnya"
                          label="Informasi Lainnya"
                          placeholder="Masukkan informasi lainnya"
                        />
                      </Col>
                    </Row>
                  </>
                )}

                {selectedLayanan === "Radiologi" && (
                  <Row
                    as={motion.div}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="iq-card">
                      <div className="iq-card-body">
                        <Row>
                          <Col lg="3">
                            <DateInput
                              name="tglJanji"
                              label="Tanggal Janji"
                              rules={{
                                required: "Tanggal Pelayanan harus diisi",
                              }}
                              className="mb-3"
                            />
                          </Col>
                          <TindakanTableHarga
                            tindakan={pemeriksaRadiologi}
                            label="Radiologi"
                            placeholder="Masukkan Nama Pemeriksaan"
                            labelKey="pemeriksaanRadiologi"
                            ValueKey="id"
                            hargaKey="harga"
                          />
                          ,
                          <Col lg="12">
                            <SearchableSelectField
                              name="dokterRadiologi"
                              label="Dokter Pemeriksa"
                              options={dataDokter}
                              placeholder="Pilih Dokter"
                              rules={{ required: "Dokter harus dipilih" }}
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Row>
                )}

                {selectedLayanan === "MCU" && (
                  <>
                    <Row
                      as={motion.div}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Col lg="6">
                        <DateInput
                          name="janjiTanggalMcu"
                          label="Janji Tanggal"
                          placeholder="Masukkan Tanggal"
                          rules={{ required: "Janji Tanggal harus diisi" }}
                          className="mb-3"
                        />
                      </Col>

                      <Col lg="6">
                        <SearchableSelectField
                          name="paketMcu"
                          label="Paket MCU"
                          options={paketMcu}
                          placeholder="Pilih paketMcu"
                          rules={{ required: "paketMcu harus dipilih" }}
                        />
                      </Col>
                    </Row>
                  </>
                )}

                {selectedLayanan === "Rawat Inap" && (
                  <Row>
                    <Row>
                      <Col lg="6">
                        <DateInput
                          name="janjiTanggal"
                          label="Janji Tanggal"
                          placeholder="Masukkan Tanggal"
                          rules={{ required: "Janji Tanggal harus diisi" }}
                          className="mb-3"
                        />
                      </Col>
                    </Row>
                    <Col lg="12">
                      <TextField
                        name="Kelas"
                        label="Kelas"
                        type="text"
                        className="form-control"
                        value={selectedKelas}
                        readOnly
                      />
                    </Col>
                    <Col lg="12">
                      <SearchableSelectField
                        name="dokter"
                        label="Dokter Pemeriksa"
                        options={dataDokter}
                        placeholder="Pilih Dokter"
                        rules={{ required: "Dokter harus dipilih" }}
                        className={"mb-3"}
                      />
                    </Col>
                    <Col lg="6">
                      <SelectField
                        name="pasienPrioritas"
                        label="Pasien Prioritas"
                        options={[
                          { label: "Ya", value: "Ya" },
                          { label: "Tidak", value: "Tidak" },
                        ]}
                        placeholder="Pilih Pasien Prioritas"
                        rules={{ required: "Penjamin harus dipilih" }}
                        className={"mb-3"}
                      />
                    </Col>
                    <Col lg="12">
                      <TextArea
                        name="diagnosaAwalRawatInap"
                        label="Diagnosa Awal"
                        placeholder="Masukkan diagnosa awal"
                      />
                    </Col>
                    <Col lg="12">
                      <TextArea
                        name="informasiLainnyaRawatInap"
                        label="Informasi Lainnya"
                        placeholder="Masukkan informasi lainnya"
                      />
                    </Col>
                  </Row>
                )}

                {selectedLayanan === "ODC" && (
                  <Row>
                    <Row>
                      <Col lg="6">
                        <DateInput
                          name="janjiTanggal"
                          label="Janji Tanggal"
                          placeholder="Masukkan Tanggal"
                          rules={{ required: "Janji Tanggal harus diisi" }}
                          className="mb-3"
                        />
                      </Col>
                    </Row>
                    <Col lg="12">
                      <TextField
                        name="KelasOdc"
                        label="Kelas"
                        type="text"
                        className="form-control"
                        value={selectedKelas}
                        readOnly
                      />
                    </Col>
                    <Col lg="12">
                      <SearchableSelectField
                        name="dokter"
                        label="Dokter Pemeriksa"
                        options={dataDokter}
                        placeholder="Pilih Dokter"
                        rules={{ required: "Dokter harus dipilih" }}
                      />
                    </Col>
                    <Col lg="12">
                      <TextArea
                        name="diagnosaAwalOdc"
                        label="Diagnosa Awal"
                        placeholder="Masukkan diagnosa awal"
                      />
                    </Col>
                    <Col lg="12">
                      <TextArea
                        name="informasiLainnyaOdc"
                        label="Informasi Lainnya"
                        placeholder="Masukkan informasi lainnya"
                      />
                    </Col>
                  </Row>
                )}

                {selectedLayanan === "Operasi" && (
                  <Row>
                    <Col lg="4">
                      <TextField
                        name="ruangOperasi"
                        label="Ruang Operasi"
                        value={selectedRuangOperasi}
                        className="form-control"
                        readOnly
                      />
                    </Col>
                    <Col lg="4">
                      <TextField
                        name="waktuOperasi"
                        label="Waktu Operasi"
                        value={selectedWaktuOperasi}
                        className="mb-3"
                        readOnly
                      />
                    </Col>
                    <Col lg="4">
                      <TextField
                        name="estimasi"
                        label="estimasi"
                        value={selectedEstimasiOperasi}
                        className="mb-3"
                        readOnly
                      />
                    </Col>
                    <Col lg="4">
                      <TextField
                        name="dokterOperasi"
                        label="Dokter Operasi"
                        value={selectedDokterOperasi}
                        className="mb-3"
                        readOnly
                      />
                    </Col>
                    <Col lg="4">
                      <TextField
                        name="tindakan"
                        label="Tindakan"
                        value={selectedTindakanOperasi}
                        className="mb-3"
                        readOnly
                      />
                    </Col>
                    <Col lg="6">
                      <SearchableSelectField
                        name="dokterPemeriksa"
                        label="Dokter Pemeriksa"
                        options={dataDokter}
                        placeholder="Pilih Dokter"
                        rules={{ required: "Dokter harus dipilih" }}
                      />
                    </Col>
                    <Col lg="6">
                      <SearchableSelectField
                        name="tipeAnestesi"
                        label="tipe Anestesi "
                        options={tipeAnestesiOptions}
                        placeholder="Pilih Tipe Anestesi"
                        rules={{ required: "tipeAnestesi harus dipilih" }}
                      />
                    </Col>
                    <Col lg="12">
                      <TextArea
                        name="informasiLainnyaRawatInap"
                        label="Informasi Lainnya"
                        placeholder="Masukkan informasi lainnya"
                      />
                    </Col>
                    <Col lg="12">
                      <TextArea
                        name="diagnosaAwalRawatInap"
                        label="Diagnosa Awal"
                        placeholder="Masukkan diagnosa awal"
                      />
                    </Col>
                  </Row>
                )}
                <Row className="mt-4">
                  <Col lg="12">
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          {/* Colomn Kanan */}

          {selectedLayanan && (
            <Col
              key={selectedLayanan}
              as={motion.div}
              md={
                selectedLayanan === "Rawat Inap" ||
                selectedLayanan === "ODC" ||
                selectedLayanan === "Operasi" ||
                selectedLayanan === "Rawat Jalan"
                  ? 6
                  : 12
              }
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Row>
                {selectedLayanan === "Rawat Jalan" && (
                  <>
                    <div className="iq-card">
                      <div className="iq-card-body">
                        <Row>
                          <Col lg="3">
                            <DateInputPicker
                              name="tanggalKunjungan"
                              label="Tanggal Kunjungan"
                              placeholder="Pilih tanggal kunjungan"
                              rules={{ required: "Tanggal harus diisi" }}
                              control={methods.control}
                              onDateChange={(date) => setSelectedDate(date)} // Update state tanggal
                            />
                          </Col>
                          <Col lg="3">
                            <TextField
                              label="Cari Dokter"
                              placeholder="Cari Dokter"
                              name="searchDokter"
                              onChange={(e) =>
                                methods.setValue("searchDokter", e.target.value)
                              }
                            />
                          </Col>
                          <Col lg="3">
                            <TextField
                              label="Cari Departemen"
                              placeholder="Cari Departemen"
                              name="searchDepartemen"
                              onChange={(e) =>
                                methods.setValue(
                                  "searchDepartemen",
                                  e.target.value
                                )
                              }
                            />
                          </Col>
                        </Row>
                        <div className="Tanggal">
                          <h5 className="my-3 text-center">
                            Dokter Tersedia pada{" "}
                            {selectedDate
                              ? new Date(selectedDate).toLocaleDateString() // Konversi string ke Date
                              : "Pilih Tanggal"}
                          </h5>
                        </div>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nama Dokter</th>
                              <th>Departemen</th>
                              <th>Waktu Praktek</th>
                              <th>No Urut</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentDoctors.map((doc) => (
                              <tr
                                key={doc.id}
                                onClick={() => handleDoctorSelection(doc)}
                                style={{ cursor: "pointer" }}
                              >
                                <td>{doc.label}</td>
                                <td>{doc.department}</td>
                                <td>{doc.waktuPraktek}</td>
                                <td>{doc.noUrut}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        {/* Pagination */}
                        {totalPages > 1 && (
                          <Pagination className="justify-content-center">
                            <Pagination.First
                              onClick={() => handlePageChange(1)}
                              disabled={currentPage === 1}
                            />
                            <Pagination.Prev
                              onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                              }
                              disabled={currentPage === 1}
                            />
                            {[...Array(totalPages)].map((_, i) => (
                              <Pagination.Item
                                key={i}
                                active={i + 1 === currentPage}
                                onClick={() => handlePageChange(i + 1)}
                              >
                                {i + 1}
                              </Pagination.Item>
                            ))}
                            <Pagination.Next
                              onClick={() =>
                                setCurrentPage((prev) =>
                                  Math.min(prev + 1, totalPages)
                                )
                              }
                              disabled={currentPage === totalPages}
                            />
                            <Pagination.Last
                              onClick={() => handlePageChange(totalPages)}
                              disabled={currentPage === totalPages}
                            />
                          </Pagination>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {selectedLayanan === "Rawat Inap" && (
                  <>
                    <div className="iq-card">
                      <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title my-3">
                          <h4 className="card-title mb-3">
                            Ketersediaan Kelas
                          </h4>
                          <Col lg="12">
                            <TextField
                              label="Cari Kelas"
                              name="kelas"
                              type="text"
                              placeholder="Cari Kelas"
                              className="form-control"
                              onChange={(e) =>
                                handleSearch("Kelas", e.target.value)
                              }
                            />
                          </Col>
                        </div>
                      </div>
                      <DataTable
                        headers={header}
                        data={members}
                        rowsPerPage={10}
                        actions={{
                          booking: (row) => handleEdit(row.id),
                        }}
                        customActions={[
                          {
                            label: "Booking Kelas",
                            onClick: (row) => setSelectedKelas(row.kelas),
                            className: "iq-bg-success",
                          },
                        ]}
                      />
                    </div>
                  </>
                )}

                {selectedLayanan === "ODC" && (
                  <>
                    <div className="iq-card">
                      <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title my-3">
                          <h4 className="card-title mb-3">
                            Ketersediaan Kelas
                          </h4>
                          <Col lg="12">
                            <TextField
                              label="Cari Kelas"
                              name="carikelasODC"
                              type="text"
                              placeholder="Cari Kelas"
                              className="form-control"
                              onChange={(e) =>
                                handleSearch("Kelas", e.target.value)
                              }
                            />
                          </Col>
                        </div>
                      </div>
                      <DataTable
                        headers={header}
                        data={members}
                        rowsPerPage={4}
                        actions={{
                          booking: (row) => handleEdit(row.id),
                        }}
                        customActions={[
                          {
                            label: "Booking Kelas",
                            onClick: (row) => setSelectedKelas(row.kelas),
                            className: "iq-bg-success",
                          },
                        ]}
                      />
                    </div>
                  </>
                )}

                {selectedLayanan === "Operasi" && (
                  <>
                    <div className="iq-card">
                      <div className="iq-card-header">
                        <div className="iq-header-title my-3">
                          <h4 className="card-title mb-3">Ruang Operasi</h4>
                        </div>
                        <Row>
                          <Col xs="12" lg="3">
                            <DateInputPicker
                              name="tanggalOperasi"
                              label="Tanggal Operasi"
                              placeholder="Pilih tanggal operasi"
                              rules={{ required: "Tanggal harus diisi" }}
                              control={methods.control}
                              onDateChange={(date) =>
                                handleDateChangeOperasi(date)
                              } // Perbarui state jadwal operasi
                            />
                          </Col>
                          <Col lg="8">
                            <SearchableSelectField
                              name="ruangOperasi.select"
                              label="Ruang Operasi"
                              options={ruangOperasi}
                              placeholder="Pilih ruang operasi"
                              className="mb-3"
                              onChange={(selectedOption) =>
                                handleSearchOperasi(
                                  "ruangan",
                                  selectedOption?.value || ""
                                )
                              }
                            />
                          </Col>
                        </Row>
                        <DataTable
                          headers={headerOperasi}
                          data={membersOperasi}
                          rowsPerPage={20}
                          customActions={[
                            {
                              label: "Booking Operasi",
                              onClick: (row) => {
                                setSelectedRuangOperasi(row.ruangan);
                                setSelectedWaktuOperasi(row.jamMulai);
                                setSelectedEstimasiOperasi(row.estimasi);
                                setSelectedDokterOperasi(row.dokterOperator);
                                setSelectedTindakanOperasi(row.tindakan);
                              },
                              className: "iq-bg-success",
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </>
                )}
              </Row>
            </Col>
          )}
        </Row>
      </Form>
    </FormProvider>
  );
});

AddPerjanjianForm.displayName = "AddPerjanjianForm";
export default AddPerjanjianForm;
