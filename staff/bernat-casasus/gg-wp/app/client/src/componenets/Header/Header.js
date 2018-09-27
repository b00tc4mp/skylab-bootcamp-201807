import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom'
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

import logic from '../../logic'
import { connect } from 'react-redux';
import { session } from '../../redux/actions/sessionActions';

class Header extends React.Component {
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
        logic.logout()
        this.props.session(false)
    }
    render() {
        let { props: { isLoggedIn } } = this
        return (
            <div className="header-maindiv d-flex justify-content-around">
                <NavbarBrand href="/"><img src="images/logo.png" alt="logo" /> GG.WP</NavbarBrand>
                <Navbar dark expand="md" >
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle id="btn-language" nav caret>Language</DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>English</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            {!isLoggedIn && <NavItem>
                                <NavLink id="btn-register" tag={Link} to="/register">Register</NavLink>
                            </NavItem>}
                            {!isLoggedIn && <NavItem>
                                <NavLink id="btn-login" tag={Link} to="/login">Login</NavLink>
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

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.session.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        session: (state) => dispatch(session(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)