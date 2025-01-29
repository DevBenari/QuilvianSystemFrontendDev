"use client";

import React, {Fragment,memo, useEffect} from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { useForm } from "react-hook-form";
import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";
const FormAddPeralatanMedis = memo(() => {
    const router = useRouter();
    const { setValue } = useForm();
    
    const formFields = [
        {
            fields:
            [
                {
                    type: "text",
                    id: "kodePeralatan",
                    label: "Kode Peralatan",
                    name: "kodePeralatan",
                    placeholder: "Kode Peralatan",
                    rules: { required: "Kode Peralatan is required" },
                    colSize: 6,
                },
                {
                    type:"text",
                    id: "namaPeralatan",
                    label: "Nama Peralatan",
                    name: "namaPeralatan",
                    placeholder: "Nama Peralatan",
                    rules: { required: "Nama Peralatan is required" },
                    colSize: 6,
                },
                {
                    type: "select",
                    id: "dibutuhkanDokter",
                    label: "Dibutuhkan Dokter",
                    name: "dibutuhkanDokter",
                    options: [
                        { value: "Ya", label: "Ya" },
                        { value: "Tidak", label: "Tidak" },
                    ],
                    placeholder: "Pilih Dibutuhkan Dokter",
                    rules: { required: "Dibutuhkan Dokter is required" },
                    colSize: 6,
                },
                {
                    type: "select",
                    id: "oksigen",
                    label: "Oksigen",
                    name: "oksigen",
                    options: [
                        { value: "Ya", label: "Ya" },
                        { value: "Tidak", label: "Tidak" },
                    ],
                    placeholder: "Pilih Oksigen",
                    rules: { required: "Oksigen is required" },
                    colSize: 6,
                },
                {
                    type:"text",
                    id: "satuanPakai",
                    label: "Satuan Pakai",
                    name: "satuanPakai",
                    placeholder: "Satuan Pakai",
                    rules: { required: "Satuan Pakai is required" },
                    colSize: 6,
                },
                {
                    type: "radio",
                    id: "grossDokter",
                    label: "Hitung Gross Jasa Dokter",
                    name: "grossDokter",
                    options: [
                        { value: "Ya", label: "Ya" },
                        { value: "Tidak", label: "Tidak" },
                    ],
                    placeholder: "Pilih Hitung Gross Jasa Dokter",
                    rules: { required: "Hitung Gross Jasa Dokter is required" },
                    colSize: 6,
                    className:"mt-3",
                },
                {
                    type: "radio",
                    id:"alatDibawa",
                    label: "Alat Dibawa Dokter",
                    name: "alatDibawa",
                    options: [
                        { value: "Ya", label: "Ya" },
                        { value: "Tidak", label: "Tidak" },
                    ],
                    placeholder: "Pilih Alat Dibawa Dokter",
                    rules: { required: "Alat Dibawa Dokter is required" },
                    colSize: 6,
                    className:"mt-3",
                },
                {
                    type: "radio",
                    id:"status",
                    label: "Status",
                    name: "status",
                    options: [
                        { value: "aktif", label: "Aktif" },
                        { value: "tidakAktif", label: "Tidak Aktif" },
                    ],
                    placeholder: "Pilih Status",
                    rules: { required: "Status is required" },
                    colSize: 6,
                    className:"my-3",
                },
                {
                    type: "select",
                    id: "tindakanAutoDebit",
                    label: "Tindakan Auto Debit",
                    name: "tindakanAutoDebit",
                    options: [
                        { value: "a1Led", label: "A1 LED" },
                        { value: "abpm24", label: "ABPM 24 Jam" },
                        { value: "administrasiKhusus", label:"Administrasi Khusus"}
                    ],
                    placeholder: "Pilih Tindakan Auto Debit",
                    rules: { required: "Tindakan Auto Debit is required" },
                    colSize: 12,
                }
            ]
        },
        {
            section:"Deskripsi Peralatan Medis",
            fields: 
            [
                {
                    type: "select",
                    id:"kategoriPeralatan",
                    label: "Kategori Peralatan",
                    name: "kategoriPeralatan",
                    options: [
                        { value: "equipment", label: "Medical Equipment" },
                        { value: "diagnostik", label: "Diagnostik" },
                    ],
                    placeholder: "Pilih Kategori Peralatan",
                    rules: { required: "Kategori Peralatan is required" },
                    colSize: 12,
                },
                {
                    type:"text",
                    id: "coaIncomeInPatient",
                    label: "COA Income In Patient",
                    name: "coaIncomeInPatient",
                    placeholder: "COA Income In Patient",
                    rules: { required: "COA Income In Patient is required" },
                    colSize: 6,
                    disabled:true
                },
                {
                    type: "text",
                    id: "coaIncomeOutPatient",
                    label: "COA Income Out Patient",
                    name: "coaIncomeOutPatient",
                    placeholder: "COA Income Out Patient",
                    rules: { required: "COA Income Out Patient is required" },
                    colSize: 6,
                    disabled:true
                },
                {
                    type:"text",
                    id: "coaCostInPatient",
                    label: "COA Cost In Patient",
                    name: "coaCostInPatient",
                    placeholder: "COA Cost In Patient",
                    rules: { required: "COA Cost In Patient is required" },
                    colSize: 6,
                    disabled:true
                },
                {
                    type:"text",
                    id: "coaCostOutPatient",
                    label: "COA Cost Out Patient",
                    name: "coaCostOutPatient",
                    placeholder: "COA Cost Out Patient",
                    rules: { required: "COA Cost Out Patient is required" },
                    colSize: 6,
                    disabled:true
                },
                {
                    type:"text",
                    id: "coaProvision",
                    label: "COA Provision",
                    name: "coaProvision",
                    placeholder: "COA Provision",
                    rules: { required: "COA Provision is required" },
                    colSize: 6,
                    disabled:true
                },
                {
                    type:"text",
                    id:"coaJpInPatient",
                    label: "COA JP In Patient",
                    name: "coaJpInPatient",
                    placeholder: "COA JP In Patient",
                    rules: { required: "COA JP In Patient is required" },
                    colSize: 6,
                    disabled:true
                },
                {
                    type:"text",
                    id:"coaJpOutPatient",
                    label: "COA JP Out Patient",
                    name: "coaJpOutPatient",
                    placeholder: "COA JP Out Patient",
                    rules: { required: "COA JP Out Patient is required" },
                    colSize: 6,
                    disabled:true
                },
                {
                    type:"text",
                    id:"coaBhpInPatient",
                    label: "COA BHP In Patient",
                    name:"coaBhpInPatient",
                    placeholder:"COA BHP In Patient",
                    rules:{required:"COA BHP In Patient is required"},
                    colSize:6,
                    disabled:true
                },
                {
                    type:"text",
                    id:"coaBhpOutPatient",
                    label: "COA BHP Out Patient",
                    name:"coaBhpOutPatient",
                    placeholder:"COA BHP Out Patient",
                    rules:{required:"COA BHP Out Patient is required"},
                    colSize:6,
                    disabled:true
                },
                {
                    type:"text",
                    id:"coaOtherInPatient",
                    label: "COA Other In Patient",
                    name:"coaOtherInPatient",
                    placeholder:"COA Other In Patient",
                    rules:{required:"COA Other In Patient is required"},
                    colSize:6, 
                    disabled:true
                },
                {
                    type:"text",
                    id:"coaOtherOutPatient",
                    label: "COA Other Out Patient",
                    name:"coaOtherOutPatient",
                    placeholder:"COA Other Out Patient",
                    rules:{required:"COA Other Out Patient is required"},
                    colSize:6,
                    disabled:true
                },
                
            ]
        }
    ]
    
    const handleSubmit = (data) => {
        console.log("Form Data:", data);
      };

    return (
        <Fragment>
            <DynamicForm
                title="Form Penambahan Data Peralatan Medis"
                formConfig={formFields}
                onSubmit={handleSubmit}
                backPath={`/MasterData/master-peralatan-medis/list-peralatan-medis`}
                isAddMode={true}
            />
        </Fragment>
    )
})

FormAddPeralatanMedis.displayName = 'FormAddPeralatanMedis'
export default FormAddPeralatanMedis