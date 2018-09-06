import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Navbar extends Component {
    
    render () {
        return (
            <div>
                <Link to='/home'>Home</Link>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/editor'>Editor</Link>
                <Link to='/player'>Player</Link>
                <Link to='/notebooks'>Notebooks</Link>
                <Link to='/notes'>Notes</Link>
                <Link to='/faq'>FAQ</Link>
                <Link to='/about'>About</Link>
                <button onClick={this.props.onLogout} >Logout</button>
            </div>
        )
    }
    
}

export default Navbar