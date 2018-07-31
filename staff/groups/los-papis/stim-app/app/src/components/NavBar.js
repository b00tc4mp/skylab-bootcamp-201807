import React,{Component} from 'react'
import {Navbar,NavLink} from 'reactstrap'

class NavBar extends Component{
    render(){
        return <Navbar color="light" light expand="md"> <NavLink href="#/">Click me </NavLink> {this.props.isLoggedIn ? <NavLink href="#/profile">Click me im logged! </NavLink> : null}  </Navbar>
    }
}

export default NavBar