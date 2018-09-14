import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import SearchBar from 'material-ui-search-bar'
import { Link } from 'react-router-dom'
import logic from '../../logic'
import './Nav.css'
//import logo from '../../assets/abc-blau.png'
import logo from '../../assets/block.svg'

class Nav extends Component {
    state = {
        loggedIn: logic.loggedIn,
        photoUrl: null,
        searchVal: ''
      }

    static getDerivedStateFromProps(props, state) {
        if (props.loggedIn !== state.loggedIn)
          return { loggedIn: props.loggedIn}

        if (props.profilePhoto !== state.photoUrl)
          return { photoUrl: props.profilePhoto}

        return null; // Return null to indicate no change to state.
    }

    componentDidMount() {
        this.getProfilePhoto()
    }

    getProfilePhoto = () => {
        const photoUrl = logic.getUserField('photo')

        if (logic.loggedIn && photoUrl) 
            this.setState({ photoUrl })
    }

    keepSearchVal = value => this.setState({ searchVal: value})

    onRequestSearch = () => this.props.onSearchFilter(this.state.searchVal)
    
    render() {
        const { loggedIn, photoUrl } = this.state

        return(
            <nav className="nav-container">
                <ul className="nav-left-buttons">
                    <li className="nav-logo">
                        <Link className="logo animated tada" to='/'><img src={logo} alt="logo" height="42" width="42"/></Link>
                    </li>
                    <li>
                        <SearchBar
                            onChange={this.keepSearchVal}
                            onRequestSearch={this.onRequestSearch}
                            style={{
                                margin: '0 auto',
                                maxWidth: 800,
                                boxShadow: 'none',
                                border: '1px solid #ced4da',
                            }}
                        />
                    </li>
                </ul>
                

                <ul className="nav-right-buttons">
                    {!loggedIn && <li>
                        <Link to='/login'>
                            <button className="nav-btn">LogIn</button>
                        </Link>
                    </li>}
                    {!loggedIn && <li>
                        <Link to='/register'>
                            <button className="nav-btn">Register</button>
                        </Link>
                    </li>}
                    {loggedIn && <li>
                        <Link className="nav-myzone-link" to='/mylist'>
                            <div className="nav-myzone-thumbnail">
                            {photoUrl?
                                <Avatar alt="profile photo" size={36} style={{ alignSelf: 'center' }} src={photoUrl} className="photo" /> : 
                                <i className="material-icons md-36">face</i>
                            }
                                <span>My zone</span>
                            </div>
                        </Link>
                    </li>}
                    <li>
                        <Link to='/prod/upload'>
                            <button className="nav-btn nav-btn-upload"><span className="nav-plus-symbol">&#43;</span>Upload product</button>
                        </Link>
                    </li>
                </ul>

            </nav>
        )
    }

}

export default Nav
