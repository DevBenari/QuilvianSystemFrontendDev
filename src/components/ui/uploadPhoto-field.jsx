'use client'

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Form, Image } from 'react-bootstrap';
import { useFormContext, Controller, set } from 'react-hook-form';


const UploadPhotoField = ({ label, name, rules, ...props }) => {
  const {control, formState: {errors}, setValue} = useFormContext();
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [image, setImage] = useState(null);

  const webcamRef = useRef(null);
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setValue(name, imageSrc);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setValue(name, reader.result); // Update react-hook-form value with the file
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Form.Group className="mb-3">
      {/* Label Input */}
      {label && <Form.Label className='m-2'>{label}</Form.Label>}

      {/* Controller for Uploading Photo */}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            {/* Toggle between Webcam and File Upload */}
            {!isWebcamActive ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  {...field} // Bind form field to input
                />
                <button className='btn btn-success' type="button" onClick={() => setIsWebcamActive(true)}>
                  Capture from Webcam
                </button>
              </>
            ) : (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width="100%"
                />
                <button className="btn btn-secondary" type="button" onClick={capturePhoto}>
                  Take Photo
                </button>
                <button className="btn btn-primary" type="button" onClick={() => setIsWebcamActive(false)}>
                  Upload via File
                </button>
              </>
            )}

            {/* Display the image preview */}
            {image && (
              <div className="image-preview">
                <Image src={image} alt="Preview" width="100%" />
              </div>
            )}
          </>
        )}
      />

      {/* Display Error Message */}
      {errors[name] && (
        <Form.Control.Feedback type="invalid">
          {errors[name]?.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  )
}

export default UploadPhotoField