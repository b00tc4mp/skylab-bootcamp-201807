import React, { Component } from 'react';
import { Feedback } from "../index";
import { withRouter } from 'react-router-dom'
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    Form, FormGroup, Label, Input, Container, Row, Col
} from 'reactstrap';

import './Register.css'

import { connect } from 'react-redux';
import { register } from '../../redux/actions/registerActions';

class Register extends Component {

    state = {
        email: "",
        password: ""
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    handlerRegister = e => {
        e.preventDefault()

        const { state: { email, password } } = this

        this.props.register(email, password)
    }

    componentDidUpdate() {
        if (this.props.isRegisterSuccess.status) {
            this.timeout = setTimeout(() => {
                this.setState({
                    email: "",
                    password: ""
                }, () => this.props.history.push('/login'))
            }, 1500)
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        const { state: { email, password }, handlerRegister, onChange } = this
        let { props: { registerError, isRegisterSuccess, isRegisterPending } } = this
        console.log('render register')
        return (
            <div className="register-container">
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs="12" sm="8" md="6" lg="4">
                            {isRegisterPending &&
                                <div id="no-results-container">
                                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                </div>
                            }
                            {registerError && <Feedback message={registerError} />}
                            {isRegisterSuccess.status && <Feedback message={isRegisterSuccess.message} color={'success'} />}
                            <Card id="register-card">
                                <CardHeader id="register-title">Register</CardHeader>
                                <CardBody>
                                    <Form onSubmit={handlerRegister}>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                                            <Input type="email" name="email" id="exampleEmail" placeholder="mail@mail.com" autoFocus required onChange={onChange} value={email} />
                                        </FormGroup>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="examplePassword" className="mr-sm-2">Password</Label>
                                            <Input type="password" name="password" id="examplePassword" placeholder="************" required onChange={onChange} value={password} />
                                        </FormGroup>
                                        <Button id="register-btn">Submit</Button>
                                    </Form>
                                </CardBody>
                                <CardFooter><section id="register-footer"><a target="_blank" rel="noopener noreferrer" href="https://www.freeprivacypolicy.com/privacy/view/7e1edcf76cf808495c3fd323be3ced6b">Privacy Policy</a> or <a href="/#/login">Login</a></section></CardFooter>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>

            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isRegisterPending: state.register.isRegisterPending,
        isRegisterSuccess: state.register.isRegisterSuccess,
        registerError: state.register.registerError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (email, password) => dispatch(register(email, password)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));