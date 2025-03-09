// hooks/useConfirmation.js
/**
 * Custom hook for handling registration confirmation view
 * 
 * @returns {Object} - Confirmation rendering functions
 */
export const useConfirmation = () => {
  // Render confirmation section with all collected data
  const renderConfirmationSection = (methods, doctorsData, poliNameMap) => {
    // Safely get form values
    const formData = methods.getValues();

    // Safely get selected poli and doctor
    const selectedPoli = formData.selectedPoli;
    const selectedDoctor = formData.selectedDoctor;

    // Find the doctor details
    const doctor = selectedPoli && selectedDoctor
      ? doctorsData[selectedPoli]?.find(d => d.id === selectedDoctor)
      : null;

    const selectedPaymentMethod = formData.pembayaran === 'asuransi' ? 'asuransi' : 'tunai';

    return (
      <div className="confirmation-section">
        <h4 className="mb-4">Konfirmasi Data Pendaftaran</h4>

        {/* Personal Data Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="m-0">Data Pribadi</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <strong>Nama Lengkap:</strong> {formData.name || '-'}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <strong>NIK:</strong> {formData.nik || '-'}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <strong>Tanggal Lahir:</strong> {formData.dob || '-'}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <strong>Jenis Kelamin:</strong> {formData.gender || '-'}
              </div>
            </div>
          </div>
        </div>

        {/* Service Details Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="m-0">Detail Layanan</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <strong>Poli:</strong> {selectedPoli ? poliNameMap[selectedPoli] : '-'}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <strong>Dokter:</strong> {doctor ? doctor.name : '-'}
              </div>
              {doctor && (
                <div className="col-12 mb-3">
                  <strong>Jadwal Praktik:</strong> {doctor.schedule}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="m-0">Detail Pembayaran</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <strong>Metode Pembayaran:</strong>
                {selectedPaymentMethod === 'asuransi' ? 'Asuransi' : 'Tunai'}
              </div>
              {selectedPaymentMethod === 'asuransi' && (
                <>
                  <div className="col-12 col-md-6 mb-3">
                    <strong>Asuransi:</strong> {formData.asuransiPasien || '-'}
                  </div>
                  <div className="col-12 mb-3">
                    <strong>Nomor Kartu:</strong> {formData.nomorAsuransi || '-'}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="alert alert-info">
          <p className="mb-1"><strong>Catatan Penting:</strong></p>
          <ul className="mb-0">
            <li>Hadir 30 menit sebelum jadwal untuk keperluan administrasi.</li>
            <li>Bawa kartu identitas (KTP) dan kartu asuransi (jika ada).</li>
            <li>Pendaftaran ini dapat dibatalkan maksimal 24 jam sebelum jadwal.</li>
          </ul>
        </div>
      </div>
    );
  };

  return {
    renderConfirmationSection
  };
};