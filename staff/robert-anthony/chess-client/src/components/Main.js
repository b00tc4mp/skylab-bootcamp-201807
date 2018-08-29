import React, {Component} from 'react'
import classNames from 'classnames'
import ChessBoard from "./Chessboard"
import logic from '../logic'
/*
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css*/

class Main extends Component {

  state = {
    error: "",
  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onRequestGame(user)
  }


  onAcceptGame = (requester) => {
    console.log("accepted game with", requester)
  }



  render() {
    let {props: {gameRequester, users,nickname}} = this
    let listo
    if (users.length) {
      users = users.filter(user => user !== nickname)

      listo = users.map(user => {
        return <li key={user + Math.random()}><a onClick={e => this.onUserClick(e, user)}> {`${user}`}</a></li>
      })
    }
    return <main>
      <div className="screen">
        <nav>
        </nav>
        <h1>{nickname}</h1>
        <ul>
          {users.length ? listo : <li>no users available</li>}
        </ul>
        <div>
{/*
          <ChessBoard onGameMove={onGameMove} newGamePosition={newGamePosition}/>
*/}
         {gameRequester && <div><button onClick={() =>this.props.respondToGameRequest(gameRequester,"true")}>Accept</button><button onClick={() =>this.props.respondToGameRequest(null,"false")}>Reject</button></div>}

        </div>
      </div>
    </main>


  }

}

export default Main