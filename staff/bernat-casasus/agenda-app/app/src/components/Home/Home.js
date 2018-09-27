import React from 'react';
import './Home.css'
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink, Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import { Notes, Contacts } from '../index'
export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            Contacts: false,
            Notes: true,
        };
    }

    showNotes() {
        this.setState({ Contacts: false, Notes: true })
    }
    showContacts() {
        this.setState({ Notes: false, Contacts: true })
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    render() {
        return (
            <div className="results-container">
                <Container>
                    <Row id="user-matches">
                        <Col>
                        </Col>
                        <Col sm="8">
                            <Nav tabs id="nav-results">
                                {this.state.Notes ?
                                    <NavItem>
                                        <NavLink href="#" active onClick={() => this.showNotes()}>Notes</NavLink>
                                    </NavItem>
                                    :
                                    <NavItem>
                                        <NavLink className="link" href="#" onClick={() => this.showNotes()}>Notes</NavLink>
                                    </NavItem>}
                                {this.state.Contacts ?
                                    <NavItem>
                                        <NavLink href="#" active onClick={() => this.showContacts()}>Contacts</NavLink>
                                    </NavItem>
                                    :
                                    <NavItem>
                                        <NavLink className="link" href="#" onClick={() => this.showContacts()}>Contacts</NavLink>
                                    </NavItem>}
                            </Nav>
                            {this.state.Notes && <Notes />}
                            {this.state.Contacts && <Contacts />}

                        </Col>
                        <Col></Col>

                    </Row>

                </Container>
            </div>
        );
    }
}