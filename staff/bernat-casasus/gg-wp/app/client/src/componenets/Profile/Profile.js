import React, { Component } from 'react';
// import { Feedback } from "../index";
import logic from '../../logic'
import './Profile.css'
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    Form, FormGroup, Label, Input, Container, Row, Col
} from 'reactstrap';

import './Profile.css'

class Profile extends Component {

    handlerProfile = e => {
    }

    componentDidMount() {
    }

    retrieveData = () => {
    }
    render() {
        return (
            <div className="profile-container">
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs="12" sm="12" md="12" lg="4">
                        <section id="current-data-card">
                            <Card id="profile-card-1">
                                <CardHeader id="profile-title">Current Data</CardHeader>
                                <CardBody>
                                    <Form>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                                            <Input type="email" name="email" id="exampleEmail" placeholder="bernat@gmail.com" disabled="true"  />
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                                <CardFooter><section id="profile-footer"><a target="_blank" rel="noopener noreferrer" href="https://www.freeprivacypolicy.com/privacy/view/7e1edcf76cf808495c3fd323be3ced6b">Privacy Policy</a></section></CardFooter>
                            </Card>
                        </section>
                        </Col>
                        <Col xs="12" sm="12" md="12" lg="4">
                            <Card id="profile-card-2">
                                <CardHeader id="update-title">Update Profile</CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handlerProfile}>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="new-email" className="mr-sm-2">Email</Label>
                                            <Input type="email" name="email" id="new-email" placeholder="mail@mail.com"  />
                                        </FormGroup>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="current-password" className="mr-sm-2">Password</Label>
                                            <Input type="password" name="password" id="current-password" placeholder="************" required  />
                                        </FormGroup>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Label for="new-password" className="mr-sm-2">New Password</Label>
                                            <Input type="password" name="new-password" id="new-password" placeholder="************"  />
                                        </FormGroup>
                                        <Button id="update-btn">Update</Button>
                                    </Form>
                                </CardBody>
                                <CardFooter><section id="update-footer"><a target="_blank" rel="noopener noreferrer" href="https://www.freeprivacypolicy.com/privacy/view/7e1edcf76cf808495c3fd323be3ced6b">Privacy Policy</a></section></CardFooter>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>

            </div>
        );
    }
};

export default Profile;