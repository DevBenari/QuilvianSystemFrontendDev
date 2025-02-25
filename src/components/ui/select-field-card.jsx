'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import SelectField from '@/components/ui/select-field';

const DokterSelector = ({ onSelectDoctor }) => {
  const methods = useForm();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = useMemo(() => [
    { 
      id: 1, 
      name: 'dr. Anita Wijaya, Sp.PD', 
      specialty: 'Spesialis Penyakit Dalam', 
      hospital: 'RS Medika Sejahtera',
      experience: '10 tahun',
      education: 'Universitas Indonesia',
      photo: '/images/jamal.jpg'
    },
    { 
      id: 2, 
      name: 'dr. Budi Santoso, Sp.A', 
      specialty: 'Spesialis Anak', 
      hospital: 'RSUD Kota Bahagia',
      experience: '8 tahun',
      education: 'Universitas Gadjah Mada',
      photo: '/api/placeholder/150/150'
    },
    { 
      id: 3, 
      name: 'dr. Citra Dewi, Sp.OG', 
      specialty: 'Spesialis Obstetri & Ginekologi', 
      hospital: 'RS Harapan Ibu',
      experience: '12 tahun',
      education: 'Universitas Airlangga',
      photo: '/api/placeholder/150/150'
    }
  ], []);
  
  const doctorOptions = useMemo(
    () => doctors.map(doctor => ({ label: `${doctor.name} - ${doctor.specialty}`, value: doctor.id })), 
    [doctors]
  );
  
  const handleDoctorSelect = useCallback((selected) => {
    const doctor = doctors.find(doc => doc.id === selected?.value) || null;
    setSelectedDoctor(doctor);
    if (onSelectDoctor) {
      onSelectDoctor(doctor); // Kirim data dokter ke PendaftaranLayananPoliPage
    }
  }, [onSelectDoctor, doctors]);

  return (
    <FormProvider {...methods}>
      <div className="mb-6">
        <SelectField
          name="dokter"
          label="Dokter:"
          options={doctorOptions}
          placeholder="Pilih dokter..."
          onChange={handleDoctorSelect}
        />
      </div>
    </FormProvider>
  );
};

export default DokterSelector;
