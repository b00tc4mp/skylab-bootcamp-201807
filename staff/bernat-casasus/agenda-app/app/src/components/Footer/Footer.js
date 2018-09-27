import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import './Footer.css'

function Footer() {
    return <div className="footer">

        <Container>
            <Row>
                <Col></Col>
                <Col sm="10">
                    <ul>
                        <li><a className="footer-element" href="/#">About Agenda</a></li>
                        <li><a className="footer-element" href="/#">Logo history</a></li>
                        <li><a className="footer-element" href="/#">Privaci politics</a></li>
                        <li><a className="footer-element" href="/#">Help</a></li>
                        <li><a className="footer-element" href="/#">Bussines</a></li>
                        <li><a className="footer-element" href="/#">Adverstising</a></li>
                        <li><a className="footer-element" href="/#">Suggestions</a></li>
                        <li><a className="footer-element" href="/#">Download Agenda</a></li>   
                        <li><a className="footer-element" href="/#">© 2012-2018 Agenda. Save your notes and contacts.</a></li>
                    </ul>
                </Col>
                <Col></Col>
            </Row>


        </Container>
    </div>

}

export default Footer