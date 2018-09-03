import React, { Component } from 'react'
import logic from '../logic'
import '../styles/css/patients.css'

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

    patientData = dni => {
        this.props.patientData(dni)
    }

    componentWillMount() {
        this.listPatients()
    }

    listPatients = () => {
        logic.listPatients()
            .then(patients => this.setState({ patients, error: '', search: false }))
            .then(() => this.state.patients)
            .catch(({message}) => this.setState({ error: message }))
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
        const { state: { error, name, names, patients, search }, keepName, onSearch, goToAddPatient, patientData } = this

        return <main>
            <div>
                <div className="search">
                    <p>Search patients:</p>
                    <form onSubmit={onSearch}>
                        <input type="text" value={name} name="name" placeholder="type here..." onChange={keepName}/>
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
                        {names.map(patient => <li key={patient.name} onClick={() => patientData(patient.dni)}>
                            <a href={`/#/patient/${patient.dni}`}><p><h4>{patient.name} {patient.surname}</h4>, {patient.dni}</p></a>
                        </li> )}
                    </ul>
                </div> :
                <div>
                    <ul>
                        {patients.map(patient => <li key={patient.name} onClick={() => patientData(patient.dni)}>
                            <a href={`/#/patient/${patient.dni}`}><p><h4>{patient.name} {patient.surname}</h4>, {patient.dni}</p></a>
                        </li> )}
                    </ul>
                </div> }
            </div>
        </main>
    }
}

export default Patients