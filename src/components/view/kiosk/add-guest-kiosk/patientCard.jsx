import React from 'react';
import { Card, Image } from 'react-bootstrap';

const PrintPatientCard = ({ patientData }) => {
  // Destructure data yang diperlukan dari patientData
  const { 
    NoRekamMedis, 
    NoIdentitas,  // NIK dari form
    NamaLengkap   // Nama dari form
  } = patientData || {};

  return (
    <Card 
      style={{
        width: '34rem',
        height: '18rem',
        background: 'linear-gradient(to right, #089bab, #60a5fa)',
        color: 'white',
        borderRadius: '0.75rem',
        position: 'relative',
        overflow: 'hidden',
        padding: '1.5rem'
      }}
    >
      {/* Hospital Logo Placeholder */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        opacity: '0.5'
      }}>
        <div style={{
          width: '5rem',
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '0.5rem'
        }}>
          <Image src="/Images/logo_mmc.jpeg" alt="Hospital Logo" className='img-fluid' />
        </div>
      </div>
      
      {/* Chip Card Design */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        left: '1.5rem'
      }}>
        <div style={{
          width: '3rem',
          height: '2.5rem',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '0.375rem',
          background: 'linear-gradient(to bottom right, #fbbf24, #d97706)'
        }} />
      </div>
      
      {/* Patient Information */}
      <div style={{ marginTop: '4rem' }}>
        <div className='mb-1'>
          <h5 style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
            Nomor Rekam Medis
          </h5>
          <h5 style={{ 
            fontSize: '1rem', 
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,0.7)'
          }}>
            {NoRekamMedis || 'RM-XXXXXXXX'}
          </h5>
        </div>
        <div className='mb-1'>
          <h5 style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
            NIK
          </h5>
          <h5 style={{ 
            fontSize: '1rem', 
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,0.7)'
          }}>
            {NoIdentitas || '00000000'}
          </h5>
        </div>
        
        <div className='mb-1'>
          <h5 style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
            Nama Pasien
          </h5>
          <h5 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 'bold',
            color: 'rgba(255,255,255,0.7)'
          }}>
            {NamaLengkap || 'NAMA PASIEN'}
          </h5>
        </div>
      </div>
      
      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '1.5rem',
        right: '1.5rem'
      }}>
        <div style={{
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.7)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Kartu Identitas Pasien</span>
          <span>RS Metropolitan Medical Centre</span>
        </div>
      </div>
    </Card>
  );
};

export default PrintPatientCard;