import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class CreateEvent extends Component {
    state = {
        height: 120,
        languages: [],
        jobType: '',
        gender: '',
        location: '',
        date: '',
        description: '',
        hostesses: ''
    }

    handleLocation = (event) => {
        this.setState({ location: event.target.value })
    }

    handleDate = (event) => {
        this.setState({ date: event.target.value })
    }

    handleDescription = (event) => {
        this.setState({ description: event.target.value })
    }

    handleGender = (event) => {
        this.setState({ gender: event.target.value })
    }

    handleProfile = (event) => {
        this.setState({ jobType: event.target.value })
    }

    handleLanguages = (event) => {
        let langs = this.state.languages
        langs.push(event.target.value)

        this.setState({ languages: langs })
    }

    handleOtherLanguages = (event) => {
        let langs = this.state.languages
        langs.push(event.target.value)

        this.setState({ languages: langs })
    }

    handleHeight = (y) => {
        const x = parseInt(y)
        if (isNaN(x) || x < 120 || x > 250) {
            this.setState({ height: x })
        }
    }

    handleSubmit = event => {
        event.preventDefault()

        const { height, jobType, languages, gender } = this.state

        logic.searchWorkers(this.props.email, gender, jobType, height, languages, this.props.token)
            .then(hostesses => this.setState({ hostesses }))
    }





    render() {
        const { hostesses } = this.state


        return (
            <div>
                <h1>&bull; NEW EVENT &bull;</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="location">Location</label>
                        <input id="location" type="text" placeholder="The event is going to take place..." onChange={this.handleLocation}></input>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input id="date" type="text" placeholder="YYYY/MM/DD" onChange={this.handleDate}></input>
                    </div>
                    <div>
                        <label htmlFor="date">Description</label>
                        <textarea id="date" type="text" placeholder="Describe the event" onChange={this.handleDescription}></textarea>
                    </div>
                    <div>
                        <div>SEARCH WORKERS</div>
                        <div>
                            <fieldset data-role="controlgroup" onClick={this.handleGender}>
                                <legend>Choose your gender:</legend>
                                <label for="woman">Woman</label>
                                <input type="radio" name="gender" id="woman" value="W"></input>
                                <label for="man">Man</label>
                                <input type="radio" name="gender" id="man" value="M"></input>
                            </fieldset>
                        </div>
                        <div>
                            <select name="hostess_profile" onClick={this.handleProfile}>
                                <option value="" disabled hidden selected>What type of profile are you looking for?</option>
                                <option value="info">Information hostess </option>
                                <option value="image">Image hostess</option>
                                <option value="animation">Animation</option>
                                <option value="sells">Comercial profile</option>
                                <option value="">All profiles</option>
                            </select>
                        </div>
                        <div>
                            <fieldset data-role="controlgroup" >
                                <legend>In wich languages is going to work?</legend>
                                <label htmlFor="catalan">Catalan</label>
                                <input type="checkbox" name="languages" id="catalan" value="catalan" onChange={this.handleLanguages} ></input>
                                <label for="spanish">Spanish</label>
                                <input type="checkbox" name="languages" id="spanish" value="spanish" onChange={this.handleLanguages}></input>
                                <label for="english">English</label>
                                <input type="checkbox" name="languages" id="english" value="english" onChange={this.handleLanguages}></input>
                                <label for="german">German</label>
                                <input type="checkbox" name="languages" id="german" value="german" onChange={this.handleLanguages}></input>
                                <label for="french">French</label>
                                <input type="checkbox" name="languages" id="french" value="french" onChange={this.handleLanguages}></input>
                                <label for="japanese">Japanese</label>
                                <input type="checkbox" name="languages" id="japanese" value="japanese" onChange={this.handleLanguages}></input>
                                <label for="chinese">Chinese</label>
                                <input type="checkbox" name="languages" id="chinese" value="chinese" onChange={this.handleLanguages}></input>
                                <label for="others">Other language</label>
                                <input type="text" name="languages" id="others" onChange={this.handleOtherLanguages}></input>
                            </fieldset>
                        </div>
                        <div>
                            <label for="hieght">Minimum height</label>
                            <input type="text" name="height" id="height" onChange={this.handleHeight}></input>
                        </div>
                    </div>
                    <button type="submit">SEARCH WORKERS</button>
                </form>
                {
                    hostesses && (<ul>
                        {hostesses.map(hostess => {
                            return <li>{hostess.name}</li>
                        })}
                    </ul>)
                }
                {/* <button onClick={this.handleCreate}>CREATE EVENT</button> */}
            </div>
        )
    }
}



export default withRouter(CreateEvent)