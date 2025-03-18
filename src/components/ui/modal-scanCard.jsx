"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';
import { fetchPasienWithFilters } from '@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice';

/**
 * Modal untuk scanner kartu pasien yang dapat digunakan di berbagai layanan pendaftaran
 * 
 * @param {Object} props
 * @param {boolean} props.show - Kontrol tampilan modal
 * @param {Function} props.onHide - Fungsi untuk menutup modal
 * @param {Function} props.onScanComplete - Callback yang menerima data pasien saat berhasil
 * @param {Function} props.onScanError - Callback untuk error handling
 */
const CardScannerModal = ({ show, onHide, onScanComplete, onScanError }) => {
  const dispatch = useDispatch();
  const websocketRef = useRef(null);
  
  const [scanningMethod, setScanningMethod] = useState('nfc');
  const [formData, setFormData] = useState({
    nfcId: '',
    noRm: '',
    noIdentitas: ''
  });
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deviceStatus, setDeviceStatus] = useState({
    connected: false,
    message: 'Perangkat ACS ACR122U belum diaktifkan.'
  });

  const processingCardRef = useRef(false);
  const connectionAttemptTimeoutRef = useRef(null);
  const cardPollingIntervalRef = useRef(null);
  
  // Fungsi untuk mengubah input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset error saat user mengetik
    if (error) setError(null);
  };

  const resetForm = () => {
    setFormData({
      nfcId: '',
      noRm: '',
      noIdentitas: ''
    });
    setError(null);
    setIsScanning(false);
    
    if (cardPollingIntervalRef.current) {
      clearInterval(cardPollingIntervalRef.current);
      cardPollingIntervalRef.current = null;
    }

    stopNfcScan();
  };

  const connectToNfcReader = () => {
    if (isScanning) return;
    
    setIsScanning(true);
    setError(null);

    setDeviceStatus({
      connected: false,
      message: 'Menghubungkan ke perangkat ACS ACR122U...'
    });
    
    const apiUrl = process.env.NEXT_PUBLIC_NFC_API_URL || '/api/nfc';

    if (connectionAttemptTimeoutRef.current) {
      clearTimeout(connectionAttemptTimeoutRef.current);
    }
    
    if (cardPollingIntervalRef.current) {
      clearInterval(cardPollingIntervalRef.current);
    }

    fetch(`${apiUrl}/status`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.connected) {
          console.log('ACS ACR122U connected:', data);
          setDeviceStatus({
            connected: true,
            message: `Perangkat ACS ACR122U terhubung. ${data.deviceInfo?.deviceName || ''} siap digunakan.`
          });
          
          startCardPolling(apiUrl);
        } else {
          throw new Error(data.message || 'Perangkat ACS ACR122U tidak terdeteksi.');
        }
      })
      .catch(error => {
        console.error('Error connecting to NFC device:', error);
        setDeviceStatus({
          connected: false,
          message: 'Perangkat ACS ACR122U tidak ditemukan atau tidak terhubung.'
        });
        setError('Tidak dapat terhubung ke perangkat NFC. Pastikan perangkat terhubung ke USB dan driver terinstal. Silakan gunakan opsi input manual.');
        setIsScanning(false);
      });
  };
  
  const startCardPolling = (apiUrl) => {
    fetch(`${apiUrl}/start-polling`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Started polling for cards:', data);
      
        cardPollingIntervalRef.current = setInterval(() => {
          if (processingCardRef.current || !isScanning) return;
          
          fetch(`${apiUrl}/detect-card`)
            .then(response => response.json())
            .then(data => {
              if (data.detected && data.cardId) {
                console.log('Card detected:', data);
                handleCardDetected(data.cardId);
              }
            })
            .catch(error => {
              console.error('Error polling for card:', error);
            });
        }, 1000); // Poll setiap 1 detik
      })
      .catch(error => {
        console.error('Error starting card polling:', error);
        setError('Gagal memulai pemindaian kartu.');
        setIsScanning(false);
      });
  };

  const handleCardDetected = (cardId) => {
    if (processingCardRef.current || loading) {
      console.log('Already processing a card, ignoring new detection');
      return;
    }

    processingCardRef.current = true;
   
    setFormData(prev => ({
      ...prev,
      nfcId: cardId
    }));

    processScanning({ nfcId: cardId });
  };
  
  const stopNfcScan = () => {
    if (cardPollingIntervalRef.current) {
      clearInterval(cardPollingIntervalRef.current);
      cardPollingIntervalRef.current = null;
    }

    if (connectionAttemptTimeoutRef.current) {
      clearTimeout(connectionAttemptTimeoutRef.current);
      connectionAttemptTimeoutRef.current = null;
    }
    
    // Tell backend to stop polling
    const apiUrl = process.env.NEXT_PUBLIC_NFC_API_URL || '/api/nfc';
    fetch(`${apiUrl}/stop-polling`, {
      method: 'POST'
    }).catch(error => {
      console.error('Error stopping polling:', error);
    });
    
    setIsScanning(false);
    setDeviceStatus({
      connected: false,
      message: 'Pemindaian dihentikan.'
    });
  };
  
  const processScanning = async (data) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const filters = {
        page: 1,
        perPage: 10
      };
      
      // Tambahkan parameter filter berdasarkan metode screening yang dipilih
      if (data.nfcId || formData.nfcId) {
        filters.nfcId = data.nfcId || formData.nfcId;
      } else if (data.noRm || formData.noRm) {
        filters.noRm = data.noRm || formData.noRm;
      } else if (data.noIdentitas || formData.noIdentitas) {
        filters.noIdentitas = data.noIdentitas || formData.noIdentitas;
      } else {
        throw new Error("Silakan masukkan data pencarian");
      }
      
      console.log("Searching for patient with filters:", filters);
      
      // Dispatch action untuk mencari data pasien dengan filter
      const result = await dispatch(fetchPasienWithFilters(filters));
      
      if (result.error) {
        throw new Error(result.error.message || "Pasien tidak ditemukan");
      }
      
      if (result.payload && result.payload.data && 
         (result.payload.data.rows?.length > 0 || (Array.isArray(result.payload.data) && result.payload.data.length > 0))) {
         
        let patientData;
        
        if (result.payload.data.rows) {
          patientData = result.payload.data.rows[0]; // Ambil data pertama dari rows
        } else if (Array.isArray(result.payload.data)) {
          patientData = result.payload.data[0]; // Ambil data pertama dari array
        } else {
          patientData = result.payload.data; // Langsung ambil objek data
        }
        
        console.log("Patient found:", patientData);
        
        // Panggil callback dengan data pasien yang ditemukan
        if (typeof onScanComplete === 'function') {
          onScanComplete(patientData);
          onHide(); // Tutup modal setelah pasien ditemukan
        }
      } else {
        throw new Error("Data pasien tidak ditemukan");
      }
    } catch (error) {
      console.error("Error during screening:", error);
      const errorMessage = error.message || "Terjadi kesalahan saat melakukan screening";
      setError(errorMessage);
      
      if (typeof onScanError === 'function') {
        onScanError(error);
      }
    } finally {
      setLoading(false);
      processingCardRef.current = false;
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (scanningMethod === 'noRm' && !formData.noRm) {
      setError("Silakan masukkan Nomor RM pasien");
      return;
    }
    
    if (scanningMethod === 'noIdentitas' && !formData.noIdentitas) {
      setError("Silakan masukkan NIK/No KTP pasien");
      return;
    }
    
    processScanning(formData);
  };
  
  // Effect untuk membersihkan resources saat modal ditutup
  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);
  
  // Effect untuk membersihkan resources saat unmount
  useEffect(() => {
    return () => {
      // Clear polling interval
      if (cardPollingIntervalRef.current) {
        clearInterval(cardPollingIntervalRef.current);
      }
      
      // Clear connection attempt timeout
      if (connectionAttemptTimeoutRef.current) {
        clearTimeout(connectionAttemptTimeoutRef.current);
      }
      
      // Tell backend to stop polling if we were scanning
      if (isScanning) {
        const apiUrl = process.env.NEXT_PUBLIC_NFC_API_URL || '/api/nfc';
        fetch(`${apiUrl}/stop-polling`, {
          method: 'POST'
        }).catch(error => {
          console.error('Error stopping polling on unmount:', error);
        });
      }
    };
  }, [isScanning]);
  
  // Reset error when changing tabs
  useEffect(() => {
    setError(null);
    
    // Stop NFC scanning when switching to other tabs
    if (scanningMethod !== 'nfc') {
      stopNfcScan();
    }
  }, [scanningMethod]);
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="ri-user-search-line me-2"></i>
          Pencarian Pasien
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          activeKey={scanningMethod}
          onSelect={(k) => setScanningMethod(k)}
          className="mb-4"
        >
          <Tab eventKey="nfc" title={<span><i className="ri-nfc-line me-1"></i> Scan Kartu</span>}>
            <div className="py-3">
              <div className="text-center mb-4">
                <div className="d-inline-block p-4 rounded-circle bg-light mb-3">
                  <i className="ri-scan-2-line fs-1 text-primary"></i>
                </div>
                <h5>Scan Kartu Pasien atau E-KTP</h5>
                <p className="text-muted">Tempelkan kartu pasien atau e-KTP ke area pembaca NFC</p>
              </div>
              
              <div className="text-center mb-3">
                <Alert variant={deviceStatus.connected ? "success" : "info"}>
                  <i className={`ri ${deviceStatus.connected ? 'ri-checkbox-circle-line' : 'ri-information-line'} me-2`}></i>
                  {deviceStatus.message}
                </Alert>
              </div>
              
              {isScanning ? (
                <div className="text-center">
                  {deviceStatus.connected && (
                    <div className="d-flex justify-content-center mb-3">
                      <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Scanning...</span>
                      </div>
                    </div>
                  )}
                  <p>{deviceStatus.connected ? 'Menunggu kartu NFC...' : 'Menghubungkan ke perangkat...'}</p>
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
                    onClick={connectToNfcReader}
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
                      <>
                        <i className="ri-nfc-line me-2"></i> Mulai Scan Kartu
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </Tab>
          
          <Tab eventKey="noRm" title={<span><i className="ri-file-list-3-line me-1"></i> Nomor RM</span>}>
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
                      <><i className="ri-search-line me-2"></i> Cari Pasien</>
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Tab>
          
          <Tab eventKey="noIdentitas" title={<span><i className="ri-id-card-line me-1"></i> No. KTP</span>}>
            <div className="py-3">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nomor Identitas (KTP/NIK)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Nomor KTP/NIK"
                    name="noIdentitas"
                    value={formData.noIdentitas}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  <Form.Text className="text-muted">
                    Masukkan Nomor KTP atau NIK pasien
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
                      <><i className="ri-search-line me-2"></i> Cari Pasien</>
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Tab>
        </Tabs>
        
        {error && (
          <Alert variant="danger" className="mt-3">
            <i className="ri-error-warning-line me-2"></i>
            {error}
          </Alert>
        )}
        
        <div className="text-center mt-4">
          <p className="text-muted">
            <i className="ri-information-line me-2"></i>
            Jika Anda mengalami masalah dengan pembaca kartu, silakan gunakan opsi pencarian dengan Nomor RM atau KTP.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardScannerModal;