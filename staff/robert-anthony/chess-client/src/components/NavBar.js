import React, {Component} from 'react'

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
  DropdownItem } from 'reactstrap';

export default class NavBar extends Component {


  render() {
    const {props:{isLoggedIn,onLogin,onLogout}} = this
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">¡Ajedrez!</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/#/main">Home</NavLink>
              </NavItem>
              <NavItem>
                {isLoggedIn && <NavLink href="/#/invite">Invite</NavLink>}
              </NavItem>
              <NavItem>
                {isLoggedIn && <NavLink href="/#/games">Games</NavLink>}
              </NavItem>
              <NavItem>
                {isLoggedIn &&<NavLink onClick={onLogout} href="#">Logout</NavLink>}
                {!isLoggedIn &&<NavLink href="/#/login">Login</NavLink>}
              </NavItem>
              <NavItem>
                {!isLoggedIn &&<NavLink href="/#/login">Register</NavLink>}
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}