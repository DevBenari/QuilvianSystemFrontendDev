import DateInput from "@/components/ui/date-input"
import CPPTAccordion from "@/components/ui/soap-accordion-ui"
import TextField from "@/components/ui/text-field"
import React, { Fragment, memo } from "react"
import { Col, Row, Accordion } from "react-bootstrap"

const CpptDokter = memo(() => {
    const dokterEntries = [
        {
          name: 'Dr. John Doe',
          role: 'Dokter Spesialis',
          time: '31 Dec 2024 09:00',
          color: 'text-primary',
          content: [
            { title: 'Subjective', details: 'Pasien mengeluh nyeri kepala' },
            { title: 'Objective', details: 'TD: 120/80 mmHg, Nadi: 80x/menit, Suhu: 36.5°C' },
            { title: 'Assessment', details: 'Hipertensi Grade 1' },
            { title: 'Planning', details: 'Pemberian obat anti hipertensi' },
          ],
        },
        {
          name: 'Dr. John Doe',
          role: 'Dokter Spesialis',
          time: '31 Dec 2024 09:00',
          color: 'text-primary',
          content: [
            { title: 'Subjective', details: 'Pasien mengeluh nyeri kepala' },
            { title: 'Objective', details: 'TD: 120/80 mmHg, Nadi: 80x/menit, Suhu: 36.5°C' },
            { title: 'Assessment', details: 'Hipertensi Grade 1' },
            { title: 'Planning', details: 'Pemberian obat anti hipertensi' },
          ],
        },
        {
          name: 'Dr. John Doe',
          role: 'Dokter Spesialis',
          time: '31 Dec 2024 09:00',
          color: 'text-primary',
          content: [
            { title: 'Subjective', details: 'Pasien mengeluh nyeri kepala' },
            { title: 'Objective', details: 'TD: 120/80 mmHg, Nadi: 80x/menit, Suhu: 36.5°C' },
            { title: 'Assessment', details: 'Hipertensi Grade 1' },
            { title: 'Planning', details: 'Pemberian obat anti hipertensi' },
          ],
        },
      ];
    
      const perawatEntries = [
        {
          name: 'Ns. Jane Smith',
          role: 'Perawat',
          time: '31 Dec 2024 08:00',
          color: 'text-success',
          content: [
            { title: 'Implementasi Keperawatan', details: ['Mengukur tanda vital', 'Memberikan obat sesuai jadwal', 'Membantu mobilisasi pasien'] },
            { title: 'Evaluasi', details: 'Pasien dapat beristirahat dengan nyaman, tanda vital stabil' },
            {
              title: 'Tanda Vital',
              details: 'TD: 120/80 mmHg, Nadi: 82x/menit, Suhu: 36.8°C, RR: 20x/menit',
            },
          ],
        },
        {
          name: 'Ns. Jane Smith',
          role: 'Perawat',
          time: '31 Dec 2024 08:00',
          color: 'text-success',
          content: [
            { title: 'Implementasi Keperawatan', details: ['Mengukur tanda vital', 'Memberikan obat sesuai jadwal', 'Membantu mobilisasi pasien'] },
            { title: 'Evaluasi', details: 'Pasien dapat beristirahat dengan nyaman, tanda vital stabil' },
            {
              title: 'Tanda Vital',
              details: 'TD: 120/80 mmHg, Nadi: 82x/menit, Suhu: 36.8°C, RR: 20x/menit',
            },
          ],
        },
      ];


    //   const dokterEntries = [
    //     {
    //       name: 'Dr. John Doe',
    //       role: 'Dokter Spesialis',
    //       time: '31 Dec 2024 09:00',
    //       color: 'text-primary',
    //       content: [
    //         { title: 'Subjective', details: 'Pasien mengeluh nyeri kepala' },
    //         { title: 'Objective', details: 'TD: 120/80 mmHg, Nadi: 80x/menit, Suhu: 36.5°C' },
    //         { title: 'Assessment', details: 'Hipertensi Grade 1' },
    //         { title: 'Planning', details: 'Pemberian obat anti hipertensi' },
    //       ],
    //     },
    //   ];
    return (
        <Fragment>
            <Col xs="12" className="iq-card p-3 mt-4">
                <div className="d-flex align-items-center shadow  justify-content-center flex-column">
                    <p className="text-center text-black font-size-16">Catatan Terintegrasi Pasien</p>
                    <div>
                        <Row>
                           <Col xs="7" className="iq-card">
                            <DateInput 
                                label=""
                                name="tanggal"
                                placeholder={'Masukkan tanggal pengkajian'}
                            />
                           </Col>
                           <Col xs="5" className="iq-card">
                                <TextField 
                                    label=""
                                    name=""
                                    placeholder={' Verifikasi semua'}
                                    disabled
                                />
                           </Col>
                        </Row>
                    </div>
                </div>
            </Col> 
            <Col xs="12" className="mt-3">
              <Row>
                  <Col md="6">
                    <CPPTAccordion title={"Dokter"} records={dokterEntries} />
                  </Col>
                  <Col md="6">
                    <CPPTAccordion title={"Perawat"} records={perawatEntries} />
                  </Col>
              </Row>
            </Col>
        </Fragment> 
    )
})

CpptDokter.displayName = "CpptDokter"
export default CpptDokter