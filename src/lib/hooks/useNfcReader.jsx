// @/hooks/useNfcReader.js

import { useState, useEffect, useCallback } from 'react';
import mockNfcService from '@/lib/services/mockNfcService';

// Environment variable untuk menentukan mode (production atau development)
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Hook untuk bekerja dengan pembaca NFC
 * Akan menggunakan mock service di mode development
 * @returns {Object} State dan fungsi NFC reader
 */
export default function useNfcReader() {
  // Gunakan service sesuai environment
  const nfcService = isDevelopment ? mockNfcService : null;
  
  // State untuk NFC reader
  const [isScanning, setIsScanning] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState({
    connected: false,
    message: isDevelopment ? '[SIMULASI] Siap menghubungkan ke perangkat NFC' : 'Menghubungkan ke perangkat NFC...'
  });
  const [lastCardId, setLastCardId] = useState(null);
  const [error, setError] = useState(null);

  // Callback functions untuk event NFC
  const handleDeviceStatus = useCallback((status) => {
    setDeviceStatus(status);
  }, []);

  const handleCardDetected = useCallback((cardId) => {
    setLastCardId(cardId);
    // Keep scanning active to detect more cards
  }, []);

  const handleError = useCallback((errorMessage) => {
    setError(errorMessage);
  }, []);

  const handleConnectionChange = useCallback((isConnected) => {
    if (!isConnected && isScanning) {
      setIsScanning(false);
    }
  }, [isScanning]);

  // Mulai pemindaian kartu NFC
  const startScan = useCallback(async () => {
    setError(null);
    setIsScanning(true);
    
    if (isDevelopment) {
      try {
        // Register event listeners pada mock service
        nfcService.registerListeners({
          onDeviceStatus: handleDeviceStatus,
          onCardDetected: handleCardDetected,
          onError: handleError,
          onConnectionChange: handleConnectionChange
        });
        
        // Connect ke mock service jika belum terhubung
        if (!nfcService.getIsConnected()) {
          await nfcService.connect();
        }
        
        // Mulai pemindaian
        nfcService.startScan();
      } catch (error) {
        console.error('Error starting NFC scan:', error);
        setError('Tidak dapat memulai pemindaian NFC. Silakan coba lagi atau gunakan opsi input manual.');
        setIsScanning(false);
      }
    } else {
      // Tampilkan pesan bahwa fitur belum tersedia di production
      setError('Fitur NFC masih dalam pengembangan. Silakan gunakan opsi input manual.');
      setDeviceStatus({
        connected: false,
        message: 'Layanan WebSocket untuk NFC belum tersedia.'
      });
      setIsScanning(false);
    }
  }, [nfcService, handleDeviceStatus, handleCardDetected, handleError, handleConnectionChange]);

  // Hentikan pemindaian kartu NFC
  const stopScan = useCallback(() => {
    if (isDevelopment && nfcService) {
      nfcService.stopScan();
    }
    setIsScanning(false);
  }, [nfcService]);

  // Cleanup saat komponen unmount
  useEffect(() => {
    return () => {
      if (isScanning && isDevelopment && nfcService) {
        nfcService.stopScan();
      }
    };
  }, [isScanning, nfcService]);

  return {
    isScanning,
    deviceStatus,
    lastCardId,
    error,
    startScan,
    stopScan,
    isDevelopment
  };
}