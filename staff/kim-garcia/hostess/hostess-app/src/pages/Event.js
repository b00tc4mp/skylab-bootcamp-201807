import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Events extends Component {
    state = {

    }

    render() {
        return (
            <div>
                <h1>Events page</h1>
                <p>{this.props.event}</p>
            </div>
        )
    }
}

export default withRouter(Events)