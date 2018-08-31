import React, { Component } from 'react'
import logic from '../logic'

class Patients extends Component {

    state = {
        name: '',
        date: '',
        added: '',
        error: ''
    }

    // patientId: sessionStorage.getItem('id') || '',
    // patientToken: sessionStorage.getItem('token') || '',
    // removePatient = (e, dni) => {
    //     e.preventDefault()
    //     const { patientId, patientToken } = this.state
    //     logic.removePatient(patientId, dni, patientToken)
    //         .then(() => true)
    //         .then(() => console.log('removed! :P'))
    //         .catch(({message}) => this.setState({ error: message }))
    // }
    keepName = e => this.setState({ name: e.target.value, error: '' })
    keepDate = e => this.setState({ date: e.target.value, error: '' })
    
    addCite = e => {
        e.preventDefault()
        let { name, date } = this.state
        const { code, patientDni } = this.props

        date = new Date(date)

        logic.addCite(code, patientDni, name, date)
            .then(({ message }) => {
                this.setState({ added: message })
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    render() {

        const { state: { added, error }, addCite, keepName, keepDate } = this

        return <main>
            <div>
                <form onSubmit={addCite}>
                    <input type="text" name="name" placeholder="name" onChange={keepName}/>
                    <input type="date" name="name" placeholder="date" onChange={keepDate}/>
                    <button type="submit">Add Cite</button>
                    {added && <p className="added">{added}</p>}
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </main>
    }
}

export default Patients