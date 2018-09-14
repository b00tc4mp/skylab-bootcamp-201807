import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import '../styles/css/doctors.css'

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

    removeDoctor = (e, code) => {
        e.preventDefault()
        const { id, token } = this.props

        logic.removeDoctor(code, id, token)
            .then(() => true)
            .then(() => this.listDoctors())
    }

    keepCode = e => this.setState({ code: e.target.value, error: '' })
    keepPassword = e => this.setState({ password: e.target.value, error: '' })

    addDoctor = e => {
        e.preventDefault()
        const { code, password } = this.state
        const { id, token } = this.props

        logic.registerDoctor(code, password, id, token)
            .then(() => true)
            .then(() => this.listDoctors())
            .catch(({ message }) => this.setState({ error: message }))
    }

    render() {
        const { state: { doctors, code, password, error }, removeDoctor, keepCode, keepPassword, addDoctor } = this

        return <main className="doctors">
            <div className="doctors__add">
                <h3 className="doctors__add__title">Register a new Doctor</h3>
                <form className="doctors__add__form" onSubmit={addDoctor}>
                    <input className="doctors__add__form__input" type="text" name={code} value={code} placeholder="doctor code" onChange={keepCode} />
                    <input className="doctors__add__form__input" type="password" name={password} value={password} placeholder="doctor password" onChange={keepPassword} />
                    <button className="doctors__add__form__button" type="submit">Add Doctor</button>
                </form>
                {error && <p className="doctors__add__error">{error}</p>}
            </div>
            <div className="doctors__group">
                <div className="doctors__group__all">
                    <h2 className="doctors__group__all__title">Doctors</h2>
                    <ul className="doctors__group__all__list">
                        {doctors.map(doctor => <li className="doctors__group__all__list__item" key={doctor.code} >
                            <p className="doctors__group__all__list__item__text"><strong>{doctor.code}</strong></p>
                            <a href="" onClick={(e) => removeDoctor(e, doctor.code)}><img className="doctors__group__all__list__item__delete" src="/images/icons/remove.svg" /></a>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default withRouter(Doctors)