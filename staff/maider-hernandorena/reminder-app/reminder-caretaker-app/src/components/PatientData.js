import React, { Component } from 'react'
import logic from '../logic'
import '../styles/css/patientdata.css'

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

    componentDidMount() {
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

        return <main className="all">
                <div className="all__data">
                    <div className="all__data__patient">
                        <h3 className="all__data__patient__name">{name} {surname}</h3>
                        <p>{age} years old, {gender}</p>
                        <p>DNI: {dni}</p>
                        <p>Address: {address}</p>
                        <p>Phone: {phone}</p>
                    </div>
                    <div className="all__data__cites">
                        <h3 className="all__data__cites__title">Cites</h3>
                        <ul className="all__data__cites__list">
                            {cites.map(cite => <li className="all__data__cites__list__item" key={cite.name}>
                                <p><strong>{cite.name}</strong>, {new Date(cite.date).toLocaleString()}.</p>
                            </li> )}
                        </ul>
                    </div>
                    <div className="all__data__treatments">
                        <h3 className="all__data__treatments__title">Treatments</h3>
                        <ul className="all__data__treatments__list">
                            {treatments.map(treatment => <li className="all__data__treatments__list__item" key={treatment.pill}>
                                <p><strong>{treatment.pill}</strong>, {treatment.quantity}, {treatment.frequency}.</p>
                            </li> )}
                        </ul>
                    </div>
                </div>
        </main>
    }
}

export default PatientData