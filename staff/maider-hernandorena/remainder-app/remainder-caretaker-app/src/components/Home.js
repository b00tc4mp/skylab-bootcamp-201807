import React, { Component } from 'react'
import logic from '../logic'
import '../styles/css/home.css'

class Home extends Component {

    state = {
        patients: [],
        treatments: [],
        date: new Date(),
        cites: []
    }

    componentDidMount() {
        this.retrieveCaretakerPatients()
    }

    retrieveCaretakerPatients = () => {
        let { dni } = this.props

        dni = parseInt(dni)

        logic.retrieveCaretakerPatients(dni)
            .then(patients => this.setState({ patients }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    patientData = dni => {
        this.props.patientData(dni)
    }

    render() {
        
        const { state: { patients }, patientData } = this

        return <div className="patients">
                <h2 className="patients__title">Patients</h2>
                <ul className="patients__list">
                    {patients.map(patient => <li className="patients__list__item" key={patient.dni} onClick={() => patientData(patient.dni)}>
                        <a className="patients__list__item__link" href={`/#/patient/${patient.dni}`}><p><strong>{patient.name} {patient.surname}</strong></p><p> DNI: {patient.dni}. {patient.age} years old, {patient.gender}.</p></a>
                    </li> )}
                </ul>
            </div>
    }
}

export default Home