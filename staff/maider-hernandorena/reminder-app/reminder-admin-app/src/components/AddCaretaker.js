import React, { Component } from 'react'
import logic from '../logic'
import '../styles/css/addcaretaker.css'

class AddCaretaker extends Component {
    
    state = {
        dni: null,
        password: '',
        name: '',
        surname: '',
        age: null,
        gender: '',
        phone: null,
        added: '',
        error: ''
    }

    keepDni = e => this.setState({ dni: e.target.value, error: '', added: '' })
    keepName = e => this.setState({ name: e.target.value, error: '', added: '' })
    keepSurname = e => this.setState({ surname: e.target.value, error: '', added: '' })
    keepAge = e => this.setState({ age: e.target.value, error: '', added: '' })
    keepGender = e => this.setState({ gender: e.target.value, error: '', added: '' })
    keepPhone = e => this.setState({ phone: e.target.value, error: '', added: '' })

    keepPassword = e => this.checkPassword(e.target.value) 

    checkPassword = value => {
        const regex = (/^[a-zA-Z0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null ) this.setState({ password: value, error: '', added: '' })    
    }

    addCaretaker = e => {
        e.preventDefault()

        let { dni, password, name, surname, age, gender, phone } = this.state
        const { id, token } = this.props

        dni = parseInt(dni)
        age = parseInt(age)
        phone = parseInt(phone)

        logic.registerCaretaker(dni, password, name, surname, age, gender, phone, id, token)
            .then(({ message }) => this.setState({ added: message, error: '' }))
            .catch(({ message }) => this.setState({ error: message, added: '' }))
    }

    render() {

        const { state: { name, surname, dni, password, age, gender, phone, added, error }, addCaretaker, keepName, keepDni, keepPassword, keepSurname, keepAge, keepGender, keepPhone } = this

        return <main className="add">
            <div className="add__group">
                <h2 className="add__group__title">Add Caretaker</h2>
                {added && <p className="add__group__added">{added}</p>}
                {error && <p className="add__group__error">{error}</p>}
                <form className="add__group__form" onSubmit={addCaretaker}>
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
                        <p className="add__group__form__row__text">Password:</p>
                        <input className="add__group__form__row__num" type="password" value={password} name="password" placeholder="password" onChange={keepPassword}/>
                        <button className="add__group__form__row__button" type="submit">Add Caretaker</button>
                    </div>
                </form>
            </div>
        </main>
    }
}

export default AddCaretaker