import React, { Component } from 'react';
import './Nav.css'
import { Link } from 'react-router-dom'


class Nav extends Component {

    render() {
        return <nav className="navbar navbar-dark bg-dark p-3">
            <a href="/" className="navbar-brand text-warning">LOCATIONS <i className="fa fa-map-marker"></i></a>
            <form className="form-inline">
                <Link to='/register'>
                    {!this.props.loggedIn && <button className="btn btn-outline-warning mr-3" type="submit">Add Property <i className="fa fa-plus-circle"></i></button>}
                </Link>
                <Link to='/login'>
                    {!this.props.loggedIn && <button className="btn btn-outline-warning" type="submit">Login <i className="fa fa-sign-in"></i></button>}
                </Link>
                {this.props.loggedIn && <button className='btn btn-warning my-2 my-sm-0' onClick={this.props.onLogout}>Logout <i className="fa fa-sign-out"></i></button>}
            </form>
      </nav> 
    }
}

export default Nav






