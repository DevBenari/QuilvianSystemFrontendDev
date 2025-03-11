import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Form, Button, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';
import { fetchPasienSlices } from '@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice';
import ButtonNav from '@/components/ui/button-navigation';
/**
 * Komponen untuk screening pasien menggunakan kartu NFC atau input manual
 * @param {Object} props
 * @param {Function} props.onPatientFound - Callback ketika pasien ditemukan
 * @param {Function} props.onError - Callback ketika terjadi error
 */
const KioskScreeningCard = ({ onPatientFound, onError }) => {
  const dispatch = useDispatch();
  
  // State untuk tracking input, loading, dan error
  const [screeningMethod, setScreeningMethod] = useState('nfc'); // 'nfc', 'noRm', 'nik'
  const [formData, setFormData] = useState({
    nfcId: '',
    noRm: '',
    nik: ''
  });
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scanCount, setScanCount] = useState(0);
  const [nfcSupported, setNfcSupported] = useState(null);

  // Fungsi untuk mengubah input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fungsi untuk memulai scan NFC
  const startNfcScan = async () => {
    // Reset state
    setIsScanning(true);
    setError(null);
    setScanCount(prev => prev + 1);
    
    // Cek apakah NFC API tersedia di browser
    if (!('NDEFReader' in window)) {
      setNfcSupported(false);
      setError("Browser Anda tidak mendukung teknologi NFC. Silakan gunakan opsi input manual.");
      setIsScanning(false);
      return;
    }
    
    setNfcSupported(true);
    
    try {
      // Memulai scan NFC
      const ndef = new window.NDEFReader();
      await ndef.scan();
      
      console.log("Scan started successfully.");
      
      ndef.onreading = ({ message, serialNumber }) => {
        console.log("NFC tag read successfully!");
        console.log("Serial Number:", serialNumber);
        
        // Menggunakan serial number sebagai nfcId
        setFormData(prev => ({
          ...prev,
          nfcId: serialNumber
        }));
        
        // Kirim data ke server setelah berhasil mendapatkan NFC tag
        processScreening({
          nfcId: serialNumber
        });
        
        setIsScanning(false);
      };
      
      ndef.onreadingerror = (error) => {
        console.error("Error reading NFC:", error);
        setError("Terjadi kesalahan saat membaca kartu NFC. Silakan coba lagi atau gunakan opsi input manual.");
        setIsScanning(false);
      };
      
    } catch (error) {
      console.error("Error starting NFC scan:", error);
      setError("Tidak dapat memulai pemindaian NFC. Pastikan NFC sudah diaktifkan pada perangkat Anda. Atau, gunakan opsi input manual.");
      setIsScanning(false);
    }
  };
  
  // Fungsi untuk berhenti scan NFC
  const stopNfcScan = () => {
    setIsScanning(false);
  };
  
  // Proses screening dengan data yang sudah didapatkan
  const processScreening = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      // Format data untuk API
      const screeningData = {};
      
      if (data.nfcId) {
        screeningData.cardId = data.nfcId;
      } else if (formData.noRm) {
        screeningData.noRm = formData.noRm;
      } else if (formData.nik) {
        screeningData.nik = formData.nik;
      }
      
      // Dispatch action untuk mencari data pasien
      const result = await dispatch(fetchPasien(screeningData));
      
      if (result.payload) {
        // Berhasil mendapatkan data pasien
        if (typeof onPatientFound === 'function') {
          onPatientFound(result.payload);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error during screening:", error);
      setError(error.message || "Terjadi kesalahan saat melakukan screening");
      setLoading(false);
      
      if (typeof onError === 'function') {
        onError(error);
      }
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi input
    if (screeningMethod === 'noRm' && !formData.noRm) {
      setError("Silakan masukkan Nomor RM pasien");
      return;
    }
    
    if (screeningMethod === 'nik' && !formData.nik) {
      setError("Silakan masukkan NIK pasien");
      return;
    }
    
    // Proses screening berdasarkan metode yang dipilih
    processScreening(formData);
  };
  
  // Memulai scan NFC ketika komponen di-mount dan metode screening adalah NFC
  useEffect(() => {
    if (screeningMethod === 'nfc' && scanCount === 0) {
      startNfcScan();
    }
  }, [screeningMethod, scanCount]);
  
  return (
    <Card className="shadow-lg border-0 mb-4">
      <Card.Header className="bg-primary text-white py-3 d-flex justify-content-between">
        <div>
            <h4 className="mb-0">Screening Kartu Pasien</h4>
        </div>
        <div>
            <ButtonNav path="/kiosk" className='btn btn-sm iq-bg-info' label="Kembali" icon="ri-arrow-left-line" />
        </div>

      </Card.Header>
      <Card.Body className="p-4">
        <Tabs
          activeKey={screeningMethod}
          onSelect={(k) => setScreeningMethod(k)}
          className="mb-4"
        >
          <Tab eventKey="nfc" title="Scan Kartu NFC">
            <div className="py-3">
              <div className="text-center mb-4">
                <div className="d-inline-block p-4 rounded-circle bg-light mb-3">
                  <i className="bi bi-credit-card-2-front fs-1 text-primary"></i>
                </div>
                <h5>Scan Kartu Pasien</h5>
                <p className="text-muted">Tempelkan kartu pasien ke area NFC perangkat</p>
              </div>
              
              {isScanning ? (
                <div className="text-center">
                  <div className="d-flex justify-content-center mb-3">
                    <div className="spinner-grow text-primary" role="status">
                      <span className="visually-hidden">Scanning...</span>
                    </div>
                  </div>
                  <p>Menunggu kartu NFC...</p>
                  <Button 
                    variant="outline-secondary" 
                    onClick={stopNfcScan}
                    className="mt-2"
                  >
                    Batal Scan
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={startNfcScan}
                    disabled={loading}
                    className="px-4"
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Memproses...
                      </>
                    ) : (
                      'Mulai Scan Kartu'
                    )}
                  </Button>
                </div>
              )}
              
              {nfcSupported === false && (
                <Alert variant="warning" className="mt-3">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Browser Anda tidak mendukung teknologi NFC. Silakan gunakan opsi input manual.
                </Alert>
              )}
            </div>
          </Tab>
          
          <Tab eventKey="noRm" title="Nomor RM">
            <div className="py-3">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nomor Rekam Medis (RM)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Nomor RM"
                    name="noRm"
                    value={formData.noRm}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  <Form.Text className="text-muted">
                    Masukkan Nomor RM yang tertera pada kartu pasien
                  </Form.Text>
                </Form.Group>
                
                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Memproses...
                      </>
                    ) : (
                      'Proses Pencarian'
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Tab>
          
          <Tab eventKey="nik" title="NIK">
            <div className="py-3">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nomor Induk Kependudukan (NIK)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan NIK 16 digit"
                    name="nik"
                    value={formData.nik}
                    onChange={handleInputChange}
                    disabled={loading}
                    maxLength={16}
                  />
                  <Form.Text className="text-muted">
                    Masukkan 16 digit NIK yang tertera pada KTP
                  </Form.Text>
                </Form.Group>
                
                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Memproses...
                      </>
                    ) : (
                      'Proses Pencarian'
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Tab>
        </Tabs>
        
        {error && (
          <Alert variant="danger" className="mt-3">
            <i className="bi bi-exclamation-circle-fill me-2"></i>
            {error}
          </Alert>
        )}
        
        <div className="text-center mt-4">
          <p className="text-muted">
            <i className="bi bi-info-circle me-2"></i>
            Jika Anda belum memiliki kartu pasien atau mengalami kesulitan,
            silakan gunakan opsi pencarian dengan Nomor RM atau NIK.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default KioskScreeningCard;