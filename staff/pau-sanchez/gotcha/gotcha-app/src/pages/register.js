import React, {Component} from 'react'
import {logic} from '../logic'
import FormErrors from '../components/formerrors'
import { withRouter } from 'react-router-dom'

class Register extends Component {

    state = {
        email: '',
        password: '',
        name: '',
        formErrors: {email: '', password: '', name: ''},
        emailValid: false,
        passwordValid: false,
        nameValid: false,
        formValid: false,
        
        error:''
    }

    handlerUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {this.validateField(name, value) })
    }
    /*
    nameChange = e => this.setState({ name: e.target.value})
    passwordChange = e => this.setState({ password: e.target.value})
    emailChange = e => this.setState({email: e.target.value})
    */

    validateField(Fieldname, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let nameValid = this.state.nameValid;
        
        switch(Fieldname) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' password too short'
                break;
            case 'name':
                nameValid = value.match(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)
                fieldValidationErrors.name = nameValid ? '': 'name must be at least 6 characters long and with no special characters';
            default:
                break;
        }
        this.setState({ formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        nameValid: nameValid
                    }, this.validateForm)
    }

    validateForm = () => this.setState({formValid: this.state.emailValid && this.state.password && this.state.nameValid})

    handleSubmit = e => {
        e.preventDefault()
        const { name, password, email } = this.state

        return Promise.resolve()
            .then(() => {
                logic.register(email, password, name)
            })
            .then(() => {
                this.props.history.push('/login')
                console.log('gotologin')
            })
            .then(() => this.setState({ succedeed: true }))
            .catch(({ message }) => this.setState({ error: message }))

            

    }

    gotoLogin = () => {
        this.props.history.push('/login')
    }

    /*
    onRegister = e => {
        e.preventDefault()

        const { name, password, email } = this.state

        logic.register(email, password, name)
            .then(() => this.setState({ succedeed: true }))
            .catch(({ message }) => this.setState({ error: message }))
    }
    */

    render() {
        const { success, error } = this.state

        return (
            <main>
                <h1>REGISTER</h1>
                <form onSubmit={this.handleSubmit}>
                        <h2>Sign Up</h2>
                            <div>
                                <label>Name</label>
                                <input 
                                type='text' name='name' placeholder='name'
                                value={this.state.name}
                                onChange={this.handlerUserInput}
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input
                                type='text'name='email' placeholder='email@email.com'
                                value={this.state.email}
                                onChange={this.handlerUserInput}/>
                            </div>
                            <div>
                                <label>Password</label>
                                <input 
                                type='password' name='password' placeholder='Password'
                                value={this.state.password}
                                onChange={this.handlerUserInput}/>
                            </div>
                            <button type='submit' disabled={!this.state.formValid}>
                            Sign Up
                            </button>

                            <div>
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                
                </form>
                {/*{!success ? 
                <div>
                    <nav>

                    </nav>
                    <form onSubmit={this.onRegister}>
                        <input type="text" name="name" placeholder="Name" onChange={this.nameChange} />
                        <input type="password" name="password" placeholder="Password" onChange={this.passwordChange} />
                        <input type="email" name="email" placeholder="e@mail.com" onChange={this.emailChange} />
                        <button type="submit">register</button>

                    </form>
                    {error && <p>{error}</p>}
                </div> : <div>
                    <nav>
                        User register success
                    </nav>
                </div>}*/}
             </main>
            
        )
    }
}

export default withRouter(Register)