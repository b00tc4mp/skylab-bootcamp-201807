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
                        <a className="nav-link" href="#"><Link to='/myfavs'>My Favourites</Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><Link to='/login'>LogIn</Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><Link to='/register'>Register</Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><Link to='/update'>Update</Link></a>
                    </li>
                </ul>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.props.onLogoutProp}>LogOut</button>  
            </div>
        </nav>)
    }

}

export default Nav