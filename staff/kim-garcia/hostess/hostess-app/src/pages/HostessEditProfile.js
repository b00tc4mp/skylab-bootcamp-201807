import React, { Component } from 'react'
import Utils from '../utils/validate-email'
import isBlank from '../utils/isBlank'
import { withRouter } from 'react-router-dom'
import Headers from '../components/Header'
import logic from '../logic'
import { RadioGroup, Radio } from 'react-radio-group'

class HostessEditProfile extends Component {
    state = {
        email: this.props.email,
        token: this.props.token,
        name: '',
        birth: '',
        origin: '',
        gender: '',
        phone: '',
        languages: '',
        jobType: '',
        skills: '',
        height: 120,
        myself: '',
        error: '',
        success: '',
    }

    // componentDidMount() {
    //     logic.retrieveHostess(this.props.email, this.props.token)
    //         .then(hostess => {
    //             const { name, birth, origin, gender, phone, languages, jobType, height, myself, skills } = hostess

    //             this.setState({ name, birth, origin, gender, phone, languages, jobType, height, myself, skills })
    //             return true
    //         })
    // }

    handleName = (event) => {
        this.setState({ name: event.target.value })
    }

    handleBirth = (event) => {
        this.setState({ birth: event.target.value })
    }

    handleOrigin = (event) => {
        this.setState({ origin: event.target.value })
    }

    handleGender = (value) => {
        this.setState({ gender: value })
    }

    handlePhone = (event) => {
        this.setState({ phone: event.target.value })
    }

    handleLanguages = (event) => {
        this.setState({ languages: event.target.value })
    }

    handleJobType = (event) => {
        this.setState({ jobType: event.target.value })
    }

    handleHeight = (event) => {
        this.setState({ height: event.target.value })
    }

    handleMyself = (event) => {
        this.setState({ myself: event.target.value })
    }

    handleSkills = (event) => {
        this.setState({ skills: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { name, birth, origin, gender, phone, languages, jobType, height, myself, skills, errorName, errorBirth, errorOrigin, errorGender, errorPhone, errorLanguages, errorJobType, errorHeight, errorMyself, errorSkills } = this.state


        logic.editHostessProfile(this.props.email, name, birth, origin, gender, phone, languages, jobType, height, myself, skills, 'photo here', this.props.token)
            .then(() => {
                this.setState({ succees: 'Your profile has been updated correctly' })
            }).catch(err => {
                this.setState({ error: err.message })
            })
    }


    render() {
        const { name, birth, origin, gender, phone, languages, jobType, height, myself, skills, errorName, errorBirth, errorOrigin, errorGender, errorPhone, errorLanguages, errorJobType, errorHeight, errorMyself, errorSkills, error, success } = this.state


        return (
            <div>
                <Headers hostessEdit={true} onLogout={this.props.onLogout} />
                <div>
                    <form onSubmit={this.handleSubmit}>

                        <div>
                            <label htmlFor="name"> NAME </label>
                            <input id="name" type="text" placeholder="my name is..." value={name} onChange={this.handleName} />
                            {
                                errorName && <div>{errorName}</div>
                            }
                        </div>

                        <div>
                            <label htmlFor="birth"> BIRTHDATE </label>
                            <input id="birth" type="text" value={birth} onChange={this.handleBirth} placeholder="YYYY/MM/DD" />
                        </div>

                        <div>
                            <label htmlFor="origin"> ORIGIN </label>
                            <input id="origin" type="text" placeholder="I come from..." value={origin} onChange={this.handleOrigin} />
                            {
                                errorOrigin && <div>{errorOrigin}</div>
                            }
                        </div>
                        <div>
                            <RadioGroup name="gender" selectedValue={this.state.gender} onChange={this.handleGender}>
                                <Radio value="W" /> Woman
                                <Radio value="M" /> Man
                            </RadioGroup>
                        </div>



                            { success && <div>{success}</div>}


                        <button type="submit"> UPDATE PROFILE</button>
                    </form>
                </div>
            </div>
        )
    }
}


export default withRouter(HostessEditProfile)