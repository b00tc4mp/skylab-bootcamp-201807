import React, { Component } from 'react'
import logic from '../logic'

class AddPatient extends Component {
    
    state = {
        name: '',
        dni: null,
        surname: '',
        age: null,
        gender: '',
        address: '',
        phone: null,
        error: ''
    }

    keepName = e => this.setState({ name: e.target.value, error: '' })
    keepDni = e => this.setState({ dni: e.target.value, error: '' })
    keepSurname = e => this.setState({ surname: e.target.value, error: '' })
    keepAge = e => this.setState({ age: e.target.value, error: '' })
    keepGender = e => this.setState({ gender: e.target.value, error: '' })
    keepAddress = e => this.setState({ address: e.target.value, error: '' })
    keepPhone = e => this.setState({ phone: e.target.value, error: '' })

    addPatient = e => {
        e.preventDefault()

        let { name, dni, surname, age, gender, address, phone } = this.state

        dni = parseInt(dni)
        age = parseInt(age)
        phone = parseInt(phone)

        logic.addPatient(name, dni, surname, age, gender, address, phone)
            .then(({ message }) => this.setState({ error: message })) //TO CHANGE
            .catch(({ message }) => this.setState({ error: message }))
    }

    render() {

        const { state: { error }, addPatient, keepName, keepDni, keepSurname, keepAge, keepGender, keepAddress, keepPhone } = this

        return <main>
            <div>
                <form onSubmit={addPatient}>
                    <p>Patient Name:</p>
                    <input type="text" name="name" placeholder="name" onChange={keepName}/>
                    <p>Patient Surname:</p>
                    <input type="text" name="surname" placeholder="surname" onChange={keepSurname}/>
                    <p>Patient DNI:</p>
                    <input type="number" name="dni" placeholder="dni" onChange={keepDni}/>
                    <p>Patient Age:</p>
                    <input type="number" name="age" placeholder="age" onChange={keepAge}/>
                    <p>Patient Gender:</p>
                    <input type="radio" name="gender" value="male" onChange={keepGender}/>Male
                    <input type="radio" name="gender" value="female" onChange={keepGender}/>Female
                    <input type="radio" name="gender" value="other" onChange={keepGender}/>Other
                    <p>Patient Address:</p>
                    <input type="text" name="address" placeholder="address" onChange={keepAddress}/>
                    <p>Patient Phone:</p>
                    <input type="number" name="phone" placeholder="phone" onChange={keepPhone}/>
                    <button type="submit">Add Patient</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </main>
    }
}

export default AddPatient