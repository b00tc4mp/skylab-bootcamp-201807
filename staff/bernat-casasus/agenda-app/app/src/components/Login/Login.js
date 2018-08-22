import React, { Component } from 'react';
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    Form, FormGroup, Label, Input, Container, Row, Col
} from 'reactstrap';

import './Login.css'
// import { Feedback } from "../index";

class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    componentDidMount() {
        // this.props.disableSearch()
    }

    keepUsername = e => this.setState({username: e.target.value})
    keepPassword = e => this.setState({password: e.target.value})

    handlerLogin = e => {
        e.preventDefault()

        // const {state: {username, password}} = this
        // this.props.onLogin(username, password)
    }
    render() {
        const {state:{username, password}, keepUsername, keepPassword} = this
        return (
            <div className="login-container">
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs="12" sm="8" md="6" lg="4">
                            <Card id="login-body">
                                <CardHeader id="login-title">Login</CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handlerLogin}>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="userName" className="mr-sm-2">Email</Label>
                                            <Input type="email" name="username" id="user-username" placeholder="fulanito@menga.com" autoFocus="true"  required value={username} onChange={keepUsername}/>
                                        </FormGroup>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="examplePassword" className="mr-sm-2">Password</Label>
                                            <Input type="password" name="password" id="examplePassword" placeholder="************" required value={password} onChange={keepPassword}/>
                                        </FormGroup>
                                        <Button id="login-btn">Submit</Button>
                                    </Form>
                                </CardBody>
                                <CardFooter><section id="login-footer"><a href="/#">Forgot password?</a> or <a href="/#">Sign Up!</a></section></CardFooter>
                            </Card>
                            {/* {this.props.LoginError && <Feedback message={this.props.LoginError} />} */}
                        </Col>

                        <Col></Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default Login;