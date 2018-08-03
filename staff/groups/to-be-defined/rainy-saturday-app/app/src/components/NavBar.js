import React from 'react';
import './NavBar.css';
import logic from '../logic'
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
    this.props.onLogout()
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const imgURL = logic.cloudinaryURL || "http://www.mas40.com/app/mobileimg/icos/ico-perfil.png"
    return (
      <div className="navbar-maindiv">
        <Navbar expand="md">
          <NavbarBrand id="comRainysaturdayNavBar" href="/">Rainy Saturday</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
               <NavLink  className="navLinks" tag={Link} to="/home">Home</NavLink>
              </NavItem>
              <NavItem>
              {this.props.isLoggedIn && <NavLink className="navLinks"  tag={Link}  to="/search">Search</NavLink>}
              </NavItem>
              <NavItem>
              {this.props.isLoggedIn && <NavLink className="navLinks" tag={Link}  to="/favourites">Favourites</NavLink>}
              </NavItem>
              <NavItem>
               {!this.props.isLoggedIn && <NavLink className="navLinks" tag={Link}  to="/register">Register</NavLink>}
              </NavItem>
              <NavItem>
               {!this.props.isLoggedIn && <NavLink className="navLinks" tag={Link}  to="/login">Login</NavLink>}
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
              {this.props.isLoggedIn && <DropdownToggle nav caret>
                <img src={imgURL} alt="User profile" className="imageProfile" />
                </DropdownToggle>}
                <DropdownMenu right>
                  <DropdownItem>
                    <Link  to="/user">Profile</Link>
                  </DropdownItem>
                  <DropdownItem onClick={this.doLogout}>
                   Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}