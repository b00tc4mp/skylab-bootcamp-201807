import React, { Component } from 'react';
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    Form, FormGroup, Label, Input, Container, Row, Col
} from 'reactstrap';
import { withRouter } from 'react-router-dom'
import './Login.css'
import { Feedback } from "../index";

import { connect } from 'react-redux';
import { login } from '../../redux/actions/loginActions';

class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    handlerLogin = e => {
        e.preventDefault()

        const { state: { email, password } } = this

        this.props.login(email, password)

    }

    componentDidUpdate() {
        if (this.props.isLoginSuccess.status) {
            this.timeout = setTimeout(() => {
                this.setState({
                    email: "",
                    password: ""
                }, () => this.props.history.push('/home'))

            }, 1500)
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        const { state: { email, password }, onChange } = this
        let { props: { loginError, isLoginSuccess, isLoginPending } } = this
        return (
            <div className="login-container">
                <Container>
 
                    <Row>
                        
                        <Col></Col>
                        <Col xs="12" sm="8" md="6" lg="4">
                            {isLoginPending &&
                                <div id="no-results-container">
                                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                </div>
                            }
                            {loginError && <Feedback message={loginError} />}
                            {isLoginSuccess.status && <Feedback message={isLoginSuccess.message} color={'success'} />}
                            <Card id="login-card">
                                <CardHeader id="login-title">Login</CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handlerLogin}>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="email" className="mr-sm-2">email</Label>
                                            <Input type="text" name="email" id="user-email" placeholder="mail@mail.com" autoFocus required onChange={onChange} value={email} />
                                        </FormGroup>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="password" className="mr-sm-2">Password</Label>
                                            <Input type="password" name="password" id="password" placeholder="************" required onChange={onChange} value={password} />
                                        </FormGroup>
                                        <Button id="login-btn">Submit</Button>
                                    </Form>
                                </CardBody>
                                <CardFooter><section id="login-footer"><a target="_blank" rel="noopener noreferrer" href="https://media.makeameme.org/created/you-forgot-your-hyec25.jpg">Forgot password?</a> or <a href="/#/register">Sign Up</a></section></CardFooter>
                            </Card>
                        </Col>

                        <Col></Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.login.isLoginPending,
        isLoginSuccess: state.login.isLoginSuccess,
        loginError: state.login.loginError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password)),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));