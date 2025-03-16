import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

const CardScannerModal = ({ show, onHide, onScanComplete }) => {
  const [scanMode, setScanMode] = useState('card'); // 'card' or 'nik'
  const [manualInput, setManualInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [scanError, setScanError] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [fallbackMode, setFallbackMode] = useState(false); // For rekam medis fallback
  const [fallbackInput, setFallbackInput] = useState('');
  
  // Function to check if patient exists in the database
  const checkPatientExists = async (identifier, identifierType = scanMode) => {
    setIsSearching(true);
    setSearchMessage('Mencari data pasien...');
    setScanError('');
    
    try {
      // Determine search parameter based on scan mode
      const searchParam = identifierType === 'card' ? 'noRekamMedis' : 'noIdentitas';
      
      // Make API call to search for patient
      const response = await InstanceAxios.get('/PendaftaranPasienBaru/search', {
        params: { [searchParam]: identifier },
        headers: getHeaders(),
      });
      
      // Process response
      if (response.data && response.data.data) {
        setSearchMessage('Data pasien ditemukan!');
        return response.data.data;
      } else {
        setSearchMessage('Pasien belum terdaftar.');
        return null;
      }
    } catch (error) {
      console.error('Error searching for patient:', error);
      
      if (error.response?.status === 404) {
        setSearchMessage('Pasien belum terdaftar.');
        return null;
      }
      
      setSearchMessage('Terjadi kesalahan saat mencari data pasien.');
      setScanError('Gagal mencari data pasien: ' + (error.response?.data?.message || error.message));
      return null;
    } finally {
      setIsSearching(false);
    }
  };
  
  // Function to handle manual search by NIK
  const handleManualSearch = async () => {
    if (!manualInput || (scanMode === 'nik' && manualInput.length !== 16)) {
      setScanError('NIK harus terdiri dari 16 digit');
      return;
    }
    
    setScanError('');
    
    const patientData = await checkPatientExists(manualInput);
    
    if (patientData) {
      // Process and return the patient data
      onScanComplete(patientData);
      onHide();
    }
  };

  // Function to handle fallback search by Rekam Medis
  const handleFallbackSearch = async () => {
    if (!fallbackInput) {
      setScanError('Nomor Rekam Medis tidak boleh kosong');
      return;
    }
    
    setScanError('');
    
    const patientData = await checkPatientExists(fallbackInput, 'card');
    
    if (patientData) {
      // Process and return the patient data
      onScanComplete(patientData);
      onHide();
    }
  };
  
  // Enhanced scan function that checks API
  const handleScan = async () => {
    setIsScanning(true);
    setScanError('');
    
    try {
      // Here you would integrate with your actual card scanner hardware
      // For now, we'll mock the behavior to demonstrate the flow
      
      // Simulate a 2-second scanning process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate different scenarios (including potential errors)
      const scanSuccessful = Math.random() > 0.3; // 70% success rate
      
      if (!scanSuccessful) {
        // Simulate a scan error
        throw new Error('Gagal membaca kartu. Silakan coba lagi atau gunakan input manual.');
      }
      
      // Simulate a successful scan
      const scanData = scanMode === 'card' 
        ? 'RM-' + Math.floor(Math.random() * 1000000)  // Simulated card scan 
        : '3174' + Math.floor(Math.random() * 1000000000000);  // Simulated NIK scan
      
      console.log(`Scanner read ${scanMode === 'card' ? 'card' : 'NIK'} value:`, scanData);
      
      // Check if this patient exists
      const patientData = await checkPatientExists(scanData);
      
      if (patientData) {
        // Patient found in database, return their data
        console.log('Found existing patient:', patientData);
        onScanComplete(patientData);
        onHide();
      } else {
        // Patient not found, create basic data structure for new patient
        const newPatientData = scanMode === 'card' 
          ? { noRekamMedis: scanData } 
          : { noIdentitas: scanData };
        
        console.log('Creating new patient with data:', newPatientData);
        onScanComplete(newPatientData);
        onHide();
      }
    } catch (error) {
      console.error('Error during scan process:', error);
      setScanError('Gagal memindai: ' + error.message);
      setFallbackMode(true); // Enable fallback mode when scan fails
    } finally {
      setIsScanning(false);
    }
  };

  const handleManualInputChange = (e) => {
    // Only allow digits and limit to 16 characters for NIK
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    setManualInput(value);
  };
  
  const handleFallbackInputChange = (e) => {
    // Allow alphanumeric characters for rekam medis
    setFallbackInput(e.target.value);
  };

  const resetModal = () => {
    setScanError('');
    setSearchMessage('');
    setManualInput('');
    setFallbackInput('');
    setFallbackMode(false);
    setScanMode('card');
  };

  // Reset modal state when it opens
  useEffect(() => {
    if (show) {
      resetModal();
    }
  }, [show]);
  
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>Scan Kartu Pasien</Modal.Title>
        <Button variant="light" onClick={onHide} className="border-0">
          X
        </Button>
      </Modal.Header>
      <Modal.Body>
        {/* Display scan mode selector only if not in fallback mode */}
        {!fallbackMode && (
          <div className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>Metode Scan</Form.Label>
              <div className="d-flex gap-3">
                <Button 
                  variant={scanMode === 'card' ? 'primary' : 'outline-primary'} 
                  onClick={() => setScanMode('card')}
                  className="d-flex align-items-center gap-2 w-50"
                  disabled={isScanning || isSearching}
                >
                  <span>Kartu Pasien</span>
                </Button>
                <Button 
                  variant={scanMode === 'nik' ? 'primary' : 'outline-primary'} 
                  onClick={() => setScanMode('nik')}
                  className="d-flex align-items-center gap-2 w-50"
                  disabled={isScanning || isSearching}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <line x1="7" y1="9" x2="17" y2="9" />
                    <line x1="7" y1="13" x2="17" y2="13" />
                    <line x1="7" y1="17" x2="12" y2="17" />
                  </svg>
                  <span>E-KTP/NIK</span>
                </Button>
              </div>
            </Form.Group>
            
            {scanMode === 'nik' && (
              <Form.Group className="mb-3">
                <Form.Label>Input NIK Manual</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control 
                    type="text" 
                    placeholder="Masukkan 16 Digit NIK" 
                    value={manualInput}
                    onChange={handleManualInputChange}
                    maxLength={16}
                    disabled={isScanning || isSearching}
                  />
                  <Button 
                    variant="outline-primary" 
                    onClick={handleManualSearch}
                    disabled={manualInput.length !== 16 || isScanning || isSearching}
                  >
                    {isSearching ? (
                      <span className="d-flex align-items-center">
                        <Spinner animation="border" size="sm" className="me-2" />
                        Cari
                      </span>
                    ) : (
                      'Cari'
                    )}
                  </Button>
                </div>
                <Form.Text className="text-muted">
                  Masukkan NIK untuk mencari data pasien
                </Form.Text>
              </Form.Group>
            )}
          </div>
        )}

        {/* Fallback mode UI - appears after scan error */}
        {fallbackMode && (
          <Form.Group className="mb-3">
            <div className="alert alert-warning">
              <strong>Scanner tidak dapat membaca kartu!</strong> 
              <p>Silakan masukkan No. Rekam Medis pasien secara manual.</p>
            </div>
            <Form.Label>Input No. Rekam Medis</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control 
                type="text" 
                placeholder="Contoh: RM-123456" 
                value={fallbackInput}
                onChange={handleFallbackInputChange}
                disabled={isSearching}
              />
              <Button 
                variant="outline-primary" 
                onClick={handleFallbackSearch}
                disabled={!fallbackInput || isSearching}
              >
                {isSearching ? (
                  <span className="d-flex align-items-center">
                    <Spinner animation="border" size="sm" className="me-2" />
                    Cari
                  </span>
                ) : (
                  'Cari'
                )}
              </Button>
            </div>
            <Form.Text className="text-muted">
              Masukkan Nomor Rekam Medis untuk mencari data pasien
            </Form.Text>
            <div className="mt-3">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setFallbackMode(false)}
                disabled={isSearching}
              >
                Kembali ke Metode Scan
              </Button>
            </div>
          </Form.Group>
        )}
        
        {searchMessage && (
          <Alert variant={searchMessage.includes('ditemukan') ? 'success' : 'info'} className="my-2">
            {searchMessage}
          </Alert>
        )}
        
        {/* Scan area - only show if not in fallback mode */}
        {!fallbackMode && (
          <div className="scan-area border rounded p-3 text-center my-4" style={{ height: '180px' }}>
            {isScanning ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Sedang memindai {scanMode === 'card' ? 'kartu pasien' : 'E-KTP'}...</p>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="text-muted mb-3">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <p>Letakkan {scanMode === 'card' ? 'kartu pasien' : 'E-KTP'} di scanner</p>
                <small className="text-muted mt-2">
                  Sistem akan mencari data pasien secara otomatis
                </small>
              </div>
            )}
          </div>
        )}
        
        {scanError && (
          <div className="alert alert-danger">{scanError}</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isScanning || isSearching}>
          Batal
        </Button>
        {!fallbackMode && (
          <Button variant="primary" onClick={handleScan} disabled={isScanning || isSearching}>
            {isScanning ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Memindai...
              </>
            ) : (
              'Mulai Scan'
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CardScannerModal;