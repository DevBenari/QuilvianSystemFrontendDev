import React, { useState, useRef, useEffect } from "react";
import { Form, Image, Button, Modal } from "react-bootstrap";
import { Upload } from "react-bootstrap-icons";
import { Controller } from "react-hook-form";

const UploadPhotoField = ({ field, commonProps, methods }) => {
  const { control, formState: { errors }, setValue, watch } = methods;
  const [imagePreview, setImagePreview] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [hasWebcamPermission, setHasWebcamPermission] = useState(true);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  
  // Mendapatkan nilai file saat ini jika ada
  const currentValue = watch(field.name);
  
  useEffect(() => {
    // Jika ada nilai awal dan itu berupa File atau Blob
    if (currentValue instanceof File || currentValue instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(currentValue);
    } 
    // Jika nilainya string URL, gunakan langsung
    else if (typeof currentValue === 'string' && currentValue) {
      setImagePreview(currentValue);
    }
  }, [currentValue]);

  // Fungsi untuk memulai webcam
  const startWebcam = async () => {
    try {
      // Minta izin akses kamera
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      
      // Pastikan modal webcam sudah terbuka sebelum mencoba mengakses videoRef
      setShowWebcam(true);
      
      // Gunakan setTimeout untuk memastikan komponen video sudah dirender
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          
          // Tampilkan pesan log untuk debugging
          console.log('Webcam started successfully');
        } else {
          console.error('Video element not found');
          stopWebcam();
        }
      }, 300);

      setHasWebcamPermission(true);
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setHasWebcamPermission(false);
      alert("Tidak dapat mengakses kamera. Pastikan browser diizinkan untuk mengakses kamera.");
      setShowWebcam(false);
    }
  };

  // Fungsi untuk menutup webcam
  const stopWebcam = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowWebcam(false);
  };

  // Cleanup ketika komponen unmount
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  // Fungsi untuk mengambil foto dari webcam
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Pastikan video sudah siap
      if (video.readyState !== 4) {
        console.error('Video not ready yet');
        return;
      }
      
      const context = canvas.getContext('2d');
      
      // Mengatur ukuran canvas sesuai dengan video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      if (canvas.width === 0 || canvas.height === 0) {
        console.error('Invalid canvas dimensions', canvas.width, canvas.height);
        return;
      }
      
      try {
        // Menggambar frame video ke canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Mengkonversi canvas ke blob
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error('Failed to create blob from canvas');
            return;
          }
          
          // Membuat file dari blob
          const file = new File([blob], "webcam-photo.png", { type: "image/png" });
          
          // Set value pada react-hook-form
          setValue(field.name, file, { shouldValidate: true });
          
          // Tampilkan preview gambar
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(blob);
          
          // Tutup webcam
          stopWebcam();
        }, 'image/png');
      } catch (err) {
        console.error('Error capturing photo:', err);
      }
    } else {
      console.error('Video or canvas ref not available');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validasi tipe dan ukuran file
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      alert('Hanya file JPG, JPEG, dan PNG yang diperbolehkan');
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      alert('Ukuran file maksimal 2MB');
      return;
    }
    
    // Set value pada react-hook-form
    setValue(field.name, file, { shouldValidate: true });
    
    // Tampilkan preview gambar
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setValue(field.name, null, { shouldValidate: true });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input file
    }
  };

  return (
    <Form.Group className="mb-3">
      {field.label && <Form.Label className='m-2'>{field.label}</Form.Label>}
      <Controller
        name={field.name}
        control={control}
        rules={field.rules}
        render={({ field: { ref, ...restField } }) => (
          <>
            <div className="d-flex gap-2 mb-2">
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="form-control"
                disabled={field.disabled}
              />
              
              <Button 
                variant="secondary" 
                onClick={startWebcam}
                disabled={field.disabled}
              >
                Kamera
              </Button>
            </div>
            
            {/* Preview Gambar */}
            {imagePreview && (
              <div className="mt-2 d-flex flex-column align-items-start">
                <Image 
                  src={imagePreview} 
                  alt="Preview" 
                  width={100} 
                  height={100} 
                  style={{ objectFit: 'cover' }} 
                />
                {!field.disabled && (
                  <button 
                    type="button" 
                    className="btn btn-sm btn-danger mt-1"
                    onClick={handleRemoveImage}
                  >
                    Hapus Foto
                  </button>
                )}
              </div>
            )}
            
            {/* Modal Webcam */}
            <Modal 
              show={showWebcam} 
              onHide={stopWebcam} 
              centered
              onEntered={() => {
                console.log('Modal fully entered DOM');
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Ambil Foto dengan Kamera</Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column align-items-center">
                {hasWebcamPermission ? (
                  <>
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                      onLoadedMetadata={() => console.log('Video metadata loaded')}
                      onCanPlay={() => console.log('Video can play')}
                      onError={(e) => console.error('Video error:', e)}
                    />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                  </>
                ) : (
                  <div className="text-center p-4">
                    <div className="text-danger mb-2">Tidak dapat mengakses kamera</div>
                    <p>Pastikan browser Anda diizinkan untuk mengakses kamera dan refresh halaman.</p>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={stopWebcam}>
                  Batal
                </Button>
                {hasWebcamPermission && (
                  <Button variant="primary" onClick={capturePhoto}>
                    Ambil Foto
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          </>
        )}
      />
      
      {/* Tampilkan Error */}
      {errors[field.name] && (
        <div className="text-danger mt-1">
          {errors[field.name]?.message}
        </div>
      )}
    </Form.Group>
  );
};

export default UploadPhotoField;