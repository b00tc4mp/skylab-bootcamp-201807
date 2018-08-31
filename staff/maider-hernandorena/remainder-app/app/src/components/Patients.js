import React, { Component } from 'react'
import logic from '../logic'

class Patients extends Component {

    state = { 
        patients: [],
        names: [],
        name: '',
        error: '',
        search: false
    }
    
    keepName = e => this.setState({ name: e.target.value })
    
    goToAddPatient = e => {
        e.preventDefault()
        this.props.goToAddPatient()
    }

    componentWillMount() {
        this.setState({ search: false })
        this.listPatients()
    }

    listPatients = () => {
        logic.listPatients()
            .then(patients => {
                this.setState({ patients, error: '' })
            })
            .then(() => this.state.patients)
    }

    onSearch = e => {
        e.preventDefault()
        const { name } = this.state
        logic.searchPatients(name)
            .then(names => {
                if(this.state.name === names[0].name) this.setState({ names, error: '', search: true })
                else throw new Error(`cannot found any patient with ${this.state.name}`)
            })
            .then(() => this.state.names)
            .catch(({message}) => this.setState({ error: message }))
    }

    render() {
        const { state: {error, names, patients, search}, keepName, onSearch, goToAddPatient } = this

        return <main>
            <div>
                <div className="search">
                    <p>Search patients:</p>
                    <form onSubmit={onSearch}>
                        <input type="text" name="name" placeholder="type here..." onChange={keepName}/>
                        <button type="submit">Search</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
                <div>
                    <button onClick={goToAddPatient}>Add Patient</button>
                </div>
                <div>
                    <p><h4>Name || Username</h4> || Age || Phone</p>
                </div>
                {search ? <div>
                    <ul>
                        {names.map(name => <li key={name.name}>
                            <a href="/#/patient" ><p><h4>{name.name} {name.surname}</h4>, {name.age}, {name.phone}</p></a>
                        </li> )}
                    </ul>
                </div> :
                <div>
                    <ul>
                        {patients.map(patient => <li key={patient.name}>
                            <a href="/#/patient" ><p><h4>{patient.name} {patient.surname}</h4>, {patient.age}, {patient.phone}</p></a>
                        </li> )}
                    </ul>
                </div> }
            </div>
        </main>
    }
}

export default Patients