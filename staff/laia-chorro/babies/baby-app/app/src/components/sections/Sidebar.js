import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

class Sidebar extends Component {
    state = {

    }

    render() {

        return(
            <div className="sidenav">
                <Link className="" to="/profile">Profile</Link>
                <Link className="" to="/mylist">Products</Link>
                <Link className="" to="/favourites">Favourites</Link>
                <Link className="" to="/reviews">Reviews</Link>
            </div>
        )
    }
}

export default Sidebar