import React, {Component} from 'react'
import classNames from 'classnames'
import ChessBoard from "./Chessboard"

class Main extends Component {

  state = {
  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onUserClick(user)
  }



  render() {
    let {props: {newGamePosition, onGameMove,amConnected, username, users}} = this
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
          <ChessBoard onGameMove={onGameMove} newGamePosition={newGamePosition}/>

        </div>
        }
      </div>
    </main>


  }

}

export default Main