import React from "react";
import { Badge } from "react-bootstrap";

const StatusRuangRawatInapComponent = ({
  data = [],
  title = "Status Ruang Rawat Inap",
  headerBadgeText = "Ruangan",
  headerBadgeColor = "primary",
  itemBorderColor = "#0d6efd",
  gridMinWidth = 300,
  onItemClick = null,
  className = "",
  showKapasitas = true,
  showRuangan = true,
  customLabels = {
    kelas: "Kelas",
    jenisRuangan: "Jenis Ruangan",
    kapasitas: "Kapasitas",
    terisi: "Terisi",
  },
}) => {
  // Fungsi untuk menentukan warna border berdasarkan tingkat kepenuhan
  const getBorderColorByKapasitas = (terisi, kapasitas) => {
    const persentaseTerisi = (terisi / kapasitas) * 100;
    if (persentaseTerisi >= 90) return "#dc3545"; // Merah (hampir penuh)
    if (persentaseTerisi >= 70) return "#fd7e14"; // Oranye (hampir penuh)
    return "#28a745"; // Hijau (masih longgar)
  };

  // Fungsi untuk menentukan warna status ruangan
  const getStatusColor = (terisi, kapasitas) => {
    const persentaseTerisi = (terisi / kapasitas) * 100;
    if (persentaseTerisi >= 90) return "#dc3545"; // Merah (hampir penuh)
    if (persentaseTerisi >= 70) return "#fd7e14"; // Oranye (hampir penuh)
    return "#28a745"; // Hijau (masih longgar)
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
                  borderLeftColor: getBorderColorByKapasitas(
                    item.terisi,
                    item.kapasitas
                  ),
                  borderLeftWidth:
                    (item.terisi / item.kapasitas) * 100 >= 90 ? "8px" : "5px",
                }}
              >
                <div className="item-header">
                  <div className="item-id">{item.id}</div>
                  <div
                    className="item-status-badge"
                    style={{
                      backgroundColor: getStatusColor(
                        item.terisi,
                        item.kapasitas
                      ),
                    }}
                  >
                    {item.terisi}/{item.kapasitas}
                  </div>
                </div>
                <div className="item-content">
                  <h4 className="item-name">{item.namaRuangan}</h4>

                  <div className="ruangan-info">
                    {showRuangan && (
                      <>
                        <div className="info-row">
                          <span className="info-label">
                            {customLabels.kelas}:
                          </span>
                          <span className="info-value">{item.kelas}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">
                            {customLabels.jenisRuangan}:
                          </span>
                          <span className="info-value">
                            {item.jenisRuangan}
                          </span>
                        </div>
                      </>
                    )}

                    {showKapasitas && (
                      <div className="kapasitas-info mt-2">
                        <Badge
                          bg={
                            (item.terisi / item.kapasitas) * 100 >= 90
                              ? "danger"
                              : (item.terisi / item.kapasitas) * 100 >= 70
                              ? "warning"
                              : "success"
                          }
                          className="p-2"
                        >
                          {customLabels.kapasitas}: {item.terisi}/
                          {item.kapasitas}(
                          {Math.round((item.terisi / item.kapasitas) * 100)}%)
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
        .ruangan-info {
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
          min-width: 100px;
        }
        .info-value {
          color: #333;
        }
        .kapasitas-info {
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export default StatusRuangRawatInapComponent;
