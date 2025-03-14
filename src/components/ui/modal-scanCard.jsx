import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
// import { Camera, CreditCard, X } from 'react-feather';
import { InstanceAxios } from "@/lib/axiosInstance/InstanceAxios";
import { getHeaders } from "@/lib/headers/headers";

const CardScannerModal = ({ show, onHide, onScanComplete }) => {
  const [scanMode, setScanMode] = useState('card'); // 'card' or 'nik'
  const [manualInput, setManualInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [scanError, setScanError] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  
  // Function to check if patient exists in the database
  const checkPatientExists = async (identifier) => {
    setIsSearching(true);
    setSearchMessage('Mencari data pasien...');
    
    try {
      // Determine search parameter based on scan mode
      const searchParam = scanMode === 'card' ? 'noRekamMedis' : 'noIdentitas';
      
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
    if (!manualInput || manualInput.length !== 16) {
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
  
  // Enhanced scan function that checks API
  const handleScan = async () => {
    setIsScanning(true);
    setScanError('');
    
    try {
      // Simulate reading from physical scanner
      // In a real implementation, this would read data from the scanner hardware
      
      // For demonstration, we'll simulate different scenarios
      const mockScanData = scanMode === 'card' 
        ? 'RM-' + Math.floor(Math.random() * 1000000)  // Simulated card scan
        : '3174' + Math.floor(Math.random() * 1000000000000);  // Simulated NIK scan
      
      // In a real implementation, you'd get this value from the actual scanner
      console.log(`Scanner read ${scanMode === 'card' ? 'card' : 'NIK'} value:`, mockScanData);
      
      // Now check if this patient exists
      const patientData = await checkPatientExists(mockScanData);
      
      if (patientData) {
        // Patient found in database, return their data
        console.log('Found existing patient:', patientData);
        onScanComplete(patientData);
      } else {
        // Patient not found, create basic data structure for new patient
        const newPatientData = scanMode === 'card' 
          ? { noRekamMedis: mockScanData } 
          : { noIdentitas: mockScanData };
        
        console.log('Creating new patient with data:', newPatientData);
        onScanComplete(newPatientData);
      }
      
      onHide();
    } catch (error) {
      console.error('Error during scan process:', error);
      setScanError('Gagal memindai: ' + error.message);
    } finally {
      setIsScanning(false);
    }
  };

  const handleManualInputChange = (e) => {
    // Only allow digits and limit to 16 characters for NIK
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    setManualInput(value);
  };
  
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>Scan Kartu Pasien</Modal.Title>
        <Button variant="light" onClick={onHide} className="border-0">
          {/* <X size={20} /> */} X
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>Metode Scan</Form.Label>
            <div className="d-flex gap-3">
              <Button 
                variant={scanMode === 'card' ? 'primary' : 'outline-primary'} 
                onClick={() => setScanMode('card')}
                className="d-flex align-items-center gap-2 w-50"
              >
                {/* <CreditCard size={18} /> */}
                <span>Kartu Pasien</span>
              </Button>
              <Button 
                variant={scanMode === 'noIdentitas' ? 'primary' : 'outline-primary'} 
                onClick={() => setScanMode('noIdentitas')}
                className="d-flex align-items-center gap-2 w-50"
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
          
          {scanMode === 'noIdentitas' && (
            <Form.Group className="mb-3">
              <Form.Label>Input NIK Manual</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control 
                  type="text" 
                  placeholder="Masukkan 16 Digit NIK" 
                  value={manualInput}
                  onChange={handleManualInputChange}
                  maxLength={16}
                />
                <Button 
                  variant="outline-primary" 
                  onClick={handleManualSearch}
                  disabled={manualInput.length !== 16 || isSearching}
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
          
          {searchMessage && (
            <Alert variant={searchMessage.includes('ditemukan') ? 'success' : 'info'} className="my-2">
              {searchMessage}
            </Alert>
          )}
          
          <div className="scan-area border rounded p-3 text-center my-4" style={{ height: '180px' }}>
            {isScanning ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Sedang memindai {scanMode === 'card' ? 'kartu pasien' : 'E-KTP'}...</p>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center h-100">
                {/* <Camera size={48} className="text-muted mb-3" /> */}
                <p>Letakkan {scanMode === 'card' ? 'kartu pasien' : 'E-KTP'} di scanner</p>
                <small className="text-muted mt-2">
                  Sistem akan mencari data pasien secara otomatis
                </small>
              </div>
            )}
          </div>
          
          {scanError && (
            <div className="alert alert-danger">{scanError}</div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isScanning}>
          Batal
        </Button>
        <Button variant="primary" onClick={handleScan} disabled={isScanning}>
          {isScanning ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Memindai...
            </>
          ) : (
            'Mulai Scan'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardScannerModal;