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

<<<<<<< HEAD
  render() {
    return <div>
      <Navbar color="light" light expand="md">
        {this.props.isLoggedIn ? <div><NavbarBrand to="/home" tag={Link} > <img className="stim-logo" src="https://orig00.deviantart.net/21ed/f/2016/181/e/8/steam_logo_512x_by_garyosavan-da86b2s.png" /></NavbarBrand> </div> : <NavbarBrand to="/" tag={Link} ><img class="stim-logo" src="https://orig00.deviantart.net/21ed/f/2016/181/e/8/steam_logo_512x_by_garyosavan-da86b2s.png" /></NavbarBrand>}
        {this.props.isLoggedIn ? <div  class="row"><NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
=======
    render() {
        return  <Navbar color="light" light expand="md">
          {this.props.isLoggedIn ? <div><NavbarBrand to="/home" tag={Link} > Home</NavbarBrand> </div> : <NavbarBrand to="/" tag={Link} > Home</NavbarBrand> }
          {this.props.isLoggedIn ? <div><NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-8" navbar>
            <NavItem>
                <NavLink tag={Link} to="/search">Search Games</NavLink>
              </NavItem>
>>>>>>> develop
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
<<<<<<< HEAD
          </Collapse> </div> : ""}
      </Navbar>
    </div>
  }
=======
          </Collapse> </div>: ""}
        </Navbar>
    } 
>>>>>>> develop
}

export default NavBar