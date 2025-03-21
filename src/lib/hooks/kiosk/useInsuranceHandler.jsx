import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAsuransiPasienWithFilters,
  createAsuransiPasien,
  deleteAsuransiPasien
} from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiPasienSlice";
import { fetchAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";

/**
 * Custom hook untuk mengelola fungsionalitas terkait asuransi
 * 
 * @param {Object} config - Opsi konfigurasi
 * @returns {Object} - State dan metode asuransi
 */
export const useInsuranceManagement = ({
  initialInsuranceList = [],
  formMethodsRef = null,
  pasienId = null
}) => {
  const dispatch = useDispatch();
  const { data: asuransiPasienList, loading: loadingPasienInsurance } = useSelector(state => state.AsuransiPasien);
  const { data: masterAsuransiList, loading: loadingMasterAsuransi } = useSelector(state => state.Asuransi);
  
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [insuranceList, setInsuranceList] = useState(initialInsuranceList);
  const [nonPKSInsuranceSelected, setNonPKSInsuranceSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchedInitialData, setFetchedInitialData] = useState(false);

  // Fetch master asuransi data on component mount (for dropdown options)
  useEffect(() => {
    // Prevent duplicate fetches
    if (!loadingMasterAsuransi && masterAsuransiList.length === 0) {
      dispatch(fetchAsuransi({ page: 1, perPage: 100 }))
        .catch(error => {
          console.error("Error loading master insurance data:", error);
        });
    }
  }, [dispatch, loadingMasterAsuransi, masterAsuransiList.length]);

  // Fetch asuransi pasien data when pasienId is available
  useEffect(() => {
    if (pasienId && !fetchedInitialData && !loadingPasienInsurance) {
      setLoading(true);
      setFetchedInitialData(true);
      
      dispatch(fetchAsuransiPasienWithFilters({ pasienId }))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [dispatch, pasienId, fetchedInitialData, loadingPasienInsurance]);

  // Memoize the filtered list of asuransi pasien
  const filteredAsuransiPasien = useMemo(() => {
    if (!asuransiPasienList || !pasienId) return [];
    return asuransiPasienList.filter(item => item.pasienId === pasienId);
  }, [asuransiPasienList, pasienId]);

  // Update insuranceList when asuransiPasienList changes
  useEffect(() => {
    if (!filteredAsuransiPasien.length) {
      setInsuranceList(prev => prev.length > 0 ? prev : []);
      return;
    }
    
    const formattedList = filteredAsuransiPasien.map(item => ({
      namaAsuransi: item.namaAsuransi,
      noPolis: item.noPolis,
      isPKS: true,
      asuransiId: item.asuransiId,
      asuransiPasienId: item.asuransiPasienId || item.pasienId
    }));

    setInsuranceList(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(formattedList)) {
        return formattedList;
      }
      return prev;
    });
  }, [filteredAsuransiPasien]);


  const insuranceOptions = useMemo(() => {
    // Menggunakan filteredAsuransiPasien untuk mendapatkan opsi asuransi pasien
    const patientInsuranceOptions = filteredAsuransiPasien.map((item) => ({
      label: `${item.namaAsuransi} - ${item.noPolis}`,
      value: item.asuransiId,
      isPKS: true,
      pasienId: item.pasienId,
    }));

    return [...patientInsuranceOptions];
  }, [filteredAsuransiPasien, masterAsuransiList]);


  // Modal handlers
  const handleOpenModal = useCallback((e) => {
    // Prevent form submission and event propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowInsuranceModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowInsuranceModal(false);
  }, []);

  // Handle insurance submission from modal - DIUBAH UNTUK MENDUKUNG REALTIME UPDATE
  const handleInsuranceSubmit = useCallback((insuranceData) => {
    // Map API response format to component format
    const formattedInsurance = {
      namaAsuransi: insuranceData.namaAsuransi || insuranceData.namaAsuransi,
      noPolis: insuranceData.noPolis || insuranceData.noPolis,
      isPKS: insuranceData.IsPKS || insuranceData.isPKS,
      asuransiId: insuranceData.asuransiId,
      asuransiPasienId: insuranceData.id // Tambahkan ID asuransi pasien jika ada
    };

    // Tambahkan langsung ke local state
    setInsuranceList((prevList) => {
      // Cek jika asuransi dengan ID yang sama sudah ada
      const exists = prevList.some(item => (
        item.asuransiPasienId === formattedInsurance.asuransiPasienId
      ));

      if (exists) {
        return prevList.map(item => 
          item.asuransiPasienId === formattedInsurance.asuransiPasienId 
            ? formattedInsurance 
            : item
        );
      }
      
      return [...prevList, formattedInsurance];
    });

    // Check if non-PKS insurance
    if (!formattedInsurance.isPKS) {
      setNonPKSInsuranceSelected(true);
    }

    // Update form values if form reference is available
    if (formMethodsRef && formMethodsRef.current) {
      formMethodsRef.current.setValue("nomorAsuransi", formattedInsurance.noPolis);
      formMethodsRef.current.setValue("asuransiPasien", formattedInsurance.asuransiId || formattedInsurance.namaAsuransi);
      formMethodsRef.current.trigger(["nomorAsuransi", "asuransiPasien"]);
    }

    handleCloseModal();
    
    // Jika pasienId ada, refresh data dari server
    if (pasienId) {
      dispatch(fetchAsuransiPasienWithFilters({ pasienId }));
    }

    return formattedInsurance;
  }, [pasienId, formMethodsRef, handleCloseModal, dispatch]);

  // Handle insurance removal
  const handleRemoveInsurance = useCallback(async (index, insuranceItem) => {
    // If pasienId and asuransiPasienId are available, delete from API
    if (pasienId && insuranceItem.asuransiPasienId) {
      try {
        await dispatch(deleteAsuransiPasien(insuranceItem.asuransiPasienId));
        // Update local state immediately
        setInsuranceList(prevList => prevList.filter(item => item.asuransiPasienId !== insuranceItem.asuransiPasienId));
        // Refetch after deletion
        dispatch(fetchAsuransiPasienWithFilters({ pasienId }));
      } catch (error) {
        console.error("Failed to delete insurance:", error);
      }
    } else {
      setInsuranceList(prevList => prevList.filter((_, i) => i !== index));
    }

    // Check if there's still a non-PKS insurance after removal
    setInsuranceList(prevList => {
      const stillHasNonPKS = prevList
        .filter(item => item.asuransiPasienId !== insuranceItem.asuransiPasienId)
        .some(insurance => !insurance.isPKS);
      
      setNonPKSInsuranceSelected(stillHasNonPKS);
      return prevList;
    });
  }, [dispatch, pasienId]);

  // Create new insurance pasien with optimistic update
  const createNewAsuransiPasien = useCallback(async (data) => {
    if (!pasienId) return null;

    // Format data for submission
    const formattedData = {
      pasienId,
      noPolis: data.noPolis,
      asuransiId: data.asuransiId || "00000000-0000-0000-0000-000000000000",
      userId: "system" // Could be replaced with active user ID
    };

    // Create temporary local entry with optimistic ID
    const tempId = `temp-${Date.now()}`;
    const optimisticEntry = {
      ...formattedData,
      namaAsuransi: data.namaAsuransi || "Asuransi Baru",
      asuransiPasienId: tempId,
      isPKS: !!data.isPKS
    };

    // Add to list immediately for optimistic UI update
    setInsuranceList(prev => [...prev, optimisticEntry]);

    try {
      const result = await dispatch(createAsuransiPasien(formattedData));
      
      if (result.payload) {
        // Update local state with actual data from API
        setInsuranceList(prev => prev.map(item => 
          item.asuransiPasienId === tempId 
            ? { ...result.payload, asuransiPasienId: result.payload.id }
            : item
        ));
        
        // Refetch to ensure we have the latest data
        dispatch(fetchAsuransiPasienWithFilters({ pasienId }));
        
        return result.payload;
      }
      
      return null;
    } catch (error) {
      console.error("Failed to create new insurance:", error);
      
      // Remove optimistic entry on error
      setInsuranceList(prev => prev.filter(item => item.asuransiPasienId !== tempId));
      
      return null;
    }
  }, [dispatch, pasienId]);
  
  // Perbaikan getInsuranceFields untuk menerima parameter paymentMethod dari parent
  const getInsuranceFields = useCallback((selectedPaymentMethod) => {
    const filteredOptions = insuranceOptions;
    const paymentMethod = selectedPaymentMethod || "tunai";
    
    return [
      {
        id: "asuransiPasien",
        name: "asuransiPasien",
        label: "Asuransi yang digunakan pasien",
        type: "select",
        options: filteredOptions.map(item => ({
          value: item.value,
          label: item.label 
        })),
        colSize: 6,
        // Perbaikan di sini: gunakan paymentMethod yang diterima dari parameter
        hide: () => paymentMethod !== "asuransi",
      },
      {
        id: "nomorAsuransi",
        name: "nomorAsuransi",
        label: "Nomor Kartu Asuransi",
        type: "text",
        colSize: 6,
        placeholder: "masukkan nomor asuransi",
        // Perbaikan di sini: gunakan paymentMethod yang diterima dari parameter
        hide: () => paymentMethod !== "asuransi",
      },
      {
        id: "tambahAsuransi",
        name: "tambahAsuransi",
        label: "",
        type: "custom",
        customRender: ({ methods }) => (
          <button
            type="button"
            className="btn btn-info"
            onClick={handleOpenModal}
            style={{ marginTop: "30px" }}
          >
            Tambah Asuransi
          </button>
        ),
        colSize: 6,
        className: "mt-2",
        // Perbaikan di sini: gunakan paymentMethod yang diterima dari parameter
        hide: () => paymentMethod !== "asuransi",
      },
      {
        id: "daftarAsuransi",
        name: "daftarAsuransi",
        label: "Daftar Asuransi Pasien",
        type: "custom",
        customRender: ({ methods }) => {
          if (insuranceList.length === 0) {
            if (loading) {
              return (
                <div className="alert alert-info mt-3">
                  <p className="mb-0">Memuat data asuransi pasien...</p>
                </div>
              );
            }
            return (
              <div className="alert alert-info mt-3">
                <p className="mb-0">Pasien belum memiliki asuransi. Silakan tambahkan asuransi.</p>
              </div>
            );
          }
          
          return (
            <div className="mt-3">
              <h6 className="mb-3">Daftar Asuransi Pasien:</h6>
              <ul className="list-group">
                {insuranceList.map((insurance, index) => (
                  <li key={insurance.asuransiPasienId} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{insurance.namaAsuransi}</strong>
                      <br />
                      <small>Nomor Polis: {insurance.noPolis}</small>
                      {!insurance.isPKS && (
                        <span className="badge bg-warning ms-2">Non-PKS</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveInsurance(index, insurance)}
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        },
        colSize: 12,
        // Perbaikan di sini: gunakan paymentMethod yang diterima dari parameter
        hide: () => paymentMethod !== "asuransi" || (insuranceList.length === 0 && !loading),
      },
      {
        id: "nonPKSNotification",
        name: "nonPKSNotification",
        label: "",
        type: "custom",
        customRender: ({ methods }) => {
          const asuransiPasien = methods ? methods.watch("asuransiPasien") : null;
          const selectedInsurance = insuranceList.find(ins => ins.namaAsuransi === asuransiPasien);

          if (selectedInsurance && !selectedInsurance.isPKS) {
            return (
              <div className="alert alert-warning mt-3">
                <h4 className="alert-heading">Asuransi Non-PKS</h4>
                <p>
                  Asuransi <strong>{selectedInsurance.namaAsuransi}</strong> tidak bekerja sama dengan rumah sakit (Non-PKS).
                  Pembayaran akan diatur sebagai Tunai, tetapi Anda tetap bisa mengajukan reimbursement ke pihak asuransi setelah layanan selesai.
                </p>
              </div>
            );
          }
          return null;
        },
        colSize: 12,
        // Perbaikan di sini: gunakan paymentMethod yang diterima dari parameter
        hide: () => paymentMethod !== "asuransi",
      }
    ];
  }, [insuranceOptions, insuranceList, loading, handleOpenModal, handleRemoveInsurance]);

  // Compute loading state
  const isLoading = useMemo(() => {
    return loading || loadingPasienInsurance || loadingMasterAsuransi;
  }, [loading, loadingPasienInsurance, loadingMasterAsuransi]);

  return {
    showInsuranceModal,
    insuranceList,
    nonPKSInsuranceSelected,
    handleOpenModal,
    handleCloseModal,
    handleInsuranceSubmit,
    handleRemoveInsurance,
    getInsuranceFields,
    setInsuranceList,
    createNewAsuransiPasien,
    loading: isLoading
  };
};