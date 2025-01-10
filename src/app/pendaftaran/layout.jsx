import { Col, Row } from 'react-bootstrap'
import styles from '../page.module.css'
import TopNav from '@/components/features/navbars/top-nav'
import Sidemenu from '@/components/features/navbars/side-menu'
const PendaftaranLayout = ({children}) => {
    return (
        <div >
            <Row className=''>
                <Col md="2">
                    <TopNav module={"pendaftaran"}/>
                </Col>
                <Col md="10" >
                    {children}
                </Col>
            </Row>
        </div>
    )
}

export default PendaftaranLayout