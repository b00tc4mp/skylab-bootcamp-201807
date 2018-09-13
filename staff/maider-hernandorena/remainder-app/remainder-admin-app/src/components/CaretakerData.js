import React, { Component } from 'react'
import logic from '../logic'
import '../styles/css/caretakerdata.css'

class CaretakerData extends Component {

    state = {
        patients: [],
        name: '',
        surname: '',
        dni: null,
        age: null,
        gender: '',
        phone: null,
        id: '',
        patientDni: null,
        added: '',
        error: ''
    }

    componentWillMount() {
        this.caretakerData()
    }

    caretakerData = () => {
        let { caretakerDni } = this.props
        const dni = parseInt(caretakerDni)

        logic.caretakerData(dni)
            .then(caretaker => {
                const { name, surname, dni, age, gender, phone, id } = caretaker
                this.setState({
                    name: name,
                    surname: surname,
                    dni: dni,
                    age: age,
                    gender: gender,
                    phone: phone,
                    id: id.toString()
                })
            })
            .then(() => this.retrieveCaretakerPatients())
    }

    keepPatientDni = e => this.setState({ patientDni: e.target.value, error: '', added: '' })

    assignPatient = e => {
        e.preventDefault()
        let { dni, patientDni } = this.state
        const { id, token } = this.props

        const caretakerDni = parseInt(dni)
        patientDni = parseInt(patientDni)
        
        logic.assignPatientToCaretaker(caretakerDni, patientDni, id, token)
            .then(({ message }) => this.setState({ added: message, error: '' }))
            .then(() => this.retrieveCaretakerPatients())
            .catch(({ message }) => this.setState({ error: message, added: '' }))
    }

    unassignPatient = (e, patientDni) => {
        e.preventDefault()
        let { dni } = this.state
        const { id, token } = this.props

        const caretakerDni = parseInt(dni)
        patientDni = parseInt(patientDni)
        
        logic.unassignPatientToCaretaker(caretakerDni, patientDni, id, token)
            .then(() => this.retrieveCaretakerPatients())
            .catch(({ message }) => this.setState({ error: message, added: '' }))
    }

    retrieveCaretakerPatients = () => {
        let { dni } = this.state

        dni = parseInt(dni)

        logic.retrieveCaretakerPatients(dni)
            .then(patients => this.setState({ patients }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    patientData = dni => {
        this.props.patientData(dni)
    }


    render() {

        const { state: { patients, name, surname, age, gender, dni, phone, patientDni, added, error }, keepPatientDni, assignPatient, patientData } = this

        return <main className="caretaker">
                <div className="caretaker__data">
                    <div className="caretaker__data__info">
                        <h3>{name} {surname}</h3>
                        <p>{age} years old, {gender}</p>
                        <p>DNI: {dni}</p>
                        <p>Phone: {phone}</p>
                    </div>
                    <div className="caretaker__data__assign">
                        <h3 className="caretaker__data__assign__title">Assign a Patient:</h3>
                        <form className="caretaker__data__assign__form" onSubmit={assignPatient}>
                            <input className="caretaker__data__assign__form__num" type="number" name={patientDni} value={patientDni} placeholder="patient dni" onChange={keepPatientDni} />
                            <button className="caretaker__data__assign__form__button" type="submit">Assign Patient</button>
                        </form>
                        {added && <p className="caretaker__data__assign__added">{added}</p>}
                        {error && <p className="caretaker__data__assign__error">{error}</p>}
                    </div>
                </div>
                <div className="caretaker__all">
                    <h2 className="caretaker__all__title">Patients:</h2>
                    <ul className="caretaker__all__list">
                        {patients.map(patient => <li className="caretaker__all__list__item" key={patient.dni} onClick={() => patientData(patient.dni)}>
                            <a className="caretaker__all__list__item__link" href={`/#/patient/${patient.dni}`}><p className="caretaker__all__list__item__link__text"><strong>{patient.name} {patient.surname}</strong>. DNI: {patient.dni}. {patient.age} years old, {patient.gender}.</p></a>
                            <a href="" onClick={(e) => this.unassignPatient(e, patient.dni)}><img className="patients__group__all__list__item__delete" src="/images/icons/remove.svg" /></a>
                            <a href={`/#/patient/${patient.dni}`} onClick={() => patientData(patient.dni)}><img className="patients__group__all__list__item__info" src="/images/icons/info.svg" /></a>
                        </li> )}
                    </ul>
                </div>
        </main>
    }
}

export default CaretakerData