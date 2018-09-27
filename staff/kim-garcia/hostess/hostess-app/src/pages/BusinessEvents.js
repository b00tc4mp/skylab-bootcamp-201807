import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import AnEvent from '../components/AnEvent'
import HomeButton from '../components/HomeButton'

class BusinessEvents extends Component {
    state = {
        events: null
    }

    componentDidMount() {
        logic.retrieveBusiness(this.props.id)
        .then(business => {
            return this.setState({ events: business.events })
        })
    }

    handleClick = event => {
        event.preventDefault()

        return this.props.histoy.push('/new/event')
    }


    render() {
        const { events } = this.state
        return (
            <div>
                <div>
                    <button onClick={this.handleClick}>post new event</button>
                </div>
                    {
                        events && (<div>
                            <div>
                                {events.map(event => {
                                    return <AnEvent business={true} event={event._doc} token={this.props.token} />
                                })}
                            </div>
                        </div>)
                    }
            </div>
        )
    }
}

export default withRouter(BusinessEvents)