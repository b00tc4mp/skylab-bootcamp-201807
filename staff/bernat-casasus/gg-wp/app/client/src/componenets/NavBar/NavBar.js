import React from 'react';
import './NavBar.css'
import {SearchBar} from '../index'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
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

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isHomeActive: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {props:{ isSearchBarActive }} = this
    return (
      <div className="cool nav justify-content-around">

        <ul className="cool nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link navBarItem" href="/#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link navBarItem" href="/#/collections">Collection</a>
          </li>
        </ul>
        {isSearchBarActive && <SearchBar />}
        {!isSearchBarActive && <div className="div-space"></div>}   
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isSearchBarActive: state.searchBar.isSearchBarActive,
  }
}

export default connect(mapStateToProps)(NavBar)