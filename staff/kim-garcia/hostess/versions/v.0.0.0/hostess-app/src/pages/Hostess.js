import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header'
import logic from '../logic'
import Contact from '../components/Contact'

var getAge = require('get-age')


class Hostess extends Component {

    state = {
        name: '',
        origin: '',
        birth: '00/00/2018',
        phone: '',
        email: '',
        myself: 'Something about me',
        skills: 'I can...',
        languages: '',
        jobType: '',
        height: 120,
        token: '',
        update: true
    }

    componentDidMount() {
        logic.retrieveHostess(this.props.email, this.props.token)
            .then(hostess => {

                const { email, name, origin, birth, phone, myself, skills, languages, jobType, height } = hostess

                let idioms = languages.join('/ ')

                this.setState({ name, origin, birth, phone, email, myself, skills, languages: idioms, jobType, height, update: true })
            })
    }

    goToProfile = (event) => {
        event.preventDefault()

        this.props.history.push('/hostess/profile')
    }



    render() {
        const { email, name, origin, birth, phone, myself, skills, languages, jobType, height } = this.state
        const age = getAge(birth)

        return (
            <div>
                <Header hostessProfile={true} name={name} onLogout={this.props.onLogout} />
                <div className="block">
                    {
                        !name && (<div className="flex-box-complete">
                            <div>Complete your profile please</div>
                            <div>
                                <button onClick={this.goToProfile} className="landing-submit">EDIT PROFILE</button>
                            </div>
                        </div>)
                    }
                    {
                        name &&
                        (<div className="flex-box-complete">
                            <table className="tabla-host">
                                <tr>
                                    <td ><div >FOTO</div></td>
                                    <td className="table-contact" >
                                        <div>
                                            <div className="name-age">
                                                <h1>{name.toUpperCase()}, {age}</h1>
                                                <p>Born in {origin}</p>
                                            </div>
                                            <Contact email={email} phone={phone} name={name} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-history"><div>MY HOSTESS HISTORY</div></td>
                                    <td className="table-description">
                                        <div>
                                            <p>A little about myself... {myself}</p>
                                            <p>Languages: {languages}</p>
                                            <p>My skills {skills}</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>)
                    }
                </div>
            </div>

        )
    }
}

export default withRouter(Hostess)