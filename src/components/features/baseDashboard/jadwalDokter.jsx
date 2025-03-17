import { Badge } from "react-bootstrap";

export const JadwalDokterComponent = ({
  data = [],
  title = "Jadwal Dokter Hari Ini",
}) => (
  <>
    {/* Jadwal Dokter Hari Ini */}
    <div className="iq-card mb-4">
      <div className="iq-card-header d-flex justify-content-between align-items-center">
        <div className="iq-header-title">
          <h4 className="card-title">Jadwal Dokter Hari Ini</h4>
        </div>
        <Badge bg="info" className="p-2">
          {jadwalDokterData.length} Dokter
        </Badge>
      </div>
      <div className="iq-card-body">
        <div className="jadwal-dokter-container">
          {jadwalDokterData.map((dokter) => (
            <div
              key={dokter.id}
              className="d-flex justify-content-between align-items-center mb-3 p-3 border-bottom"
            >
              <div>
                <h6 className="mb-1">{dokter.nama}</h6>
                <small className="text-muted">{dokter.poli}</small>
              </div>
              <div className="d-flex align-items-center">
                <Badge bg="success" className="me-2">
                  {dokter.jamPraktik}
                </Badge>
                <Badge bg={dokter.status === "Aktif" ? "primary" : "secondary"}>
                  {dokter.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <style jsx>{`
      .dokter-info {
        display: flex;
        align-items: center;
      }

      .dokter-label {
        font-size: 14px;
        color: #777;
        margin-right: 5px;
      }

      .dokter-name {
        font-size: 15px;
        font-weight: 500;
        color: #212121;
      }

      .antrian-info {
        margin-top: 10px;
      }

      .jadwal-dokter-container {
        max-height: 350px;
        overflow-y: auto;
      }
    `}</style>
  </>
);
