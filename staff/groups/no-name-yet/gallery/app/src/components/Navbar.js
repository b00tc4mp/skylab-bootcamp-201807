import React, { Component } from 'react'

import './styles/Navbar.css'

class Navbar extends Component {

    render() {
        const { props: { profile, home, gallery } } = this
        return (
            <footer className="navbar">
                <button className="navbar__btn" onClick={profile}> <i className="fas fa-users fa-2x"></i> </button>
                <button className="navbar__btn" onClick={home}> <i className="fas fa-camera fa-2x"></i></button>
                <button className="navbar__btn" onClick={gallery}> <i className="far fa-images fa-2x"></i></button>
            </footer>
        )
    }
}

export default Navbar