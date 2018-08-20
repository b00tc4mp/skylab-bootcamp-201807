import React, { Component } from 'react'
import logic from '../logic'

class Contacts extends Component {

    state = {
        contacts: [],
        contact: '',
        telephone: '',
        error: ''
    }

    keepContact = e => this.setState({ contact: e.target.value })
    keepTelephone = e => this.setState({ telephone: e.target.value })

    componentDidMount() {
        this.listContacts()
    }

    listContacts = () => {
        const { username, token } = this.props
        logic.listContacts(username, token)
            .then(contacts => this.setState({ contacts }))
            .catch(({ message }) => this.setState({error: message}))
    }

    addContact = e => {
        e.preventDefault()
        const { username, token } = this.props
        const { contact, telephone } = this.state

        logic.addContacts(username, contact, telephone, token)
            .then(contacts => this.setState(contacts = [{contact, telephone}]))
            .then(() => this.listContacts())
            .catch(({ message }) => this.setState({error: message}))
    }

    deleteContact = e => {
        e.preventDefault()
        const { username, token } = this.props
        const { contact, telephone } = this.state
        
        logic.deleteContact(username, contact, telephone, token)
            .then(() => true)
            .then(() => this.listContacts())
            .catch(({ message }) => this.setState({error: message}))
    }

    render() {
        const { state: {contacts, error}, addContact, keepContact, keepTelephone } = this

        return <main>
            <div>
                <h3>Contacts:</h3>
                <div className="grid-container">
                    <div>
                        <form onSubmit={addContact}>
                            <input type="text" name="name" placeholder="name" onChange={keepContact} />
                            <input type="text" name="telephone" placeholder="phone" onChange={keepTelephone} />
                            <button type="submit">Add Contact</button>
                        </form>
                        {error && <p className="error">{error}</p>}
                    </div>
                    <ul>
                        {contacts.map(contacts => <li key={contacts.contact}>
                            <a href="" onClick={this.deleteContact}>X</a>
                            <h4>{contacts.contact}</h4>
                            <p>{contacts.telephone}</p>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default Contacts