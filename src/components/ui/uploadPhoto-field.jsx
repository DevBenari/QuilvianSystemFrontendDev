import React, { useState, useRef, useEffect } from "react";
import { Form, Image, Button, Modal } from "react-bootstrap";
import { Controller } from "react-hook-form";

const UploadPhotoField = ({ field, commonProps, methods }) => {
  const { control, formState: { errors }, setValue, watch } = methods;
  const [imagePreview, setImagePreview] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [hasWebcamPermission, setHasWebcamPermission] = useState(true);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
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
          height: { ideal: 480 },
          facingMode: "user" // Gunakan kamera depan (selfie)
        } 
      });
      
      // Simpan stream untuk digunakan nanti
      streamRef.current = stream;
      
      // Buka modal webcam
      setShowWebcam(true);
      setIsWebcamReady(false);
      setHasWebcamPermission(true);
      
      console.log('Webcam permission granted');
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setHasWebcamPermission(false);
      alert("Tidak dapat mengakses kamera. Pastikan browser diizinkan untuk mengakses kamera.");
    }
  };

  // Setelah modal terbuka, pasang stream ke video element
  useEffect(() => {
    if (showWebcam && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      console.log('Stream attached to video element');
    }
  }, [showWebcam]);

  // Fungsi untuk menutup webcam
  const stopWebcam = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowWebcam(false);
    setIsWebcamReady(false);
  };

  // Cleanup ketika komponen unmount
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  // Handler untuk event video loaded
  const handleVideoReady = () => {
    console.log('Video is ready to play');
    setIsWebcamReady(true);
  };

  // Fungsi untuk mengambil foto dari webcam
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      console.error('Video or canvas ref not available');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Pastikan video sudah siap
    if (video.readyState !== 4) {
      console.error('Video not ready yet, readyState:', video.readyState);
      return;
    }
    
    try {
      // Mengatur ukuran canvas sesuai dengan video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      if (canvas.width === 0 || canvas.height === 0) {
        console.error('Invalid canvas dimensions', canvas.width, canvas.height);
        return;
      }
      
      const context = canvas.getContext('2d');
      
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
        
        console.log('Photo captured successfully');
      }, 'image/png', 0.9); // Kualitas 90%
    } catch (err) {
      console.error('Error capturing photo:', err);
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

  // Fungsi untuk switch kamera (jika perangkat memiliki kamera depan dan belakang)
  const switchCamera = async () => {
    // Cek apakah ada stream yang berjalan
    if (!streamRef.current) return;
    
    // Hentikan stream saat ini
    const tracks = streamRef.current.getTracks();
    tracks.forEach(track => track.stop());
    
    try {
      // Dapatkan facingMode saat ini
      const currentFacingMode = streamRef.current.getVideoTracks()[0].getSettings().facingMode;
      const newFacingMode = currentFacingMode === "user" ? "environment" : "user";
      
      // Minta akses ke kamera dengan facingMode baru
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: newFacingMode
        }
      });
      
      // Update stream reference
      streamRef.current = newStream;
      
      // Update video element
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      
      console.log(`Switched to ${newFacingMode} camera`);
    } catch (err) {
      console.error("Error switching camera:", err);
      alert("Tidak dapat mengganti kamera. Perangkat mungkin hanya memiliki satu kamera.");
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
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Ambil Foto dengan Kamera</Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column align-items-center">
                {hasWebcamPermission ? (
                  <>
                    <div className="position-relative w-100">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', backgroundColor: '#000' }}
                        onLoadedMetadata={() => console.log('Video metadata loaded')}
                        onCanPlay={handleVideoReady}
                        onError={(e) => console.error('Video error:', e)}
                      />
                      
                      {/* Indikator status kamera */} 
                      {!isWebcamReady && (
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    
                    {/* Tombol Switch Kamera (jika tersedia) */}
                    <Button 
                      variant="outline-secondary" 
                      onClick={switchCamera}
                      className="mt-2"
                    >
                      Switch Kamera
                    </Button>
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
                  <Button 
                    variant="primary" 
                    onClick={capturePhoto}
                    disabled={!isWebcamReady}
                  >
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