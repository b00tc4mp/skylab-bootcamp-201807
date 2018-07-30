import React, { Component } from 'react'

import './styles/Navbar.css'

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
                <button className="navbar__btn" onClick={search}> Take/upload pic </button>
                <button className="navbar__btn" onClick={favs}> Gallery </button>
            </footer>
        )
    }
}

export default Navbar