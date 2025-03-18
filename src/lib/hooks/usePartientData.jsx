"use client";
import { useState, useCallback } from 'react';

/**
 * Hook untuk mengelola data pasien dan integrasi dengan scanner kartu
 * 
 * @param {Object} options
 * @param {Function} options.setValue - Fungsi untuk mengatur nilai form (dari react-hook-form)
 * @param {Object} options.initialData - Data awal pasien (opsional)
 * @returns {Object} State dan fungsi-fungsi untuk manajemen data pasien
 */
const usePatientData = ({ setValue, initialData = null }) => {
  const [patientData, setPatientData] = useState(initialData);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [scanMessage, setScanMessage] = useState('');
  
  /**
   * Membuka modal scanner kartu
   */
  const handleOpenScanner = useCallback(() => {
    setShowScannerModal(true);
    setScanSuccess(false);
    setScanMessage('');
  }, []);
  
  /**
   * Menutup modal scanner kartu
   */
  const handleCloseScanner = useCallback(() => {
    setShowScannerModal(false);
  }, []);
  
  /**
   * Menangani hasil scan yang berhasil
   * @param {Object} data - Data pasien hasil scan
   */
  const handleScanComplete = useCallback((data) => {
    console.log('Scan berhasil, data pasien:', data);
    setPatientData(data);
    
    // Mapping data pasien ke field form
    if (setValue && data) {
      // Mapping data sesuai field form
      setValue('noRekamMedis', data.noRm || '');
      setValue('namaPasien', data.nama || '');
      setValue('tglLahir', data.tanggalLahir?.split('T')[0] || '');
      setValue('JenisKelamin', data.jenisKelamin === 'L' ? 'Laki-Laki' : data.jenisKelamin === 'P' ? 'Perempuan' : '');
      setValue('alamatRumah', data.alamat || '');
      setValue('nomorHP', data.noTelepon || '');
      setValue('noIdentitas', data.noIdentitas || '');
      setValue('Email', data.email || '');
      
      // Set nilai field lain sesuai kebutuhan
      if (data.ProvinsiId) setValue('ProvinsiId', data.ProvinsiId);
      if (data.NegaraId) setValue('NegaraId', data.NegaraId);
      if (data.kabupatenKotaId) setValue('kabupatenKotaId', data.kabupatenKotaId);
      if (data.kecamatanId) setValue('kecamatanId', data.kecamatanId);
      if (data.kelurahanId) setValue('kelurahanId', data.kelurahanId);
      if (data.TitlesId) setValue('TitlesId', data.TitlesId);
    }
    
    // Set notifikasi sukses
    setScanSuccess(true);
    setScanMessage(`Data pasien ${data.nama || 'unknown'} berhasil ditemukan!`);
    
    // Tutup modal
    setShowScannerModal(false);
  }, [setValue]);
  
  /**
   * Menangani error saat scan
   * @param {Error} error - Object error
   */
  const handleScanError = useCallback((error) => {
    console.error('Error saat scan:', error);
    setScanSuccess(false);
    setScanMessage(error.message || 'Terjadi kesalahan saat scan kartu');
  }, []);
  
  /**
   * Reset data pasien
   */
  const resetPatientData = useCallback(() => {
    setPatientData(null);
    setScanSuccess(false);
    setScanMessage('');
  }, []);

  return {
    patientData,
    setPatientData,
    showScannerModal,
    scanSuccess,
    scanMessage,
    handleOpenScanner,
    handleCloseScanner,
    handleScanComplete,
    handleScanError,
    resetPatientData
  };
};

export default usePatientData;