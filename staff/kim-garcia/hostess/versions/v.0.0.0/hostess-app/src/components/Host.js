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

        const { name, birth, origin, languages, skills, myself } = this.props.hostess

        const { success, error } = this.state

        const age = getAge(birth)

        let idioms = languages.join('/ ')

        const selected = (this.state.success) ? ' block-selected ' : ' '

        return (


            <div>
                <div className={selected + "host-block"}>
                    <table className="tabla-host">
                        <tr>
                            <td className="foto" ><div >FOTO</div></td>
                            <td className="table-contact" >
                                <div>
                                    <h2>{name.toUpperCase()}, {age}</h2>
                                    <p>Born in {origin}</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-button"><div><button onClick={this.selectHost} className="select-host" title="1€">+</button>
                            </div></td>
                            <td className="table-description">
                                <div>
                                    <p>About me... {myself}</p>
                                    <p>I can speak: {idioms}</p>
                                    <p>{skills}</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    {
                        success && (<div>{success}</div>)
                    }
                    {
                        error && (<div className="error">{error}</div>)
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Host)