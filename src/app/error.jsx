'use client';

import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className=" sign-in-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="justify-content-center w-100 sign-in-page">
        <Col xs={12} md={8} lg={6} className="text-center">
          {/* Robot SVG Illustration */}
          <div className="mb-4">
            <svg style={{ width: '12rem', height: '12rem' }} viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="#E2E8F0" />
              <rect x="60" y="60" width="80" height="100" rx="10" fill="#0d6efd" />
              <circle cx="85" cy="90" r="10" fill="#ffc107" />
              <circle cx="115" cy="90" r="10" fill="#ffc107" />
              <path d="M75 120 C75 140, 125 140, 125 120" stroke="#ffc107" strokeWidth="4" fill="none" />
              <rect x="85" y="40" width="10" height="20" fill="#0d6efd" />
              <rect x="105" y="40" width="10" height="20" fill="#0d6efd" />
            </svg>
          </div>

          <Card className="shadow-lg">
            <Card.Body className="p-4">
              <div className="mb-4">
                <h1 className="display-1 fw-bold text-danger">Error</h1>
                <h2 className="h3 fw-semibold text-dark mb-3">
                  Ups! Terjadi Kesalahan
                </h2>
                <p className="text-muted">{error.message || 'Terjadi kesalahan yang tidak terduga'}</p>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center mb-4">
                <Button variant="light" onClick={() => reset()} className="px-4">
                  Coba Lagi
                </Button>
                <Button variant="primary" onClick={() => window.location.href = '/'} className="px-4">
                  Ke Beranda
                </Button>
              </div>

              <hr />
              <small className="text-muted">Jika masalah berlanjut, silakan hubungi tim support kami</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
