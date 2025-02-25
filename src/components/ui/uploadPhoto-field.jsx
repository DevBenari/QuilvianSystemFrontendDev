'use client'

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Form, Image } from 'react-bootstrap';
import { useFormContext, Controller } from 'react-hook-form';

const UploadPhotoField = ({ label, name, rules }) => {
  const { control, formState: { errors }, setValue } = useFormContext();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // ✅ Validasi tipe dan ukuran file
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      alert('Hanya file JPG, JPEG, dan PNG yang diperbolehkan');
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      alert('Ukuran file maksimal 2MB');
      return;
    }

    console.log("File dipilih:", file); // ✅ Debugging: Pastikan file dipilih

    // ✅ Simpan File ke react-hook-form
    setValue(name, file);

    // ✅ Tampilkan preview gambar
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Form.Group className="mb-3">
      {label && <Form.Label className='m-2'>{label}</Form.Label>}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            {/* Preview Gambar */}
            {imagePreview && (
              <div className="mt-2">
                <Image src={imagePreview} alt="Preview" width="100px" height="100px" />
              </div>
            )}
          </>
        )}
      />

      {/* Tampilkan Error */}
      {errors[name] && (
        <Form.Control.Feedback type="invalid">
          {errors[name]?.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default UploadPhotoField;
