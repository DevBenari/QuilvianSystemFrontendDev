'use client';
import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import DynamicForm from '@/components/features/dynamic-form/dynamicForm/dynamicForm';
import { extractIdFromSlug } from '@/utils/slug';
import { dataPasienRadiologi } from '@/utils/dataPerjanjian';

const EditKategoriPeralatanMedis = ({params}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(dataPasienRadiologi);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for slug:', params.slug);
        const id = extractIdFromSlug(params.slug);
        console.log('Extracted ID:', id);
    
        const user = dataPasienRadiologi.find((u) => u.id === parseInt(id, 10));
        console.log('Found User:', user);
    
        if (!user) {
          throw new Error('User not found');
        }
    
        setUserData(user);
      } catch (error) {
          console.error('Error fetching user:', error);
          router.push('/404');
      } finally {
          setIsLoading(false);
      }
    };
    
    fetchData();
  }, [params.slug, router]);
      
  const handleSubmit = async (data) => {
    console.log("data", data);
  };

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
                  className: "mt-3"
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
                  className: "mt-3"
              },

          ]
      }
  ]

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

  if (!userData) {
    return (
      <div className="iq-card">
        <div className="card-body">
          <div className="alert alert-danger">
            User not found or error loading data
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DynamicForm
          title="Edit Kategori Peralatan Medis"
          formConfig={formFields.map((section) => ({
            ...section,
            fields: section.fields.map((field) => ({
            ...field,
            value: userData[field.name] || "", // Data dari userData sesuai dengan key di name
            })),
          }))} 
          onSubmit={handleSubmit}
          backPath={`/MasterData/master-peralatan-medis/kategori-peralatan-medis`}
          isAddMode={false}
        />
    </div>
  )
}

export default EditKategoriPeralatanMedis