import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import {Navbar, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';


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
                        <NavbarBrand href="/home">
                            <Button color="danger" className='nav_button'>GOTCHA!</Button>
                        </NavbarBrand>
                            <Nav pills>
                                <NavItem>
                                    <NavLink href="/editor">New Notebook</NavLink>
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
                                    <Button outline color="primary" onClick={this.onLogout} className='nav_button'>Logout</Button>
                                </NavItem>
                                </Nav>
                    </Navbar >
                      
                  </div>

                : <div>
                    <Navbar >
                        <NavbarBrand href="/">
                            <Button color="danger" className='nav_button'>GOTCHA!</Button>
                        </NavbarBrand>
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
                                    <Button href="/login" color="success" className='nav_button'>Login</Button>
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