import React, { Component } from 'react'
import logic from '../logic'

class Contacts extends Component {

    state = {
        contacts: [],
        contact: '',
        telephone: '',
        error: ''
    }

    keepContact = e => this.setState({ contact: e.target.value, error: '' })
    keepTelephone = e => this.checkTelephone(e.target.value) 

    checkTelephone = value => {
        const regex = (/^[0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null && value.length === 9) this.setState({ telephone: value, error: '' })
    }

    componentWillMount() {
        this.listContacts()
    }

    listContacts = () => {
        const { username, token } = this.props
        logic.listContacts(username, token)
            .then(contacts => this.setState({ contacts, contact: '', telephone: '' }))
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

    deleteContact = (e, {contact, telephone}) => {
        e.preventDefault()
        const { username, token } = this.props
        
        logic.deleteContact(username, contact, telephone, token)
            .then(() => true)
            .then(() => this.listContacts())
            .catch(({ message }) => this.setState({error: message}))
    }

    render() {
        const { state: {contacts, error}, addContact, keepContact, keepTelephone, deleteContact } = this

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
                        {contacts.map(contact => <li key={contact.contact}>
                            <a href="" onClick={e => deleteContact(e, contact)} >X</a>
                            <h4>{contact.contact}</h4>
                            <p>{contact.telephone}</p>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default Contacts