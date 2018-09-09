import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class Doctors extends Component {

    state = { 
        doctors: [],
        error: '',
        code: '',
        password: ''
    }

    componentDidMount() {
        this.listDoctors()

        this.unlisten = this.props.history.listen(() => this.listDoctors())
    }

    componentWillUnmount() {
        this.unlisten()
    }

    listDoctors = () => {
        logic.listDoctors()
            .then(doctors => this.setState({ doctors, error: '' }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    removeDoctor = code => {
        const { id, token } = this.props

        logic.removeDoctor(code, id, token)
            .then(() => true)
            .then(() => this.listDoctors())
    }

    keepCode = e => this.setState({ code: e.target.value, error: '' })
    keepPassword = e => this.setState({ password: e.target.value, error: '' })

    addDoctor = () => {
        const { code, password } = this.state
        const { id, token } = this.props

        logic.registerDoctor(code, password, id, token)
            .then(() => true)
            .then(() => this.listDoctors())
    }

    render() {
        const { state: { doctors, code, password }, removeDoctor, keepCode, keepPassword, addDoctor } = this

        return <main className="doctors">
            <div>
                <form onSubmit={addDoctor}>
                    <input type="text" name={code} value={code} placeholder="doctor code" onChange={keepCode} />
                    <input type="password" name={password} value={password} placeholder="doctor password" onChange={keepPassword} />
                    <button type="submit">Add Doctor</button>
                </form>
            </div>
            <div className="doctors__group">
                <h2 className="doctors__group__title">doctors</h2>
                <div className="doctors__group__all">
                    <ul className="doctors__group__all__list">
                        {doctors.map(doctor => <li className="doctors__group__all__list__item" key={doctor.code} >
                            <p><strong>{doctor.code}</strong></p>
                            <button onClick={() => removeDoctor(doctor.code)} href="">Delete</button>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default withRouter(Doctors)