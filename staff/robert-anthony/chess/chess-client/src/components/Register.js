import React, {Component} from 'react'
import logic from '../logic'
import PropTypes from 'prop-types'
import {InputGroup, InputGroupText, InputGroupAddon, Col, Row, Container, Input} from 'reactstrap';




class Register extends Component {

  static propTypes = {
    clearError: PropTypes.func,
    onError: PropTypes.func,
  }

  state = {
    nickname: '',
    email: '',
    password: '',
    succeeded: false,
  }

  onEmailChanged = e => {
    const {props:{clearError}} = this
    clearError()
    this.setState({email: e.target.value})
  }
  onNicknameChanged = e =>{
    const {props:{clearError}} = this
    clearError()
    this.setState({nickname: e.target.value})
  }

  onPasswordChanged = e => {
    const {props:{clearError}} = this
    clearError()
    this.setState({password: e.target.value})
  }

  onRegisterSubmitted = e => {
    const {props:{clearError,onError}} = this
    e.preventDefault()
    clearError()
    const {nickname, password, email} = this.state

    logic.register(email, nickname, password)
      .then(() => this.setState({succeeded: true}))
      .catch(({message}) => onError(message))
  }

  render() {
    const {succeeded,nickname} = this.state



      return  <Container className="mainContainer register__container">
        <Col xs="12" md="3">
          {!succeeded ? <form onSubmit={this.onRegisterSubmitted}>
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
                  <Input  placeholder="nickname" onChange={this.onNicknameChanged}/>
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
                <button type="submit">Register</button>
              </Row>
            </form> :
            <nav className="register__navAfterRegister">
              User <span>{nickname}</span> registered successfully, now you can proceed to <a href="/#/login">login</a>
            </nav>}


        </Col>
      </Container>


  }
}

export default Register