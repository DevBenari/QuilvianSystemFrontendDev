import React, { useState } from "react";
import { Accordion, Button, Badge } from "react-bootstrap";

const CPPTAccordionUI = ({ records, onVerify }) => {
  const getBadgeVariant = (status) => {
    switch (status) {
      case "verified":
        return "success";
      case "pending":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <Accordion>
      {records.map((record, index) => (
        <Accordion.Item eventKey={index} key={record.id}>
          <Accordion.Header>
            <div className="d-flex justify-content-between w-100">
              <div>
                <p className="mb-0 font-size-18 font-weight-bold">{record.staff}</p>
                <small className="">{record.profession}</small>
                <Badge bg={getBadgeVariant(record.status)} className="ms-2">
                  <i className="ri-checkbox-circle-line"></i> 
                  {record.status === "verified" ? "Terverifikasi" : "Menunggu"}
                </Badge>
              </div>
              <small>{record.timestamp}</small>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <h6>Subjective:</h6>
              <p>{record.soap.subjective}</p>
            </div>
            <div>
              <h6>Objective:</h6>
              <p>{record.soap.objective}</p>
            </div>
            <div>
              <h6>Assessment:</h6>
              <p>{record.soap.assessment}</p>
            </div>
            <div>
              <h6>Plan:</h6>
              <p>{record.soap.plan}</p>
            </div>
            {record.status === "pending" ? (
              <div className="d-flex justify-content-end">
                <Button
                  variant="success"
                  onClick={() => onVerify(record.id)}
                  size="sm"
                >
                  Verifikasi
                </Button>
              </div>
            ) : (
              <div className="text-success mt-3">
                <small>Diverifikasi oleh: {record.verifiedBy}</small>
                <br />
                <small>Waktu verifikasi: {record.verificationTime}</small>
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};


export default CPPTAccordionUI;
