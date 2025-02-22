"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
import TableEditSave from "@/components/features/edit-table/edit-table/table-edit-save-cancel";
import { extractIdFromSlug, extractIdFromSlugDummy } from "@/utils/slug";
import { administrasiRawatJalan } from "@/utils/masterData";
import { FormProvider, useForm } from "react-hook-form";

const RawatJalanEdit = ({ params }) => {
  const router = useRouter();
  const methods = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const id = extractIdFromSlugDummy(params.slug);
    const data = administrasiRawatJalan.find(
      (item) => item.id === parseInt(id, 10)
    );
    setSelectedData(data || null);
    setIsLoading(false);
  }, [params.slug]);

  const handleTableChange = (tableId, updatedData) => {
    methods.setValue("tableData", updatedData);
  };

  const handleSubmit = async (formData) => {
    const tableData = methods.getValues("tableData");
    const payload = {
      formData,
      tableData,
    };

    console.log("Data yang dikirim:", payload);
  };

  const formFields = [
    {
      section: "Detail Data Administrasi",
      fields: [
        {
          type: "text",
          id: "namaAdministrasi",
          label: "Nama Administrasi",
          name: "namaAdministrasi",
          placeholder: "Masukkan nama administrasi",

          rules: { required: "Nama administrasi wajib diisi" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipeAdministrasi",
          label: "Tipe Administrasi",
          name: "tipeAdministrasi",
          options: [
            { label: "All", value: "all" },
            { label: "Pasien Baru", value: "pasienBaru" },
            { label: "Pasien Lama", value: "pasienLama" },
            { label: "Pasien OTC", value: "pasienOTC" },
          ],

          placeholder: "Pilih tipe administrasi",
          rules: { required: "Tipe administrasi wajib dipilih" },
          colSize: 6,
        },
        {
          type: "select",
          id: "tipeRawat",
          label: "Tipe Rawat",
          name: "tipeRawat",
          options: [
            { label: "All", value: "all" },
            { label: "Rawat Jalan", value: "rawatJalan" },
            { label: "Rawat Inap", value: "rawatInap" },
          ],

          placeholder: "Pilih tipe rawat",
          rules: { required: "Tipe rawat wajib dipilih" },
          colSize: 6,
        },
        {
          type: "select",
          id: "berlaku",
          label: "Berlaku",
          name: "berlaku",
          options: [
            { label: "All", value: "all" },
            { label: "Dewasa", value: "dewasa" },
            { label: "Bayi", value: "bayi" },
          ],

          placeholder: "Pilih status berlaku",
          rules: { required: "Status berlaku wajib dipilih" },
          colSize: 6,
        },
      ],
    },
    {
      section: "Kode C.O.A",
      fields: [
        {
          type: "text",
          id: "kodeCOARawatJalan",
          label: "Kode C.O.A Rawat Jalan",
          name: "kodeCOARawatJalan",
          placeholder: "Masukkan kode C.O.A untuk rawat jalan",

          colSize: 6,
        },
        {
          type: "text",
          id: "kodeCOARawatInap",
          label: "Kode C.O.A Rawat Inap",
          name: "kodeCOARawatInap",
          placeholder: "Masukkan kode C.O.A untuk rawat inap",

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
              title="Data Rawat Jalan"
              columns={ColumnRawatJalan}
              defaultData={selectedData?.dataTarif || []}
              onChange={handleTableChange}
              itemsPerPage={5}
            />
          ),
          colSize: 12,
        },
      ],
    },
  ];

  const ColumnRawatJalan = [
    {
      headerName: "Group Perusahaan",
      field: "groupPerusahaan",
      isEditable: false,
    },
    { headerName: "Tarif", field: "tarif", isEditable: true },
    { headerName: "skb", field: "skb", isEditable: true },
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

  if (!selectedData) {
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
          backPath={`/MasterData/master-administrasi/administrasi/tables-administrasi`}
          isAddMode={false}
        />
      </Fragment>
    </FormProvider>
  );
};

export default RawatJalanEdit;
