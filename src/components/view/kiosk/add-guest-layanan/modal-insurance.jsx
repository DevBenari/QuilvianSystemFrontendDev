import React, { memo, useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice";
import { createAsuransiPasien } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiPasienSlice";

const ModalInsurance = memo(
  ({ onOpen, onClose, onSubmit, pasienId, formConfig = [] }) => {
    const dispatch = useDispatch();
    const { data: asuransiList, loading: asuransiLoading, error: asuransiError } = useSelector((state) => state.Asuransi);
    const { loading: asuransiPasienLoading } = useSelector((state) => state.AsuransiPasien);
    
    // Initialize with pasienId
    const [insuranceData, setInsuranceData] = useState({ 
        namaAsuransi: "", 
        noPolis: "",
        isPKS: true,
        pasienId: pasienId // Initialize with pasienId from props
    });

    // Track fetch attempts to prevent infinite loops
    const fetchAttempted = useRef(false);

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

    // Insurance options state
    const [insuranceOptions, setInsuranceOptions] = useState([]);

    // Update insuranceData when pasienId changes
    useEffect(() => {
        setInsuranceData(prev => ({
            ...prev,
            pasienId: pasienId
        }));
    }, [pasienId]);

    // Process insurance data either from props or from API
    useEffect(() => {
        if (fetchAttempted.current) return;
        
        const prepareInsuranceOptions = (data) => {
            if (!data || !Array.isArray(data) || data.length === 0) {
                setInsuranceOptions([{ label: "Lainnya", value: "Lainnya" }]);
                return;
            }
            
            const options = data.map(insurance => ({
                label: insurance.namaAsuransi,
                value: insurance.asuransiId,
                id: insurance.asuransiId
            }));

            // Add "Lainnya" option at the end
            options.push({ label: "Lainnya", value: "Lainnya" });
            setInsuranceOptions(options);
        };

        // Only fetch if we don't already have the data
        if (asuransiList && asuransiList.length > 0) {
            prepareInsuranceOptions(asuransiList);
        } else if (!asuransiLoading && !asuransiError) {
            // Mark that we've attempted to fetch
            fetchAttempted.current = true;
            // Dispatch once and don't retry on error
            dispatch(fetchAsuransi({ page: 1, perPage: 100 })).catch(() => {
                // Always provide the default option on error
                setInsuranceOptions([{ label: "Lainnya", value: "Lainnya" }]);
            });
        } else if (asuransiError) {
            // If there's already an error in the state, just use default options
            setInsuranceOptions([{ label: "Lainnya", value: "Lainnya" }]);
        }
    }, [dispatch, asuransiList, asuransiLoading, asuransiError]);

    const [showCustomInput, setShowCustomInput] = useState(false);

    // Handle the form submission
    const handleFormSubmit = async () => {
        // Ensure pasienId is included
        if (!pasienId) {
            console.error("Missing patient ID - cannot submit form");
            alert("ID Pasien tidak tersedia. Silakan coba kembali ke screening pasien.");
            return;
        }
        
        // Ensure the data has the correct format expected by the API
        const submitData = {
            pasienId: pasienId,
            asuransiId: insuranceData.asuransiId,
            namaAsuransi: insuranceData.namaAsuransi,
            noPolis: insuranceData.noPolis,
            isPKS: insuranceData.isPKS
        };
        
        try {
            const result = await dispatch(createAsuransiPasien(submitData));
            
            if (result.error) {
                throw new Error(result.error.message || "Failed to save insurance data");
            }
            
            // Get the data from the API response or use the submitted data
            const savedData = result.payload?.data || submitData;
            
            // Call the provided onSubmit callback with the saved data
            if (typeof onSubmit === 'function') {
                onSubmit(savedData);
            }
            
            onClose(true);
        } catch (error) {
            console.error("Error saving insurance data:", error);
            alert("Gagal menyimpan data asuransi: " + (error.message || "Silakan coba lagi"));
        }
    };

    // Check if form can be submitted
    const isFormValid = insuranceData.namaAsuransi && 
                        insuranceData.noPolis && 
                        pasienId;
    
    const isLoading = asuransiLoading || asuransiPasienLoading;

    return (
        <Modal show={onOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Asuransi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormProvider {...methods}>
                    {/* Patient ID Information - Read only */}
                    <div className="mb-3">
                        <div className="alert alert-info">
                            <small>
                                <i className="bi bi-info-circle me-2"></i>
                                Data asuransi akan ditambahkan untuk pasien dengan ID: {pasienId || "Belum teridentifikasi"}
                            </small>
                        </div>
                    </div>
                    
                    {asuransiError && (
                        <div className="alert alert-warning mb-3">
                            <small>
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                Gagal memuat daftar asuransi dari server. Anda tetap dapat menambahkan asuransi secara manual.
                            </small>
                        </div>
                    )}
                    
                    <div className="mb-3">
                        {!showCustomInput ? (
                            <SelectField
                                name="namaAsuransi"
                                label="Penyedia Asuransi"
                                options={insuranceOptions}
                                placeholder={isLoading ? "Memuat data asuransi..." : "Pilih penyedia asuransi"}
                                isDisabled={isLoading}
                                onChange={(selected) => {
                                    if (selected && selected.value) {
                                        if (selected.value === "Lainnya") {
                                            setShowCustomInput(true);
                                            setInsuranceData(prev => ({ 
                                                ...prev, 
                                                namaAsuransi: "", 
                                                asuransiId: null,  // Clear the ID
                                                isPKS: false
                                            }));
                                        } else {
                                            setInsuranceData(prev => ({ 
                                                ...prev, 
                                                asuransiId: selected.value,  // Set the ID properly
                                                namaAsuransi: selected.label,  // Use the label as the name
                                                isPKS: true
                                            }));
                                        }
                                    } else {
                                        setInsuranceData(prev => ({ 
                                            ...prev, 
                                            namaAsuransi: "",
                                            asuransiId: null
                                        }));
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
                                            isPKS: false
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
                                                isPKS: true
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
                            name="noPolis"
                            label="Nomor Polis"
                            placeholder="Masukkan nomor polis asuransi"
                            onChange={(e) => 
                                setInsuranceData(prev => ({ ...prev, noPolis: e.target.value }))
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
                    disabled={!isFormValid || isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Menyimpan...
                        </>
                    ) : 'Simpan'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
  }
);

ModalInsurance.displayName = "ModalInsurance";
export default ModalInsurance;