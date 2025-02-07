'use client';
import React, { memo,useState, useEffect } from 'react';
import TextField from "@/components/ui/text-field";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

const DashboardLayananPoli = memo(() => {
    const [isVerified, setIsVerified] = useState(false);  // Menyimpan status validasi NIK
    const [loading, setLoading] = useState(false);        // Menyimpan status loading
    const [errorMessage, setErrorMessage] = useState(''); // Menyimpan pesan error jika NIK tidak valid
    const router = useRouter();

    const methods = useForm({
        defaultValues: { noIdentitas: '' },               // Nilai default untuk NIK
        mode: "onSubmit"
    });

    const { watch, handleSubmit, setValue } = methods;
    const noIdentitas = watch("noIdentitas");

    // Fungsi validasi NIK ke backend atau database (simulasi)
    const validateNIK = async (nik) => {
        setLoading(true);
        setErrorMessage('');
        
        // Simulasi API call atau validasi (ganti dengan logika backend Anda)
        return new Promise((resolve) => {
            setTimeout(() => {
                if (nik === "1234567890123456") { // Contoh NIK valid
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);  // Simulasi waktu tunggu 1 detik
        });
    };

    // Fungsi submit form
    // Modifikasi fungsi submit form
const onSubmit = async (data) => {
    const { noIdentitas } = data;

    // Lakukan validasi NIK
    const isValid = await validateNIK(noIdentitas);

    if (isValid) {
        setIsVerified(true);  
        setLoading(false);

        // Simulasi data pasien valid (dari backend atau dummy)
        const patientData = {
            nik: "1234567890123456",
            name: "John Doe",
            address: "Jl. Merdeka 10",
        };

        // Simpan data pasien di LocalStorage atau kirim melalui URL
        localStorage.setItem("patientData", JSON.stringify(patientData));
        router.push("/kiosk/guest-layanan-poli/order-layanan-poli");
    } else {
        setErrorMessage("NIK tidak valid atau tidak ditemukan.");
        setLoading(false);
    }
};


    // Jika NIK sudah valid, lakukan navigasi atau alihkan ke form berikutnya
    useEffect(() => {
        if (isVerified) {
            console.log("NIK berhasil diverifikasi. Alihkan ke form layanan berikutnya...");
            // Contoh: Anda bisa melakukan navigasi ke halaman lain di sini
            router.push("/kiosk/guest-layanan-poli/order-layanan-poli");
        }
    }, [isVerified]);

    // Fungsi auto-submit saat NIK lengkap (misalnya NIK memiliki 16 digit)
    useEffect(() => {
        if (noIdentitas.length === 16) {
            handleSubmit(onSubmit)();  // Otomatis submit jika NIK sudah lengkap
        }
    }, [noIdentitas, handleSubmit]);

    return (
        <FormProvider {...methods}>
            <Container className='mt-5'>
                <div className="d-flex justify-content-center align-items-center py-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col xs="12">
                                <h1 className="text-center text-white">Scanner KTP</h1>
                            </Col>
                            <Col xs="12" className="text-white">
                                <TextField
                                    name="noIdentitas"
                                    label="NIK"
                                    placeholder="Enter NIK"
                                    rules={{ 
                                        required: 'NIK harus diisi', 
                                        minLength: { value: 16, message: 'NIK harus terdiri dari 16 digit' } 
                                    }}
                                    // colSize={12}
                                />
                                {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                            </Col>
                            <Col className='d-flex justify-content-center '>
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    disabled={loading}
                                    className='w-100'
                                >
                                    {loading ? 'Validating...' : 'Submit'}
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </div>
            </Container>
        </FormProvider>
    );
});

DashboardLayananPoli.displayName = "DashboardLayananPoli";
export default DashboardLayananPoli;
