import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Nav extends Component {
    
    render() {
        return (
        <nav>
            <h2>NAV</h2>
            <div></div>

            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/myfavs'>My Favourites</Link></li>
                <li><Link to='/login'>LogIn</Link></li>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/update'>Update</Link></li>
            </ul>
        </nav>);
    }

}

export default Nav