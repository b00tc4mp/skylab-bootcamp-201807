import React, { Component } from 'react'
import logic from '../logic'

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

        return <div>
            <div>
                <ul className="patients__group__all__list">
                    {patients.map(patient => <li className="patients__group__all__list__item" key={patient.dni} onClick={() => patientData(patient.dni)}>
                        <a className="patients__group__all__list__item__link" href={`/#/patient/${patient.dni}`}><p><strong>{patient.name} {patient.surname}</strong>. DNI: {patient.dni}. {patient.age} years old, {patient.gender}.</p></a>
                    </li> )}
                </ul>
            </div>
        </div>
    }
}

export default Home