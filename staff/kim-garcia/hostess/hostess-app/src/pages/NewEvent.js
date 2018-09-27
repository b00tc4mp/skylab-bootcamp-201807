import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class newEvent extends Component {
    state = {
        title: '',
        location: '',
        date: '',
        hours: '',
        salary: '',
        goal: '',
        error: ''
    }

    handleTitle = (event) => {
        this.setState({ title: event.target.value })
    }

    handleLocation = (event) => {
        this.setState({ location: event.target.value })
    }

    handleDate = (event) => {
        this.setState({ date: event.target.value })
    }

    handleHours = (event) => {
        this.setState({ hours: event.target.value })
    }

    handleSalary = (event) => {
        this.setState({ salary: event.target.value })
    }

    handleGoal = (event) => {
        this.setState({ goal: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { location, date, hours, salary, title, goal } = this.state

        logic.newEvent(this.props.id, location, date, hours, salary, title, goal, this.props.token)
            .then(id => {
                this.props.history.push(`/event/${id}`)
            })
            .catch(err => this.setState({ error: err.message }))
    }


    render() {
        const { error } = this.state

        return (
            <div>
                <div className="big">
                    <div className="left">
                        In a world where we are surrounded with so much superficiality, we have grown great detectives in spotting it. Have we become greater cynics? No, from being surrounded 24/7 online and in real life, we’ve just grown more savvy to the techniques used by the media and traditional advertising. I mean, no-one is championing the pop-up ad anytime soon. Instead, now that we’ve grown into the norm of being permanently online, human beings crave variety. Technology is not a fad, but the human condition is fluid, juvenile even. When we have one thing, we want the other, and so we have come full circle. Now we’ve grown back into seeking authentic, real experience that absorbs us and allows our electronically-medicated emotions to feel again. And that is why events crafted with purpose and raw human experience at heart will continue to triumph.
                    </div>
                    <div className="right">
                        <h1>&bull; CREATE AN EVENT &bull;</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input type="text" placeholder="Title of the event" onChange={this.handleTitle}></input>
                            </div>
                            <div>
                                <input type="text" placeholder="Where is the event" onChange={this.handleLocation}></input>
                            </div>
                            <div>
                                <input type="text" placeholder="DD/MM/YYYY to DD/MM/YYYY" onChange={this.handleDate}></input>
                            </div>
                            <div>
                                <input type="text" placeholder="00h to 00h" onChange={this.handleHours}></input>
                            </div>
                            <div>
                                <input type="text" placeholder="total salary" onChange={this.handleSalary}></input>
                            </div>
                            <div >
                                <textarea rows={5} placeholder='The final goal of the event, the prupose' onChange={this.handleGoal} />
                            </div>
                            <button type="submit" >post event</button>
                        </form>
                        {
                            error && (
                                <div>{error}</div>
                            )
                        }
                    </div>
                </div>



            </div>

        )
    }
}



export default withRouter(newEvent)