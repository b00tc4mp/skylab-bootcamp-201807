import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class BusinessRegister extends Component {
    state = {
        name: '',
        philosophy: '',
        boss: '',
        phone: '',
        web: '',
        businessCard: '',
        error: ''
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleName = (event) => {
        this.setState({ name: event.target.value })
    }

    handlePhilo = (event) => {
        this.setState({ philosophy: event.target.value })
    }

    handleBoss = (event) => {
        this.setState({ boss: event.target.value })
    }

    handlePhone = (event) => {
        this.setState({ phone: event.target.value })
    }

    handleWeb = (event) => {
        this.setState({ web: event.target.value })
    }

    handlePhoto = (event) => {
        this.setState({ businessCard: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { name, web, boss, phone, philosophy, businessCard } = this.state

        logic.editBusinessProfile(this.props.id, password, name, web, boss, phone, philosophy, businessCard, this.props.token)
            .then(() => {
                this.props.history.push('/business')
            })
            .catch(err => this.setState({ error: 'Please, fill all the camps' }))
    }

    render() {
        return (
            <div>
                <div className="big">
                    <div className="left">
                        Ladies, Wine Design was started by Jessica Walsh after this happened and she realized that sometimes women can be competitive or unsupportive of one another. Only a small percent of creative directors are women, and LW&D wants to help change this through mentorship circles, portfolio reviews, talks, and creative meet-ups. In less than two years of launching, we've spread to chapters in over 180 cities all over the world. If you’re a student or creative in NYC and would like to join, please do email us. If you want to join another city chapter's event, check out our city map. It's free to join our events!
                    </div>
                    <div className="right">
                        <h1 className="header__title"> &bull; CREATE THE PROFILE OF YOUR COMPANY &bull; </h1>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input type='text' onChange={this.handleName} placeholder="company name"/>
                            </div>
                            <div>
                                <input type="text" onChange={this.handleBoss} placeholder="your name"/>
                            </div>
                            <div>
                                <input type="text" onChange={this.handlePhone} placeholder="phone number"/>
                            </div>
                            <div >
                                <textarea  rows={5} placeholder='Explain to the hostess the main goal of the company' onChange={this.handlePhilo} />
                            </div>
                            <div>
                                <input type="text" onChange={this.handleWeb} placeholder="link your website"/>
                            </div>
                            <div>
                                <input type="text" onChange={this.handlePhoto} />
                            </div>
                            <div>
                                <input type="password" onChange={this.handlePassword} placeholder="password"/>
                            </div>
                            <div>
                                <button type="submit">start using<span>HOSTESS 2.0</span></button>
                            </div>
                        </form>
                        {
                            this.state.error && (
                                <div className="error">{this.state.error}</div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BusinessRegister)