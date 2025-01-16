"use client"
import DynamicForm from "@/components/features/dynamicForm/dynamicForm";
import { type } from "@amcharts/amcharts5";
import React, {memo} from "react";
import { FormProvider, useForm } from "react-hook-form";
const AddPerjanjianPasien = memo(() => {
    // const {setValue} = useForm();
    const formFields = [
        {
            fields: [
                {
                    type: "text",
                    id: "namaPasien",
                    label: "Nama Pasien",
                    name: "namaPasien",
                    placeholder: "Nama Pasien",
                    rules: { required: "Nama Pasien is required" },
                    colSize: 6,
                },
                {
                    type: "text", 
                    id: "tempat lahir",
                    label: "Tempat Lahir",
                    name: "tempat lahir",
                    placeholder: "Tempat Lahir",
                    rules: { required: "Tempat Lahir is required" },
                    colSize: 6,
                },
                {
                    type: "date",
                    id: "tglLahir",
                    label: "Tanggal Lahir",
                    name: "tglLahir",
                    rules: { required: "Tanggal Lahir is required" },
                    colSize: 6,
                },
                {
                    type: "select",
                    id: "jenisKelamin",
                    label: "Jenis Kelamin",
                    name: "jenisKelamin",
                    placeholder: "Jenis Kelamin",
                    options: [
                        { label: "Laki-laki", value: "laki-laki" },
                        { label: "Perempuan", value: "perempuan" },
                    ],
                    rules: { required: "Jenis Kelamin is required" },
        
                    colSize: 6,
                },
                {
                    type: "textarea",
                    id: "alamatRumah",
                    label: "Alamat Rumah",
                    name: "alamatRumah",
                    placeholder: "Alamat Rumah",
                    rules: { required: "Alamat Rumah is required" },
                    colSize: 12,
                },
                {
                    type: "text",
                    id:"kantor",
                    label: "Kantor",
                    name: "kantor",
                    placeholder: "Kantor",
                    rules: { required: "Kantor is required" },
                    colSize: 6,
                },
                {
                    type: "text",
                    id: "noTelp",
                    label: "No. Telp",
                    name: "noTelp",
                    placeholder: "No. Telp",
                    rules: { required: "No. Telp is required" },
                    colSize: 6,
                }
            ],
        },
        {
            fields: [
                {
                    type: "select",
                    id: "penjamin",
                    label: "Tipe Pasien",
                    name: "penjamin",
                    placeholder: "Penjamin",
                    options: [
                        { label: "Umum", value: "umum" },
                        { label: "Penjamin", value: "penjamin" },
                    ],
                    rules: { required: "Penjamin is required" },
                    colSize: 8,
                },
                {
                    type: "select",
                    id: "tipepenjamin",
                    name: "tipePenjamin",
                    hide: (watchValues) => watchValues.penjamin !== "penjamin",
        
                    label: "Tipe penjamin",
                    placeholder: "Penjamin",
                    options: [
                        { label: "BPJS", value: "bpjs" },
                        { label: "Non BPJS", value: "non-bpjs" },
                    ],
                    rules: { required: "Penjamin is required" },
                    colSize: 6,
                },
                {
                    type: "date",
                    id: "tglRegistrasi",
                    label: "Tanggal Registrasi",
                    name: "tglRegistrasi",
                    rules: { required: "Tanggal Registrasi is required" },
                    colSize: 6,
                },
            ],
        }
    ]
    const handleSubmit = async (data) => {
            try {
            const response = await addPromo(data);
            alert("Promo added successfully!");
            router.push("/pendaftaran");
            } catch (error) {
            console.error(error);
            alert("Failed to add promo.");
            }
        };
    return (
        <div>
        <DynamicForm
            title="Registrasi Perjanjian Pasien"
            formConfig={formFields}
            onSubmit={handleSubmit}
            url="/perjanjian"
        />
    </div>
    )
})

AddPerjanjianPasien.displayName = "AddPerjanjianPasien"
export default AddPerjanjianPasien;