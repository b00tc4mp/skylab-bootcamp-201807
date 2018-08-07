import React, { Component } from 'react'

import './Navbar.css'

class Navbar extends Component {

    render() {
        const {
            props: {
                profile,
                search,
                favs
            }
        } = this
        return (
            <footer className="navbar">
                <button className="navbar__btn" onClick={profile}> Profile </button>
                <button className="navbar__btn" onClick={search}> Search </button>
                <button className="navbar__btn" onClick={favs}> Favorites </button>
            </footer>
        )
    }
}

export default Navbar