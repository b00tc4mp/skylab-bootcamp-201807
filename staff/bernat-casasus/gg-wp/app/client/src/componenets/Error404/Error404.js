import React from 'react';
import './Error404.css'
// import { SearchBar } from "../index";
import {
  Container, Row, Col
} from 'reactstrap';
const Error404 = (props) => {
  return (
    <div className="error404-container">
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <img className="error404-img" src="/images/logo-nunu.png" alt="Page not found" />
            {/* http://opgg-static.akamaized.net/images/logo/summonerSearch.png */}
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col sm="8">
            <br></br>
            {/* <h4>404 Page not found.</h4> */}
            <div id="no-results-container">
              {/* <i className="fas fa-exclamation fa-3x"></i> */}
              <p>Provably willum ate the page you were looking for.</p>
              <p> 404 PAGE NOT FOUND</p>
            </div>
            {/* <SearchBar /> */}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Error404;