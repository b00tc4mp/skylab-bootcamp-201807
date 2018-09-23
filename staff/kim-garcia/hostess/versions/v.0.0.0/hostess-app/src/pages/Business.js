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
        favs: [],
        business: '',
    }

    componentDidMount() {
        logic.retrieveBusiness(this.props.email, this.props.token)
            .then(business => {
                this.setState({ business })


                // const { name, philosophy, web, boss, phone, favs } = business
                // this.setState({ name, phone, philosophy, web, boss, favs })
            })
    }

    handleNewEvent = (event) => {
        event.preventDefault()

        this.props.history.push('/event/create')
    }

    goToProfile = (event) => {
        event.preventDefault()

        this.props.history.push('/business/profile')
    }


    render() {
        const { name, philosophy, web, boss, phone, favs } = this.state.business
        // const { name, philosophy, web, boss, phone, favs } = this.state

        return (
            <div>
                <Header businessProfile={true} onLogout={this.props.onLogout} />
                <div className="block">
                    {
                        name && (
                            <div>
                                <div >
                                    <table className="table-business">
                                        <tr>
                                            <div>
                                                <h1>&bull; {name.toUpperCase()} &bull;</h1>
                                                <div>
                                                    <p><span>Philosophy of {name}: </span></p>
                                                    <p>{philosophy}</p>
                                                    <p>{web}</p>
                                                </div>
                                                <Contact name={boss} phone={phone} email={this.props.email} />
                                            </div>
                                        </tr>
                                        <tr>
                                            <div>
                                                <h1>&bull; EVENTS &bull;</h1>
                                                <button onClick={this.handleNewEvent} className="landing-submit">CREATE EVENT</button>
                                                {/* <p>Events on the past</p> */}
                                            </div>
                                        </tr>
                                    </table>
                                    {/* <div>
                                        <h1>&bull; YOUR BEST HOSTESSES &bull;</h1>
                                        <ul>
                                            {favs.map(favorit => {
                                                return <li>{favorit.name}</li>
                                            })}
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        )
                    }
                    {
                        !name && (<div>
                            <div  className="flex-box-complete">Complete your profile please</div>
                            <button onClick={this.goToProfile} className="landing-submit">EDIT PROFILE</button>
                        </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Business)