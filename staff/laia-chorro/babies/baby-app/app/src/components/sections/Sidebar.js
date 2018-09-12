import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import logic from '../../logic'
import './Sidebar.css'

class Sidebar extends Component {
    state = {
        photoUrl: null
    }

    static getDerivedStateFromProps(props, state) {
        if (props.profilePhoto !== state.photoUrl)
          return { photoUrl: props.profilePhoto}

        return null // Return null to indicate no change to state.
    }

    componentDidMount() {
        this.getProfilePhoto()
    }

    getProfilePhoto = () => {
        const photoUrl = logic.getUserField('photo')

        if (logic.loggedIn && photoUrl) 
            this.setState({ photoUrl })
    }

    render() {

        const { photoUrl } = this.state

        return(
            <div className="sidenav">
                <Link className="" to="/profile">
                    {photoUrl?
                        <Avatar alt="profile photo" style={{ height: '48px', width: '48px', margin: '10px auto' }} src={photoUrl} className="photo" /> : 
                        <i className="material-icons md-48">face</i>
                    }
                    <span>Profile</span>
                </Link>
                <Link className="" to="/mylist">
                    <i className="material-icons md-48">format_list_bulleted</i>
                    <span>Products</span>
                </Link>
                <Link className="" to="/mychats">
                    <i className="material-icons md-48">message</i>
                    <span>Messages</span>
                </Link>
                <Link className="" to="/favourites">
                    <i className="material-icons md-48">favorite_border</i>
                    <span>Favourites</span>
                </Link>
                <Link className="" to="/reviews">
                    <i className="material-icons md-48">star_border</i>
                    <span>Reviews</span>
                </Link>
            </div>
        )
    }
}

export default Sidebar