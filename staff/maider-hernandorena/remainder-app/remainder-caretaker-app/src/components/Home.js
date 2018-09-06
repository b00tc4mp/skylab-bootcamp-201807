import React, { Component } from 'react'
import logic from '../logic'

class Home extends Component {

    state = {
        patientDni: '',
        error: '',
        name: '',
        surname: '',
        age: null,
        gender: '',
        address: '',
        phone: null,
        id: '',
        treatments: [],
        date: new Date(),
        cites: []
    }

    keepPatientDni = e => this.setState({ patientDni: e.target.value, error: ''})

    retrievePatient = e => {
        e.preventDefault()
        let { patientDni } = this.state
        const { email } = this.props

        patientDni = parseInt(patientDni)

        logic.caretakerPatient(email, patientDni)
            .then(patient => {
                const { name, surname, age, gender, address, phone, id } = patient
                this.setState({
                    name: name,
                    surname: surname,
                    age: age,
                    gender: gender,
                    address: address,
                    phone: phone,
                    id: id
                })
            })
            .then(() => {
                this.listTreatments()
                this.listCites()
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    listTreatments = () => {
        const { id } = this.state

        logic.listTreatments(id)
            .then(treatments => this.setState({ treatments }))
    }

    listCites = () => {
        let { id, date } = this.state
        date = new Date(date)

        logic.listPatientCites(id, date)
            .then(cites => this.setState({ cites }))
    }

    render() {
        
        const { state: { patientDni, error, name, surname, age, gender, address, phone, treatments, cites }, keepPatientDni, retrievePatient } = this

        return <div>
            <div>
                <form onSubmit={retrievePatient}>
                    <input type="number" value={patientDni} name="dni" placeholder="enter patient dni" onChange={keepPatientDni}/>
                    <button type="submit">Search Patient</button>
                </form>
                {error && <p>{error}</p>}
            </div>
            <div>
                <h3>{name} {surname}</h3>
                <p>{age} years old, {gender}</p>
                <p>DNI: {patientDni}</p>
                <p>Address: {address}</p>
                <p>Phone: {phone}</p>
            </div>
            <div>
                <h3>Treatments</h3>
                <ul>
                    {treatments.map(treatment => <li key={treatment.pill}>
                        <p>{treatment.pill}, {treatment.quantity}, {treatment.frequency}.</p>
                    </li> )}
                </ul>
            </div>
            <div>
                <h3>Cites</h3>
                <ul>
                    {cites.map(cite => <li key={cite.name}>
                        <p>{cite.name}, {new Date(cite.date).toLocaleString()}.</p>
                    </li> )}
                </ul>
            </div>
        </div>
    }
}

export default Home