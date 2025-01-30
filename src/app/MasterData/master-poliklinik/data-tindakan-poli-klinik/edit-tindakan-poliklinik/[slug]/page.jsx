"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import TableEditSave from "@/components/features/custom-table/edit-table/table-edit-save-cancel";
import { extractIdFromSlug } from "@/utils/slug";
import { tarifPoliKlinik, tarifTindakan } from "@/utils/masterData";
import { FormProvider, useForm } from "react-hook-form";

const PoliEditPage = ({ params }) => {
  const router = useRouter();
  const methods = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTarif, setSelectedTarif] = useState(null);
  const [filteredTindakan, setFilteredTindakan] = useState(tarifTindakan);

  // Fungsi untuk menangani pengambilan data dari URL slug
  useEffect(() => {
    const id = extractIdFromSlug(params.slug); // Ekstrak ID dari slug
    const data = tarifPoliKlinik.find((item) => item.id === id);
    setSelectedTarif(data || null); // Simpan data yang ditemukan
    setIsLoading(false);
  }, [params.slug]);

  // Fungsi untuk menangani perubahan data di tabel
  const handleTableChange = (tableId, updatedData) => {
    methods.setValue("tableData", updatedData); // Simpan data tabel di form state
  };

  // Fungsi submit untuk mengirim data form dan tabel
  const handleSubmit = async (formData) => {
    const tableData = methods.getValues("tableData"); // Ambil data dari tabel
    const payload = {
      formData,
      tableData,
    };

    console.log("Data yang dikirim:", payload);
    // Tambahkan logika untuk mengirim data ke server di sini
  };

  const formFields = [
    {
      section: "Detail Tindakan",
      fields: [
        {
          type: "text",
          id: "kode",
          label: "Kode",
          name: "kode",
          placeholder: "Masukkan kode tindakan",
          value: selectedTarif?.kode || "",
          rules: { required: "Kode tindakan wajib diisi" },
          colSize: 6,
        },
        {
          type: "text",
          id: "namaTindakan",
          label: "Tindakan",
          name: "namaTindakan",
          placeholder: "Masukkan nama tindakan",
          value: selectedTarif?.namaTindakan || "",
          rules: { required: "Nama tindakan wajib diisi" },
          colSize: 6,
        },
        {
          type: "text",
          id: "tindakanDiTagihan",
          label: "Tindakan Ditagihkan",
          name: "tindakanDiTagihan",
          placeholder: "Masukkan tindakan ditagihkan",
          colSize: 6,
        },
        {
          type: "text",
          id: "medicalService",
          label: "Medical Service in Bill",
          name: "medicalService",
          placeholder: "Masukkan medical service",
          colSize: 6,
        },
        {
          type: "select",
          id: "butuhDokter",
          label: "Butuh Dokter",
          name: "butuhDokter",
          placeholder: "Pilih opsi",
          options: [
            { label: "Ya", value: "ya" },
            { label: "Tidak", value: "tidak" },
          ],
          colSize: 6,
        },
        {
          type: "select",
          id: "konsultasi",
          label: "Konsultasi",
          name: "konsultasi",
          options: [{ label: "Aktif Konsultasi", value: "aktifKonsultasi" }],
          colSize: 12,
        },
        {
          type: "select",
          id: "opsionalCheckbox",
          label: "Pengaturan Tindakan",
          name: "opsionalCheckbox",
          options: [
            {
              label: "Otomatis di-tagihkan sebagai tambahan tarif jasa dokter",
              value: "otomatisTagihan",
            },
            { label: "Ikut tarif jasa medis terkait", value: "ikutJasaMedis" },
            {
              label: "Ikut jasa sarana sesuai tipe tindakan",
              value: "ikutJasaSarana",
            },
          ],
          colSize: 12,
        },
        {
          type: "text",
          id: "jenisPenjamin",
          label: "Termasuk Penjamin",
          name: "jenisPenjamin",
          placeholder: "Masukkan penjamin",
          colSize: 6,
        },
      ],
    },
    {
      section: "Departemen Tindakan",
      fields: [
        {
          type: "select",
          id: "departemenTindakan",
          label: "Departemen",
          name: "departemenTindakan",
          placeholder: "Pilih Departemen",
          options: [
            { label: "Poli Obsgyn - Konsultasi", value: "obsgynKonsultasi" },
            { label: "Poli Mata - Konsultasi", value: "poliMataKonsultasi" },
            { label: "Poli Anak - Konsultasi", value: "poliAnakKonsultasi" },
            { label: "IGD - Konsultasi", value: "igdKonsultasi" },
            {
              label: "Fisioterapi - Konsultasi",
              value: "fisioterapiKonsultasi",
            },
          ],
          rules: { required: "Departemen wajib dipilih" },
          colSize: 6,
        },
      ],
    },
    {
      fields: [
        {
          type: "custom",
          label: "Tindakan Data Table",
          customRender: () => (
            <TableEditSave
              id="tarif_poliklinik"
              title="Tarif Tindakan"
              columns={ColumnTindakanPoliklinik}
              defaultData={filteredTindakan}
              onChange={handleTableChange}
              itemsPerPage={5}
              datafilter={tarifTindakan}
              setFilteredPatients={setFilteredTindakan}
            />
          ),
          colSize: 12,
        },
      ],
    },
  ];

  const ColumnTindakanPoliklinik = [
    { headerName: "Nama Kelas", field: "namaKelas", isEditable: false },
    { headerName: "Dokter", field: "dokter", isEditable: true },
    { headerName: "RS", field: "rs", isEditable: true },
    { headerName: "JP", field: "JP", isEditable: true },
    { headerName: "BPJS", field: "bpjs", isEditable: true },
    { headerName: "Other", field: "other", isEditable: true },
    { headerName: "Total", field: "total", isEditable: false },
    { headerName: "KSO", field: "kso", isEditable: false },
  ];

  if (isLoading) {
    return (
      <div className="iq-card">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedTarif) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-danger">
            Data tindakan tidak ditemukan.
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <Fragment>
        <DynamicForm
          title="Edit Data Tindakan"
          formConfig={formFields}
          onSubmit={handleSubmit}
          backPath={`/MasterData/master-poliklinik/data-tindakan-poli-klinik`}
          isAddMode={false}
        />
      </Fragment>
    </FormProvider>
  );
};

export default PoliEditPage;
