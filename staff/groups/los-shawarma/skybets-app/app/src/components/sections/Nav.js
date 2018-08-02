import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Nav extends Component {
    
    render() {
        return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link className="navbar-brand" to='/'>Skybets</Link>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to='/myfavs'>My Favourites</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/login'>LogIn</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/register'>Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/update'>Update</Link>
                    </li>
                </ul>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.props.onLogoutProp}>LogOut</button>  
            </div>
        </nav>)
    }

}

export default Nav