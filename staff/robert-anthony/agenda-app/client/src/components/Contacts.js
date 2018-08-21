import React, {Component} from 'react'
import logic from '../logic'

class Contacts extends Component {
  state = {
    contacts: [],
    contactsFromMongo: [],
    error: null,
    filter: ''
  }

  componentDidMount = () => {
    logic.getAllContacts(this.props.username, this.props.token)
      .then(res => this.setState({contacts: res, contactsFromMongo: res}))
      .catch(err => this.setState({error: err}))
  }

  keepFilter = (e) => {
    const filter = e.target.value.toLowerCase()
    const filtered = this.state.contactsFromMongo.filter(contact => {
      let name
      if (filter === "") return contact

      return (contact.firstname.toLowerCase().startsWith(filter) || contact.surname.toLowerCase().startsWith(filter))
    })
    this.setState({filter: e.target.value, contacts: filtered})

  }


  render() {
    const {state: {error, contacts}} = this

    return <main>
      <div className="screen">
        <form>
          <input type="text" name="filter" onChange={this.keepFilter}/>
        </form>
        <ul>
          {contacts.map(contact => <li
            key={contact.id}>{`${contact.firstname} ${contact.surname} ${contact.address}`}</li>)}
        </ul>
        {error && <h3>{error.message}</h3>}
        <a    className="internalLink" href="/#/addcontact">Add Contact</a>
      </div>
    </main>
  }
}

export default Contacts