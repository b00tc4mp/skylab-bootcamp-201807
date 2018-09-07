import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
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
    DropdownItem,
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    Col
} from 'reactstrap';


class Navbars extends Component {
    state = {
        loggedin: false
    }
    onLogout = e => {
        e.preventDefault()
        this.setState({ userId: '', token: '' })
        sessionStorage.clear()
        this.props.history.push('/')
        window.location.reload()
      }

    componentDidMount(){
        if (sessionStorage.getItem('token') !== null) {
            this.setState({ loggedin: true})
        }
    }
    
    render () 
        {
        const {loggedin} = this.state
        
        return (
            <div>
            { 
                (loggedin) 
                
                ? <div>
                    <Navbar >
                        <NavbarBrand href="/home">Gotcha</NavbarBrand>
                            <Nav pills>
                                <NavItem>
                                    <NavLink href="/editor">Editor</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/notebooks">Notebooks</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/notes">Notes</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/faq">FAQ</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/about">About</NavLink>
                                </NavItem>                                
                                <NavItem>
                                    <NavLink href="/profile">Account</NavLink>
                                </NavItem>
                                <NavItem>
                                    <Button onClick={this.onLogout} color="secondary" className='nav_button' active>Logout</Button>
                                </NavItem>
                                </Nav>
                    </Navbar >
                      
                  </div>

                : <div>
                    <Navbar >
                        <NavbarBrand href="/">Gotcha</NavbarBrand>
                            <Nav pills>
                                <NavItem>
                                    <NavLink href="/faq">FAQ</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/about">About</NavLink>
                                </NavItem>
                                <NavItem>
                                    <Button href="/register" color="primary" className='nav_button' active>Sign Up</Button>
                                </NavItem>
                                <NavItem>
                                    <Button href="/login" color="secondary" className='nav_button' active>Login</Button>
                                </NavItem>
                       </Nav>
                    </Navbar >
                 </div>
            }
            </div>
        )
    }
    
}

export default withRouter(Navbars)