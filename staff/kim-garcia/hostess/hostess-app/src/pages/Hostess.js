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
        token: ''
    }

    componentDidMount() {

        logic.retrieveHostess(this.props.email, this.props.token)
            .then(hostess => {

                const { email, name, origin, birth, phone, myself, skills, languages, jobType, height } = hostess

                let idioms = languages.join('/ ')

                this.setState({ name })
                this.setState({ origin })
                this.setState({ birth })
                this.setState({ phone })
                this.setState({ email })
                this.setState({ myself })
                this.setState({ skills: skills })
                this.setState({ languages: idioms })
                this.setState({ jobType })
                this.setState({ height })
            
            })
}




render() {
    const { email, name, origin, birth, phone, myself, skills, languages, jobType, height } = this.state
    const age = getAge(birth)

    return (
        <div>
            <Header hostessProfile={true} name={name} onLogout={this.props.onLogout} />
            <div className="cuadricula__hostess">
                <div className="cuadricula__hostess__photo" >FOTO</div>
                <div className="cuadricula__hostess__details">
                    <h1>{name.toUpperCase()}, {age}</h1>
                    <p>Born in {origin}</p>
                    <Contact email={email} phone={phone} />
                </div>
                <div className="cuadricula__hostess__history" >HISTORY</div>
                <div className="cuadricula__hostess__skills" >
                    <p>A little about myself... {myself}</p>
                    <p>Languages: {languages}</p>
                    <p>My skills {skills}</p>
                    <p>I preafer jobs in {jobType}</p>
                    <p>I'm {height} tall</p>
                </div>
            </div>
        </div>

    )
}
}

export default withRouter(Hostess)