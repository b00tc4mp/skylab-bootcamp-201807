import React, { Component } from 'react'
import mainLogo from '../images/thunderbid.png'
import { Link } from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'

class NavBar extends Component{

    render() {
        return <div>
            {this.props.isLoggedIn() ? <Navbar color="light" light expand="md" id="nav">
          <Link to={'/'}><img src={mainLogo} id='app-logo'/></Link>
            <Nav className="ml-auto">
              <NavItem className='mr-3'>
                <Link to={'/user/bids'}>Bids</Link>
              </NavItem>
              <NavItem className='mr-3'>
                <Link to={'/user/wishes'}>Wishes</Link>
              </NavItem>
              <NavItem>
                <Link to={'/'} onClick={this.props.handleLogout}>Log Out</Link>
              </NavItem>
            </Nav>
        </Navbar> : <Navbar color="light" light expand="md" id="nav">
          <Link to={'/'}><img src={mainLogo} id='app-logo'/></Link>
            <Nav className="ml-auto" navbar>
              <NavItem className='mr-3'>
                <Link to={'/login'}>Login</Link>
              </NavItem>
              <NavItem>
                <Link to={'/register'}>Register</Link>
              </NavItem>
            </Nav>
        </Navbar>}
      </div>
    }
}

export default NavBar