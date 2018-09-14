import React, { Component } from 'react'
import logic from '../logic'
import '../styles/css/patientdata.css'

class PatientData extends Component {

    state = {
        cites: [],
        citeName: '',
        date: new Date(),
        errorCite: '',
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
                    errorCite: '',
                    errorTreatment: ''
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
            .then(() => this.listCites())
            .catch(({ message }) => this.setState({ errorCite: message }))
    }

    listCites = () => {
        let { id, date } = this.state
        date = new Date(date)

        logic.listPatientCites(id, date)
            .then(cites => this.setState({ cites, errorCite: '' }))
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
            .then(() => this.listTreatments())
            .catch(({ message }) => this.setState({ errorTreatment: message }))
    }

    listTreatments = () => {
        const { id } = this.state

        logic.listTreatments(id)
            .then(treatments => this.setState({ treatments, errorTreatment: '' }))
            .then(() => this.state.treatments)
    }

    removeTreatment = pill => {
        const { id, dni } = this.state

        logic.removeTreatment(id, dni, pill)
            .then(() => true)
            .then(() => this.listTreatments())
    }

    render() {

        const { state: { cites, citeName, date, errorCite, name, surname, age, gender, dni, address, phone,treatments, pill, quantity, frequency, errorTreatment }, addCite, keepName, keepDate, addTreatment, keepPill, keepQuantity, keepFrequency } = this

        return <main className="all">
            <div className="all__data">
                <div className="all__data__patient">
                    <h3>{name} {surname}</h3>
                    <p>{age} years old, {gender}</p>
                    <p>DNI: {dni}</p>
                    <p>Address: {address}</p>
                    <p>Phone: {phone}</p>
                </div>
                <div className="all__data__forms">
                    <div className="all__data__forms__each">
                        <h3>Add Cite</h3>
                        <form className="all__data__forms__each__form" onSubmit={addCite}>
                            <input className="all__data__forms__each__form__input" type="text" value={citeName} name="name" placeholder="cite name" onChange={keepName}/>
                            <input className="all__data__forms__each__form__input" type="datetime-local" value={date} name="name" onChange={keepDate}/>
                            <button className="all__data__forms__each__form__button" type="submit">Add Cite</button>
                        </form>
                        {errorCite && <p className="all__data__forms__each__error">{errorCite}</p>}
                    </div>
                </div>
                <div className="all__data__forms">
                    <div className="all__data__forms__each">
                        <h3>Add Treatment</h3>
                        <form className="all__data__forms__each__form" onSubmit={addTreatment}>
                            <input className="all__data__forms__each__form__input" type="text" value={pill} name="pill name" placeholder="pill name" onChange={keepPill}/>
                            <input className="all__data__forms__each__form__input" type="text" value={quantity} name="quantity" placeholder="quantity" onChange={keepQuantity}/>
                            <input className="all__data__forms__each__form__input" type="text" value={frequency} name="frequency" placeholder="frequency" onChange={keepFrequency}/>
                            <button className="all__data__forms__each__form__button" type="submit">Add Treatment</button>
                        </form>
                        {errorTreatment && <p className="all__data__forms__each__error">{errorTreatment}</p>}
                    </div>
                </div>
            </div>
            <div className="all__list">
                <div className="all__list__each">
                    <h3 className="all__list__each__title">Cites</h3>
                    <ul className="all__list__each__list">
                        {cites.map(cite => <li className="all__list__each__list__item" key={cite.name}>
                            <p>{cite.name}, {new Date(cite.date).toLocaleString()}. 
                                <a href={`/#/patient/${dni}`} onClick={() => this.removeCite(cite.name, cite.date)}><img className="all__list__each__list__item__delete" src="/images/icons/remove.svg" /></a>
                            </p>
                        </li> )}
                    </ul>
                </div>
                <div className="all__list__each">
                    <h3 className="all__list__each__title">Treatments</h3>
                    <ul className="all__list__each__list">
                        {treatments.map(treatment => <li className="all__list__each__list__item" key={treatment.pill}>
                            <p>{treatment.pill}, {treatment.quantity}, {treatment.frequency}.
                                <a href={`/#/patient/${dni}`} onClick={() => this.removeTreatment(treatment.pill)}><img className="all__list__each__list__item__delete" src="/images/icons/remove.svg" /></a>
                            </p>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default PatientData