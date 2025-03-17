import React from "react";
import { Badge } from "react-bootstrap";

// Import dari react-icons (pastikan sudah diinstall)
// npm install react-icons --save
import {
  FaUser,
  FaClock,
  FaUsers,
  FaHospital,
  FaHeartbeat,
  FaEye,
  FaBandAid,
  FaLungs,
  FaBrain,
  FaTooth,
  FaBone,
  FaWheelchair,
} from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";

const StatusPoliComponent = ({
  data = [],
  title = "Status Antrian Poli",
  headerBadgeText = "Poli Aktif",
  headerBadgeColor = "success",
  itemBorderColor = "#007bff",
  itemStatusColor = "#28a745",
  gridMinWidth = 280,
  showDokter = true,
  customLabels = {
    dokter: "Dokter",
    antrian: "Antrian saat ini",
    total: "Total",
    waktuBuka: "Jam Buka",
    estimasi: "Estimasi Waktu",
  },
  onItemClick = null,
  className = "",
  showWaktuBuka = true,
  showEstimasiWaktu = false,
}) => {
  // Fungsi untuk menentukan icon berdasarkan nama poli
  const getPoliIcon = (poliName) => {
    const name = poliName.toLowerCase();

    if (name.includes("umum")) return <FaHospital size={22} />;
    if (name.includes("jantung"))
      return <FaHeartbeat size={22} color="#d9534f" />;
    if (name.includes("mata")) return <FaEye size={22} color="#5bc0de" />;
    if (name.includes("bedah")) return <FaBandAid size={22} color="#f0ad4e" />;
    if (name.includes("paru") || name.includes("respiratory"))
      return <FaLungs size={22} color="#5cb85c" />;
    if (name.includes("saraf") || name.includes("neuro"))
      return <FaBrain size={22} color="#aa66cc" />;
    if (name.includes("gigi")) return <FaTooth size={22} color="#33b5e5" />;
    if (name.includes("ortho")) return <FaBone size={22} color="#ff8800" />;
    if (name.includes("rehab") || name.includes("fisio"))
      return <FaWheelchair size={22} color="#0099cc" />;

    // Default icon jika tidak ada yang cocok
    return <MdLocalHospital size={22} />;
  };

  return (
    <>
      <div className={`iq-card mt-4 mb-4 ${className}`}>
        <div className="iq-card-header d-flex justify-content-between align-items-center">
          <div className="iq-header-title">
            <h4 className="card-title">{title}</h4>
          </div>
          <Badge bg={headerBadgeColor} className="p-2">
            {data.length} {headerBadgeText}
          </Badge>
        </div>
        <div className="iq-card-body">
          <div className="poli-grid-container">
            {data.map((poli) => (
              <div
                key={poli.id}
                className="poli-card"
                onClick={onItemClick ? () => onItemClick(poli) : null}
                style={{ borderLeftColor: poli.borderColor || itemBorderColor }}
              >
                <div className="poli-header">
                  <div className="poli-id">{poli.id}</div>
                  <div
                    className="poli-status-badge"
                    style={{
                      backgroundColor: poli.statusColor || itemStatusColor,
                    }}
                  >
                    {poli.status}
                  </div>
                </div>
                <div className="poli-content">
                  <div className="poli-title-row">
                    <div className="poli-icon">{getPoliIcon(poli.nama)}</div>
                    <h4 className="poli-name">{poli.nama}</h4>
                  </div>

                  {showDokter && poli.dokter && (
                    <div className="dokter-info mb-2">
                      <FaUser size={14} className="me-1" />
                      <span className="dokter-label">
                        {customLabels.dokter}:
                      </span>
                      <span className="dokter-name">{poli.dokter}</span>
                    </div>
                  )}

                  {showWaktuBuka && poli.waktuBuka && (
                    <div className="waktu-info mb-2">
                      <FaClock size={14} className="me-1" />
                      <span className="waktu-label">
                        {customLabels.waktuBuka}:
                      </span>
                      <span className="waktu-value">{poli.waktuBuka}</span>
                    </div>
                  )}

                  <div className="antrian-info">
                    <div className="antrian-current">
                      <Badge bg="primary" className="p-2">
                        <FaUsers size={14} className="me-1" />
                        {customLabels.antrian}: {poli.antrianSaatIni}
                      </Badge>
                    </div>
                    <div className="antrian-total mt-2">
                      <small>
                        {customLabels.total}: {poli.totalAntrian}
                      </small>
                    </div>

                    {showEstimasiWaktu && poli.estimasiWaktu && (
                      <div className="estimasi-waktu mt-2">
                        <Badge bg="info" className="p-2">
                          <FaClock size={14} className="me-1" />
                          {customLabels.estimasi}: {poli.estimasiWaktu} menit
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .poli-grid-container {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(${gridMinWidth}px, 1fr)
          );
          gap: 16px;
        }
        .poli-card {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          min-height: 120px;
          background-color: #f8f9fa;
          border-left: 5px solid;
          cursor: ${onItemClick ? "pointer" : "default"};
        }
        .poli-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
        }
        .poli-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          background-color: rgba(0, 0, 0, 0.03);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        .poli-id {
          font-size: 14px;
          font-weight: 500;
          color: #555;
        }
        .poli-status-badge {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 30px;
          color: white;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .poli-content {
          padding: 16px;
        }
        .poli-title-row {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        .poli-icon {
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: rgba(0, 123, 255, 0.1);
          border-radius: 8px;
          padding: 8px;
        }
        .poli-name {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        .dokter-info,
        .waktu-info {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .dokter-label,
        .waktu-label {
          font-weight: 500;
          color: #555;
        }
        .dokter-name,
        .waktu-value {
          color: #333;
        }
        .antrian-info {
          margin-top: 10px;
        }
        .me-1 {
          margin-right: 4px;
        }
      `}</style>
    </>
  );
};

export default StatusPoliComponent;
