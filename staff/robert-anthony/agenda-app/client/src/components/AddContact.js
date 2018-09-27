import React, {Component} from 'react'
import logic from '../logic'
import {withRouter} from 'react-router-dom'


class AddContact extends Component {
  state = {
    firstname: '',
    surname: '',
    address: '',
    succeeded: false,
    error: ''
  }

  onFirstNameChanged = e => this.setState({firstname: e.target.value})

  onSurnameChanged = e => this.setState({surname: e.target.value})
  onAddressChanged = e => this.setState({address: e.target.value})

  onAddContact = e => {
    e.preventDefault()
    const {surname, firstname, address} = this.state

    const contact = {firstname, surname, address}

    logic.addContact(this.props.username, contact, this.props.token)
      .then(({message}) => {

        this.setState({error: message})
        this.props.history.push("/contacts")

      })
      .catch((err) =>  this.setState({err}))
  }


  render() {
    const {state: {error}} = this


    return <main>

      <div className="screen">
        <form onSubmit={this.onAddContact}>
          <input type="text" name="firstname" placeholder="First Name" autoFocus onChange={this.onFirstNameChanged}/>
          <input type="text" name="surname" placeholder="Last Name" onChange={this.onSurnameChanged}/>
          <input type="text" name="address" placeholder="Address" onChange={this.onAddressChanged}/>
          <button type="submit">Add Contact</button>
        </form>
        {error && <h3>{error.message}</h3>}
      </div>
    </main>
  }
}

export default withRouter(AddContact)

