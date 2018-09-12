import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

var getAge = require('get-age')

class Host extends Component {
    state = {
        success: '',
        error: '',

    }

    selectHost = (event) => {
        event.preventDefault()
        const { email, token, hostess: { email: hostessEmail } } = this.props

        logic.addHostess(hostessEmail, email, token)
            .then(() => this.setState({ success: 'Added to the event' }))
            .catch(err => this.setState({ error: err.message }))
    }


    render() {

        const { name, birth, origin, languages, jobType, skills, height, myself } = this.props.hostess

        const { success, error } = this.state

        const age = getAge(birth)

        return (
            <li>
                <div className="cuadricula__hostess">
                    <div className="cuadricula__hostess__photo" >FOTO</div>
                    <div className="cuadricula__hostess__details">
                        <h1>{name.toUpperCase()}, {age}</h1>
                        <p>Born in {origin}</p>
                    </div>
                    <div className="cuadricula__hostess__history" >HISTORY</div>
                    <div className="cuadricula__hostess__skills" >
                        <p>About {name}: {myself}</p>
                        <p>Languages: {languages}</p>
                        <p>My skills {skills}</p>
                        {
                            jobType === 'image' && (<p>I'm {height} tall</p>)
                        }
                    </div>
                    <button onClick={this.selectHost}>SELECT</button>
                    {
                        success && (<div>{success}</div>)
                    }
                    {
                        error && (<div>{error}</div>)
                    }
                </div>
            </li>
        )
    }
}

export default withRouter(Host)