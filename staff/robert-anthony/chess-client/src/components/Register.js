import React, {Component} from 'react'
import logic from '../logic'

import { InputGroup, InputGroupText, InputGroupAddon,Col,Row,Container, Input } from 'reactstrap';

class Register extends Component {
  state = {
    nickname: '',
    email: '',
    password: '',
    succeeded: false,
    error: ''
  }

  onEmailChanged = e => this.setState({email: e.target.value})
  onNicknameChanged = e => this.setState({nickname: e.target.value})

  onPasswordChanged = e => this.setState({password: e.target.value})

  onRegisterSubmitted = e => {
    e.preventDefault()

    const {nickname, password, email} = this.state

    logic.register(email, nickname, password)
      .then(() => this.setState({succeeded: true}))
      .catch(({message}) => this.setState({error: message}))
  }

  render() {
    const {succeeded, error} = this.state

    return <div className="mainContainer login__container">


      <Container className="mainContainer login__container">
        <Col xs="12" md="3">
          {!succeeded ?  <form onSubmit={this.onRegisterSubmitted}>
              <Row className="mb-2">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Email</InputGroupText>
                  </InputGroupAddon>
                  <Input autoFocus placeholder="email" onChange={this.onEmailChanged}/>
                </InputGroup>
              </Row>
              <Row className="mb-2">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Nickname</InputGroupText>
                  </InputGroupAddon>
                  <Input autoFocus placeholder="nickname" onChange={this.onNicknameChanged}/>
                </InputGroup>
              </Row>
              <Row className="mb-2">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Password</InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" placeholder="password" onChange={this.onPasswordChanged}/>
                </InputGroup>
              </Row>
              <Row>
                <button type="submit">login</button>
              </Row>
            </form>:
            <nav>
              User register successfully, now you can proceed to <a href="/#/login">login</a>
            </nav>}

          {error && <p>{error}</p>}
        </Col>
      </Container>
    </div>


  }
}

export default Register