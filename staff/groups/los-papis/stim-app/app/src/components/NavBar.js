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
} from 'reactstrap';
import { Link } from 'react-router-dom'

class NavBar extends Component {

    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
        return  <Navbar color="light" light expand="md">
          {this.props.isLoggedIn ? <div><NavbarBrand to="/home" tag={Link} > Home</NavbarBrand> </div> : <NavbarBrand to="/" tag={Link} > Home</NavbarBrand> }
          {this.props.isLoggedIn ? <div><NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-8" navbar>
            <NavItem>
                <NavLink tag={Link} to="/search">Search Games</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/top">Top played games</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Profile
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Profile details
                  </DropdownItem>
                  <DropdownItem>
                    Profile settings
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse> </div>: ""}
        </Navbar>
    } 
}

export default NavBar