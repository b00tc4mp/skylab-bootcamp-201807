import React, { Component } from 'react'
import Utils from '../utils/validate-email'
import isBlank from '../utils/isBlank'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header'
import logic from '../logic'
import { RadioGroup, Radio } from 'react-radio-group'
import DeleteUnregister from '../components/DeleteUnregister';

class HostessEditProfile extends Component {
    state = {
        email: this.props.email,
        token: this.props.token,
        name: '',
        birth: '',
        origin: '',
        gender: '',
        phone: '',
        languagesSelected: [],
        otherLanguages: [],
        jobType: '',
        skills: [],
        height: 120,
        myself: '',
        error: '',
        success: '',
        changePas: false,
        delete: false,
        oldPassword: '',
        newPassword: ''
    }

    handleName = (event) => {
        this.setState({ name: event.target.value })
    }

    handleBirth = (event) => {
        this.setState({ birth: event.target.value })
    }

    handleOrigin = (event) => {
        this.setState({ origin: event.target.value })
    }

    handleGender = (event) => {
        this.setState({ gender: event.target.value })
    }

    handlePhone = (event) => {
        this.setState({ phone: event.target.value })
    }

    handleLanguages = (event) => {
        const checked = event.target.checked
        const value = event.target.value
        const languages = this.state.languagesSelected

        if (checked) {
            languages.push(value)
        } else {
            const pos = languages.indexOf(value)
            languages.splice(pos, 1)
        }

        this.setState({ languagesSelected: languages })
    }

    handleOtherLanguages = (event) => {
        const value = event.target.value
        const languages = []
        languages.push(value)
        this.setState({ otherLanguages: languages })
    }

    handleJobType = (event) => {
        this.setState({ jobType: event.target.value })
    }

    handleHeight = (event) => {
        const height = event.target.value
        const num = parseInt(height)
        this.setState({ height: num })
    }

    handleMyself = (event) => {
        this.setState({ myself: event.target.value })
    }

    handleSkills = (event) => {
        const value = event.target.value
        const skills = []
        skills.push(value)
        this.setState({ skills })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { name, birth, origin, gender, phone, languagesSelected, otherLanguages, jobType, height, myself, skills } = this.state

        let languages = languagesSelected.concat(otherLanguages)

        logic.editHostessProfile(this.props.email, name, birth, origin, gender, phone, languages, jobType, height, myself, skills, 'photo here', this.props.token)
            .then(() => {
                this.setState({ success: 'OK', error: '' })
            }).catch(err => {
                this.setState({ error: err.message })
            })
    }

    goToProfile = (event) => {
        event.preventDefault()

        this.props.history.push('/hostess')
    }


    render() {
        const { error, success } = this.state


        return (
            <div>
                <Header hostessEdit={true} onLogout={this.props.onLogout} />
                <div className="block">
                <h1 className="header-title"> &bull; EDIT YOUR HOSTESS PROFILE &bull; </h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label html="name">NAME</label>
                            <input id="name" type='text' placeholder="My name is..." onChange={this.handleName}></input>
                        </div>
                        <div>
                            <label html="birth">BORN</label>
                            <input id="birth" type='text' placeholder="DD/MM/YYYY" onChange={this.handleBirth}></input>
                        </div>
                        <div>
                            <label html="origin">ORIGIN</label>
                            <input id="origin" type='text' placeholder="I come from..." onChange={this.handleOrigin}></input>
                        </div>
                        <div>
                            <label htmlFor="phone">PHONE</label>
                            <input id="phone" type="text" placeholder="Whatsapp" onChange={this.handlePhone} ></input>
                        </div>
                        <div>
                            <select name="hostess_profile" onClick={this.handleJobType}>
                                <option value="" disabled hidden selected>What type of job do you prefer?</option>
                                <option value="info">Information hostess - Congreses, conferences, fairs, desk tasks...</option>
                                <option value="image">Image hostess - Minimum height is required</option>
                                <option value="animation">Animation - Dress up, act, dance...</option>
                                <option value="sells">Comercial profile - Sells</option>
                            </select>
                        </div>
                        <div className="height-box">
                            <label for="hieght">HOW HIGH ARE YOU?</label>
                            <input type="text" name="height" id="height" placeholder="cm" onChange={this.handleHeight} className="height"></input>
                        </div>
                        <div className="flex-box">
                            <fieldset data-role="controlgroup" onClick={this.handleGender} className="gender-box">
                                <legend>Choose your gender:</legend>
                                <input type="radio" name="gender" id="woman" value="W"></input>
                                <label for="woman">Woman</label>
                                <input type="radio" name="gender" id="man" value="M"></input>
                                <label for="man">Man</label>
                            </fieldset>
                        </div>
                        <div className="flex-box">
                            <fieldset data-role="controlgroup" className="languages-box" >
                                <legend>In wich languages is going to work?</legend>
                                <input type="checkbox" name="languages" id="catalan" value="catalan" onChange={this.handleLanguages} ></input>
                                <label htmlFor="catalan">CATALAN</label>
                                <input type="checkbox" name="languages" id="spanish" value="spanish" onChange={this.handleLanguages}></input>
                                <label htmlFor="spanish">SPANISH</label>
                                <input type="checkbox" name="languages" id="english" value="english" onChange={this.handleLanguages}></input>
                                <label htmlFor="english">ENGLISH</label>
                                <input type="checkbox" name="languages" id="german" value="german" onChange={this.handleLanguages}></input>
                                <label htmlFor="german">GERMAN</label>
                                <input type="checkbox" name="languages" id="french" value="french" onChange={this.handleLanguages}></input>
                                <label htmlFor="french">FRENCH</label>
                                <input type="checkbox" name="languages" id="japanese" value="japanese" onChange={this.handleLanguages}></input>
                                <label htmlFor="japanese">JAPANESE</label>
                                <input type="checkbox" name="languages" id="chinese" value="chinese" onChange={this.handleLanguages}></input>
                                <label htmlFor="chinese">CHINESE</label>
                                <input type="text" name="languages" id="others" placeholder="Any other language?" onChange={this.handleOtherLanguages}></input>
                            </fieldset>
                        </div>
                        <div>
                            <textarea rows={5} placeholder='Brief description about yourself, your interests, your previous jobs, your studies, your pasion...' onChange={this.handleMyself} />
                        </div>

                        <div>
                            <input type="text" id="skills" placeholder="#skills #sports #music #dance" onChange={this.handleSkills}></input>
                        </div>
                        <button type="submit" className="landing-submit"> UPDATE PROFILE</button>
                    </form>
                    {
                        success && (<div className="success">Your profile has been updated correctly, the companies are going to call you if your profile is suitable for their events.<span> Be awere of your whatsapp!</span></div>)
                    }
                    {
                        error && !success &&(<div className="error">{error}</div>)
                    }
                    <a onClick={this.goToProfile} className="go-profile-link">GO TO PROFILE</a>
                    <DeleteUnregister onLogout={this.props.onLogout} email={this.props.email} token={this.props.token} business={false} />
                </div>
            </div>
        )
    }
}


export default withRouter(HostessEditProfile)