import React, {Component} from 'react'
import classNames from 'classnames'
import ChessboardComponent from "./ChessboardComponent"
import {Container, Row, Col} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'
import PropTypes from 'prop-types'


class ChessboardGroup extends Component {

  static propTypes = {
    onGameMove:PropTypes.func,
    currentGames:PropTypes.array,
    nickname:PropTypes.string,
  //  opponent:PropType.string,
  }

  state = {
    error: "",
  }

  onUserClick = (e, user) => {
    e.preventDefault()
    this.props.onRequestGame(user)
  }


  render() {
    let {props: {onGameMove, currentGames, nickname,opponent}} = this
    let chessBoardList
    if (currentGames.length) {

      chessBoardList = currentGames.map(game => {
        return <ListGroupItem><ChessboardComponent
          onGameMove={(move) => onGameMove(move, game.id, game.opponent)} fen={game.fen}/></ListGroupItem>
      })


    }
    return <main>
      <div className="screen">
        <nav>
        </nav>
        <h1>You are playing as {nickname} against {opponent}</h1>
              <div className="main__chessboardarea">
                {currentGames.length && <ListGroup>
                  {currentGames.length && currentGames.map(game => {
                    return <ListGroupItem key={game.id}><ChessboardComponent
                      onGameMove={(move) => onGameMove(move, game.id, game.opponent)} fen={game.fen}/></ListGroupItem>
                  })
                  }
                </ListGroup>}
              </div>
      </div>
    </main>


  }

}

export default ChessboardGroup