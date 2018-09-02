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
  DropdownItem
} from 'reactstrap';

export default class NavBar extends Component {

  state = {
    isOpen:false,
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  closeNavBar = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    const {props: {isLoggedIn, onLogin, onLogout}} = this
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">¡Ajedrez!</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>

          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={this.closeNavBar} href="/#/main">Home</NavLink>
            </NavItem>
            <NavItem>
              {isLoggedIn && <NavLink onClick={this.closeNavBar} href="/#/invite">Invite</NavLink>}
            </NavItem>
            <NavItem>
              {isLoggedIn && <NavLink onClick={this.closeNavBar} href="/#/games">Games</NavLink>}
            </NavItem>
            <NavItem>
              {isLoggedIn && <NavLink onClick={this.closeNavBar} onClick={onLogout} href="#">Logout</NavLink>}
              {!isLoggedIn && <NavLink onClick={this.closeNavBar} href="/#/login">Login</NavLink>}
            </NavItem>
            <NavItem>
              {!isLoggedIn && <NavLink onClick={this.closeNavBar} href="/#/login">Register</NavLink>}
            </NavItem>
          </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}