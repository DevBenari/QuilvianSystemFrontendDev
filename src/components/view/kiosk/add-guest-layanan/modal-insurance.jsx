import React, { memo, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TextField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsuransi } from "@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-asuransi/AsuransiPasienSlice";

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
                                                IsPKS: false
                                            }));
                                        } else {
                                            setInsuranceData(prev => ({ 
                                                ...prev, 
                                                NamaAsuransi: selected.value,
                                                IsPKS: true
                                            }));
                                        }
                                    } else {
                                        setInsuranceData(prev => ({ ...prev, NamaAsuransi: "" }));
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
                                            IsPKS: false
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
                    disabled={!insuranceData.NamaAsuransi || !insuranceData.NomorPolis || asuransiList}
                >
                    {asuransiList ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
  }
);

ModalInsurance.displayName = "ModalInsurance";
export default ModalInsurance; 