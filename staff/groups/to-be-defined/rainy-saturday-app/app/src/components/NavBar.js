import React from 'react';
import './NavBar.css';
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

export default class NavBar extends React.Component {
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
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand id="comRainysaturdayNavBarFontSize" href="/">Rainy Saturday</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink id="comRainysaturdayNavBarFontSize" href="/components/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink id="comRainysaturdayNavBarFontSize" href="/components/">Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink id="comRainysaturdayNavBarFontSize" href="/components/">Favourites</NavLink>
              </NavItem>
              <NavItem>
                <NavLink id="comRainysaturdayNavBarFontSize" href="/component/">Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink id="comRainysaturdayNavBarFontSize" href="/components/">Login</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <img src={'http://www.mas40.com/app/mobileimg/icos/ico-perfil.png'} alt="User profile" style={{width:70, marginTop: -15}} /> 
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Profile
                  </DropdownItem>
                  <DropdownItem>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {/* {/* <NavItem>
              <img src={'http://www.mas40.com/app/mobileimg/icos/ico-perfil.png'} style={{width:50, marginTop: -7}} /> </NavItem> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}