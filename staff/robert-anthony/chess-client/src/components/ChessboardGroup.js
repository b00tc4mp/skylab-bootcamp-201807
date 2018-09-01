import React, {Component} from 'react'
import classNames from 'classnames'
import ChessboardComponent from "./ChessboardComponent"
import {Container, Row, Col} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'
import PropTypes from 'prop-types'


class ChessboardGroup extends Component {

  static propTypes = {
    onGameMove: PropTypes.func,
    currentGame: PropTypes.object,
    nickname: PropTypes.string,
  }

  state = {
    error: "",
  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onRequestGame(user)
  }


  render() {
    let {props: {onGameMove, currentGame, nickname}} = this

    return <main>
      <div className="screen">
       {currentGame &&  <h3>{currentGame.toPlay} to play</h3>}

        <div className="main__chessboardarea">
          {currentGame &&
          <ChessboardComponent isWhite={currentGame.initiator === nickname} onGameMove={(move) => onGameMove(move, currentGame.id, currentGame.opponent)}
                               nickname={nickname} opponent={currentGame.opponent} fen={currentGame.fen}/>
          }
        </div>
      </div>
    </main>


  }

}

export default ChessboardGroup