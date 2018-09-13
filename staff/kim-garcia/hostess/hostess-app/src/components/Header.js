import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class Header extends Component {


    // goToHome = (event) => {
    //     event.preventDefault()
    //     this.props.history.push('/')
    // }

    goToEditHostessProfil = (event) => {
        event.preventDefault()
        this.props.history.push('/hostess/profile')
    }

    goToEditBusinessProfil = (event) => {
        event.preventDefault()
        this.props.history.push('/business/profile')
    }

    goToProfile = (event) => {
        event.preventDefault()
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
            <header className="header-nav">

                        <div className="header-title">
                            <a onClick={this.goToProfile}>
                                <h1>&bull; HOSTESS &bull;</h1>
                            </a>
                        </div>
                 
                        <div className="header-logo">
                            <details className="header-details">
                                <summary>
                                    <img src="./image/hostess-icon.png" style={{color:'red'}} className="header-icono" height="30" width="30"></img>
                                </summary>
                                {/* <details-menu className="header-dropdown-menu" role="menu"> */}
                                <ul className="header-list">
                                    {
                                        this.props.hostessProfile && <li><a role="menuitem" onClick={this.goToEditHostessProfil}>Edit profile</a> </li>
                                    }
                                    {
                                        this.props.hostessEdit && <li><a role="menuitem" onClick={this.goToProfile}>My profile</a> </li>
                                    }
                                    {
                                        this.props.businessProfile && <li><a role="menuitem" onClick={this.goToEditBusinessProfil}>Edit profile</a></li>
                                    }
                                    {
                                        this.props.businessEdit && <li><a role="menuitem" onClick={this.goToProfile}>My profile</a></li>
                                    }
                                    <li><a role="menuitem" onClick={this.props.onLogout}>Logout</a></li>
                                </ul>
                                {/* </details-menu> */}
                            </details>
                        </div>

            </header>
            </div>


            
                    
        )
    }
}

export default withRouter(Header)