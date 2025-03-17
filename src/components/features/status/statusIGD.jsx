import React from "react";
import { Badge } from "react-bootstrap";

const StatusIGDBaseComponent = ({
  data = [],
  title = "Status Pasien",
  headerBadgeText = "Pasien",
  headerBadgeColor = "danger",
  itemBorderColor = "#dc3545",
  gridMinWidth = 300,
  onItemClick = null,
  className = "",
  showKeparahan = true,
  showWaktu = true,
  customLabels = {
    usia: "Usia",
    keluhan: "Keluhan",
    waktuMasuk: "Waktu Masuk",
  },
}) => {
  // Fungsi untuk menentukan warna border berdasarkan keparahan
  const getBorderColorByKeparahan = (keparahan) => {
    switch (keparahan?.toLowerCase()) {
      case "kritis":
        return "#dc3545"; // Merah
      case "sedang":
        return "#fd7e14"; // Oranye
      case "ringan":
        return "#28a745"; // Hijau
      default:
        return itemBorderColor;
    }
  };

  // Fungsi untuk menentukan warna badge status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "dalam perawatan":
        return "#0d6efd"; // Biru
      case "menunggu":
        return "#6c757d"; // Abu-abu
      case "selesai":
        return "#28a745"; // Hijau
      default:
        return "#6c757d";
    }
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
          <div className="item-grid-container">
            {data.map((item) => (
              <div
                key={item.id}
                className="item-card"
                onClick={onItemClick ? () => onItemClick(item) : null}
                style={{
                  borderLeftColor: getBorderColorByKeparahan(item.keparahan),
                  borderLeftWidth:
                    item.keparahan?.toLowerCase() === "kritis" ? "8px" : "5px",
                }}
              >
                <div className="item-header">
                  <div className="item-id">{item.id}</div>
                  <div
                    className="item-status-badge"
                    style={{ backgroundColor: getStatusColor(item.status) }}
                  >
                    {item.status}
                  </div>
                </div>
                <div className="item-content">
                  <h4 className="item-name">{item.nama}</h4>

                  <div className="pasien-info">
                    <div className="info-row">
                      <span className="info-label">{customLabels.usia}:</span>
                      <span className="info-value">{item.usia} tahun</span>
                    </div>

                    <div className="info-row">
                      <span className="info-label">
                        {customLabels.keluhan}:
                      </span>
                      <span className="info-value">{item.keluhan}</span>
                    </div>

                    {showKeparahan && item.keparahan && (
                      <div className="keparahan-info mt-2">
                        <Badge
                          bg={
                            item.keparahan?.toLowerCase() === "kritis"
                              ? "danger"
                              : item.keparahan?.toLowerCase() === "sedang"
                              ? "warning"
                              : "success"
                          }
                          className="p-2"
                        >
                          Tingkat Keparahan: {item.keparahan}
                        </Badge>
                      </div>
                    )}

                    {showWaktu && item.waktuMasuk && (
                      <div className="waktu-info mt-2">
                        <small className="text-muted">
                          {customLabels.waktuMasuk}: {item.waktuMasuk}
                        </small>
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
        .item-grid-container {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(${gridMinWidth}px, 1fr)
          );
          gap: 16px;
        }
        .item-card {
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
        .item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          background-color: rgba(0, 0, 0, 0.03);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        .item-id {
          font-size: 14px;
          font-weight: 500;
          color: #555;
        }
        .item-status-badge {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 30px;
          color: white;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .item-content {
          padding: 16px;
        }
        .item-name {
          margin: 0 0 12px 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        .pasien-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .info-row {
          display: flex;
          gap: 5px;
        }
        .info-label {
          font-weight: 500;
          color: #555;
          min-width: 60px;
        }
        .info-value {
          color: #333;
        }
        .keparahan-info,
        .waktu-info {
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export default StatusIGDBaseComponent;
