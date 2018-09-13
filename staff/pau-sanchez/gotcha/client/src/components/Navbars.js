import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import {Navbar, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';

class Navbars extends Component {
    state = {
        loggedin: this.props.loggedinHome,
    }

    componentDidMount(){
        sessionStorage.getItem('token') !== null ? this.setState({ loggedin: true}) : this.setState({ loggedin: false})
    }

    onLogout = e => {
        e.preventDefault()
        this.setState({ userId: '', token: '' })
        sessionStorage.clear()
        this.props.history.push('/')
        window.location.reload()
    }

    render () {
        
        const {loggedin} = this.state
        
        return <div>
            
                { 
                ((this.props.loggedinHome || loggedin) === true) 
                ?<div>
                    <Navbar >
                        <NavbarBrand >
                            <Link to='/home'>
                                <Button outline color="danger" className='nav_button'>GOTCHA!</Button>
                            </Link>
                        </NavbarBrand>
                            <Nav pills>
                                <NavItem>
                                    <Link to='/editor'>
                                        <NavLink >New Notebook</NavLink>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to='/notebooks'>
                                        <NavLink >Notebooks</NavLink>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to='/notes'>
                                        <NavLink >Notes</NavLink>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Button outline color="primary" onClick={this.onLogout} className='nav_button'>Logout</Button>
                                </NavItem>
                            </Nav>
                    </Navbar >
                </div>
                :<div>
                    <Navbar >
                        <NavbarBrand>
                            <Link to='/'>
                                <Button outline color="danger" className='nav_button'>GOTCHA!</Button>
                            </Link>
                        </NavbarBrand>
                            <Nav pills>
                                <NavItem>
                                    <Link to='/register'>
                                        <Button  color="primary" className='nav_button' active>Sign Up</Button>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to='/login'>
                                        <Button  color="success" className='nav_button'>Login</Button>
                                    </Link>
                                </NavItem>
                        </Nav>
                    </Navbar >
                </div>
                }

            </div>
        
    }
    
}

export default withRouter(Navbars)