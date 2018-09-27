import React, { Component } from 'react';
import './Navbar.css'
class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <a className="navbar__link" href="#1" onClick={this.props.profile}>profile</a>
                <a className="navbar__link" href="#2" onClick={this.props.logout}>log out</a>
            </div>
        )
    }
}
export default Navbar

