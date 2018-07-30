import React from 'react';
import './NavBar.css';
import '../logic'
import PropTypes from 'prop-types';
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
  DropdownItem } from 'reactstrap';

export default class NavBar extends React.Component {

  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,

  }


  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  doLogout = () => {
    console.log("need to implement logout")
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
               <NavLink  tag={Link} to="/home">Home</NavLink>
              </NavItem>
              <NavItem>
              <NavLink  tag={Link}  to="/search">Search</NavLink>
              </NavItem>
              <NavItem>
             <NavLink  tag={Link}  to="/favourites">Favourites</NavLink>
              </NavItem>
              <NavItem>
               <NavLink  tag={Link}  to="/register">Register</NavLink>
              </NavItem>
              <NavItem>
               <NavLink  tag={Link}  to="/login">Login</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <img src={'http://www.mas40.com/app/mobileimg/icos/ico-perfil.png'} alt="User profile" style={{width:70, marginTop: -15}} /> 
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link  to="/user">Profile</Link>
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