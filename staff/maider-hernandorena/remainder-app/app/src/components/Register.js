import React, { Component } from 'react'
import logic from '../logic'
import '../styles/css/register.css'

class Register extends Component {
    state = {
        code: '',
        password: '',
        registered: false,
        error: ''
    }

    keepCode = e => this.checkcode(e.target.value) 
    keepPassword = e => this.checkPassword(e.target.value) 

    checkcode = value => {
        const regex = (/^[a-zA-Z0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null ) this.setState({ code: value, error: '' })
    }

    checkPassword = value => {
        const regex = (/^[a-zA-Z0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null ) this.setState({ password: value, error: '' })    
    }

    onRegister = e => {
        e.preventDefault()

        const { code, password } = this.state

        logic.registerDoctor(code, password)
            .then(() => this.setState({ registered: true }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    render() {
        const { state: { code, password, registered, error }, keepCode, keepPassword, onRegister } = this

        return <main className="register">
            <div className="register__group">
                {!registered ? <p className="register__group__text">Register or go to 
                    <a className="register__group__text__link" href="/#/login"> Login</a>
                </p> : <p className="register__group__text register__group__goToLogin">You have registered successfully, now you can go to 
                    <a className="register__group__text__link" href="/#/login" onClick={this.props.linkToLogin}> Login</a>
                </p>}
                <form className="register__group__form" onSubmit={onRegister}>
                    <input className="register__group__form__input" type="text"value={code} name="code" placeholder="code" autoFocus onChange={keepCode} />
                    <input className="register__group__form__input" type="password" value={password} name="password" placeholder="password" onChange={keepPassword} />
                    <button className="register__group__form__button" type="submit">Register</button>
                </form>
                {error && <p className="register__group__error">{error}</p>}           
            </div>
        </main>
    }
}

export default Register