import React from 'react';
import {
    Jumbotron, Button, FormGroup, Label, Input, Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, InputGroup
} from 'reactstrap';
import './Notes.css'
export default class Notes extends React.Component {
    render() {

        return (
            <div>
                <Jumbotron id="jumbotron-results">
          
                    <FormGroup>
                        <Label for="exampleDate">Date</Label>
                        <Input type="date" name="date" id="exampleDate" />
                    </FormGroup>
                
                    <Card>
                        <CardHeader>Header</CardHeader>
                        <CardBody>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        </CardBody>
                        <CardFooter> <Button>Edit</Button> <Button>Delete</Button></CardFooter>
                    </Card>

                </Jumbotron>
            </div>
        );
    }
};
