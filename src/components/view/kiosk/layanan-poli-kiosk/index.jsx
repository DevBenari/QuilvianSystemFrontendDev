'use client';
import React, { memo, useRef, useState } from 'react';
import Tesseract from 'tesseract.js';
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import TextField from "@/components/ui/text-field";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

const DashboardLayananPoli = memo(() => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [ocrText, setOcrText] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [cameraActive, setCameraActive] = useState(false);
    const router = useRouter();

    const methods = useForm({
        defaultValues: { noIdentitas: '' },
        mode: "onSubmit"
    });

    const { watch, setValue, handleSubmit } = methods;
    const noIdentitas = watch("noIdentitas");

    // Fungsi untuk memulai kamera
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCameraActive(true);
            }
        } catch (error) {
            console.error("Error membuka kamera:", error);
            setErrorMessage("Gagal membuka kamera.");
        }
    };

    // Fungsi untuk mengambil gambar dari video
    const captureImage = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            return canvas.toDataURL('image/png');
        }
        return null;
    };

    // Fungsi untuk melakukan OCR pada gambar yang diambil
    const handleScan = () => {
        const imageData = captureImage();
        if (imageData) {
            setLoading(true);
            setErrorMessage('');

            Tesseract.recognize(imageData, 'eng', {
                logger: (m) => console.log(m),
            }).then(({ data: { text } }) => {
                console.log('Hasil OCR:', text);
                setOcrText(text);
                extractDataFromText(text);
                setLoading(false);
            }).catch((error) => {
                console.error('Error OCR:', error);
                setErrorMessage('Gagal membaca data dari gambar.');
                setLoading(false);
            });
        }
    };

    // Fungsi untuk mengekstrak data dari teks OCR
    const extractDataFromText = (text) => {
        const nikMatch = text.match(/\d{16}/);
        if (nikMatch) {
            setValue('noIdentitas', nikMatch[0]);
        } else {
            setErrorMessage('Tidak dapat menemukan NIK dalam gambar.');
        }
    };

    // Fungsi validasi NIK ke backend atau database (simulasi)
    const validateNIK = async (nik) => {
        setLoading(true);
        setErrorMessage('');

        return new Promise((resolve) => {
            setTimeout(() => {
                if (nik === "1234567890123456") {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        });
    };

    // Fungsi submit form manual
    const onSubmitManual = async (data) => {
        const { noIdentitas } = data;

        const isValid = await validateNIK(noIdentitas);

        if (isValid) {
            setLoading(false);

            // Simulasi data pasien valid
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

    return (
        <FormProvider {...methods}>
            <Container className='my -5'>
                <Row className="justify-content-center">
                    <Col xs="12" className="text-center mb-3">
                        <h1 className="text-white">Scanner Kartu Pasien</h1>
                    </Col>
                    <Col xs="12" className="text-center mb-3">
                        <video ref={videoRef} autoPlay className="w-100" style={{ maxHeight: '400px' }} />
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </Col>
                    <Col xs="12" className="text-center mb-3">
                        <Button variant="primary" onClick={startCamera} disabled={cameraActive}>
                            {cameraActive ? 'Kamera Aktif' : 'Mulai Kamera'}
                        </Button>
                        <Button variant="success" onClick={handleScan} disabled={loading || !cameraActive} className="ml-3">
                            {loading ? 'Memindai...' : 'Scan KTP'}
                        </Button>
                    </Col>
                    <Col xs="12" className="text-white">
                        <Form onSubmit={handleSubmit(onSubmitManual)}>
                            <TextField
                                name="noIdentitas"
                                label="NIK"
                                placeholder="Masukkan NIK"
                                rules={{
                                    required: 'NIK harus diisi',
                                    minLength: { value: 16, message: 'NIK harus terdiri dari 16 digit' },
                                }}
                            />
                            <Button variant="primary" type="submit" className="mt-3 w-100">
                                {loading ? 'Validating...' : 'Submit'}
                            </Button>
                        </Form>
                        {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                        {ocrText && <pre className="text-success mt-2">{ocrText}</pre>}
                    </Col>
                </Row>
            </Container>
        </FormProvider>
    );
});

DashboardLayananPoli.displayName = "DashboardLayananPoli";
export default DashboardLayananPoli;
