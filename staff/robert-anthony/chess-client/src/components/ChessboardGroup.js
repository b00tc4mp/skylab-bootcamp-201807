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
    let {props: {onGameMove, currentGame, nickname,onAcknowledgeGameOver}} = this

    return <div>


          <div className="main__chessboardarea">
            {currentGame &&
            <ChessboardComponent isWhite={currentGame.initiator === nickname}
                                 onAcknowledgeGameOver={onAcknowledgeGameOver}
              currentGame={currentGame}
                                 onError={this.onError}
                                 onGameMove={(move) => onGameMove(move, currentGame.id, currentGame.opponent)}
                                 nickname={nickname} />
            }
          </div>

    </div>


  }

}

export default ChessboardGroup