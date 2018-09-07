import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class Header extends Component {


    goToHome = (event) => {
        event.preventDefault()
        this.props.history.push('/')
    }

    goToEditHostessProfil = (event) => {
        event.preventDefault()
        this.props.history.push('/hostess/profile')
    }

    gotToEditBusinessProfile = (event) => {
        event.preventDefault()
        this.props.history.push('/business/profile')
    }

    render() {
        return (
            <header>
                <div>
                    <a onClick={this.goToHome}>
                        <h1>&bull; HOSTESS &bull;</h1>
                    </a>
                </div>
                <details className="details-header">
                    <summary>
                        <img src="./image/hostess-icon.png" className="icono" height="30" width="30"></img>
                    </summary>
                    <details-menu className="dropdown-menu" role="menu">
                        <ul className="list-header">
                            <li>{this.props.hostess && (<a role="menuitem" onClick={this.goToEditHostessProfil}>Edit profile</a>)} </li>
                            <li>{this.props.business && (<a role="menuitem" onClick={this.goToEditBusinessProfil}>Edit profile</a>)} </li>
                            <li><a role="menuitem" onClick={this.props.onLogout}>Logout</a></li>
                        </ul>
                    </details-menu>
                </details>
                <div>
                    <a>Logout</a>
                </div>
            </header>
        )
    }
}

export default withRouter(Header)