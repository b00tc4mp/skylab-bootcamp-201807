import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import FormErrors from '../components/FormErrors'
import {Navbar, NavbarBrand, Nav, NavItem, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';

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
                
        fieldValidationErrors.url = urlValid ? '' : 'invalid youtube';
        this.setState({url: seturl})
        this.setState({formErrors: fieldValidationErrors,
                urlValid: urlValid}, this.validateForm)   
    }

    validateForm = () => this.setState({formValid: this.state.urlValid})

    landingurl = e => this.setState({ url: e.target.value })

    isLoggedIn() {
        if (sessionStorage.getItem('token') === null){
            return false
        } else {
            return true
        }
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

        return (

            <div class='landing_back'>
                <Navbar >
                    <NavbarBrand>
                        <Link to='/'>
                        <Button color="danger" className='nav_button'>GOTCHA!</Button>
                        </Link>
                    </NavbarBrand>
                        <Nav pills>
                            <NavItem>
                                <Link to='/register'>
                                <Button color="primary" className='nav_button' active>Sign Up</Button>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/login'>
                                <Button  color="secondary" className='nav_button' active>Login</Button>
                                </Link>
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
                    <div className='landing_error'>
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                
            </div>

        )
    }
}

export default withRouter(Landing)
                
                
                
                