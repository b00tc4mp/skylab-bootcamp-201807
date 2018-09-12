import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Contact from '../components/Contact'
import Header from '../components/Header';
var moment = require('moment');

class Events extends Component {
    state = {
        event: null,
    }

    componentDidMount() {
        logic.retrieveEventById(this.props.eventId)
            .then(event => {
                this.setState({ event })
            })
    }

    render() {
        const { event } = this.state

        return (
            <div>
                {event && (
                    <div>
                        <Header businessEdit={true} />
                        <div>
                            <fieldset>
                                <legend>{event.business.name}</legend>
                                <h2>{event.title}</h2>
                                <p>{event.description}</p>
                                <p>{event.location}</p>
                                <p>{moment(event.date).format("DD-MM-YYYY")}</p>
                            </fieldset>
                            <ul>
                                {event.hostesses.map(hostess => {
                                    return <Contact name={hostess.name} phone={hostess.phone} email={hostess.email} />
                                })}
                            </ul>
                        </div>
                    </div>
                )}


            </div>
        )
    }
}

export default withRouter(Events)