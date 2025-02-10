import React, {memo, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TextField from "@/components/ui/text-field"; 
import SelectField from '@/components/ui/select-field';

const ModalInsurance = memo(({ onOpen, onClose, onSubmit }) => {
    const [isInsuranceData, setInsuranceData] = useState({ provider: "", policyNumber: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInsuranceData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(isInsuranceData);
        setInsuranceData({ provider: "", policyNumber: "" }); // Reset form setelah submit
        onClose();
    };

    return (
        <Modal show={onOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Asuransi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SelectField
                    id="provider"
                    name="provider"
                    label="Penyedia Asuransi"
                    options={[
                        { value: 'allianz', label: 'Allianz' },
                        { value: 'prudential', label: 'Prudential' },
                    ]}
                    placeholder="Masukkan nama penyedia asuransi"
                    value={isInsuranceData.provider}
                    onChange={handleChange}
                />
                <TextField
                    id="policyNumber"
                    name="policyNumber"
                    label="Nomor Polis"
                    placeholder="Masukkan nomor polis asuransi"
                    value={isInsuranceData.policyNumber}
                    onChange={handleChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Batal
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Simpan
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

ModalInsurance.displayName = "ModalInsurance";
export default ModalInsurance;
