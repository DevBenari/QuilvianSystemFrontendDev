// import React from "react";
// import { Accordion } from "react-bootstrap";

// const CPPTAccordion = ({ records }) => {
//   return (
//     <Accordion>
//       {records.map((record, index) => (
//         <Accordion.Item eventKey={index} key={record.id}>
//           <Accordion.Header>
//             <div className="d-flex justify-content-between w-100">
//               <div className="d-flex justify-content-center  gap-2">
//                 <div>
//                   <p className="mb-0 font-size-18">{record.staff}</p>
//                   <p className=" ">{record.profession}</p>
//                 </div>
//                 <p className="mt-1">{record.timestamp}</p>
//               </div>
//               <div>
//                 <p className="mb-0 text-success"> <span className="fa fa-check"></span> {record.status}</p>
//               </div>
//             </div>
//           </Accordion.Header>
//           <Accordion.Body>
//             <div>
//               <h6>Subjective:</h6>
//               <p>{record.soap.subjective}</p>
//             </div>
//             <div>
//               <h6>Objective:</h6>
//               <p>{record.soap.objective}</p>
//             </div>
//             <div>
//               <h6>Assessment:</h6>
//               <p>{record.soap.assessment}</p>
//             </div>
//             <div>
//               <h6>Plan:</h6>
//               <p>{record.soap.plan}</p>
//             </div>
//           </Accordion.Body>
//         </Accordion.Item>
//       ))}
//     </Accordion>
//   );
// };

// export default CPPTAccordion;



  
    import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';


// Reusable Row Component
const CPPTAccordion = ({ title, records }) => {
  return (
    <div className="mb-4 iq-card shadow-sm" >
      <h4 className="text-center mb-3">{title}</h4>
      <div className="row">
        {records.map((entry, index) => (
          <div key={index} className="col-md-12 mb-3">
            <Card>
              <Card.Body>
                <div className="d-flex bg-light p-3 justify-content-between align-items-center mb-3">
                  <div>
                    <strong className={entry.color}>{entry.name}</strong>
                    <small className="text-muted ms-2">{entry.role}</small>
                    <small className="text-muted ms-2">{entry.time}</small>
                  </div>
                  <span className="text-success d-flex align-items-center">
                    <i className="ri-checkbox-circle-line " /> Terverifikasi
                  </span>
                </div>

                {entry.content.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-3">
                    <h5>{section.title}</h5>
                    {Array.isArray(section.details) ? (
                      <ul>
                        {section.details.map((detail, detailIndex) => (
                          <li key={detailIndex}>{detail}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{section.details}</p>
                    )}
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CPPTAccordion;
