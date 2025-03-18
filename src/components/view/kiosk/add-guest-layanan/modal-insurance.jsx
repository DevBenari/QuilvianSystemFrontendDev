import React, { memo, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";

const ModalInsurance = memo(
  ({ onOpen, onClose, onSubmit, formConfig = [] }) => {
    const dispatch = useDispatch();
    const { data:asuransiList } = useSelector((state) => state.Asuransi);

    const [insuranceData, setInsuranceData] = useState({ 
        namaAsuransi: "", 
        nomorPolis: "",
        isPKS: true
    });


    // Create defaultValues safely by checking if formConfig exists
    const defaultValues = React.useMemo(() => {
        if (!formConfig || !Array.isArray(formConfig)) {
            return {};
        }

        return formConfig.reduce((defaults, section) => {
            if (section && section.fields && Array.isArray(section.fields)) {
                section.fields.forEach((field) => {
                    if (field && field.name) {
                        defaults[field.name] = field.value || "";
                    }
                });
            }
            return defaults;
        }, {});
    }, [formConfig]);


    const methods = useForm({
      defaultValues,
      mode: "onSubmit",
    });


    // Fetch insurance options from API
    const [insuranceOptions, setInsuranceOptions] = useState([]);


    // Fetch insurance providers from API
    useEffect(() => {
        const fetchInsuranceProviders = async () => {
            try {
                // Dispatch the action to fetch all insurance providers
                const result = await dispatch(fetchAsuransi({ page: 1, perPage: 100 }));

                if (result.payload && result.payload.data) {
                    // Map API response to options format
                    const options = result.payload.data.map(insurance => ({
                        label: insurance.namaAsuransi,
                        value: insurance.namaAsuransi,
                        id: insurance.AsuransiId
                    }));

                    // Add "Lainnya" option at the end
                    options.push({ label: "Lainnya", value: "Lainnya" });

                    setInsuranceOptions(options);
                }
            } catch (error) {
                console.error("Error fetching insurance providers:", error);
                // Fallback to empty list with just "Lainnya" option
                setInsuranceOptions([{ label: "Lainnya", value: "Lainnya" }]);
            }
        };

        fetchInsuranceProviders();
    }, [dispatch]);

    const [showCustomInput, setShowCustomInput] = useState(false);


    // Handle the form submission
    const handleFormSubmit = async () => {
      onSubmit(insuranceData);
      onClose(true);
    };

    return (
        <Modal show={onOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Asuransi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormProvider {...methods}>
                    <div className="mb-3">
                        {!showCustomInput ? (
                            <SelectField
                                name="namaAsuransi"
                                label="Penyedia Asuransi"
                                options={insuranceOptions}
                                placeholder="Pilih penyedia asuransi"
                                onChange={(selected) => {
                                    if (selected && selected.value) {
                                        if (selected.value === "Lainnya") {
                                            setShowCustomInput(true);
                                            setInsuranceData(prev => ({ 
                                                ...prev, 
                                                namaAsuransi: "", 
                                                IsPKS: false
                                            }));
                                        } else {
                                            setInsuranceData(prev => ({ 
                                                ...prev, 
                                                namaAsuransi: selected.value,
                                                IsPKS: true
                                            }));
                                        }
                                    } else {
                                        setInsuranceData(prev => ({ ...prev, namaAsuransi: "" }));
                                    }
                                }}
                            />
                        ) : (
                            <>
                                <TextField
                                    name="customProvider"
                                    label="Penyedia Asuransi Lainnya"
                                    placeholder="Masukkan nama asuransi"
                                    onChange={(e) => 
                                        setInsuranceData(prev => ({ 
                                            ...prev, 
                                            namaAsuransi: e.target.value,
                                            IsPKS: false
                                        }))
                                    }
                                />
                                {insuranceData.namaAsuransi && (
                                    <div className="alert alert-warning mt-2">
                                        <small>
                                            Asuransi ini tidak bekerja sama dengan rumah sakit (Non-PKS). 
                                            Pembayaran akan diatur sebagai Tunai, tetapi Anda dapat mengajukan reimbursement ke pihak asuransi.
                                        </small>
                                    </div>
                                )}
                                <div className="mt-2">
                                    <Button 
                                        variant="link" 
                                        size="sm" 
                                        className="p-0"
                                        onClick={() => {
                                            setShowCustomInput(false);
                                            setInsuranceData(prev => ({ 
                                                ...prev, 
                                                namaAsuransi: "",
                                                IsPKS: true
                                            }));
                                        }}
                                    >
                                        Kembali ke daftar asuransi
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mb-3">
                        <TextField
                            name="nomorPolis"
                            label="Nomor Polis"
                            placeholder="Masukkan nomor polis asuransi"
                            onChange={(e) => 
                                setInsuranceData(prev => ({ ...prev, nomorPolis: e.target.value }))
                            }
                        />
                    </div>
                </FormProvider>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Batal
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleFormSubmit}
                    disabled={!insuranceData.namaAsuransi || !insuranceData.nomorPolis}
                >
                    simpan
                </Button>
            </Modal.Footer>
        </Modal>
    );
  }
);

ModalInsurance.displayName = "ModalInsurance";
export default ModalInsurance; 



// import React, { memo, useState, useEffect } from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import TextField from "@/components/ui/text-field";
// import SelectField from "@/components/ui/select-field";
// import { FormProvider, useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";
// import { createAsuransiPasien } from "@/lib/state/slice/Manajemen-kesehatan-slices/AsuransiPasienSlice";

// const ModalInsurance = memo(
//   ({ onOpen, onClose, onSubmit, patientId, formConfig = [] }) => {
//     const dispatch = useDispatch();
//     const { loading: asuransiLoading } = useSelector((state) => state.Asuransi);
//     const { loading: asuransiPasienLoading } = useSelector((state) => state.AsuransiPasien);
    
//     // Add patientId to the insurance data
//     const [insuranceData, setInsuranceData] = useState({ 
//         namaAsuransi: "", 
//         nomorPolis: "",
//         isPKS: true,
//         pasienId: patientId // Include the patient ID automatically
//     });

//     // Create defaultValues safely by checking if formConfig exists
//     const defaultValues = React.useMemo(() => {
//         if (!formConfig || !Array.isArray(formConfig)) {
//             return {};
//         }

//         return formConfig.reduce((defaults, section) => {
//             if (section && section.fields && Array.isArray(section.fields)) {
//                 section.fields.forEach((field) => {
//                     if (field && field.name) {
//                         defaults[field.name] = field.value || "";
//                     }
//                 });
//             }
//             return defaults;
//         }, {});
//     }, [formConfig]);

//     const methods = useForm({
//       defaultValues,
//       mode: "onSubmit",
//     });

//     // Fetch insurance options from API
//     const [insuranceOptions, setInsuranceOptions] = useState([]);

//     // Update insuranceData when patientId changes
//     useEffect(() => {
//         setInsuranceData(prev => ({
//             ...prev,
//             pasienId: patientId
//         }));
//     }, [patientId]);

//     // Fetch insurance providers from API
//     useEffect(() => {
//         const fetchInsuranceProviders = async () => {
//             try {
//                 // Dispatch the action to fetch all insurance providers
//                 const result = await dispatch(fetchAsuransi({ page: 1, perPage: 100 }));

//                 if (result.payload && result.payload.data) {
//                     // Map API response to options format
//                     const options = result.payload.data.map(insurance => ({
//                         label: insurance.namaAsuransi,
//                         value: insurance.namaAsuransi,
//                         id: insurance.asuransiId
//                     }));

//                     // Add "Lainnya" option at the end
//                     options.push({ label: "Lainnya", value: "Lainnya" });

//                     setInsuranceOptions(options);
//                 }
//             } catch (error) {
//                 console.error("Error fetching insurance providers:", error);
//                 // Fallback to empty list with just "Lainnya" option
//                 setInsuranceOptions([{ label: "Lainnya", value: "Lainnya" }]);
//             }
//         };

//         fetchInsuranceProviders();
//     }, [dispatch]);

//     const [showCustomInput, setShowCustomInput] = useState(false);

//     // Handle the form submission
//     const handleFormSubmit = async () => {
//         // Ensure the data has the correct format expected by the API
//         const submitData = {
//             pasienId: patientId,
//             namaAsuransi: insuranceData.namaAsuransi,
//             nomorPolis: insuranceData.nomorPolis,
//             isPKS: insuranceData.isPKS
//         };
        
//         try {
//             // Dispatch createAsuransiPasien action to save the data
//             const result = await dispatch(createAsuransiPasien(submitData));
            
//             if (result.error) {
//                 throw new Error(result.error.message || "Failed to save insurance data");
//             }
            
//             // Call the provided onSubmit callback with the saved data
//             onSubmit(result.payload?.data || submitData);
//             onClose(true);
//         } catch (error) {
//             console.error("Error saving insurance data:", error);
//             // You might want to show an error message to the user here
//         }
//     };

//     // Check if form can be submitted
//     const isFormValid = insuranceData.namaAsuransi && 
//                         insuranceData.nomorPolis && 
//                         patientId;
    
//     const isLoading = asuransiLoading || asuransiPasienLoading;

//     return (
//         <Modal show={onOpen} onHide={onClose} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Tambah Asuransi</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <FormProvider {...methods}>
//                     {/* Patient ID Information - Read only */}
//                     <div className="mb-3">
//                         <div className="alert alert-info">
//                             <small>
//                                 <i className="bi bi-info-circle me-2"></i>
//                                 Data asuransi akan ditambahkan untuk pasien dengan ID: {patientId || "Belum teridentifikasi"}
//                             </small>
//                         </div>
//                     </div>
                    
//                     <div className="mb-3">
//                         {!showCustomInput ? (
//                             <SelectField
//                                 name="namaAsuransi"
//                                 label="Penyedia Asuransi"
//                                 options={insuranceOptions}
//                                 placeholder="Pilih penyedia asuransi"
//                                 onChange={(selected) => {
//                                     if (selected && selected.value) {
//                                         if (selected.value === "Lainnya") {
//                                             setShowCustomInput(true);
//                                             setInsuranceData(prev => ({ 
//                                                 ...prev, 
//                                                 namaAsuransi: "", 
//                                                 isPKS: false
//                                             }));
//                                         } else {
//                                             setInsuranceData(prev => ({ 
//                                                 ...prev, 
//                                                 namaAsuransi: selected.value,
//                                                 isPKS: true
//                                             }));
//                                         }
//                                     } else {
//                                         setInsuranceData(prev => ({ ...prev, namaAsuransi: "" }));
//                                     }
//                                 }}
//                             />
//                         ) : (
//                             <>
//                                 <TextField
//                                     name="customProvider"
//                                     label="Penyedia Asuransi Lainnya"
//                                     placeholder="Masukkan nama asuransi"
//                                     onChange={(e) => 
//                                         setInsuranceData(prev => ({ 
//                                             ...prev, 
//                                             namaAsuransi: e.target.value,
//                                             isPKS: false
//                                         }))
//                                     }
//                                 />
//                                 {insuranceData.namaAsuransi && (
//                                     <div className="alert alert-warning mt-2">
//                                         <small>
//                                             Asuransi ini tidak bekerja sama dengan rumah sakit (Non-PKS). 
//                                             Pembayaran akan diatur sebagai Tunai, tetapi Anda dapat mengajukan reimbursement ke pihak asuransi.
//                                         </small>
//                                     </div>
//                                 )}
//                                 <div className="mt-2">
//                                     <Button 
//                                         variant="link" 
//                                         size="sm" 
//                                         className="p-0"
//                                         onClick={() => {
//                                             setShowCustomInput(false);
//                                             setInsuranceData(prev => ({ 
//                                                 ...prev, 
//                                                 namaAsuransi: "",
//                                                 isPKS: true
//                                             }));
//                                         }}
//                                     >
//                                         Kembali ke daftar asuransi
//                                     </Button>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                     <div className="mb-3">
//                         <TextField
//                             name="nomorPolis"
//                             label="Nomor Polis"
//                             placeholder="Masukkan nomor polis asuransi"
//                             onChange={(e) => 
//                                 setInsuranceData(prev => ({ ...prev, nomorPolis: e.target.value }))
//                             }
//                         />
//                     </div>
//                 </FormProvider>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onClose}>
//                     Batal
//                 </Button>
//                 <Button 
//                     variant="primary" 
//                     onClick={handleFormSubmit}
//                     disabled={!isFormValid || isLoading}
//                 >
//                     {isLoading ? (
//                         <>
//                             <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                             Menyimpan...
//                         </>
//                     ) : 'Simpan'}
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
//   }
// );

// ModalInsurance.displayName = "ModalInsurance";
// export default ModalInsurance;