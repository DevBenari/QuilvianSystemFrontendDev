import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsuransiPasien } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiPasienSlice";

/**
 * Custom hook for managing insurance-related functionality
 * 
 * @param {Object} config - Configuration options
 * @returns {Object} - Insurance state and methods
 */
export const useInsuranceManagement = ({
  initialInsuranceList = [],
  formMethodsRef = null,
  pasienId = null
}) => {
  const dispatch = useDispatch();
  const { data: asuransiPasienList, loading } = useSelector(state => state.asuransiPasien || { data: [], loading: false });
  
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [insuranceList, setInsuranceList] = useState(initialInsuranceList);
  const [nonPKSInsuranceSelected, setNonPKSInsuranceSelected] = useState(false);

  // Fetch asuransi pasien data when pasienId is available
  useEffect(() => {
    if (pasienId) {
      dispatch(fetchAsuransiPasien(pasienId));
    }
  }, [dispatch, pasienId]);

  // Update insuranceList when asuransiPasienList changes
  useEffect(() => {
    if (asuransiPasienList && asuransiPasienList.length > 0) {
      const formattedList = asuransiPasienList.map(item => ({
        namaAsuransi: item.namaAsuransi,
        nomorPolis: item.noPolis,
        isPKS: true, // Assume all fetched insurances are PKS by default
        asuransiId: item.asuransiId
      }));
      
      setInsuranceList(formattedList);
    }
  }, [asuransiPasienList]);

  // Modal handlers
  const handleOpenModal = (e) => {
    // Prevent form submission and event propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowInsuranceModal(true);
  };

  const handleCloseModal = () => setShowInsuranceModal(false);

  // Handle insurance submission from modal
  const handleInsuranceSubmit = (insuranceData) => {
    // Map API response format to component format
    const formattedInsurance = {
      namaAsuransi: insuranceData.NamaAsuransi || insuranceData.namaAsuransi,
      nomorPolis: insuranceData.NomorPolis || insuranceData.nomorPolis,
      isPKS: insuranceData.IsPKS || insuranceData.isPKS,
      asuransiId: insuranceData.asuransiId
    };

    setInsuranceList((prevList) => [...prevList, formattedInsurance]);

    if (!formattedInsurance.isPKS) {
      setNonPKSInsuranceSelected(true);
    }

    if (formMethodsRef && formMethodsRef.current) {
      formMethodsRef.current.setValue("nomorAsuransi", formattedInsurance.nomorPolis);
      formMethodsRef.current.setValue("asuransiPasien", formattedInsurance.namaAsuransi);
      formMethodsRef.current.trigger(["nomorAsuransi", "asuransiPasien"]);
    }

    handleCloseModal();
    return formattedInsurance;
  };

  // Generate insurance form fields based on payment method
  const getInsuranceFields = (selectedPaymentMethod) => {
    return [
      {
        id: "asuransiPasien",
        name: "asuransiPasien",
        label: "Asuransi yang digunakan pasien",
        type: "select",
        options: insuranceList.map((item) => ({
          label: `${item.namaAsuransi} - ${item.nomorPolis}`,
          value: item.namaAsuransi,
          isPKS: item.isPKS,
          asuransiId: item.asuransiId
        })),
        colSize: 6,
        hide: (watchValues) => selectedPaymentMethod !== "asuransi"
      },
      {
        id: "nomorAsuransi",
        name: "nomorAsuransi",
        label: "Nomor Kartu Asuransi",
        type: "number",
        colSize: 6,
        placeholder: "masukkan nomor asuransi",
        hide: (watchValues) => selectedPaymentMethod !== "asuransi"
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
        hide: (watchValues) => selectedPaymentMethod !== "asuransi"
      },
      {
        id: "nonPKSNotification",
        name: "nonPKSNotification",
        label: "",
        type: "custom",
        customRender: ({ methods }) => {
          const asuransiPasien = methods.watch("asuransiPasien");
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
        hide: (watchValues) => selectedPaymentMethod !== "asuransi"
      }
    ];
  };

  return {
    showInsuranceModal,
    insuranceList,
    nonPKSInsuranceSelected,
    handleOpenModal,
    handleCloseModal,
    handleInsuranceSubmit,
    getInsuranceFields,
    setInsuranceList,
    loading
  };
};