import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'


class Landing extends Component {

    state = {
        hostess: false,
        business: false,
        login: false,
        register: false,
        email: '',
        password: '',
        error: ''
    }

    handleEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleHostess = () => {
        this.setState({ hostess: true })
    }

    handleBusiness = () => {
        this.setState({ business: true })
    }

    handleHostessRegister = () => {
        this.setState({ register: true, login: false })
        // this.setState({ login: false })
    }

    handleHostessLogin = () => {
        this.setState({ login: true, register: false })
        // this.setState({ register: false})
    }

    handleBusinessRegister = () => {
        this.setState({ register: true, login: false })
        // this.setState({ login: false })
    }

    handleBusinessLogin = () => {
        this.setState({ login: true, register: false })
        // this.setState({ register: false})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { email, password } = this.state
        if (this.state.hostess) {
            if (this.state.register) {
                logic.registerHostess(email, password)
                    .then(() =>
                        logic.authenticateHostess(email, password)
                            .then((token) => {
                                this.props.hostessLogged(email, token)
                                this.props.history.push('/hostess/profile')
                            })
                            .catch(err => this.setState({ error: err.message }))
                    )
                    .catch(err => this.setState({ error: err.message }))
            } else {
                logic.authenticateHostess(email, password)
                    .then((token) => this.props.hostessLogged(email, token))
                    .catch(err => this.setState({ error: err.message }))
            }
        }
        if (this.state.business) {
            if (this.state.register) {
                logic.registerBusiness(email, password)
                    .then(() =>
                        logic.authenticateBusiness(email, password)
                            .then((token) => {
                                this.props.businessLogged(email, token)
                                this.props.history.push('/business/profile')
                            })
                            .catch(err => this.setState({ error: err.message }))
                    )
                    .catch(err => this.setState({ error: err.message }))
            } else {
                logic.authenticateBusiness(email, password)
                    .then((token) => this.props.businessLogged(email, token))
                    .catch(err => this.setState({ error: err.message }))
            }
        }
    }

    render() {

        const clickedRegister = (this.state.register || this.state.login) ? ' clicked register ' : ' '
        const clickedLogin = (this.state.login || this.state.register) ? ' clicked login ' : ' '

        return (
            <div className="block">
                <div className="landing">
                    <div>
                        <header>
                            <h1 className="landing-welcome">&bull; WELCOME TO HOSTESS &bull;</h1>
                        </header>
                        {
                            !this.state.hostess && !this.state.business && (
                                <div className="buttons">
                                    <button type="button" onClick={this.handleHostess} className="buttons-landing">HOSTESS</button>
                                    <button type="button" onClick={this.handleBusiness} className="buttons-landing">BUSINESS</button>
                                </div>
                            )
                        }
                        {
                            this.state.hostess && (
                                <div className="buttons">
                                    <button type="button" onClick={this.handleHostessLogin} className={clickedLogin + ' buttons-landing'}>LOGIN</button>
                                    <button type="button" onClick={this.handleHostessRegister} className={clickedRegister + ' buttons-landing'}>REGISTER</button>
                                </div>
                            )
                        }
                        {
                            this.state.business && (
                                <div className="buttons">
                                    <button type="button" onClick={this.handleBusinessLogin} className={clickedLogin + ' buttons-landing'}>LOGIN</button>
                                    <button type="button" onClick={this.handleBusinessRegister} className={clickedRegister + ' buttons-landing'}>REGISTER</button>
                                </div>
                            )
                        }
                        {
                            this.state.register && this.state.hostess && (
                                <form onSubmit={this.handleSubmit} className="landing-form">
                                    <input className="input-login" type="text" placeholder="hostess@mail.com" onChange={this.handleEmail}></input>
                                    <input className="input-login" type="password" placeholder="password" onChange={this.handlePassword}></input>
                                    <button type="submit" className="landing-submit">REGISTER</button>
                                </form>
                            )
                        }
                        {
                            this.state.register && this.state.business && (
                                <form onSubmit={this.handleSubmit} className="landing-form">
                                    <input className="input-login" type="text" placeholder="business@mail.com" onChange={this.handleEmail}></input>
                                    <input className="input-login" type="password" placeholder="password" onChange={this.handlePassword}></input>
                                    <button type="submit" className="landing-submit">REGISTER</button>
                                </form>
                            )
                        }
                        {
                            this.state.login && this.state.hostess && (
                                <form onSubmit={this.handleSubmit} className="landing-form">
                                    <input className="input-login" type="text" placeholder="hostess@mail.com" onChange={this.handleEmail}></input>
                                    <input className="input-login" type="password" placeholder="password" onChange={this.handlePassword}></input>
                                    <button type="submit" className="landing-submit">LOGIN</button>
                                </form>
                            )
                        }
                        {
                            this.state.login && this.state.business && (
                                <form onSubmit={this.handleSubmit} className="landing-form">
                                    <input className="input-login" type="text" placeholder="business@mail.com" onChange={this.handleEmail}></input>
                                    <input className="input-login" type="password" placeholder="password" onChange={this.handlePassword}></input>
                                    <button type="submit" className="landing-submit">LOGIN</button>
                                </form>
                            )
                        }
                        {
                            this.state.error && (
                                <div className="error">{this.state.error}</div>
                            )
                        }
                        {
                            !this.state.hostess && !this.state.business && (
                                <div className="philosophy-hostess">
                                    <p>This is a virtual hostess agency</p>
                                    <p>Select <span> HOSTESS </span> if you want to create your profile</p>
                                    <p>Select <span> BUSINESS </span> if you are looking for workers for your event </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Landing)

