import React, { Fragment, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Button, Image, Container, Row, Col } from 'react-bootstrap';
// import { Printer, UserCircle } from 'lucide-react';
import ButtonNav from '@/components/ui/button-navigation';
import QRCode from 'react-qr-code';

const PrintPatientCard = ({patientData}) => {
    return (
    <div className="print-only">
      <Card style={{ width: '800px', height: '350px', background:"#ceebee" }} className="px-3">
        <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
          <Row className="mb-3">
            <Col>
              <h2 className="h4 fw-bold text-dark mb-1">KARTU PASIEN</h2>
            </Col>
            <Col xs="auto">
              {/* <UserCircle size={40} className="text-primary" /> */}
            </Col>
          </Row>
          
          
            <Row className="p-3 w-100 shadow-md">
              <Col xs="8">
                <Row className="mb-1">
                  <Col xs={3} className="fw-bold">No. RM</Col>
                  <Col xs={8}>: {patientData.noRekamMedis || '-'}</Col>
                </Row>
                <Row className="mb-1 ">
                  <Col xs={3} className="fw-bold">Nama</Col>
                  <Col xs={8}>: {patientData.namaPasien || '-'}</Col>
                </Row>
                <Row className="mb-1 ">
                  <Col xs={3} className="fw-bold">Tgl Lahir</Col>
                  <Col xs={8}>: {patientData.tglLahir || '-'}</Col>
                </Row>
                <Row className="mb-1 ">
                  <Col xs={3} className="fw-bold">NIK</Col>
                  <Col xs={8}>: {patientData.noIdentitas || '-'}</Col>
                </Row>
                <Row className="mb-1 ">
                  <Col xs={3} className="fw-bold">Alamat</Col>
                  <Col xs={8}>: {patientData.alamat || '-'}</Col>
                </Row>
              </Col>
              <Col xs={4} className='mt-2'>
                <div >
                  <QRCode 
                    value={patientData.noRekamMedis }
                    size={150}
                    bgColor="#000000"
                    fgColor="#FFFFFF"
                    level="H"
                  />
                </div>
              </Col>
            </Row>
        </Card.Body>
      </Card>
    </div>
    )
}

export default PrintPatientCard