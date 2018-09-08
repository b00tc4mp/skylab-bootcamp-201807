import React, { Component } from 'react'
import logic from '../../logic'
import './Profile.css'
import { withRouter } from 'react-router-dom'


class Profile extends Component {
    
    state = {
        loggedIn: logic.loggedIn,
    }

    /*static getDerivedStateFromProps(props, state) {
        if (props.loggedIn !== state.loggedIn) {
          return {
            loggedIn: props.loggedIn
          };
        }
    
        return null; // Return null to indicate no change to state.
    }*/

    

    render() {
        const { loggedIn } = this.state

        return (
            <div>My Profile form
                {loggedIn && <button className="" onClick={this.props.onLogout}>LogOut</button> }

            </div>
        )
    }
}

export default withRouter(Profile)