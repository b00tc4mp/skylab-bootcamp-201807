import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../logic'

class Patients extends Component {

    state = { 
        names: [],
        name: '',
        error: ''
    }
    
    keepName = e => this.setState({ name: e.target.value })

    onSearch = e => {
        e.preventDefault()
        const { name } = this.state
        logic.searchPatients(name)
            .then(names => {
                if(this.state.name === names[0].name) this.setState({ names, error: '' })
                else throw new Error(`cannot found any patient with ${this.state.name}`)
            })
            .then(() => this.state.names)
            .catch(({message}) => this.setState({ error: message }))
    }

    goToAddPatient = e => {
        e.preventDefault()
        this.props.goToAddPatient()
    }

    render() {
        const { state: {error, names}, keepName, onSearch, goToAddPatient} = this

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
                    <ul>
                        {names.map(name => <li key={name.title}>
                            {/* <a href="" onClick={e => deleteName(e, name)} >X</a> */}
                            <h4>{name.name} {name.surname}</h4>
                            <p>{name.dni}</p>
                            <p>{name.age}</p>
                            <p>{name.gender}</p>
                            <p>{name.address}</p>
                            <p>{name.phone}</p>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default Patients