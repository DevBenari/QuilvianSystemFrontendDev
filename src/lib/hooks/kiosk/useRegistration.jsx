// hooks/useRegistration.js (Modified to handle doctor filtering by poli and insurance)
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInsuranceManagement } from "@/lib/hooks/kiosk/useInsuranceHandler";
import { usePaymentMethod } from "@/lib/hooks/kiosk/usePaymentMethod";
import { useDoctorSelection } from "@/lib/hooks/kiosk/useDoctorSelection";
import { useConfirmation } from "@/lib/hooks/kiosk/useConfirmation";
import { useRegistrationSteps } from "@/lib/hooks/kiosk/useRegistrationStep";
import { fetchDoctors } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-dokter/dokterPoli"; // Assuming you created this thunk

/**
 * Main custom hook for handling registration functionality
 * Integrates all the smaller specific hooks and handles doctor filtering
 * 
 *
 * 
 */ const useRegistration = ({
  fetchMasterDataAction,
  fetchDoctorsAction = null,
  initialDoctorsData = {},
  initialInsuranceList = [],
  initialStep = 0
}) => {
  const formMethodsRef = useRef(null);
  const dispatch = useDispatch();
  const { data:doctorsByPoli, loading: doctorsLoading, error: doctorsError } = useSelector(state => state.dokterPoli);
  
  // Local state
  const [serviceType, setServiceType] = useState("poli"); // "poli", "lab", "radiologi"
  const [currentDoctorsData, setCurrentDoctorsData] = useState(initialDoctorsData);

  // Integrate the smaller hooks
  const { currentStep, setCurrentStep } = useRegistrationSteps({ initialStep });
  
  const { 
    showInsuranceModal, 
    insuranceList, 
    nonPKSInsuranceSelected,
    handleOpenModal,
    handleCloseModal,
    handleInsuranceSubmit,
    getInsuranceFields,
    setInsuranceList
  } = useInsuranceManagement({ 
    initialInsuranceList, 
    formMethodsRef 
  });
  
  const {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    getPaymentMethodCards,
    renderPaymentMethodSelection
  } = usePaymentMethod();
  
  // Enhanced useDoctorSelection with more specific methods
  const {
    filteredDoctorsByInsurance,
    updateDoctorsByInsurance,
    renderDoctorSelection,
    getDoctorSelectionCard,
    isLoading: isDoctorsLoading,
    error: doctorSelectionError,
    getDoctorsByPoli
  } = useDoctorSelection({ 
    initialDoctorsData: currentDoctorsData,
    fetchDoctorsAction: null // We'll handle fetching directly
  });
  
  const { renderConfirmationSection } = useConfirmation();

  // Save form methods for later use
  const handleFormMethodReady = (methods) => {
    formMethodsRef.current = methods;
  };

  // Reference for action creators
  const actionRef = useRef(fetchMasterDataAction);

  // Update action reference when it changes
  useEffect(() => {
    actionRef.current = fetchMasterDataAction;
  }, [fetchMasterDataAction]);
  
  // Fetch master data when component mounts
  useEffect(() => {
    if (actionRef.current) {
      dispatch(actionRef.current());
    }
  }, [dispatch]);

  // Watch form values for filtering doctors
  useEffect(() => {
    if (formMethodsRef.current) {
      const currentValues = formMethodsRef.current.getValues();
      const currentServiceType = currentValues.serviceType || "poli";
      const currentPoli = currentValues.selectedPoli;

      // Update service type state
      setServiceType(currentServiceType);

      // Fetch doctors when poli changes
      if (currentPoli && currentPoli !== "") {
        dispatch(fetchDoctors({ poliId: currentPoli, serviceType: currentServiceType }));
      }
    }
  }, [dispatch, formMethodsRef]);

  // Update doctors data when redux store changes
  useEffect(() => {
    if (doctorsByPoli && Object.keys(doctorsByPoli).length > 0) {
      setCurrentDoctorsData(doctorsByPoli);
    }
  }, [doctorsByPoli]);

  // Filter doctors when insurance or payment method changes
  useEffect(() => {
    if (formMethodsRef.current) {
      const currentValues = formMethodsRef.current.getValues();
      const currentPoli = currentValues.selectedPoli;
      
      if (selectedPaymentMethod === "asuransi" && insuranceList.length > 0 && currentPoli) {
        // Filter doctors by insurance
        updateDoctorsByInsurance(insuranceList, doctorsByPoli);
      } else if (selectedPaymentMethod === "tunai" && currentPoli) {
        // Reset filters if paying with cash
        updateDoctorsByInsurance([], doctorsByPoli);
      }
    }
  }, [selectedPaymentMethod, insuranceList, doctorsByPoli, updateDoctorsByInsurance]);

  // Combined handlers for insurance submission and doctor filtering
  const handleCombinedInsuranceSubmit = (insuranceData) => {
    const formattedInsurance = handleInsuranceSubmit(insuranceData);
    
    // Update doctors based on the new insurance list
    if (formMethodsRef.current) {
      const currentValues = formMethodsRef.current.getValues();
      const currentPoli = currentValues.selectedPoli;
      
      if (currentPoli) {
        updateDoctorsByInsurance([...insuranceList, formattedInsurance], doctorsByPoli);
      }
    }
    
    return formattedInsurance;
  };

  // Handle service type change
  const handleServiceTypeChange = (type) => {
    setServiceType(type);
    if (formMethodsRef.current) {
      formMethodsRef.current.setValue("serviceType", type);
      formMethodsRef.current.setValue("selectedPoli", ""); // Reset poli selection
      formMethodsRef.current.setValue("selectedDoctor", ""); // Reset doctor selection
    }
  };

  // Manual fetch doctors by poli and service type
  const fetchDoctorsByPoli = (poliId, type = serviceType) => {
    dispatch(fetchDoctors({ poliId, serviceType: type }));
  };

  // Handle form submission
  const handleSubmit = (data, onSuccess) => {
    console.log("Form Data:", data);

    // Additional processing if needed...
    // E.g., map doctor ID to actual doctor data
    if (data.selectedDoctor && data.selectedPoli) {
      const selectedDoctors = getDoctorsByPoli(data.selectedPoli);
      const doctorDetails = selectedDoctors.find(doc => doc.id === data.selectedDoctor);
      if (doctorDetails) {
        data.doctorDetails = doctorDetails;
      }
    }

    // Add service type to submission data
    data.serviceType = serviceType;

    // Call onSuccess callback if provided
    if (typeof onSuccess === 'function') {
      onSuccess(data);
    }
  };

  // Generate service type selection cards
  const getServiceTypeCards = () => {
    return {
      name: "serviceType",
      title: "Pilih Jenis Layanan",
      description: "Silakan pilih jenis layanan yang Anda butuhkan:",
      colSize: 4,
      required: true,
      rules: { required: "Silakan pilih jenis layanan" },
      options: [
        { value: "poli", label: "Poli", icon: "🏥" },
        { value: "lab", label: "Laboratorium", icon: "🧪" },
        { value: "radiologi", label: "Radiologi", icon: "🔬" }
      ],
      customRender: ({ methods }) => {
        const currentServiceType = methods.watch("serviceType") || "poli";
        
        return (
          <>
            <h5 className="mb-3">Pilih Jenis Layanan</h5>
            <div className="row">
              {["poli", "lab", "radiologi"].map((type) => {
                const isSelected = currentServiceType === type;
                const icons = { poli: "🏥", lab: "🧪", radiologi: "🔬" };
                const labels = { poli: "Poli", lab: "Laboratorium", radiologi: "Radiologi" };
                
                return (
                  <div className="col-12 col-md-4" key={type}>
                    <div
                      className={`card selection-card mb-3 cursor-pointer ${isSelected ? 'selected shadow-lg border-primary' : ''}`}
                      onClick={() => {
                        methods.setValue("serviceType", type);
                        handleServiceTypeChange(type);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body text-center p-4">
                        <div className="card-icon mb-3">{icons[type]}</div>
                        <h5 className="card-title">{labels[type]}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      }
    };
  };

  // Enhanced doctor selection card with service type consideration
  const getEnhancedDoctorSelectionCard = () => {
    return {
      name: "selectedDoctor",
      title: "Pilih Dokter",
      description: `Silakan pilih dokter ${serviceType === "poli" ? "poli" : serviceType === "lab" ? "laboratorium" : "radiologi"} yang tersedia:`,
      colSize: 6,
      required: true,
      rules: { required: "Silakan pilih dokter" },
      options: [], // Will be dynamically populated
      customRender: ({ methods }) => {
        const selectedPoli = methods.watch("selectedPoli");
        const currentServiceType = methods.watch("serviceType") || serviceType;
        
        // No poli selected yet
        if (!selectedPoli) {
          return (
            <div className="alert alert-warning">
              Silakan pilih {currentServiceType === "poli" ? "poli" : currentServiceType === "lab" ? "jenis lab" : "jenis radiologi"} terlebih dahulu.
            </div>
          );
        }
        
        // Show loading state
        if (isDoctorsLoading || doctorsLoading) {
          return (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Mengambil data dokter...</p>
            </div>
          );
        }
        
        // Show error state
        if (doctorSelectionError || doctorsError) {
          return (
            <div className="alert alert-danger">
              Terjadi kesalahan: {doctorSelectionError || doctorsError}. Silakan coba lagi nanti.
            </div>
          );
        }
        
        return renderDoctorSelection(
          methods, 
          filteredDoctorsByInsurance, 
          selectedPoli, 
          selectedPaymentMethod, 
          insuranceList
        );
      }
    };
  };

  return {
    // State
    showInsuranceModal,
    insuranceList,
    currentDoctorsData,
    filteredDoctorsByInsurance,
    nonPKSInsuranceSelected,
    currentStep,
    selectedPaymentMethod,
    serviceType,
    formMethodsRef,
    isDoctorsLoading: isDoctorsLoading || doctorsLoading,
    doctorsError: doctorSelectionError || doctorsError,

    // Methods
    handleOpenModal,
    handleCloseModal,
    handleFormMethodReady,
    handleInsuranceSubmit: handleCombinedInsuranceSubmit,
    updateDoctorsByInsurance,
    handleSubmit,
    setCurrentStep,
    setSelectedPaymentMethod,
    setServiceType: handleServiceTypeChange,
    getDoctorsByPoli,
    fetchDoctorsByPoli,

    // Utility functions
    getServiceTypeCards,
    getInsuranceFields: () => getInsuranceFields(selectedPaymentMethod),
    getPaymentMethodCards,
    getDoctorSelectionCard: getEnhancedDoctorSelectionCard,
    renderDoctorSelection: (methods, doctors, selectedPoli) => 
      renderDoctorSelection(methods, doctors, selectedPoli, selectedPaymentMethod, insuranceList),
    renderPaymentMethodSelection,
    renderConfirmationSection
  };
};

export default useRegistration;