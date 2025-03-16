'use client'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// import UseSelectWilayah from "@/lib/hooks/useSelectWilayah";
import DynamicStepForm from '@/components/features/dynamic-form/dynamicForm/dynamicFormSteps';
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap';
import ButtonNav from '@/components/ui/button-navigation';
import PrintPatientCard from './patientCard';
import PrintableQueueNumber from './patientAntrian';
import { useDispatch, useSelector } from 'react-redux';
import { AddPasienSlice } from '@/lib/state/slice/Manajemen-kesehatan-slices/pasienSlice';
import { fetchTitle } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/TitleSlice';
import { fetchIdentitas } from '@/lib/state/slice/Manajemen-kesehatan-slices/MasterData/master-informasi/identitasSlice';;
import useSelectWilayah from '@/lib/hooks/useSelectWilayah';
import UploadPhotoField from '@/components/ui/uploadPhoto-field';
import { showAlert } from '@/components/features/alert/custom-alert';
// Import komponen pendaftaran layanan
import ServiceRegistration from './ServiceRegistration';

const KioskPendaftaranPasien = memo(() => {
    const { setValue } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [selectedPrintType, setSelectedPrintType] = useState(null);
    // State untuk menampilkan modal pendaftaran layanan
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [serviceResult, setServiceResult] = useState(null);
    
    // fungsi untuk melakukan select provinsi
    const {
        selectedNegara,
        setSelectedNegara,
        selectedProvinsi,
        setSelectedProvinsi,
        selectedKabupaten,
        setSelectedKabupaten,
        selectedKecamatan,
        setSelectedKecamatan,
        setSelectedKelurahan,
        negaraOptions,
        provinsiOptions,
        kabupatenOptions,
        kecamatanOptions,
        kelurahanOptions,
        negaraLoading,
        provinsiLoading,
        handleLoadMoreNegara,
        handleLoadMoreProvinsi,
        handleLoadMoreKabupaten,
        handleLoadMoreKecamatan,
        handleLoadMoreKelurahan
      } = useSelectWilayah();

      useEffect(() => {
        if (selectedNegara) {
          const isIndonesia = negaraOptions.find(opt => opt.value === selectedNegara)?.label === 'Indonesia';
          if (!isIndonesia) {
            setValue('provinsiId', null);
            setValue('kabupatenKotaId', null);
          }
        }
      }, [selectedNegara, setValue, negaraOptions]);
    
    const dispatch = useDispatch();

    
    const {data: titles,loading, totalPage } = useSelector((state) => state.titles)
    const {data: identitas} = useSelector((state) => state.identitas)
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchTitle({page, totalPage}))
        dispatch(fetchIdentitas(page, totalPage))
        dispatch(AddPasienSlice())
    }, [dispatch, page, totalPage]);

    const titlesOptions = titles.map(item => ({
        label: item.namaTitle,
        value: item.titleId    
      })) || [];

    const identityOption = identitas.map(item => ({
        label: item.jenisIdentitas,
        value: item.identitasId
    }))

    // useEffect(() => {
    //     if (error) {
    //         router.push("/error-page");
    //     }
    // }, [error, router]);
    
    if (loading) {
        return <div>Loading data pasien...</div>;
    }

    const handleNegaraChange = (selectedOption) => {
        if (selectedOption) {
          setSelectedNegara(selectedOption.value);
        }
      };

    const formFields = 
    [
        {
            section: "Informasi Pasien",
            fields: 
            [
                {
                    type: "select",
                    id: "tipePasien",
                    label: "Tipe Pasien ",
                    name: "TipePasien",
                    placeholder: "Tipe Pasien",
                    options: [
                        {label:"Umum", value:"Umum"},
                        {label: "Rujukan", value: "rujukan"},
                    ],
                    
                    colSize: 6,
                },
                {
                    type: "select",
                    id: "titlesId",
                    label: "Title",
                    name: "TitlesId",
                    placeholder: "Title",
                    options: titlesOptions,
                    
                    colSize: 6,
                },
                {
                    type: "text",
                    id: "namaLengkap",
                    label: "Nama Pasien",
                    name: "NamaLengkap",
                    placeholder: "Nama Pasien",
                    
                    colSize: 6,
                },
                {
                     type:"select",
                     id: "identitasId",
                     label: "Identitas",
                     name:"IdentitasId",
                     placeholder: "Identitas",
                     options: identityOption,

                     colSize: 6
                },
                {
                    type: "text",
                    id: "noIdentitas",
                    label: "No Identitas",
                    name: "NoIdentitas",
                    placeholder: "No Identitas",
                    
                    colSize: 6
                },
                {
                    type: "select",
                    id: "statusKewarganegaraan",
                    label: "Status Kewarganegaraan",
                    name: "StatusKewarganegaraan",
                    placeholder: "Pilih Status Kewarganegaraan",
                    options: [
                        { label: "WNI", value: "WNI" },
                        { label: "WNA", value: "WNA" },
                    ],
                    colSize: 6,

                },
                {
                    type:"text",
                    id: "tempatLahir",
                    label: "Tempat Lahir",
                    name:"TempatLahir",
                    placeholder: "Tempat Lahir",
                    
                    colSize: 6
                },
                {
                    type: "date",
                    id: "tanggalLahir",
                    label: "Tanggal Lahir",
                    name: "TanggalLahir",
                    
                    colSize: 6
                },
                {
                    type: "select",
                    id: "jenisKelamin",
                    label: "Jenis Kelamin",
                    name: "JenisKelamin",
                    placeholder: "Jenis Kelamin",
                    options: [ 
                        { label: "Laki-laki", value: "Laki-Laki" },
                        { label: "Perempuan", value: "Perempuan" }
                    ],
                    // Field akan aktif jika title adalah "Bayi", dan dinonaktifkan untuk title lainnya
                    disabled: (formValues) => {
                        const selectedTitleId = formValues.TitlesId;
                        if (!selectedTitleId) return false; // Jika title belum dipilih, field tidak dinonaktifkan
                        
                        const selectedTitle = titlesOptions.find(title => title.value === selectedTitleId);
                        return selectedTitle?.label !== "Bayi"; // Nonaktifkan jika bukan "Bayi"
                    },
                    colSize: 6
                },
                {
                    type: "custom",
                    id: "foto",
                    name: "Foto",
                    label: "Upload Foto Pasien",
                    customRender: (props) => <UploadPhotoField {...props} />,
                    colSize: 6,
                  },
            ]
        },
        {
            section: "Informasi Kontak",
            fields: 
            [
                {
                    type: "text",
                    id: "noTelepon",
                    label: "No Telepon",
                    name: "NoTelepon",
                    placeholder: "No Telepon",
                    rules: { required: "No Telepon is required" },
                    colSize: 6
                },
                {
                    type: "textarea",
                    id: "alamatIdentitas",
                    label: "alamat Sesuai Identitas",
                    name: "AlamatIdentitas",
                    placeholder: "Alamat",
                    colSize: 6
                },
                {
                    type: "custom",
                    id: "alamatDomisiliWithCheckbox",
                    name: "AlamatDomisili",
                    label: "Alamat Saat Ini",
                    customRender: ({ field, commonProps, methods }) => {
                      return (
                        <div>
                          <Form.Label>{commonProps.label}</Form.Label>
                          <Form.Check
                            type="checkbox"
                            id="copyAddressCheckbox"
                            label="Salin dari alamat identitas"
                            onChange={(e) => {
                              if (e.target.checked) {
                                // Jika checkbox dicentang, salin nilai alamat identitas ke alamat domisili
                                const alamatIdentitas = methods.getValues("AlamatIdentitas");
                                methods.setValue("AlamatDomisili", alamatIdentitas);
                              }
                            }}
                            className="mb-2"
                          />
                          <Form.Control
                            as="textarea"
                            id={commonProps.id}
                            name={commonProps.name}
                            placeholder={commonProps.placeholder || "Alamat Domisili"}
                            rows={3}
                            {...methods.register(commonProps.name, commonProps.rules)}
                            isInvalid={methods.formState.errors[commonProps.name]}
                            disabled={commonProps.disabled}
                          />
                          {methods.formState.errors[commonProps.name] && (
                            <Form.Control.Feedback type="invalid">
                              {methods.formState.errors[commonProps.name].message}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      );
                    },
                    colSize: 6
                  },
                {
                    type: "select",
                    id: "negaraId",
                    label: "Negara",
                    name: "NegaraId",
                    placeholder: "Pilih Negara",
                    options: negaraOptions,
                    isLoading: negaraLoading,
                    onChange: (selected) => {
                      setSelectedNegara(selected?.value);
                      // Reset nilai provinsi dan kabupaten
                      setValue('provinsiId', null);
                      setValue('kabupatenKotaId', null);
                    },
                    onMenuScrollToBottom: handleLoadMoreNegara,
                
                    colSize: 6
                },
                {
                    type: "select",
                    id: "provinsiId",
                    label: "Provinsi",
                    name: "ProvinsiId",
                    placeholder: "Pilih Provinsi",
                    options: provinsiOptions,
                    isLoading: provinsiLoading,
                    onChange: (selected) => {
                        setSelectedProvinsi(selected?.value);
                        // Reset nilai kabupaten ketika provinsi berubah
                        setValue('kabupatenKotaId', null);
                    },
                    onMenuScrollToBottom: handleLoadMoreProvinsi,
                    disabled: !selectedNegara || (
                        negaraOptions.find(opt => opt.value === selectedNegara)?.label !== 'Indonesia'
                    ),
                    colSize: 6
                },
                {
                    type: "select",
                    id: "kabupatenKotaId",
                    label: "Kabupaten/Kota",
                    name: "KotaId",
                    placeholder: "Pilih Kabupaten/Kota",
                    options: kabupatenOptions,
                    // isLoading: kabupatenLoading,
                    onChange: (selected) => setSelectedKabupaten(selected?.value),
                    onMenuScrollToBottom: handleLoadMoreKabupaten,
                    disabled: !selectedProvinsi,
                    
                    colSize: 6
                },
                {
                    type: "select",
                    id: "kecamatanId",
                    label: "Kecamatan",
                    name: "KecKabId",
                    placeholder: "Pilih Kecamatan",
                    options: kecamatanOptions,
                    // isLoading: kecamatanLoading,
                    onChange: (selected) => setSelectedKecamatan(selected?.value),
                    onMenuScrollToBottom: handleLoadMoreKecamatan,
                    disabled: !selectedKabupaten,
                    
                    colSize: 6
                },
                {
                    type: "select",
                    id: "kelurahanId",
                    label: "Kelurahan",
                    name: "KelurahanId",
                    placeholder: "Pilih Kelurahan",
                    options: kelurahanOptions,
                    onChange: (selected) => setSelectedKelurahan(selected?.value),
                    onMenuScrollToBottom: handleLoadMoreKelurahan,
                    disabled: !selectedKecamatan,
                    
                    colSize: 6
                },
                {
                    type:"text",
                    id: "kodePos",
                    label: "Kode Pos",
                    name: "KodePos",
                    placeholder:"Kode Pos",
                    colSize:6
                },
                {
                    type: "email",
                    id: "email",
                    label: "Email Pasien (Jika Ada)",
                    name: "Email",
                    placeholder: "Email Pasien",
                    colSize: 6
                }
            ]
        },
    ];

    const handleSubmit = (data) => {
        // Create a new FormData object
        const formData = new FormData();
        
        // Add all text fields to FormData
        Object.keys(data).forEach((key) => {
            // Skip the file field, we'll handle it separately
            if (key !== 'foto' && data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });
        
        // Add the file if it exists
        if (data.foto instanceof File) {
            formData.append("fotoPasien", data.foto);
        }
    
        console.log("Data yang dikirim ke backend:", Object.fromEntries(formData));
        
        // Dispatch the action with FormData
        dispatch(AddPasienSlice(formData))
            .then((result) => {
                if (AddPasienSlice.fulfilled.match(result)) {
                    console.log("Data pasien berhasil dikirim:", result.payload);
                    showAlert.success("Data pasien berhasil dikirim!");
                    
                    const enhancedData = {
                        ...data,
                        provinsiId: data.provinsiId || null, 
                        noRekamMedis: `RM-${new Date().getTime()}`,
                        queueNumber: `A-${Math.floor(Math.random() * 100)}`,
                        registrationDate: new Date().toLocaleDateString('id-ID'),
                        noIdentitas: `${data.NoIdentitas}`,
                        qrCodeUrl: result.payload.qrCodeUrl || null,
                        fotoPasienUrl: result.payload.uploadFotoUrl || null,
                        patientId: result.payload.patientId || `PID-${new Date().getTime()}`
                    };
    
                    setSubmittedData(enhancedData);
                    setIsSubmitted(true);
                    
                    // Secara opsional, tunjukkan dialog untuk daftar ke layanan
                    setShowServiceModal(true);
                } else {
                    console.error("Gagal mengirim data:", result.error?.message);
                    showAlert.error("Gagal mengirim data pasien!");
                }
            })
            .catch((error) => {
                console.error("Error saat dispatch:", error);
                showAlert.error("Terjadi kesalahan saat mengirim data pasien!");
            });
    };

    const handleServiceRegistered = (serviceData) => {
        // Simpan data hasil pendaftaran layanan
        setServiceResult(serviceData);
        setShowServiceModal(false);
    };

    const handlePrint = (type) => {
        setSelectedPrintType(type);
        setTimeout(() => {
            window.print();
            setSelectedPrintType(null);
        }, 500);
    };

    if (isSubmitted && submittedData) {
        return (
            <Card className="m-4">
                <Card.Body>
                    <div className="kiosk-logo mb-4 text-center">
                        <Image src="/Images/pngwing-com.png" height="100" alt="logo" />
                        <h4 className="text-success mt-3">Data Pendaftaran Pasien Berhasil Disimpan</h4>
                        
                        {serviceResult && (
                            <div className="alert alert-success mt-2">
                                Pendaftaran layanan {serviceResult.type.toUpperCase()} berhasil. 
                                Nomor Antrian: {serviceResult.queueNumber}
                            </div>
                        )}
                    </div>
        
                    <Row className="mb-4">
                        <Col lg={12}>
                            <Card className="d-flex justify-content-center align-items-center">
                                <Card.Body>
                                    <PrintPatientCard patientData={submittedData} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
        
                    {selectedPrintType === 'card' && (
                        <div className="print-only">
                            <PrintPatientCard patientData={submittedData} />
                        </div>
                    )}
                    {selectedPrintType === 'queue' && (
                        <div className="print-only">
                            <PrintableQueueNumber 
                                queueData={{
                                    queueNumber: serviceResult ? serviceResult.queueNumber : submittedData.queueNumber,
                                    service: serviceResult ? serviceResult.type.toUpperCase() : "Pendaftaran",
                                    date: submittedData.registrationDate,
                                    patientName: submittedData.NamaLengkap
                                }} 
                            />
                        </div>
                    )}
        
                    <div className="d-flex justify-content-between mt-4 no-print">
                        <ButtonNav
                            label="Kembali ke Halaman Utama"
                            variant="primary"
                            path="/kiosk" 
                        />
                        <div>
                            {!serviceResult && (
                                <Button 
                                    variant="success" 
                                    onClick={() => setShowServiceModal(true)} 
                                    className="me-2"
                                >
                                    Daftar Layanan
                                </Button>
                            )}
                            <Button variant="primary" onClick={() => handlePrint('card')} className="me-2">
                                Cetak Kartu Pasien
                            </Button>
                            {serviceResult && (
                                <Button variant="info" onClick={() => handlePrint('queue')}>
                                    Cetak Nomor Antrian
                                </Button>
                            )}
                        </div>
                    </div>
                    
                    {/* Komponen ServiceRegistration */}
                    <ServiceRegistration 
                        showModal={showServiceModal}
                        onClose={() => setShowServiceModal(false)}
                        patientData={submittedData}
                        onServiceRegistered={handleServiceRegistered}
                    />
                </Card.Body>
            </Card>
        );
    }

    return (
        <Fragment>
            <DynamicStepForm
                title="Pendaftaran Pasien"
                formConfig={formFields}
                onSubmit={handleSubmit}
                externalOptions={{ titles: titlesOptions, identity: identityOption, country: negaraOptions }}
                onNegaraChange={handleNegaraChange} 
                backPath="/kiosk"
                isAddMode={true}
            />
        </Fragment>
    );
});

KioskPendaftaranPasien.displayName = "KioskPendaftaranPasien";
export default KioskPendaftaranPasien;