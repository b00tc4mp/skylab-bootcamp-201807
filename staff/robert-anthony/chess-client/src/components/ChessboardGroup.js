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

    return <Container>
      <Row>
        <Col xs="12" md="9">


          <div className="main__chessboardarea">
            {currentGame &&
            <ChessboardComponent isWhite={currentGame.initiator === nickname}
                                 onGameMove={(move) => onGameMove(move, currentGame.id, currentGame.opponent)}
                                 nickname={nickname} opponent={currentGame.opponent} fen={currentGame.fen}/>
            }
          </div>
        </Col>
        <Col xs="12" md="3">
          {currentGame && <h1> {nickname} vs {currentGame.opponent}</h1>}
          {currentGame && <h3>{currentGame.toPlay} to play</h3>}
        </Col>
      </Row>
    </Container>


  }

}

export default ChessboardGroup