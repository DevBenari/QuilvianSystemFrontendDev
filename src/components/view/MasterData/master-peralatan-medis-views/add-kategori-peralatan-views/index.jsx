'use client'
import DynamicForm from '@/components/features/dynamicForm/dynamicForm';
import React, {Fragment, memo} from 'react'
import { useForm } from 'react-hook-form';
const FormAddKategoriPeralatanMedis = memo(() => {
    // const { setValue } = useForm();

    const formFields = 
    [
        {
            fields: 
            [
                {
                    type:"text",
                    id: "kategoriName",
                    name: "kategoriName",
                    label: "Kategori Name",
                    placeholder: "Kategori Name",
                    rules: { required: "Kategori Name is required" },
                    colSize:6
                },
                {
                    type:"select",
                    id: "coaIncomeInPatient",
                    label: "COA Income In Patient",
                    name: "coaIncomeInPatient",
                    options: [
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        
                    ],
                    placeholder: "COA Income In Patient",
                    rules: { required: "COA Income In Patient is required" },
                    colSize: 6,
                },
                {
                    type: "select",
                    id: "coaIncomeOutPatient",
                    label: "COA Income Out Patient",
                    name: "coaIncomeOutPatient",
                    options: [
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                    ],
                    placeholder: "COA Income Out Patient",
                    rules: { required: "COA Income Out Patient is required" },
                    colSize: 6,
                },
                {
                    type:"text",
                    id: "coaCostInPatient",
                    label: "COA Cost In Patient",
                    name: "coaCostInPatient",
                    options: [
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                    ],
                    placeholder: "COA Cost In Patient",
                    rules: { required: "COA Cost In Patient is required" },
                    colSize: 6,
                },
                {
                    type:"select",
                    id: "coaCostOutPatient",
                    label: "COA Cost Out Patient",
                    name: "coaCostOutPatient",
                    options: [
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                    ],
                    placeholder: "COA Cost Out Patient",
                    rules: { required: "COA Cost Out Patient is required" },
                    colSize: 6,
                },
                {
                    type:"select",
                    id: "coaProvision",
                    label: "COA Provision",
                    name: "coaProvision",
                    options: [
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                    ],
                    placeholder: "COA Provision",
                    rules: { required: "COA Provision is required" },
                    colSize: 6,
                },
                {
                    type:"select",
                    id:"coaJpInPatient",
                    label: "COA JP In Patient",
                    name: "coaJpInPatient",
                    options: [
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                    ],
                    placeholder: "COA JP In Patient",
                    rules: { required: "COA JP In Patient is required" },
                    colSize: 6,
                },
                {
                    type:"select",
                    id:"coaJpOutPatient",
                    label: "COA JP Out Patient",
                    name: "coaJpOutPatient",
                    options: [
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                    ],
                    placeholder: "COA JP Out Patient",
                    rules: { required: "COA JP Out Patient is required" },
                    colSize: 6,
                },
                {
                    type:"select",
                    id:"coaBhpInPatient",
                    label: "COA BHP In Patient",
                    name:"coaBhpInPatient",
                    options: [
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                    ],
                    placeholder:"COA BHP In Patient",
                    rules:{required:"COA BHP In Patient is required"},
                    colSize:6,
                },
                {
                    type:"select",
                    id:"coaBhpOutPatient",
                    label: "COA BHP Out Patient",
                    name:"coaBhpOutPatient",
                    options: [
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                    ],
                    placeholder:"COA BHP Out Patient",
                    rules:{required:"COA BHP Out Patient is required"},
                    colSize:6,
                },
                {
                    type:"select",
                    id:"coaOtherInPatient",
                    label: "COA Other In Patient",
                    name:"coaOtherInPatient",
                    options: [
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                    ],
                    placeholder:"COA Other In Patient",
                    rules:{required:"COA Other In Patient is required"},
                    colSize:6, 
                },
                {
                    type:"select",
                    id:"coaOtherOutPatient",
                    label: "COA Other Out Patient",
                    name:"coaOtherOutPatient",
                    options: [
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                    ],
                    placeholder:"COA Other Out Patient",
                    rules:{required:"COA Other Out Patient is required"},
                    colSize:6,
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
                backPath={`/MasterData/master-peralatan-medis/kategori-peralatan-medis`}
            />
        </Fragment>
    )
})

FormAddKategoriPeralatanMedis.displayName = 'FormAddKategoriPeralatanMedis'
export default FormAddKategoriPeralatanMedis