  import React, { useState, useEffect, useRef } from 'react';
  import { useDispatch } from 'react-redux';
  import { Card, Form, Button, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';
  import { fetchPasienWithFilters } from '@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice';
  import ButtonNav from '@/components/ui/button-navigation';

  /**
   * @param {Object} props
   * @param {Function} props.onPatientFound 
   * @param {Function} props.onError 
   */
  const KioskScreeningCard = ({ onPatientFound, onError }) => {
    const dispatch = useDispatch();
    const websocketRef = useRef(null);
    
    const [screeningMethod, setScreeningMethod] = useState('nfc'); 
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

      processScreening({
        nfcId: cardId
      });
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
    
    const processScreening = async (data) => {
      if (loading) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const filterParams = {};
        
        if (data.nfcId) {
          filterParams.cardId = data.nfcId;
        } else if (data.noRm || formData.noRm) {
          // Pastikan format RM sesuai dan tambahkan filter yang lebih spesifik
          const rmValue = data.noRm || formData.noRm;
          filterParams.noRm = rmValue.trim(); // Hilangkan spasi
          filterParams.exact = true; // Tambahkan parameter untuk pencarian yang tepat/exact
        }
        else if (data.noIdentitas || formData.noIdentitas) {
          filterParams.noIdentitas = data.noIdentitas || formData.noIdentitas;
        } else {
          throw new Error("Silakan masukkan data pencarian");
        }
        
        console.log("Searching for patient with filters:", filterParams);
        
        // Gunakan fetchPasienWithFilters untuk mencari data pasien
        const result = await dispatch(fetchPasienWithFilters(filterParams));
        
        console.log("API response:", result);
        
        if (result.error) {
          throw new Error(result.error.message || "Pasien tidak ditemukan");
        }
        
        // Handling data hasil dari fetchPasienWithFilters
        if (result.payload && result.payload.data && 
          (result.payload.data.rows || result.payload.data)) {
        const patientData = result.payload.data.rows || result.payload.data;
        console.log("Patient found:", patientData);

        // Periksa apakah ada hasil tepat berdasarkan noRm
        if (Array.isArray(patientData) && patientData.length > 0) {
          // Jika filter berdasarkan noRm, cari kecocokan exact
          if (filterParams.noRm) {
            const exactMatch = patientData.find(p => 
              p.noRekamMedis === filterParams.noRm || 
              p.noRm === filterParams.noRm
            );
            
            // Gunakan hasil exact atau hasil pertama jika tidak ada yang cocok
            const patient = exactMatch || patientData[0];
            console.log("Selected patient:", patient);
            onPatientFound(patient);
          } else {
            // Untuk filter lain, gunakan hasil pertama
            onPatientFound(patientData[0]);
          }
        } else if (!Array.isArray(patientData)) {
          // Jika hanya satu objek
          onPatientFound(patientData);
        }
        }
      } catch (error) {
        console.error("Error during screening:", error);
        const errorMessage = error.message || "Terjadi kesalahan saat melakukan screening";
        setError(errorMessage);
        
        if (typeof onError === 'function') {
          onError(error);
        }
      } finally {
        // Reset flags dan state setelah proses selesai
        setLoading(false);
        processingCardRef.current = false;
      }
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (screeningMethod === 'noRm' && !formData.noRm) {
        setError("Silakan masukkan Nomor RM pasien");
        return;
      }
      
      if (screeningMethod === 'noIdentitas' && !formData.noIdentitas) {
        setError("Silakan masukkan NIK pasien");
        return;
      }
      
      processScreening(formData);
    };
    
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
      if (screeningMethod !== 'nfc') {
        stopNfcScan();
      }
    }, [screeningMethod]);
    
    return (
      <Card className="shadow-lg border-0 mb-4">
        <Card.Header className="bg-primary text-white py-3 d-flex justify-content-between">
          <div>
              <h4 className="mb-0">Screening Kartu Pasien</h4>
              <p className="mb-0 small">Gunakan kartu pasien atau masukkan data pencarian</p>
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
                  <h5>Scan Kartu Pasien dengan ACS ACR122U</h5>
                  <p className="text-muted">Tempelkan kartu pasien ke area pembaca NFC</p>
                </div>
                
                <div className="text-center mb-3">
                  <Alert variant={deviceStatus.connected ? "success" : "info"}>
                    <i className={`bi ${deviceStatus.connected ? 'bi-check-circle' : 'bi-info-circle'} me-2`}></i>
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
                        'Mulai Scan Kartu'
                      )}
                    </Button>
                  </div>
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
            
            <Tab eventKey="noIdentitas" title="NIK">
              <div className="py-3">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nomor Identitas (NIK)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan NIK"
                      name="noIdentitas"
                      value={formData.noIdentitas}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                    <Form.Text className="text-muted">
                      Masukkan NIK yang tertera pada KTP pasien
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
              Jika Anda mengalami masalah dengan pembaca kartu NFC,
              silakan gunakan opsi pencarian dengan Nomor RM atau NIK.
            </p>
          </div>
        </Card.Body>
      </Card>
    );
  };

  export default KioskScreeningCard;