import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import BusinessCard from '../components/BusinessCard'

class AnEvent extends Component {
    state = {
        briefing: '', 
        contactName: '',
        contactPhone: '',
    }

    joinToEvent = (event) => {
        event.preventDefault()

        logic.joinToEvent(idH, idE, token)
            .then(() => true)
    }

    assist = (event) => {
        event.preventDefault()

        logic.iAssist(idE, idH, token)
            .then(() => true)
    }

    seeEvent = (event) => {
        event.preventDefault()

        this.props.history.push('/edit/event')
    }

    handleBriefing = (event) => {
        this.setState({ briefing: event.target.value })
    }

    handleName = (event) => {
        this.setState({ contactName: event.target.value })
    }

    handlePhone = (event) => {
        this.setState({ contactPhone: event.target.value })
    }

    handleEditSubmit = (event) => {
        event.preventDefault()

        const { contactName, contactPhone, briefing } = this.state

        logic.makeBriefing(this.props.event.idE, contactName, contactPhone, briefing, this.props.token)
    }



    render() {

        const { event, simpleHostess, business, hostess, toJoin, toAssist, edit } = this.props

        const briefing = (event.briefing) ? event.briefing : "We recomend to talk about the duties of the hostess, schedules, lunches, the dresscode, explain better the final goal of the event."
        const contactName = (event.contactName) ? event.contactName : undefined
        const contactPhone = (event.contactPhone) ? event.contactPhone : undefined

        // const { location, date, hours, salary, title, goal, briefing, contactName, contactPhone} =  this.props

        return (
            <div className="big">
                {
                    hostess && (
                        <div>
                            <BusinessCard />
                        </div>
                    )
                }
                <div>
                    <h2>{event.title}</h2>
                    <div>{event.location}</div>
                    <div>{event.date}</div>
                    <div>{event.hours}</div>
                    <div>{event.salary}</div>
                    <div>{event.goal}</div>
                    {
                        event.briefing && !simpleHostess && !edit && (
                            <div>
                                <div>{event.briefing}</div>
                                <div>{event.contactName}</div>
                                <div>{event.contactPhone}</div>
                            </div>
                        )
                    }
                    {
                        edit && (
                            <h3>a good briefing brings your event to the exit</h3>
                            <form onSubmit={this.handleEditSubmit}>
                                <textarea onChange={this.handleBriefing} defaultValue={briefing} rows="10"></textarea>
                                <input value={contactName} onChange={this.props.handleName}/>
                                <input value={contactPhone} onChange={this.props.handlePhone}/>
                                <button type="submit">update briefing</button>
                            </form>
                        )
                    }
                </div>
                <div className="num-hostess">
                    <ul>
                        <li>Candidates: {event.candidates.length}</li>
                        <li>Wating for confirmation: {event.approved.length}</li>
                        <li>Confirmed: {event.confirmed.length}</li>
                    </ul>
                </div>
                {
                    toJoin && (<div>
                        <button onClick={this.joinToEvent}>join to the event</button>
                    </div>)
                }
                {
                    toAssist && (<div>
                        <button onClicK={this.assist}>confirm the job</button>
                    </div>)
                }
                {
                    business && !edit && (<div>
                        <button onClick={this.seeEvent}>see event</button>
                    </div>)
                }
            </div>
        )
    }
}

export default withRouter(AnEvent)