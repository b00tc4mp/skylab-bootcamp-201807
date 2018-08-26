import React, {Component} from 'react'
import classNames from 'classnames'

class Main extends Component {

  onUserClick = (e,user) => {
    console.log("onUserClick",user)
    e.preventDefault()
    this.props.onUserClick(user)
  }



  render() {
    let {props: {username,users}} = this
    let listo
    if (users.length) {
      users = users.filter(user => user.username !== username)

      listo = users.map(user => {
        console.log(users)
        if (user.hasPartner)
          return  <li key={user + Math.random()}> {`${user.username}`}</li>
       else
        return  <li key={user + Math.random()}> <a  onClick={e => this.onUserClick(e,user.username)}> {`${user.username}`}</a></li>
      })
    }
    return <main>
      <div className="screen">
        <nav>
        </nav>
        <h1>{username}</h1>
        <ul>
          {users.length ? listo : <li>no users available</li>}
        </ul>
      </div>
    </main>


  }

}

export default Main