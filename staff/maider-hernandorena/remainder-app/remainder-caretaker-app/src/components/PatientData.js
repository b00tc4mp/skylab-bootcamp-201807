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
        treatments: [],
        cites: [],
        date: new Date()
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
            .then(() => this.listCites())
            .then(() => this.listTreatments())
    }

    listTreatments = () => {
        const { id } = this.state

        logic.listTreatments(id)
            .then(treatments => this.setState({ treatments, errorTreatment: '' }))
            .then(() => this.state.treatments)
    }

    listCites = () => {
        let { id, date } = this.state
        date = new Date(date)

        logic.listPatientCites(id, date)
            .then(cites => this.setState({ cites, errorCite: '' }))
            .then(() => this.state.cites)
    }


    render() {

        const { state: { name, surname, age, gender, dni, address, phone, treatments, cites } } = this

        return <main className="patient">
                <div className="patient__data">
                    <h3>{name} {surname}</h3>
                    <p>{age} years old, {gender}</p>
                    <p>DNI: {dni}</p>
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
        </main>
    }
}

export default PatientData