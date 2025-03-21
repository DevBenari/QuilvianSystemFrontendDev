import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDokterPoliWithFilters } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPoliSlice';
import { fetchDokterAsuransiWithFilters } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterAsuransiSlice';

/**
 * Custom hook untuk filter dokter berdasarkan poli dan asuransi
 * 
 * @param {Object} options - Opsi konfigurasi
 * @param {string|null} options.initialPoliId - ID poli awal
 * @param {string|null} options.initialAsuransiId - ID asuransi awal
 * @param {string} options.paymentMethod - Metode pembayaran (tunai/asuransi)
 * @returns {Object} - State dan fungsi untuk filtering dokter
 */
const useDoctorFilter = ({
  initialPoliId = null,
  initialAsuransiId = null,
  paymentMethod = 'tunai'
}) => {
  const dispatch = useDispatch();
  const [selectedPoli, setSelectedPoli] = useState(initialPoliId);
  const [selectedAsuransi, setSelectedAsuransi] = useState(initialAsuransiId);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi untuk memperbarui poli yang dipilih
  const updateSelectedPoli = useCallback((poliId) => {
    setSelectedPoli(poliId);
  }, []);

  // Fungsi untuk memperbarui asuransi yang dipilih
  const updateSelectedAsuransi = useCallback((asuransiId) => {
    setSelectedAsuransi(asuransiId);
  }, []);

  // Fungsi untuk fetch dokter berdasarkan filter
  const fetchDoctorsWithFilter = useCallback(async () => {
    if (!selectedPoli) {
      setDoctors([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch dokter berdasarkan poli
      const dokterPoliResult = await dispatch(fetchDokterPoliWithFilters({
        poliId: selectedPoli,
        page: 1,
        perPage: 100
      })).unwrap();

      const dokterInPoli = dokterPoliResult.data?.rows || [];
      
      // Jika metode pembayaran adalah tunai, langsung tampilkan semua dokter dari poli
      if (paymentMethod === 'tunai') {
        const matchingDoctors = dokterInPoli.map(doc => ({
          id: doc.dokterId,
          nama: doc.namaDokter || "Dokter",
          jadwal: doc.jadwal || "Jadwal tidak tersedia",
          poliId: selectedPoli
        }));
        
        setDoctors(matchingDoctors);
      } 
      // Jika asuransi dipilih, filter dokter yang juga terdaftar di asuransi tersebut
      else if (paymentMethod === 'asuransi' && selectedAsuransi) {
        // Fetch dokter berdasarkan asuransi
        const dokterAsuransiResult = await dispatch(fetchDokterAsuransiWithFilters({
          asuransiId: selectedAsuransi,
          page: 1,
          perPage: 100
        })).unwrap();

        const dokterInAsuransi = dokterAsuransiResult.data?.rows || [];

        // Filter dokter yang ada di kedua hasil (intersection)
        const dokterIds = new Set();
        dokterInAsuransi.forEach(doc => dokterIds.add(doc.dokterId));

        // Hanya ambil dokter yang terdaftar di poli dan asuransi yang dipilih
        const matchingDoctors = dokterInPoli
          .filter(doc => dokterIds.has(doc.dokterId))
          .map(doc => ({
            id: doc.dokterId,
            nama: doc.namaDokter || "Dokter",
            jadwal: doc.jadwal || "Jadwal tidak tersedia",
            poliId: selectedPoli,
            asuransiId: selectedAsuransi
          }));
          
        setDoctors(matchingDoctors);
      }
      // Jika metode pembayaran asuransi tapi belum pilih asuransi, kosongkan list dokter
      else if (paymentMethod === 'asuransi' && !selectedAsuransi) {
        setDoctors([]);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError(error.message || "Gagal memuat data dokter");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, [dispatch, selectedPoli, selectedAsuransi, paymentMethod]);

  // Fetch dokter saat filter berubah
  useEffect(() => {
    if (selectedPoli) {
      fetchDoctorsWithFilter();
    } else {
      setDoctors([]);
    }
  }, [selectedPoli, selectedAsuransi, paymentMethod, fetchDoctorsWithFilter]);

  return {
    doctors,
    loading,
    error,
    selectedPoli,
    selectedAsuransi,
    updateSelectedPoli,
    updateSelectedAsuransi,
    fetchDoctorsWithFilter
  };
};

export default useDoctorFilter;