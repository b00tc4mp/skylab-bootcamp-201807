import React, {Component} from 'react'
import classNames from 'classnames'
import ChessBoard from "./Chessboard"


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


  shouldComponentUpdate(nextProps, nextState) {
    console.log("Main: ",this.props.currentGames, nextProps.currentGames)
    this.props.currentGames.forEach((game,i) => {
      if (game.fen !== nextProps.currentGames[i].fen) {
        console.log("Fen Difference! ",game.fen, nextProps.currentGames[i].fen )
      }
    })
    return true
  }



  render() {
    let {props: {onGameMove, currentGames, gameRequester, users, nickname}} = this
    let userList, chessBoardList
    if (users.length) {
      users = users.filter(user => user !== nickname)

      userList = users.map(user => {
        return <li key={user + Math.random()}><a onClick={e => this.onUserClick(e, user)}> {`${user}`}</a></li>
      })
      if (currentGames.length) {
        chessBoardList = currentGames.map(game => {
          return <li key={game.opponent + Math.random()}><ChessBoard
            onGameMove={(move) => onGameMove(move, game.id, game.opponent)} fen={game.fen}/></li>
        })
      }


    }
    return <main>
      <div className="screen">
        <nav>
        </nav>
        <h1>You are playing as {nickname}</h1>
        <div className="main__gamearea">
          <div className="main__userlist">
            <ul>
              {users.length ? userList : <li>no users available</li>}
            </ul>
          </div>
          <div className="main__chessboardarea">
            <ul>
              {currentGames.length && currentGames.map(game => {
                return <li key={game.opponent + Math.random()}><ChessBoard
                  onGameMove={(move) => onGameMove(move, game.id, game.opponent)} fen={game.fen}/></li>
              })
              }
            </ul>
            {gameRequester &&
            <div><h3>{gameRequester} wants to play a game with you</h3>
              <button onClick={() => this.props.respondToGameRequest(gameRequester, "true")}>Accept</button>
              <button onClick={() => this.props.respondToGameRequest(null, "false")}>Reject</button>
            </div>
            }
          </div>

        </div>
      </div>
    </main>


  }

}

export default Main