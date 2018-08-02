import React, { Component } from 'react'
import {
  Collapse,
  Button,
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
import { Link } from 'react-router-dom'
import logic from '../logic'
import images from "../images/logo-steam.png"
import "../styles/style-navbar.css"



class NavBar extends Component {

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handle

    render() {
        return  <Navbar  light expand="md">
          {this.props.isLoggedIn ? <div><NavbarBrand to="/home" tag={Link} ><img src={images}/></NavbarBrand> </div> : <NavbarBrand to="/" tag={Link} ><img src={images}/></NavbarBrand> }
          {this.props.isLoggedIn ? <div><NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-8" navbar>
            <NavItem>
                <NavLink tag={Link} to="/search">Search Games</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Profile
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to="/profilesettings">
                    Profile settings
                  </DropdownItem>
                  <DropdownItem onClick={this.props.handleLogout} >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse> </div>: ""}
        </Navbar>
    } 
}

export default NavBar;

