import React, { Component } from 'react'
import { InputGroup, InputGroupText, InputGroupAddon,Col,Row,Container, Input } from 'reactstrap';

import logic from '../logic'

class Login extends Component {
  state = {
    nickname: '',
    password: '',
    error: ''
  }

  onNicknameChanged = e => this.setState({ nickname: e.target.value })

  onPasswordChanged = e => this.setState({ password: e.target.value })

  onLoginSubmitted = e => {
    e.preventDefault()

    const { nickname, password } = this.state
    logic.authenticate(nickname, password)
      .then(token => this.props.onLoggedIn(nickname, token))
      .catch(({ message }) => this.setState({ error: message }))
  }

  render() {
    const { error } = this.state

    return  <Container className="mainContainer login__container">
    <Col xs="12" md="3">
        <form onSubmit={this.onLoginSubmitted}>
          <Row className="mb-2">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Nickname</InputGroupText>
            </InputGroupAddon>
            <Input autoFocus placeholder="nickname"  onChange={this.onNicknameChanged} />
          </InputGroup>
          </Row>
          <Row className="mb-2">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Password</InputGroupText>
              </InputGroupAddon>
              <Input  type="password"  placeholder="password"  onChange={this.onPasswordChanged} />
            </InputGroup>
          </Row>
          <Row>
          <button type="submit">login</button>
          </Row>
        </form>
        {error && <p>{error}</p>}
    </Col>
      </Container>

  }
}

export default Login