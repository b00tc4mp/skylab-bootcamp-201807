import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import '../styles/css/patients.css'

class Patients extends Component {

    state = { 
        patients: [],
        name: '',
        error: '',
        search: false
    }
    
    keepName = e => this.setState({ name: e.target.value, error: '' })
    
    goToAddPatient = e => {
        e.preventDefault()
        this.props.goToAddPatient()
    }

    patientData = dni => {
        this.props.patientData(dni)
    }

    componentDidMount() {
        this.listPatients()

        this.unlisten = this.props.history.listen(() => this.listPatients())
    }

    componentWillUnmount() {
        this.unlisten()
    }

    listPatients = () => {
        logic.listPatients()
            .then(patients => this.setState({ patients, name: '', error: '' }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    onSearch = e => {
        e.preventDefault()
        const { name } = this.state
        
        logic.searchPatients(name)
            .then(patients => this.setState({ patients, name: '', error: '', search: true }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    removePatient = dni => this.props.removePatient(dni)

    render() {
        const { state: { error, name, patients }, keepName, onSearch, goToAddPatient, patientData } = this

        return <main className="patients">
            <div className="patients__group">
                <div className="patients__group__search">
                    <form className="patients__group__search__form" onSubmit={onSearch}>
                        <input className="patients__group__search__form__input" type="text" value={name} name="name" placeholder="Patient name..." onChange={keepName}/>
                        <button className="patients__group__search__form__button" type="submit">Search</button>
                    </form>
                    {error && <p className="patients__group__search__error">{error}</p>}
                </div>
                <div className="patients__group__add">
                    <button className="patients__group__add__button" onClick={goToAddPatient}>Add Patient</button>
                </div>
                <h2 className="patients__group__title">Patients</h2>
                <div className="patients__group__all">
                    <ul className="patients__group__all__list">
                        {patients.map(patient => <li className="patients__group__all__list__item" key={patient.dni} onClick={() => patientData(patient.dni)}>
                            <a className="patients__group__all__list__item__link" href={`/#/patient/${patient.dni}`}><p className="patients__group__all__list__item__link__text"><strong>{patient.name} {patient.surname}</strong>. DNI: {patient.dni}. {patient.age} years old, {patient.gender}.</p></a>
                            <a className="patients__group__all__list__item__delete" href="" onClick={() => this.removePatient(patient.dni)}>Delete Patient</a>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default withRouter(Patients)