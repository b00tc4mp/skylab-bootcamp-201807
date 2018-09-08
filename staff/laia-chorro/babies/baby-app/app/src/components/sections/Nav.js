import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom'
import logic from '../../logic'
import './Nav.css';

class Nav extends Component {
    state = {
        loggedIn: logic.loggedIn,
      }

    static getDerivedStateFromProps(props, state) {
        if (props.loggedIn !== state.loggedIn) {
          return {
            loggedIn: props.loggedIn
          }
        }
    
        return null; // Return null to indicate no change to state.
    }

    /*getProfilePhoto = () => {
        if (logic.getUserField('photos') && logic.getUserField('photos').length)
            return logic.getUserField('photos')[0]
        
        return false
    }*/
    
    render() {
        const { loggedIn } = this.state


        //<i className="material-icons">face</i>
        //<i className="material-icons">child_care</i>
        //<i className="material-icons">account_circle</i>

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to='/'>BabyBoom</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {!loggedIn && <li className="nav-item">
                        <Link className="nav-link" to='/login'>LogIn</Link>
                        </li>}
                        {!loggedIn && <li className="nav-item">
                        <Link className="nav-link" to='/register'>Register</Link>
                        </li>}
                        {loggedIn && <li className="nav-item">
                            <Link className="nav-link" to='/mylist'>
                                <div className="nav-myzone-link">
                                    {logic.getUserField('photos') && logic.getUserField('photos').length ? <Avatar alt="profile photo" src={logic.getUserField('photos')[0]} className="photo" /> : <i className="material-icons md-36">face</i>}
                                    <span>My zone</span>
                                </div>
                            </Link>
                        </li>}
                        <li className="nav-item">
                        <Link className="nav-link" to='/prod/upload'>Upload product</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

}

export default Nav