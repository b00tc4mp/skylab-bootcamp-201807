import React, { Component } from 'react'
import logic from '../logic'

class CaretakerData extends Component {

    state = {
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
        let { dni } = this.props
        dni = parseInt(dni)

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
            .catch(({ message }) => this.setState({ error: message, added: '' }))
    }


    render() {

        const { state: { name, surname, age, gender, dni, phone, patientDni, added, error }, keepPatientDni, assignPatient } = this

        return <main className="caretaker">
                <div className="caretaker__data">
                    <h3>{name} {surname}</h3>
                    <p>{age} years old, {gender}</p>
                    <p>DNI: {dni}</p>
                    <p>Phone: {phone}</p>
                </div>
                <div>
                    <h3>Assign a Patient:</h3>
                    <form onSubmit={assignPatient}>
                        <p>Patients DNI:</p>
                        <input type="number" name={patientDni} value={patientDni} onChange={keepPatientDni} />
                        <button type="submit">Assign Patient</button>
                    </form>
                    {added && <p>{added}</p>}
                    {error && <p>{error}</p>}
                </div>
        </main>
    }
}

export default CaretakerData