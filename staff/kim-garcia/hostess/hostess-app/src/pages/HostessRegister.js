import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class HostessRegister extends Component {

    state = {
        id: this.props.id,
        token: this.props.token,
        password: '',
        name: '',
        birth: '',
        origin: '',
        gender: '',
        phone: '',
        languagesSelected: [],
        otherLanguages: [],
        jobType: '',
        myself: '',
        success: '',
        error: ''
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value })
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

    handlePhone = (event) => {
        this.setState({ phone: event.target.value })
    }

    handleMyself = (event) => {
        this.setState({ myself: event.target.value })
    }

    handleGender = (event) => {
        this.setState({ gender: event.target.value })
    }

    handleLanguages = (event) => {
        const languages = this.state.languages

        if (event.target.checked && !(this.state.indexOf(event) !== 1)) {
            languages.push(value)
        }

        this.setState({ languages })
    }


    // handleLanguages = (event) => {
    //     const checked = event.target.checked
    //     const value = event.target.value
    //     const languages = this.state.languagesSelected

    //     if (checked) {
    //         languages.push(value)
    //     } else {
    //         const pos = languages.indexOf(value)
    //         languages.splice(pos, 1)
    //     }

    //     this.setState({ languagesSelected: languages })
    // }


    // handleOtherLanguages = (event) => {
    //     const value = event.target.value
    //     const languages = []
    //     languages.push(value)
    //     this.setState({ otherLanguages: languages })
    // }

    handleJobType = (event) => {
        this.setState({ jobType: event.target.value })
    }

    handlePhoto = (event) => {
        this.setState({ photo: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { password, name, birth, origin, phone, myself, gender, languages, jobType, photo, success, error } = this.state

        return editHostessProfile(this.props.id, password, name, birth, origin, phone, myself, gender, languages, jobType, photo, this.props.token)
            .then(() => {
                this.props.history.push('/hostess/home')
            }).catch(err => {
                this.setState({ error: err.message })
            })
    }

    render() {

        const { error } = this.state

        return (
            <div>
                <div className="big">
                    <div className="left">
                        <input type="file" />
                    </div>
                    <div className="right">
                        <h3> &bull; CREATE YOUR WORKER PROFILE &bull; </h3>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input type='text' placeholder="My name is..." onChange={this.handleName}></input>
                            </div>
                            <div>
                                <input type='text' placeholder="I was born on... DD/MM/YYYY" onChange={this.handleBirth}></input>
                            </div>
                            <div>
                                <input type='text' placeholder="I come from..." onChange={this.handleOrigin}></input>
                            </div>
                            <div>
                                <input type="text" placeholder="My phone number... " onChange={this.handlePhone} ></input>
                            </div>
                            <div>
                                <textarea rows={5} placeholder='Brief description about yourself, your interests, your previous jobs, studies, your pasion, hobbies...' onChange={this.handleMyself} />
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
                            <div>
                                <select name="hostess_profile" onClick={this.handleJobType}>
                                    <option value="" disabled hidden selected>What type of job do you prefer?</option>
                                    <option value="info">Information hostess - Congreses, conferences, fairs, desk tasks...</option>
                                    <option value="image">Image hostess - Minimum height is required</option>
                                    <option value="animation">Animation - Dress up, act, dance...</option>
                                    <option value="sells">Comercial profile - Sells</option>
                                </select>
                            </div>
                            <div className="flex-box">
                                <fieldset data-role="controlgroup" className="languages-box" >
                                    <legend>In wich languages do you feel comfortable having a conversation?</legend>
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
                                    {/* <input type="text" name="languages" id="others" placeholder="Any other language?" onChange={this.handleOtherLanguages}></input> */}
                                </fieldset>
                            </div>
                            <div>
                                <input type="password" placeholder="password" onChange={this.handlePassword} ></input>
                            </div>
                            <button type="submit" > join to the virtual hostess community</button>
                        </form>
                        {
                            error && (<div className="error">{error}</div>)
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(HostessRegister)
