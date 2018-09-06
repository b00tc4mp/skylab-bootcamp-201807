import React, { Component } from 'react'
import Utils from '../utils/validate-email'
import { withRouter } from 'react-router-dom'

class CreateEvent extends Component {
    state = {

    }

    render() {
        return (
            <div>
                <h1>Create event page</h1>
            </div>
        )
    }
}

export default withRouter(CreateEvent)