import React, { Component } from 'react'
import logic from '../logic'

class PatientData extends Component {

    state = {
        name: '',
        surname: '',
        dni: null,
        age: null,
        gender: '',
        address: '',
        phone: null,
        id: '',
        newAddress: '',
        newPhone: '',
        error: ''
    }

    componentWillMount() {
        this.patientData()
    }

    patientData = () => {
        let { patientDni } = this.props
        const dni = parseInt(patientDni)

        logic.patientData(dni)
            .then(patient => {
                const { name, surname, dni, age, gender, address, phone, id } = patient
                this.setState({
                    name: name,
                    surname: surname,
                    dni: dni,
                    age: age,
                    gender: gender,
                    address: address,
                    phone: phone,
                    id: id.toString()
                })
            })
    }

    keepNewAddress = e => this.setState({ newAddress: e.target.value, error: '' })
    keepNewPhone = e => this.setState({ newPhone: e.target.value, error: '' })

    updatePatient = () => {
        let { dni, newAddress, newPhone } = this.state
        const { id, token } = this.props

        dni = parseInt(dni)
        newPhone = parseInt(newPhone)

        logic.updatePatient(dni, newAddress, newPhone, id, token)
            .then(() => this.patientData())
            .catch(({ message }) => this.setState({ error: message }))
    }

    render() {

        const { state: { name, surname, age, gender, dni, address, phone, newAddress, newPhone, error }, updatePatient, keepNewAddress, keepNewPhone } = this

        return <main className="patient">
                <div className="patient__data">
                    <h3>{name} {surname}</h3>
                    <p>{age} years old, {gender}</p>
                    <p>DNI: {dni}</p>
                    <p>Address: {address}</p>
                    <p>Phone: {phone}</p>
                </div>
                <div>
                    <form onSubmit={updatePatient}>
                        <input type="text" value={newAddress} name="newAddress" placeholder="new address" onChange={keepNewAddress} />
                        <input type="number" value={newPhone} name="newPhone" placeholder="new phone" onChange={keepNewPhone} />
                        <button type="submit">Update</button>
                    </form>
                    {error && <p>{error}</p>}
                </div>
        </main>
    }
}

export default PatientData