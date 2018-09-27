import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import AnEvent from '../components/AnEvent'
import HomeButton from '../components/HomeButton'
import BusinessCard from '../components/BusinessCard';

class HostessRequests extends Component {
    state = {
        requests: null
    }

    componentDidMount() {
        logic.retrieveHostess(this.props.id)
        .then(hostess => {
            return this.setState({ requests: hostess.requests })
        })
    }

    render() {
        const { requests } = this.state
        return (
            <div>
                <div>
                    <button onClick={this.handleClick}>post new event</button>
                </div>
                    {
                        requests && (<div>
                            <div>
                                {requests.map(business => {
                                    return <BusinessCard requests={business} idH={this.props.id} token={this.props.token} />
                                })}
                            </div>
                        </div>)
                    }
            </div>
        )
    }
}

export default withRouter(HostessRequests)