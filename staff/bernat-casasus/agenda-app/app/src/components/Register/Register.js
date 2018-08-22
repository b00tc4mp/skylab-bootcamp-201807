import React, { Component } from 'react';
// import { Feedback } from "../index";
// import logic from '../../logic'
import {withRouter} from 'react-router-dom'
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    Form, FormGroup, Label, Input, Container, Row, Col
} from 'reactstrap';

import './Register.css'

class Register extends Component {

    state = {
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        registerError: null,
    }

    componentDidMount() {
        // this.props.disableSearch()
    }
    keepName = e => this.setState({ name: e.target.value })
    keepLastname = e => this.setState({ lastname: e.target.value })
    // keepUsername = e => this.setState({ username: e.target.value })
    keepEmail = e => this.setState({ email: e.target.value })
    keepPassword = e => this.setState({ password: e.target.value })

    handlerRegister = e => {
        e.preventDefault()
        const { state: { name, lastname, username, email, password } } = this

        // logic.registerUser(name, lastname, username, email, password)
        //     .then(() => {
        //         this.setState({
        //             name: "",
        //             lastname: "",
        //             username: "",
        //             email: "",
        //             password: "",
        //             errorRegister: null
        //         })
        //         this.props.history.push('/login')
        //     })
            .catch(({message}) => {
                setTimeout(() =>{
                    this.setState({
                        registerError: null,
                        username: "",
                        password: ""
                      })
                 }, 5000);

                this.setState({
                    registerError: message,
                    username: "",
                    password: ""
                  })

            })
    }

    render() {
        const { state: { name, lastname, username, email, password,registerError }, handlerRegister, keepName, keepLastname, keepUsername, keepEmail, keepPassword } = this
        return (
            <div className="register-container">
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs="12" sm="8" md="6" lg="4">
                            <Card id="register-body">
                                <CardHeader id="register-title">Register</CardHeader>
                                <CardBody>
                                    <Form onSubmit={handlerRegister}>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="name" className="mr-sm-2">Name</Label>
                                            <Input type="text" name="name" id="user-name" placeholder="Jhon" autoFocus="true" required value={name} onChange={keepName} />
                                        </FormGroup>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="lastName" className="mr-sm-2">Last name</Label>
                                            <Input type="text" name="lastname" id="user-lastname" placeholder="Doe" required value={lastname} onChange={keepLastname} />
                                        </FormGroup>
                                        {/* <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="username" className="mr-sm-2">Userame</Label>
                                            <Input type="text" name="username" id="user-username" placeholder="octo23" required value={username} onChange={keepUsername} />
                                        </FormGroup> */}
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                                            <Input type="email" name="email" id="exampleEmail" placeholder="mail@idk.cool" required value={email} onChange={keepEmail} />
                                        </FormGroup>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="examplePassword" className="mr-sm-2">Password</Label>
                                            <Input type="password" name="password" id="examplePassword" placeholder="************" required value={password} onChange={keepPassword} />
                                        </FormGroup>
                                        <Button id="register-btn">Submit</Button>
                                    </Form>
                                </CardBody>
                                <CardFooter><section id="register-footer"><a href="/#">Privecy Policy</a> or <a href="/#">Login!</a></section></CardFooter>
                            </Card>
                            {/* {registerError && <Feedback message={registerError} />} */}
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>

            </div>
        );
    }
};

export default withRouter(Register);