import React, {Component} from 'react'
import ChessboardComponent from "./ChessboardComponent"
import {Container, Row, Col} from 'reactstrap';
import PropTypes from 'prop-types'
import OpenGames from "./OpenGames"


class ChessboardGroup extends Component {

  static propTypes = {
    onGameMove: PropTypes.func,
    currentGame: PropTypes.object,
    nickname: PropTypes.string,
    onError:PropTypes.func,
    currentGames:PropTypes.array,
    onAcknowledgeGameOver:PropTypes.func,
  }

  state = {
    error: "",
  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onRequestGame(user)
  }


  render() {
    let {props: {onGameMove, currentGame,currentGames, nickname,onAcknowledgeGameOver}} = this

    const gamesList = currentGames.map(game => <div key={game.id}>
      {game && currentGame && (game.id === currentGame.id) &&
      <ChessboardComponent isWhite={game.initiator === nickname}
                           onAcknowledgeGameOver={onAcknowledgeGameOver}
                           currentGame={game}
                           onError={this.onError}
                           onGameMove={(move) => onGameMove(move, game.id)}
                           nickname={nickname}  />
      }
    </div>)

    return <div className="chessBoardGroup__chessBoardArea">{currentGames.length && gamesList} </div>

  }

}

export default ChessboardGroup