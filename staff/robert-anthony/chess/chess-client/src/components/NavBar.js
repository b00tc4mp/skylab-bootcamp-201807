import React, {Component} from 'react'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
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

  onLogout = e => {
    const {props:{onLogout}} = this
    e.preventDefault()
    this.closeNavBar()
    onLogout()
  }

  render() {
    const {props: {nickname,isLoggedIn, onLogout}} = this
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand className="navbar__brand" href="/">Jaquematic 3000 <img src="images/redknight.png"/></NavbarBrand>
          {nickname && <h2 className="navbar__nickname">{nickname}</h2>}
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
              {isLoggedIn && <NavLink  onClick={onLogout} href="#">Logout</NavLink>}
              {!isLoggedIn && <NavLink onClick={this.closeNavBar} href="/#/login">Login</NavLink>}
            </NavItem>
            <NavItem>
              {!isLoggedIn && <NavLink onClick={this.closeNavBar} href="/#/register">Register</NavLink>}
            </NavItem>
          </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}