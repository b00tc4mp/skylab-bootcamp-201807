import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import FormErrors from '../components/formerrors'
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

class Landing extends Component {
    
    state = {
        url: '',
        formErrors: {url: ''},
        urlValid: false,
        formValid: false
    }

    

    

    validateField = e => {
        const seturl = e.target.value
        
        let fieldValidationErrors = this.state.formErrors;
        let urlValid = this.state.urlValid;
        
        
        urlValid = seturl.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/)
        console.log(urlValid)
        
        fieldValidationErrors.url = urlValid ? '' : 'invalid youtube url';
        this.setState({url: seturl})
        this.setState({formErrors: fieldValidationErrors,
                urlValid: urlValid}, this.validateForm)   
        }

    validateForm = () => this.setState({formValid: this.state.urlValid})

    landingurl = e => this.setState({ url: e.target.value })

    isLoggedIn() {
        if (sessionStorage.getItem('token') === null){
            return false
        } else true
        
      }

    gotoLandingEditor = () => {
        sessionStorage.setItem('landingUrl', this.state.url)
        sessionStorage.setItem('origin', 'landing')
        this.props.history.push('/editorlanding')
    }

    gotoLogin = () => {
        this.isLoggedIn() ? this.props.history.push('/home') : this.props.history.push('/login')
    }

    gotoRegister = () => {
        this.props.history.push('/register')
    }


    
    render() {

        const {url} = this.state

        return (
            <div class='landing_back'>
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
                <header className='landing_header'>
                    <h1 className='landing_title'>CATCH THE RIGHT MOMENT</h1>
                    <h3 className='landing_subtitle'>Take notes from YouTube videos</h3>
                </header>

                <InputGroup className='center_landing' col xs="6">
                    <InputGroupAddon addonType="prepend"><Button 
                    onClick={this.gotoLandingEditor} disabled={!this.state.formValid}
                    >TRY GOTCHA</Button></InputGroupAddon>
                
                    <Input className='landing_input' type='text' name='url' placeholder='paste a youtube link' onChange={this.validateField} />

                    <InputGroupAddon addonType="append"><Button onClick={this.gotoRegister}>Sign Up</Button></InputGroupAddon>
                </InputGroup>
                
                
                
                <div>
                <FormErrors formErrors={this.state.formErrors} />
                </div>
            </div>

        )
    }
}

export default withRouter(Landing)