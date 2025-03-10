import React, {memo, useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TextField from "@/components/ui/text-field";
import SelectField from '@/components/ui/select-field';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsuransi } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiSlice';
import { createAsuransiPasien, resetCreateStatus } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/asuransiPasienSlice';
import { showAlert } from '@/components/features/alert/custom-alert';

const ModalInsurance = memo(({ onOpen, onClose, onSubmit,  formConfig = [] }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.Asuransi);
    const { createLoading, createSuccess, createError } = useSelector((state) => state.asuransiPasien || {});
    
    const [insuranceData, setInsuranceData] = useState({ 
        namaAsuransi: "", 
        nomorPolis: "",
        isPKS: true,
        asuransiId: ""
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

    // Reset create status when component unmounts
    useEffect(() => {
        return () => {
            dispatch(resetCreateStatus());
        };
    }, [dispatch]);

    // Handle create success
    useEffect(() => {
        if (createSuccess) {
            Toast.fire({
                icon: 'success',
                title: 'Asuransi pasien berhasil ditambahkan'
            });
            
            // Reset status after showing toast
            dispatch(resetCreateStatus());
            onClose();
        }
    }, [createSuccess, dispatch, onClose]);

    // Handle create error
    useEffect(() => {
        if (createError) {
            Toast.fire({
                icon: 'error',
                title: 'Gagal menambahkan asuransi pasien',
                text: createError
            });
            
            // Reset status after showing toast
            dispatch(resetCreateStatus());
        }
    }, [createError, dispatch]);

    const [showCustomInput, setShowCustomInput] = useState(false);
    
    // Handle the form submission
    const handleFormSubmit = async () => {
        // if (!pasienId) {
        //     showAlert.warning()
        // }
        
        // Format data for API
        const formattedData = {
            // pasienId: pasienId,
            noPolis: insuranceData.nomorPolis || insuranceData.nomorPolis,
            asuransiId: insuranceData.asuransiId
        };
        
        // If it's a custom insurance (non-PKS), we need to handle it differently
        // For custom insurances, first check if we need to create a new insurance provider
        if (!insuranceData.isPKS && showCustomInput) {
            // Since it's a non-PKS insurance, we still create the asuransi pasien record
            // but mark it as non-PKS for the frontend to handle differently
            formattedData.isPKS = false;
        }
        
        // Dispatch action to create asuransi pasien
        await dispatch(createAsuransiPasien(formattedData));
        
        // Format data for local component state
        const formattedInsurance = {
            namaAsuransi: insuranceData.NamaAsuransi || insuranceData.namaAsuransi,
            nomorPolis: insuranceData.NomorPolis || insuranceData.nomorPolis,
            isPKS: insuranceData.IsPKS || insuranceData.isPKS,
            asuransiId: insuranceData.asuransiId
        };
        
        // Call the onSubmit callback with the formatted insurance data
        onSubmit(formattedInsurance);
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
                                name="NamaAsuransi"
                                label="Penyedia Asuransi"
                                options={insuranceOptions}
                                placeholder="Pilih penyedia asuransi"
                                onChange={(selected) => {
                                    if (selected && selected.value) {
                                        if (selected.value === "Lainnya") {
                                            setShowCustomInput(true);
                                            setInsuranceData(prev => ({ 
                                                ...prev, 
                                                NamaAsuransi: "", 
                                                IsPKS: false,
                                                asuransiId: null
                                            }));
                                        } else {
                                            // Find the selected insurance to get its ID
                                            const selectedInsurance = insuranceOptions.find(
                                                option => option.value === selected.value
                                            );
                                            
                                            setInsuranceData(prev => ({ 
                                                ...prev, 
                                                NamaAsuransi: selected.value,
                                                IsPKS: true,
                                                asuransiId: selectedInsurance?.id || null
                                            }));
                                        }
                                    } else {
                                        setInsuranceData(prev => ({ 
                                            ...prev, 
                                            NamaAsuransi: "",
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
                                            NamaAsuransi: e.target.value,
                                            IsPKS: false,
                                            asuransiId: null
                                        }))
                                    }
                                />
                                {insuranceData.NamaAsuransi && (
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
                                                NamaAsuransi: "",
                                                IsPKS: true,
                                                asuransiId: null
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
                            name="NomorPolis"
                            label="Nomor Polis"
                            placeholder="Masukkan nomor polis asuransi"
                            onChange={(e) => 
                                setInsuranceData(prev => ({ ...prev, NomorPolis: e.target.value }))
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
                    disabled={!insuranceData.NamaAsuransi || !insuranceData.NomorPolis || loading || createLoading}
                >
                    {createLoading ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

ModalInsurance.displayName = "ModalInsurance";
export default ModalInsurance;