import React from 'react'
import { Search, ResultList } from '../../index.js'
import { Container, Row, Col } from 'reactstrap';
import './Home.css'
// import logic from '../../logic'




export default class Home extends React.Component {

  render() {
    return (
        <div id="home-cont">
      <Container>
        <Row><Col></Col>
          <Col sm='6'><Search/></Col>
          <section className="container-name">
      <ResultList/>
      </section>
        </Row>
      </Container>
      </div>
    );
  }
}

