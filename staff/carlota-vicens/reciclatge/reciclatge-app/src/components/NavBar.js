import React, { Component } from 'react'

import './styles/Navbar.css'

class Navbar extends Component {

    render() {
        const { props: { profile, home, puntverd } } = this
        return (
            <div className="navbar__container">
            <div></div>
                <footer className="navbar">
                    <button className="navbar__btn" onClick={profile}> <i className="fas fa-users fa-2x"></i> </button>
                    <button className="navbar__btn" onClick={home}> <i className="fas fa-camera fa-2x"></i></button>
                    <button className="navbar__btn" onClick={puntverd}> <i className="fas fa-map fa-2x"></i></button>
                </footer>
                <div></div>
            </div>
        )
    }
}

export default Navbar