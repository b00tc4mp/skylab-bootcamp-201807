import React, { Component } from 'react'
import logic from '../logic'
import '../styles/css/addpatient.css'

class AddPatient extends Component {
    
    state = {
        name: '',
        dni: null,
        surname: '',
        age: null,
        gender: '',
        address: '',
        phone: null,
        added: '',
        error: ''
    }

    keepName = e => this.setState({ name: e.target.value, error: '', added: '' })
    keepDni = e => this.setState({ dni: e.target.value, error: '', added: '' })
    keepSurname = e => this.setState({ surname: e.target.value, error: '', added: '' })
    keepAge = e => this.setState({ age: e.target.value, error: '', added: '' })
    keepGender = e => this.setState({ gender: e.target.value, error: '', added: '' })
    keepAddress = e => this.setState({ address: e.target.value, error: '', added: '' })
    keepPhone = e => this.setState({ phone: e.target.value, error: '', added: '' })

    addPatient = e => {
        e.preventDefault()

        let { name, dni, surname, age, gender, address, phone } = this.state
        const { id, token } = this.props

        dni = parseInt(dni)
        age = parseInt(age)
        phone = parseInt(phone)

        logic.addPatient(name, dni, surname, age, gender, address, phone, id, token)
            .then(({ message }) => this.setState({ added: message, error: '' }))
            .catch(({ message }) => this.setState({ error: message, added: '' }))
    }

    render() {

        const { state: { name, surname, dni, age, gender, address, phone, added, error }, addPatient, keepName, keepDni, keepSurname, keepAge, keepGender, keepAddress, keepPhone } = this

        return <main className="add">
            <div className="add__group">
                <h2 className="add__group__title">Add Patient</h2>
                {added && <p className="add__group__added">{added}</p>}
                {error && <p className="add__group__error">{error}</p>}
                <form className="add__group__form" onSubmit={addPatient}>
                    <div className="add__group__form__row">
                        <p className="add__group__form__row__text">Name:</p>
                        <input className="add__group__form__row__input" type="text" value={name} name="name" placeholder="name" onChange={keepName}/>
                        <p className="add__group__form__row__text">Surname:</p>
                        <input className="add__group__form__row__input" type="text" value={surname} name="surname" placeholder="surname" onChange={keepSurname}/>
                        <p className="add__group__form__row__text">DNI:</p>
                        <input className="add__group__form__row__num" type="number" value={dni} name="dni" placeholder="8 digits" onChange={keepDni}/>
                    </div>
                    <div className="add__group__form__row">
                        <p className="add__group__form__row__text">Gender:</p>
                        <div className="add__group__form__row__rad">
                            <input className="add__group__form__row__rad__item" type="radio" value={gender} name="gender" value="male" onChange={keepGender}/>Male
                            <input className="add__group__form__row__rad__item" type="radio" value={gender} name="gender" value="female" onChange={keepGender}/>Female
                            <input className="add__group__form__row__rad__item" type="radio" value={gender} name="gender" value="other" onChange={keepGender}/>Other
                        </div>
                        <p className="add__group__form__row__text">Phone:</p>
                        <input className="add__group__form__row__num" type="number" value={phone} name="phone" placeholder="9 digits" onChange={keepPhone}/>
                        <p className="add__group__form__row__text">Age:</p>
                        <input className="add__group__form__row__age" type="number" value={age} name="age" placeholder="70" onChange={keepAge}/>
                    </div>
                    <div className="add__group__form__row">
                        <p className="add__group__form__row__text">Address:</p>
                        <input className="add__group__form__row__address" type="text" value={address} name="address" placeholder="address" onChange={keepAddress}/>
                        <button className="add__group__form__row__button" type="submit">Add Patient</button>
                    </div>
                </form>
            </div>
        </main>
    }
}

export default AddPatient