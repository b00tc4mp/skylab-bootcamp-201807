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
                        <li><div className="footer-element" href="/#">About GG.WP</div></li>
                        <li><div className="footer-element" href="/#">Logo history</div></li>
                        <li><div className="footer-element" href="/#">Privaci politics</div></li>
                        <li><div className="footer-element" href="/#">Help</div></li>
                        <li><div className="footer-element" href="/#">Bussines</div></li>
                        <li><div className="footer-element" href="/#">Adverstising</div></li>
                        <li><div className="footer-element" href="/#">Suggestions</div></li>
                        <li><div className="footer-element" href="/#">Download LoL</div></li>   
                        <li><div className="footer-element" href="/#">© 2012-2018 GG.WP. Data based on League of Legends Europe West.</div></li>
                    </ul>
                </Col>
                <Col></Col>
            </Row>


        </Container>
    </div>

}

export default Footer