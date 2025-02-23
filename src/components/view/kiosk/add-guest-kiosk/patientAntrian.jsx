import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';


const PrintableQueueNumber = ({ queueData }) => {
    return (
      <div className="print-only">
        <Card style={{ width: '480px', height: '380px' }} className="text-center p-3">
          <Card.Body>
            <h2 className="h4 fw-bold text-dark">RS SEHAT SENTOSA</h2>
            <p className="small text-muted mb-4">Jl. Kesehatan No. 123</p>
            
            <div className="my-4">
              <p className="h5 fw-bold">NOMOR ANTRIAN</p>
              <div className="display-4 fw-bold my-4 border border-2 border-dashed p-4">
                {queueData.queueNumber}
              </div>
            </div>
            
            <Container className="text-start mb-4">
              <Row>
              
                <Col lg={4}>
                  <p className="fw-bold mb-1">Poli</p>
                  <p className="h5">{queueData.service}</p>
                </Col>
              
              
                <Col lg={4}>
                  <p className="fw-bold mb-1">Tanggal</p>
                  <p>{queueData.date}</p>
                </Col>
              
                <Col lg={4}>
                  <p className="fw-bold mb-1">Nama Pasien</p>
                  <p>{queueData.patientName}</p>
                </Col>
              </Row>
            </Container>
            
            <p className="small text-muted">Silahkan menunggu nomor anda dipanggil</p>
          </Card.Body>
        </Card>
      </div>
    );
  };

  export default PrintableQueueNumber;