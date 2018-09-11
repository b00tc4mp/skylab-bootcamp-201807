import React, { Component } from 'react'
import Utils from '../utils/validate-email'
import isBlank from '../utils/isBlank'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header'
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

        const { name, birth, origin, gender, phone, languagesSelected, otherLanguages, jobType, height, myself, skills, errorName, errorBirth, errorOrigin, errorGender, errorPhone, errorLanguages, errorJobType, errorHeight, errorMyself, errorSkills } = this.state

        let languages = languagesSelected.concat(otherLanguages)

        logic.editHostessProfile(this.props.email, name, birth, origin, gender, phone, languages, jobType, height, myself, skills, 'photo here', this.props.token)
            .then(() => {
                this.setState({ success: 'Your profile has been updated correctly' })
            }).catch(err => {
                this.setState({ error: err.message })
            })
    }

    goToProfile = (event) => {
        event.preventDefault()
        this.history.push('/hostess')
    }

    handleChangePas = () => this.setState({changePas: true})

    handleUnregister = () => this.setState({delete: true})

    handleNo = event => {
        event.preventDefault()
        this.setState({changePas: false, delete: false})
    }

    handleYes = event => {
        event.preventDefault()
        const {email, token, oldPassword } = this.state
        logic.unregisterHostess(email, oldPassword, token)
 
    }

    handleOld = event => this.setState({ oldPassword: event.target.value })

    handleNew = event => this.setState({ newPassword: event.target.value })

    handleTheChange = event => {
        event.preventDefault()
        const {email, token, oldPassword, newPassword} = this.state
        logic.updatePasswordHostess(email, oldPassword, newPassword, token)
        this.setState({ changePas: false, delete: false })
    }

    render() {
        const { name, birth, origin, gender, phone, languages, jobType, height, myself, skills, errorName, errorBirth, errorOrigin, errorGender, errorPhone, errorLanguages, errorJobType, errorHeight, errorMyself, errorSkills, error, success } = this.state


        return (
            <div>
                <Header hostessEdit={true} onLogout={this.props.onLogout} />
                <div>

                    {
                        !this.state.changePas && !this.state.delete && (
                            <div className="buttons">
                                <button type="button" onClick={this.handleChangePas} className="buttons__hostess">CHANGE PASSWORD</button>
                                <button type="button" onClick={this.handleUnregister} className="buttons__business">DELETE ACOUNT</button>
                            </div>
                        )
                    }
                    {
                        !this.state.changePas && this.state.delete && (
                            <div className="buttons">
                                <p>Are you sure you wana delete the acount for ever?</p>
                                <input type="password" onChange={this.handleOld} placeholder="Insert password to delete the acount"></input>
                                <button type="button" onClick={this.handleNo} className="buttons__hostess">NO</button>
                                <button type="button" onClick={this.handleYes} className="buttons__business">YES</button>
                            </div>
                        )
                    }
                    {
                        this.state.changePas && !this.state.delete && (
                            <div className="buttons">
                                <input type="password" placeholder="Password" onChange={this.handleOld}></input>
                                <input type="text" placeholder="New password" onChange={this.handleNew}></input>
                                <button type="button" onClick={this.handleTheChange} className="buttons__business">CHANGE PASSWORD</button>
                            </div>
                        )
                    }
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label html="name">NAME</label>
                            <input id="name" type='text' placeholder="My name is..." onChange={this.handleName}></input>
                        </div>
                        <div>
                            <label html="birth">BIRTHDATE</label>
                            <input id="birth" type='text' placeholder="DD/MM/YYYY" onChange={this.handleBirth}></input>
                        </div>
                        <div>
                            <label html="origin">ORIGIN</label>
                            <input id="origin" type='text' placeholder="i come from..." onChange={this.handleOrigin}></input>
                        </div>
                        <fieldset data-role="controlgroup" onClick={this.handleGender}>
                            <legend>Choose your gender:</legend>
                            <label for="woman">Woman</label>
                            <input type="radio" name="gender" id="woman" value="W"></input>
                            <label for="man">Man</label>
                            <input type="radio" name="gender" id="man" value="M"></input>
                        </fieldset>
                        <div>
                            <label htmlFor="phone">PHONE NUMBER</label>
                            <input id="phone" type="text" onChange={this.handlePhone} ></input>
                        </div>
                        <div>
                            <fieldset data-role="controlgroup" >
                                <legend>In wich languages is going to work?</legend>
                                <label htmlFor="catalan">Catalan</label>
                                <input type="checkbox" name="languages" id="catalan" value="catalan" onChange={this.handleLanguages} ></input>
                                <label htmlFor="spanish">Spanish</label>
                                <input type="checkbox" name="languages" id="spanish" value="spanish" onChange={this.handleLanguages}></input>
                                <label htmlFor="english">English</label>
                                <input type="checkbox" name="languages" id="english" value="english" onChange={this.handleLanguages}></input>
                                <label htmlFor="german">German</label>
                                <input type="checkbox" name="languages" id="german" value="german" onChange={this.handleLanguages}></input>z
                                <label htmlFor="french">French</label>
                                <input type="checkbox" name="languages" id="french" value="french" onChange={this.handleLanguages}></input>
                                <label htmlFor="japanese">Japanese</label>
                                <input type="checkbox" name="languages" id="japanese" value="japanese" onChange={this.handleLanguages}></input>
                                <label htmlFor="chinese">Chinese</label>
                                <input type="checkbox" name="languages" id="chinese" value="chinese" onChange={this.handleLanguages}></input>
                                <label htmlFor="others">Other language</label>
                                <input type="text" name="languages" id="others" onChange={this.handleOtherLanguages}></input>
                            </fieldset>
                        </div>
                        <div>
                            <select name="hostess_profile" onClick={this.handleJobType}>
                                <option value="" disabled hidden selected>What type of profile are you looking for?</option>
                                <option value="info">Information hostess </option>
                                <option value="image">Image hostess</option>
                                <option value="animation">Animation</option>
                                <option value="sells">Comercial profile</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="skills">SKILLS</label>
                            <input type="text" id="skills" placeholder="#sports #music #dance" onChange={this.handleSkills}></input>
                        </div>
                        <div>
                            <label for="hieght">HOW TALL ARE YOU</label>
                            <input type="text" name="height" id="height" onChange={this.handleHeight}></input>
                        </div>
                        <div>
                            <textarea placeholder='Brief description of yourself, your interests, your previous jobs, your studies, your pasion...' onChange={this.handleMyself} />
                        </div>

                        <button type="submit"> UPDATE PROFILE</button>
                    </form>
                    {
                        success && (<div>{success}</div>)
                    }
                    {
                        error && (<div>{error}</div>)
                    }
                    <a onClick={this.goToProfile}>GO TO PROFILE</a>
                </div>
            </div>
        )
    }
}


export default withRouter(HostessEditProfile)