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
        this.setState({email: event.target.value})
    }

    handlePassword = (event) => {
        this.setState({password: event.target.value})
    }

    handleHostess = () => {
        this.setState({ hostess: true })
    }

    handleBusiness = () => {
        this.setState({ business: true })
    }

    handleHostessRegister = () => {
        this.setState({ register: true, login: false })
    }

    handleHostessLogin = () => {
        this.setState({ login: true, register: false})
    }

    handleBusinessRegister = () => {
        this.setState({ register: true, login: false })
    }

    handleBusinessLogin = () => {
        this.setState({ login: true, register: false })
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
        return (
            <div className="block">
                <header>
                    <h1>&bull; WELCOME TO HOSTESS &bull;</h1>
                    <details>
                        <summary>Our philosophy</summary>
                        <p>This is a virtual hostess agency</p>
                    </details>
                </header>
                {
                    this.state.error && (
                        <div className="error">{this.state.error}</div>
                    )
                }
                {
                    !this.state.hostess && !this.state.business && (
                        <div className="buttons">
                            <button type="button" onClick={this.handleHostess} className="buttons__hostess">HOSTESS</button>
                            <button type="button" onClick={this.handleBusiness} className="buttons__business">BUSINESS</button>
                        </div>
                    )
                }
                {
                    this.state.hostess && !this.state.register &&  !this.state.login && (
                        <div className="buttons">
                            <button type="button" onClick={this.handleHostessLogin} className="buttons__hostess">LOGIN</button>
                            <button type="button" onClick={this.handleHostessRegister} className="buttons__business">REGISTER</button>
                        </div>
                    )
                }
                {
                    this.state.business && !this.state.register &&   !this.state.login && (
                        <div className="buttons">
                            <button type="button" onClick={this.handleBusinessLogin} className="buttons__hostess">LOGIN</button>
                            <button type="button" onClick={this.handleBusinessRegister} className="buttons__business">REGISTER</button>
                        </div>
                    )
                }
                {
                    this.state.register && this.state.hostess && (
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="hostess@mail.com" onChange={this.handleEmail}></input>
                            <input type="password" placeholder="password" onChange={this.handlePassword}></input>
                            <button type="submit">REGISTER</button>
                        </form>
                    )
                }
                {
                    this.state.register && this.state.business && (
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="business@mail.com" onChange={this.handleEmail}></input>
                            <input type="password" placeholder="password" onChange={this.handlePassword}></input>
                            <button type="submit">REGISTER</button>
                        </form>
                    )
                }
                {
                    this.state.login && this.state.hostess && (
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="hostess@mail.com" onChange={this.handleEmail}></input>
                            <input type="password" placeholder="password" onChange={this.handlePassword}></input>
                            <button type="submit">LOGIN</button>
                        </form>
                    )
                }
                {
                    this.state.login && this.state.business && (
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="business@mail.com" onChange={this.handleEmail}></input>
                            <input type="password" placeholder="password" onChange={this.handlePassword}></input>
                            <button type="submit">LOGIN</button>
                        </form>
                    )
                }

            </div>
        )
    }
}

export default withRouter(Landing)

