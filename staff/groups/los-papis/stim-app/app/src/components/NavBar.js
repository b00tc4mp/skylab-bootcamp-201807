import React, { Component } from 'react'
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
} from 'reactstrap'
import { Link } from 'react-router-dom'

class NavBar extends Component {

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handle

    render() {
        return  <Navbar color="light"  light expand="md">
          {this.props.isLoggedIn ? <div><NavbarBrand  to="/home" tag={Link} > Home</NavbarBrand> </div> : <NavbarBrand to="/" tag={Link} > Home</NavbarBrand> }
          {this.props.isLoggedIn ? <div><NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-8" navbar>
            <NavItem>
                <NavLink color="light" tag={Link} to="/search">Search Games</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/favorites">Favorite Games</NavLink>
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

export default NavBar

