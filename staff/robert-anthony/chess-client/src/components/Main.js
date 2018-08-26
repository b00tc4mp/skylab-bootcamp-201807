import React, {Component} from 'react'
import classNames from 'classnames'

class Main extends Component {

  state = {
    amConnected: this.props.amConnected,
    messageToSend: "",
  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onUserClick(user)
  }

  keepMessageToSend = (e) => {
    this.setState({messageToSend: e.target.value})
  }

  sendToUser = e => {
    e.preventDefault()

    this.props.sendToUser(this.state.messageToSend)
    this.setState({messageToSend:""})
  }


  render() {
    let {props: {amConnected, username, users,receivedMessage},state:{messageToSend}} = this
    let listo
    if (users.length) {
      users = users.filter(user => user !== username)

      listo = users.map(user => {
        return <li key={user + Math.random()}><a onClick={e => this.onUserClick(e, user)}> {`${user}`}</a></li>
      })
    }
    return <main>
      <div className="screen">
        <nav>
        </nav>
        <h1>{username}</h1>
        {!amConnected && <ul>
          {users.length ? listo : <li>no users available</li>}
        </ul>}
        {amConnected &&
        <div>
          <form onSubmit={this.sendToUser}>
            <input onChange={this.keepMessageToSend} value={messageToSend} id="main__text--sender" type="text"/>
            <button type="submit">Send</button>
          </form>
          <p>{receivedMessage}</p>
        </div>
        }
      </div>
    </main>


  }

}

export default Main