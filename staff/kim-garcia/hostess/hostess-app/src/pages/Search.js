import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Host from '../components/Host'


class Search extends Component {
    state = {

    }


    handleGender = (event) => {
        this.setState({ gender: event.target.value })
    }

    handleProfile = (event) => {
        this.setState({ jobType: event.target.value })
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

    handleOtherLanguage = (event) => {
        const value = event.target.value
        const languages = []
        if (value.length) languages.push(value)
        this.setState({ otherLanguage: languages })
    }

    
    handleSubmit = event => {
        event.preventDefault()

        const { height, jobType, languagesSelected, otherLanguage, gender } = this.state

        let languages = languagesSelected.concat(otherLanguage)

        logic.searchWorkers(this.props.email, gender, jobType, height, languages, this.props.token)
            .then(hostesses => {
                debugger
                console.log(gender, jobType, languages, height)
                this.setState({ hostesses })

            })
    }

    render() {
        return (
            <div>
                <div className="search-workers">
                    <h2>&bull; SEARCH WORKERS &bull;</h2>
                    <form>
                        <div>
                            <select name="hostess_profile" onClick={this.handleProfile}>
                                <option value="" disabled hidden selected>What type of profile are you looking for?</option>
                                <option value="info">Information hostess  </option>
                                <option value="image">Image hostess</option>
                                <option value="animation">Animation </option>
                                <option value="sells">Comercial profile</option>
                                <option value="">All profiles</option>
                            </select>
                        </div>
                        {
                            jobType === 'image' && (
                                <div className="height-box">
                                    <label for="hieght">Minimum height</label>
                                    <input type="text" name="height" id="height" onChange={this.handleHeight} className="height"></input>
                                </div>
                            )
                        }
                        <div className="flex-box">
                            <fieldset data-role="controlgroup" onClick={this.handleGender} className="gender-box">
                                <legend>Choose a gender if it is needed:</legend>
                                <label for="woman">Woman</label>
                                <input type="radio" name="gender" id="woman" value="W"></input>
                                <label for="man">Man</label>
                                <input type="radio" name="gender" id="man" value="M"></input>
                            </fieldset>
                        </div>
                        <div className="flex-box">
                            <fieldset data-role="controlgroup" className="languages-box">
                                <legend>In wich languages is going to work?</legend>
                                <input type="checkbox" name="languages" id="catalan" value="catalan" onChange={this.handleLanguages} ></input>
                                <label htmlFor="catalan">Catalan</label>
                                <input type="checkbox" name="languages" id="spanish" value="spanish" onChange={this.handleLanguages}></input>
                                <label for="spanish">Spanish</label>
                                <input type="checkbox" name="languages" id="english" value="english" onChange={this.handleLanguages}></input>
                                <label for="english">English</label>
                                <input type="checkbox" name="languages" id="german" value="german" onChange={this.handleLanguages}></input>
                                <label for="german">German</label>
                                <input type="checkbox" name="languages" id="french" value="french" onChange={this.handleLanguages}></input>
                                <label for="french">French</label>
                                <input type="checkbox" name="languages" id="japanese" value="japanese" onChange={this.handleLanguages}></input>
                                <label for="japanese">Japanese</label>
                                <input type="checkbox" name="languages" id="chinese" value="chinese" onChange={this.handleLanguages}></input>
                                <label for="chinese">Chinese</label>
                                <input type="text" name="languages" id="others" onChange={this.handleOtherLanguage} placeholder="other languages"></input>
                            </fieldset>
                        </div>

                        <button type="submit" className="deletes-button">SEARCH WORKERS</button>
                    </form>
                    {
                        hostesses && (<div>
                            <h3>1 EURO FOR SELECTION</h3>
                            <div>
                                {hostesses.map(hostess => {
                                    return <Host hostess={hostess} email={this.props.email} token={this.props.token} />
                                })}
                            </div>
                        </div>)
                    }
                </div >
            </div >
        )
    }
}


export default withRouter(Search)