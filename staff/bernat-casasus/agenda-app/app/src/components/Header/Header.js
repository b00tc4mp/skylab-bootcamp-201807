import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handlerLogout = () => {
        // this.props.onLogout()
    }
    render() {
        const {props:{isLoggedIn}} = this
        return (

            <div className="header-maindiv d-flex justify-content-around">
                <NavbarBrand href="/"><img src="images/red-agenda-logo.png" width="80px" height="80px" alt="logo" /> Agenda 2018</NavbarBrand>
                <Navbar dark expand="md" >
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            {!isLoggedIn &&  <NavItem>
                                <NavLink id="btn-register" tag={Link} to="/register">Register</NavLink>
                            </NavItem>}
                            {!isLoggedIn && <NavItem>
                                <NavLink id="btn-login" tag={Link} to="/login">Login</NavLink>
                            </NavItem>}
                            {isLoggedIn && <NavItem>
                                <NavLink id="btn-home" tag={Link} to="/home">Home</NavLink>
                            </NavItem>}
                            {isLoggedIn && <NavItem>
                                <NavLink id="btn-profile" tag={Link} to="/profile">Profile</NavLink>
                            </NavItem>}
                            {isLoggedIn && <NavItem>
                                <NavLink id="btn-logout" onClick={this.handlerLogout}>Logout</NavLink>
                            </NavItem>}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
          

        );
    }
}
