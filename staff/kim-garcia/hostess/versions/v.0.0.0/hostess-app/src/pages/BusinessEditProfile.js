import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header'
import logic from '../logic'
import DeleteUnregister from '../components/DeleteUnregister'
// import { TextareaAutosize } from 'react-autosize-textarea'

class BusinessEditProfile extends Component {
    state = {
        name: '',
        philosophy: '',
        boss: '',
        phone: '',
        web: '',
        error: ''
    }

    handlePhilo = (event) => {
        this.setState({ philosophy: event.target.value })
    }

    handleName = (event) => {
        this.setState({ name: event.target.value })
    }

    handleBoss = (event) => {
        this.setState({ boss: event.target.value })
    }

    handleWeb = (event) => {
        this.setState({ web: event.target.value })
    }

    handlePhone = (event) => {
        this.setState({ phone: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { name, web, boss, phone, philosophy } = this.state

        logic.editBusinessProfile(this.props.email, name, web, boss, phone, philosophy, this.props.token)
            .then(() => {
                this.props.history.push('/business')
            })
            .catch(err => this.setState({ error: 'Please, fill all the camps' }))
    }

    render() {
        return (
            <div>
                <Header businessEdit={true} onLogout={this.props.onLogout}></Header>
                <div className="block">
                    <h1 className="header__title"> &bull; EDIT YOUR BUSINESS PROFILE &bull; </h1>
                    <form onSubmit={this.handleSubmit} className="form-register">
                        <div className="lab-input">
                            <input id="company" type='text' placeholder="COMPANY NAME" onChange={this.handleName} className="company-name"></input>
                        </div>
                        <div>
                            <fieldset className="business-card">
                                <legend>Contact details</legend>
                                <div>
                                    <label htmlFor="name">NAME</label>
                                    <input id="name" type="text" onChange={this.handleBoss} placeholder="Name of the person in charge of the hostesses"></input>
                                </div>
                                <div>
                                    <label htmlFor="phone">PHONE</label>
                                    <input id="phone" type="text" onChange={this.handlePhone} placeholder="We recomend the use whatsapp"></input>
                                </div>
                                <div>
                                    <label htmlFor="web">WEB</label>
                                    <input id="web" type="text" onChange={this.handleWeb} placeholder="www.webpage.com"></input>
                                </div>
                            </fieldset>
                        </div>
                        <div >
                            <textarea className="business-description" rows={4} placeholder='Explain to hostess what is the main goal of your company' value={this.state.philosophy} onChange={this.handlePhilo} />
                        </div>
                        <div className="button-update">
                            <button type="submit" className="landing-submit">UPDATE PROFILE</button>
                        </div>
                    </form>
                    {
                        this.state.error && (
                            <div className="error">{this.state.error}</div>
                        )
                    }
                    <DeleteUnregister onLogout={this.props.onLogout} email={this.props.email} token={this.props.token} business={true}/>
                </div>
            </div>
        )
    }
}

export default withRouter(BusinessEditProfile)