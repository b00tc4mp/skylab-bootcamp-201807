import React, {Component} from 'react'
import {Container, Col, Row} from 'reactstrap'

class Main extends Component {

  state = {
    error: "",
  }


  render() {


    return <Container>
      <Row>

        <Col className="main__mainText" xs="12" md="6">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu dignissim massa, a cursus mi. Phasellus
            ultricies volutpat rutrum. Nulla et aliquam orci. Ut vel euismod lorem. Suspendisse finibus, sapien vitae
            volutpat lacinia, sapien leo sodales metus, sit amet semper elit diam at massa. Morbi a ligula at turpis
            luctus tristique. Fusce dictum a elit at mattis.</p>

          <p> Sed tristique posuere nulla, porttitor ullamcorper augue fringilla eget. Vivamus finibus nisi ac orci
            fringilla egestas. Vestibulum elementum id eros vel venenatis. Maecenas varius hendrerit erat, nec aliquam
            eros lacinia id. Curabitur ac ante nulla. Praesent tempor, massa a consectetur placerat, lacus arcu congue
            ligula, ut accumsan elit elit faucibus massa. Maecenas hendrerit lorem ac porta tristique. Aenean a lacus
            quam.
          </p>
          <p> Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris id imperdiet
            libero. In iaculis ultricies ultricies. Curabitur fringilla consequat lacus nec dapibus. Sed dapibus
            convallis augue, a dignissim libero tincidunt sit amet. Phasellus a accumsan lectus, eget ultricies lorem.
            Nulla facilisi. Pellentesque ultricies faucibus ultrices. Aliquam et enim vel felis gravida congue et nec
            justo. Donec ultricies, purus vel viverra porta, enim massa lacinia lacus, quis semper tellus nunc at quam.
            Phasellus molestie, justo vitae porta finibus, urna lorem suscipit velit, in tristique velit risus ac velit.
            Nam pretium eleifend enim rhoncus malesuada.
          </p>
          <p> Integer efficitur orci ut tellus vehicula scelerisque. Phasellus vestibulum nec sapien vel cursus.
            Suspendisse pharetra tristique lectus non suscipit. Curabitur egestas magna purus, nec placerat ex pretium
            nec. Nunc non eros sed nibh blandit convallis in eu mi. Morbi faucibus eleifend ante, sed hendrerit turpis
            aliquam eu. Nunc tincidunt feugiat tortor. Morbi placerat urna mi, ut faucibus erat sollicitudin sed. Sed et
            tellus non nulla interdum blandit. Donec sed nibh et diam pretium mollis. Cras quis pulvinar lectus.
            Phasellus varius tempus turpis, vel luctus orci tempus sit amet. Nullam sodales arcu nibh, sit amet pretium
            dolor vestibulum quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas. Nullam tincidunt eros quis justo aliquam, et sagittis lorem lobortis. Etiam sagittis vestibulum
            dictum.</p>
        </Col> <Col xs="0" md="6">
      </Col>
      </Row>
    </Container>


  }

}

export default Main