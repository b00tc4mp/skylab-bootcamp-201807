import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Header from '../components/Header'
import Contact from '../components/Contact';

class Business extends Component {
    state = {
        name: '',
        philosophy: '',
        web: '',
        boss: '',
        phone: '',
        favs: []
    }

    componentDidMount() {
        logic.retrieveBusiness(this.props.email, this.props.token)
            .then(business => {
                const { name, philosophy, web, boss, phone, favs } = business
                this.setState({ name, phone, philosophy, web, boss, favs })
            })
    }

    handleNewEvent = (event) => {
        event.preventDefault()

        this.props.history.push('/event/create')
    }


    render() {
        const { name, philosophy, web, boss, phone, favs } = this.state

        return (
            <div>
                <Header businessProfile={true} onLogout={this.props.onLogout} />
                <div>
                    <h1>&bull; {name.toUpperCase()} &bull;</h1>
                    <details>
                        <summary>Philosophy of {name}</summary>
                        <p>{philosophy}</p>
                    </details>
                    <Contact name={boss} phone={phone} email={this.props.email} />
                    <p>Web: {web}</p>
                </div>
                <div>
                    <h1>&bull; EVENTS &bull;</h1>
                    <button onClick={this.handleNewEvent}>CREATE EVENT</button>
                    <p>Events on the past</p>
                </div>
                <div>
                    <h1>&bull; YOUR BEST HOSTESSES &bull;</h1>
                    <ul>
                        {favs.map(favorit => {
                            return <li>{favorit.name}</li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(Business)