import React, {memo, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TextField from "@/components/ui/text-field"; 
import SelectField from '@/components/ui/select-field';
import { FormProvider, useForm } from 'react-hook-form';

const ModalInsurance = memo(({ onOpen, onClose, onSubmit, formConfig}) => {
    const [isInsuranceData, setInsuranceData] = useState({ provider: "", policyNumber: "" });
     const methods = useForm({
        defaultValues: formConfig.reduce((defaults, section) => {
          section.fields?.forEach((field) => {
            defaults[field.name] = field.value || "";
          });
          return defaults;
        }, {}),
        mode: "onSubmit", 
      });

      const handleChange = (event = {}) => {
        const { target } = event;
        if (!target) return; // Hindari error jika target undefined
        
        const { name, value } = target;
        console.log(name, value);
    };
    

    const {setValue, watch, handleSubmit: formSubmit} = methods;

    return (
        <FormProvider {...methods}>
            <Modal show={onOpen} onHide={onClose} className='p-5 w-100'>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Asuransi</Modal.Title>
            </Modal.Header>
            <form onSubmit={formSubmit(onSubmit)}>
                <Modal.Body className='p-5 w-100'>
                    <SelectField
                        id="provider"
                        name="provider"
                        label="Penyedia Asuransi"
                        options={[
                            { value: 'allianz', label: 'Allianz' },
                            { value: 'prudential', label: 'Prudential' },
                            { value: 'axaManulife', label: 'AXA Manulife' },
                        ]}
                        placeholder="Masukkan nama penyedia asuransi"
                        // value={isInsuranceData.provider}
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
                    <Button type="submit" variant="primary" onClick={onClose}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
        </FormProvider>
    );
});

ModalInsurance.displayName = "ModalInsurance";
export default ModalInsurance;
