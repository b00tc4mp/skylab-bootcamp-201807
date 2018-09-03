import React, { Component } from 'react'
import logic from '../logic'
import '../styles/css/patientdata.css'

class PatientData extends Component {

    state = {
        cites: [],
        citeName: '',
        date: new Date(),
        addedCite: '',
        errorCite: '',
        addedTreatment: '',
        errorTreatment: '',
        name: '',
        surname: '',
        dni: null,
        age: null,
        gender: '',
        address: '',
        phone: null,
        id: '',
        treatments: [],
        pill: '',
        quantity: '',
        frequency: ''
    }


    componentWillMount() {
        this.patientData()
    }

    patientData = () => {
        let { dni } = this.props
        dni = parseInt(dni)

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
                    id: id.toString(),
                    error: '',
                    added: ''
                })
            })
            .then(() => this.listCites())
            .then(() => this.listTreatments())
    }

    keepName = e => this.setState({ citeName: e.target.value, errorCite: '' })
    keepDate = e => this.setState({ date: e.target.value, errorCite: '' })
    
    addCite = e => {
        e.preventDefault()
        let { citeName, date, dni } = this.state
        const { code } = this.props
        date = new Date(date)

        logic.addCite(code, dni, citeName, date)
            .then(({ message }) => this.setState({ addedCite: message, error: '' }))
            .then(() => this.listCites())
            .catch(({ message }) => this.setState({ errorCite: message, addCite: '' }))
    }

    listCites = () => {
        let { id, date } = this.state
        date = new Date(date)

        logic.listPatientCites(id, date)
            .then(cites => this.setState({ cites, errorCite: '', addedCite: '' }))
            .then(() => this.state.cites)
    }

    removeCite = (citeName,citeDate) => {
        const { dni } = this.state
        const { code } = this.props
        const date = new Date(citeDate)

        logic.removeCite(code, dni, citeName, date)
            .then(() => true)
            .then(() => this.listCites())
    }

    keepPill = e => this.setState({ pill: e.target.value, errorTreatment: '' })
    keepQuantity = e => this.setState({ quantity: e.target.value, errorTreatment: '' })
    keepFrequency = e => this.setState({ frequency: e.target.value, errorTreatment: '' })

    addTreatment = e => {
        e.preventDefault()
        const { id, dni, pill, quantity, frequency } = this.state

        logic.addTreatment(id, dni, pill, quantity, frequency)
            .then(({ message }) => this.setState({ added: message, errorTreatment: '' }))
            .then(() => this.listTreatments())
            .catch(({ message }) => this.setState({ errorTreatment: message, addCite: '' }))
    }

    listTreatments = () => {
        const { id } = this.state

        logic.listTreatments(id)
            .then(treatments => this.setState({ treatments, errorTreatment: '', addedCite: '' }))
            .then(() => this.state.treatments)
    }

    removeTreatment = pill => {
        const { id, dni } = this.state

        logic.removeTreatment(id, dni, pill)
            .then(() => true)
            .then(() => this.listTreatments())
    }

    render() {

        const { state: { cites, citeName, date, addedCite, errorCite, name, surname, age, gender, dni, address, phone,treatments, pill, quantity, frequency, addedTreatment, errorTreatment }, addCite, keepName, keepDate, addTreatment, keepPill, keepQuantity, keepFrequency } = this

        return <main>
            <div>
                <h3>{name} {surname}</h3>
                <p>Age: {age}, {gender}</p>
                <p>DNI: {dni}</p>
                <p>Address: {address}</p>
                <p>Phone: {phone}</p>
            </div>
            <div>
                <div>
                    <form onSubmit={addCite}>
                        <input type="text" value={citeName} name="name" placeholder="name" onChange={keepName}/>
                        <input type="datetime-local" value={date} name="name" onChange={keepDate}/>
                        <button type="submit">Add Cite</button>
                    </form>
                    {addedCite && <p className="added">{addedCite}</p>}
                    {errorCite && <p className="error">{errorCite}</p>}
                </div>
                <div>
                    <ul>
                        {cites.map(cite => <li key={cite.name}>
                            <button onClick={() => this.removeCite(cite.name, cite.date)}>X</button>
                            <p>{cite.name}, {cite.date}</p>
                        </li> )}
                    </ul>
                </div>
            </div>
            <div>
                <div>
                    <form onSubmit={addTreatment}>
                        <input type="text" value={pill} name="pill" placeholder="pill name" onChange={keepPill}/>
                        <input type="text" value={quantity} name="quantity" placeholder="quantity" onChange={keepQuantity}/>
                        <input type="text" value={frequency} name="frequency" placeholder="frequency" onChange={keepFrequency}/>
                        <button type="submit">Add Treatment</button>
                    </form>
                    {addedTreatment && <p className="added">{addedTreatment}</p>}
                    {errorTreatment && <p className="error">{errorTreatment}</p>}
                </div>
                <div>
                    <ul>
                        {treatments.map(treatment => <li key={treatment.pill}>
                            <button onClick={() => this.removeTreatment(treatment.pill)}>X</button>
                            <p>{treatment.pill}, {treatment.quantity}, {treatment.frequency}</p>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default PatientData