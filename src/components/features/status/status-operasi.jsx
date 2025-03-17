import { Badge } from "react-bootstrap";

const getStatusBadge = (status) => {
  switch (status) {
    case "Dalam Operasi":
      return <Badge bg="danger">{status}</Badge>;
    case "Dalam Persiapan":
      return (
        <Badge bg="warning" text="dark">
          {status}
        </Badge>
      );
    case "Terjadwal":
      return <Badge bg="info">{status}</Badge>;
    case "Selesai":
      return <Badge bg="success">{status}</Badge>;
    default:
      return <Badge bg="secondary">{status}</Badge>;
  }
};

export const StatusOperasiBaseComponent = ({
  data,
  title,
  headerBadgeText,
  headerBadgeColor,
  onItemClick,
  customLabels,
}) => {
  // Ini hanya komponen placeholder, seharusnya diganti dengan implementasi yang tepat
  return (
    <div className="iq-card">
      <div className="iq-card-header d-flex justify-content-between">
        <div className="iq-header-title">
          <h4 className="card-title">
            {title}{" "}
            <Badge bg={headerBadgeColor || "primary"}>
              {headerBadgeText || "Status"}
            </Badge>
          </h4>
        </div>
      </div>
      <div className="iq-card-body">
        <div className="row">
          {data
            .filter((item) => item.status === "Dalam Operasi")
            .map((item, index) => (
              <div
                key={`status-${index}`}
                className="col-md-6 mb-3"
                onClick={() => onItemClick && onItemClick(item)}
              >
                <div className="iq-card">
                  <div className="iq-card-body">
                    <div className="d-flex justify-content-between">
                      <h5>{item.pasien}</h5>
                      {getStatusBadge(item.status)}
                    </div>
                    <p>
                      <strong>
                        {customLabels?.jenisTindakan || "Tindakan"}:
                      </strong>{" "}
                      {item.jenisTindakan}
                    </p>
                    <p>
                      <strong>{customLabels?.usia || "Usia"}:</strong>{" "}
                      {item.usia} tahun
                    </p>
                    <p>
                      <strong>{customLabels?.ruangOperasi || "Ruang"}:</strong>{" "}
                      {item.ruangOperasi}
                    </p>
                    <p>
                      <strong>{customLabels?.dokterBedah || "Dokter"}:</strong>{" "}
                      {item.dokterBedah}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
