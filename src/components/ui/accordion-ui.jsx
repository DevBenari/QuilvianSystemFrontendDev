import React from "react";
import { Accordion, Button, Card, Col } from "react-bootstrap";

const AccordionToggle = ({ eventKey, title, department, onButtonClick, variant}) => {
  return (
    <Accordion.Item eventKey={eventKey} >
        <Accordion.Header>
          <div className="iq-card-header d-flex justify-content-between w-100">
            <div>
              <p className="text-black mb-0">{title}</p>
              <h5 className=" font-bold font-size-16">{department}</h5>
            </div>
            <div className="d-flex flex-column mt-3 align-items-center justify-content-center">
              <button className={`btn btn-${variant}`} onClick={onButtonClick}>
                Verifikasi
              </button>
              <p className="font-size-12">12:00</p>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          
            <div>
                <h5>Subjectif : *</h5>
                <p>lorem ipsum dolor pangsit kuah enak di malam tahun baru</p>
            </div>
            <div>
                <h5>Objectif : *</h5>
                <p>lorem ipsum dolor pangsit kuah enak di malam tahun baru</p>
            </div>
            <div>
                <h5>Assesment : *</h5> 
                <p>lorem ipsum dolor pangsit kuah enak di malam tahun baru</p>
            </div>
            <div>
                <h5>Planning</h5> 
                <p>lorem ipsum dolor pangsit kuah enak di malam tahun baru</p>
            </div>
            <div>
                <h5>Instruksi</h5> 
                <p>lorem ipsum dolor pangsit kuah enak di malam tahun baru</p>
            </div>
          
        </Accordion.Body>
      
    </Accordion.Item>
  );
};

export default AccordionToggle;
