import React, { Component } from 'react'
import logic from '../logic'

class Register extends Component {
    state = {
        email: '',
        password: '',
        registered: false,
        error: ''
    }

    keepEmail = e => this.setState({ email: e.target.value, error: '' }) 
    keepPassword = e => this.checkPassword(e.target.value) 

    checkPassword = value => {
        const regex = (/^[a-zA-Z0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null ) this.setState({ password: value, error: '' })    
    }

    onRegister = e => {
        e.preventDefault()

        const { email, password } = this.state

        logic.registerCaretaker(email, password)
            .then(() => this.setState({ registered: true }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    render() {
        const { state: { registered, error }, keepEmail, keepPassword, onRegister } = this

        return <main className="register">
            <div className="register__group">
                {!registered ? <p className="register__group__text">Register or go to 
                    <a className="register__group__text__link" href="/#/login"> Login</a>
                </p> : <p className="register__group__text register__group__goToLogin">You have registered successfully, now you can go to 
                    <a className="register__group__text__link" href="/#/login" onClick={this.props.linkToLogin}> Login</a>
                </p>}
                <form className="register__group__form" onSubmit={onRegister}>
                    <input className="register__group__form__input" type="text" name="email" placeholder="email" onChange={keepEmail} />
                    <input className="register__group__form__input" type="password" name="password" placeholder="password" onChange={keepPassword} />
                    <button className="register__group__form__button" type="submit">Register</button>
                </form>
                {error && <p className="register__group__error">{error}</p>}           
            </div>
        </main>
    }
}

export default Register