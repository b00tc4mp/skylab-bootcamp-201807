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

    addContact = e => {
        e.preventDefault()
        const { username, token } = this.props
        const { contact, telephone } = this.state

        logic.addContacts(username, contact, telephone, token)
            .then(contacts => contacts = [{contact, telephone}])
            .catch(({ message }) => this.setState({error: message}))
    }

    render() {
        const { state: {contacts, contact, telephone, error}, addContact, keepContact, keepTelephone } = this

        return <main>
            <div>
                <h3>Contatcs:</h3>
                <form onSubmit={addContact}>
                    <input type="text" name="name" placeholder="name" onChange={keepContact} />
                    <input type="text" name="telephone" placeholder="telephone" onChange={keepTelephone} />
                    <button type="submit">Add Contact</button>
                </form>
                {error && <p className="error">{error}</p>}
                <ul>
                    {contacts.map(contacts => <li>{contact}: {telephone}</li> )}
                </ul>
            </div>
        </main>
    }
}

export default Contacts