import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header'
import logic from '../logic'
import DeleteUnregister from '../components/DeleteUnregister';

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
                <Header businessEdit={true} onLogout={this.props.top}></Header>

                <h1 className="header__title"> &bull; CREATE YOUR BUSINESS PROFILE &bull; </h1>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label html="company">COMPANY NAME</label>
                        <input id="company" type='text' placeholder="Company name" onChange={this.handleName}></input>
                    </div>
                    <div>
                        <textarea placeholder='Explain in few words what does your company does...' value={this.state.philosophy} onChange={this.handlePhilo} />
                    </div>
                    <div>
                        <input type="text" onChange={this.handleWeb} placeholder="Webpage"></input>
                    </div>
                    <div>
                        <fieldset>
                            <legend>Contact details</legend>
                            <div>
                                <label htmlFor="name">NAME</label>
                                <input id="name" type="text" onChange={this.handleBoss}></input>
                            </div>
                            <div>
                                <label htmlFor="phone">PHONE NUMBER</label>
                                <input id="phone" type="text" onChange={this.handlePhone}></input>
                            </div>
                        </fieldset>
                    </div>
                    <button type="submit" >UPDATE PROFILE</button>
                </form>
                {
                    this.state.error && (
                        <div className="error">{this.state.error}</div>
                    )
                }
                <DeleteUnregister onLogout={this.props.onLogout} email={this.props.email} token={this.props.token} />
            </div>
        )
    }
}

export default withRouter(BusinessEditProfile)