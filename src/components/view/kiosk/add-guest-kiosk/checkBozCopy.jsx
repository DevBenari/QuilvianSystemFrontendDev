// 1. Buat komponen checkbox khusus untuk digunakan di antara alamat
// components/ui/address-copy-checkbox.jsx
'use client'
import React from 'react';
import { Form } from 'react-bootstrap';

const AddressCopyCheckbox = ({ onChange }) => {
  return (
    <Form.Check
      type="checkbox"
      id="copyAddressCheckbox"
      label="Alamat domisili sama dengan alamat identitas"
      onChange={onChange}
      className="mb-2"
    />
  );
};

export default AddressCopyCheckbox;

// 2. Modifikasi formFields di KioskPendaftaranPasien.jsx untuk menambahkan custom field checkbox
// Tambahkan field ini setelah field alamatIdentitas dan sebelum alamatDomisili


// 3. Alternatif implementasi tanpa membuat komponen custom baru
// Tambahkan field ini ke formFields setelah alamatIdentitas dan sebelum alamatDomisili
