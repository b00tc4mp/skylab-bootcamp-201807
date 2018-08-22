import React from 'react';
import {
    Jumbotron, Button, FormGroup, Label, Input, Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, InputGroup, InputGroupAddon, Container, Row, Col
} from 'reactstrap';
import './Contacts.css'
export default class Contacts extends React.Component {
    render() {

        return (
            <div>
                <Jumbotron id="jumbotron-results">
                    <InputGroup>
                        <Input placeholder="type a contact name to start..." />
                        <InputGroupAddon addonType="append" placeholder="adad">
                            <Button color="secondary">Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <Container>
                        <Row>
                            <Col sm="6" className="cards">
                                <Card>
                                    <CardHeader>Header</CardHeader>
                                    <CardBody>
                                        <CardTitle>Special Title Treatment</CardTitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    </CardBody>
                                    <CardFooter> <Button>Edit</Button> <Button>Delete</Button></CardFooter>
                                </Card></Col>
                            <Col sm="6" className="cards">
                                <Card>
                                    <CardHeader>Header</CardHeader>
                                    <CardBody>
                                        <CardTitle>Special Title Treatment</CardTitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    </CardBody>
                                    <CardFooter> <Button>Edit</Button> <Button>Delete</Button></CardFooter>
                                </Card></Col>
                            <Col sm="6" className="cards">
                                <Card>
                                    <CardHeader>Header</CardHeader>
                                    <CardBody>
                                        <CardTitle>Special Title Treatment</CardTitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    </CardBody>
                                    <CardFooter> <Button>Edit</Button> <Button>Delete</Button></CardFooter>
                                </Card></Col>
                            <Col sm="6" className="cards">
                                <Card>
                                    <CardHeader>Header</CardHeader>
                                    <CardBody>
                                        <CardTitle>Special Title Treatment</CardTitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    </CardBody>
                                    <CardFooter> <Button>Edit</Button> <Button>Delete</Button></CardFooter>
                                </Card></Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
};
