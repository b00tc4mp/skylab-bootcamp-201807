import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Nav.css';

class Nav extends Component {
    state = {
        loggedIn: false,
      }

    static getDerivedStateFromProps(props, state) {
        if (props.loggedInProp !== state.loggedIn) {
          return {
            loggedIn: props.loggedInProp
          };
        }
    
        return null; // Return null to indicate no change to state.
    }
    
    render() {
        const {loggedIn} = this.state

        return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link className="navbar-brand" to='/'>Skybets</Link>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to='/myfavs'>My Favourites</Link>
                    </li>
                    {!loggedIn && <li className="nav-item">
                        <Link className="nav-link" to='/login'>LogIn</Link>
                    </li>}
                    {!loggedIn && <li className="nav-item">
                        <Link className="nav-link" to='/register'>Register</Link>
                    </li>}
                    {loggedIn && <li className="nav-item">
                        <Link className="nav-link" to='/update'>Update</Link>
                    </li>}
                </ul>
                {loggedIn && <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.props.onLogoutProp}>LogOut</button> } 
            </div>
        </nav>)
    }

}

export default Nav