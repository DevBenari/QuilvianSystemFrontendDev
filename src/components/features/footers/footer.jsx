import Link from 'next/link';
import React,{Fragment,memo} from 'react'

import {Row, Col, Container} from 'react-bootstrap'

const Footer = memo(() => {
  return (
    <Fragment>
               <footer className="bg-white iq-footer">
                  <Container fluid>
                     <Row>
                        <Col lg="6" >
                           <ul className="list-inline mb-0">
                              <li className="list-inline-item"><Link href="/#">Privacy Policy</Link></li>
                              <li className="list-inline-item"><Link href="/#">Terms of Use</Link></li>
                           </ul>
                        </Col>
                        <Col lg="6" className="text-end">
                           Copyright 2020 <Link href="/#">XRay</Link> All Rights Reserved.
                        </Col>
                     </Row>
                  </Container>
               </footer>
            </Fragment>
  )
})
Footer.displayName = "Footer"
export default Footer;
