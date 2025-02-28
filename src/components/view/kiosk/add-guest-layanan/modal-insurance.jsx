import React, {memo, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TextField from "@/components/ui/text-field";
import SelectField from '@/components/ui/select-field';
import { FormProvider, useForm } from 'react-hook-form';

const ModalInsurance = memo(({ onOpen, onClose, onSubmit, formConfig = [] }) => {
    const [insuranceData, setInsuranceData] = useState({ provider: "", policyNumber: "" });
    
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
    
    // Handle form field changes
    const handleChange = (e) => {
        // Check if e is an event (from regular inputs) or direct value (from select components)
        const name = e?.target?.name;
        const value = e?.target?.value;
        
        if (name && value !== undefined) {
            // Standard event object
            setInsuranceData(prev => ({ ...prev, [name]: value }));
        } else if (typeof e === 'object' && e !== null) {
            // Might be a custom event structure or direct value update
            const fieldName = e.name;
            const fieldValue = e.value;
            
            if (fieldName) {
                setInsuranceData(prev => ({ ...prev, [fieldName]: fieldValue }));
            }
        }
    };
    
    // Handle the form submission
    const handleFormSubmit = () => {
        onSubmit(insuranceData);
        onClose();
    };
    
    // Insurance options for the SelectField
    const insuranceOptions = [
        { label: "BPJS Kesehatan", value: "BPJS Kesehatan" },
        { label: "Prudential", value: "Prudential" },
        { label: "Allianz", value: "Allianz" },
        { label: "AXA Mandiri", value: "AXA Mandiri" },
        { label: "Lainnya", value: "Lainnya" }
    ];

    return (
        <Modal show={onOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Asuransi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormProvider {...methods}>
                    <div className="mb-3">
                        <SelectField
                            name="provider"
                            label="Penyedia Asuransi"
                            options={insuranceOptions}
                            placeholder="Pilih penyedia asuransi"
                            onChange={(selected) => {
                                if (selected && selected.value) {
                                    setInsuranceData(prev => ({ ...prev, provider: selected.value }));
                                } else {
                                    setInsuranceData(prev => ({ ...prev, provider: "" }));
                                }
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            name="policyNumber"
                            label="Nomor Polis"
                            placeholder="Masukkan nomor polis asuransi"
                            onChange={(e) => 
                                setInsuranceData(prev => ({ ...prev, policyNumber: e.target.value }))
                            }
                        />
                    </div>
                </FormProvider>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Batal
                </Button>
                <Button variant="primary" onClick={handleFormSubmit}>
                    Simpan
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

ModalInsurance.displayName = "ModalInsurance";
export default ModalInsurance;