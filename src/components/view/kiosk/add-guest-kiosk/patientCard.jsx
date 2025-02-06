import React, { Fragment, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Button, Image, Container, Row, Col } from 'react-bootstrap';
// import { Printer, UserCircle } from 'lucide-react';
import ButtonNav from '@/components/ui/button-navigation';

const PrintPatientCard = ({patientData}) => {
    return (
    <div className="print-only">
      <Card style={{ width: '540px', height: '250px', background:"#ceebee" }} className="px-3">
        <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
          <Row className="mb-3">
            <Col>
              <h2 className="h4 fw-bold text-dark mb-1">KARTU PASIEN</h2>
            </Col>
            <Col xs="auto">
              {/* <UserCircle size={40} className="text-primary" /> */}
            </Col>
          </Row>
          
          <div className='d-flex justify-content-center align-items-center flex-column' style={{ width:"500px" }}>
            <Row className="mb-1 w-100">
              <Col xs={4} className="fw-bold">No. RM</Col>
              <Col xs={8}>: {patientData.noRekamMedis || '-'}</Col>
            </Row>
            <Row className="mb-1 w-100">
              <Col xs={4} className="fw-bold">Nama</Col>
              <Col xs={8}>: {patientData.namaPasien || '-'}</Col>
            </Row>
            <Row className="mb-1 w-100">
              <Col xs={4} className="fw-bold">Tgl Lahir</Col>
              <Col xs={8}>: {patientData.tglLahir || '-'}</Col>
            </Row>
            <Row className="mb-1 w-100">
              <Col xs={4} className="fw-bold">NIK</Col>
              <Col xs={8}>: {patientData.noIdentitas || '-'}</Col>
            </Row>
            <Row className="mb-1 w-100">
              <Col xs={4} className="fw-bold">Alamat</Col>
              <Col xs={8}>: {patientData.alamat || '-'}</Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </div>
    )
}

export default PrintPatientCard